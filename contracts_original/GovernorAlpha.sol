pragma solidity ^0.5.16;
pragma experimental ABIEncoderV2;

import "hardhat/console.sol";

contract GovernorAlpha {
    /// @notice The name of this contract
    string public constant name = "VoTaro Governor Alpha";

    /// @notice The number of votes required in order for a voter to become a proposer
    function proposalThreshold() public pure returns (uint) { return 100000e18; } // 100,000 = 1% of Taro
    //
    /// @notice The delay before voting on a proposal may take place, once proposed
    function votingDelay() public pure returns (uint) { return 1; } // 1 block
    //
    // /// @notice The duration of voting on a proposal, in blocks
    function votingPeriod() public pure returns (uint) { return 8; } // ~3 days in blocks (assuming 15s blocks; 17280 blocks)
    //
    // /// @notice The address of the Taro Protocol Timelock
    TimelockInterface public timelock;
    //
    // /// @notice The address of the Taro governance token
    TaroInterface public taro;
    //
    // /// @notice The address of the Governor Guardian
    address public guardian;

    /// @notice The total number of proposals
    uint public proposalCount;

    struct Proposal {
        /// @notice Unique id for looking up a proposal
        uint id;

        /// @notice Creator of the proposal
        address proposer;

        // / @notice The timestamp that the proposal will be available for execution, set once the vote succeeds
        uint eta;

        /// @notice The block at which voting begins: holders must delegate their votes prior to this block
        uint startBlock;

        /// @notice The block at which voting ends: votes must be cast prior to this block
        uint endBlock;

        /// @notice Current number of votes in favor of this proposal
        uint forVotes;

        /// @notice Current number of votes in opposition to this proposal
        uint againstVotes;

        /// @notice Flag marking whether the proposal has been canceled
        bool canceled;

        /// @notice Flag marking whether the proposal has been executed
        bool executed;

        /// @notice A struct that holds the proposal fields from the user input
        UserInputFields userInputFields;

        /// @notice Receipts of ballots for the entire set of voters
        mapping (address => Receipt) receipts;
    }

    /// @notice Ballot receipt record for a voter
    struct Receipt {
        /// @notice Whether or not a vote has been cast
        bool hasVoted;

        /// @notice Whether or not the voter supports the proposal
        bool support;

        /// @notice The number of votes the voter had, which were cast
        uint96 votes;
    }

    /// @notice Stores the time for calculating validity
    struct Validation {
      uint expirationTime;
    }

    struct UserProposal {
      uint count;
    }
    /// @notice The official record of all proposals ever proposed
    mapping (uint => Proposal) public proposals;

    /// @notice The latest proposal for each proposer
    mapping (address => uint) public latestProposalIds;

    /// @notice A mapping of whether or not a proposal is currently active
    mapping (uint => bool) public isProposalActive;

    /// @notice Collection of all Validation structs that are used to calculate the validity of an address
    mapping (address => Validation) public validations;

    /// @notice A collection of user proposals
    mapping (address => UserProposal) public userProposals;

    /// @notice An event emitted when a new proposal is created
    event ProposalCreated(uint id);

    /// @notice An event emitted when a vote has been cast on a proposal
    event VoteCast(address voter, uint proposalId, bool support, uint votes);

    /// @notice values used to calculate user validity
    event ValidityStatus(uint timestamp);


    constructor(address timelock_, address taro_, address guardian_) public {
        timelock = TimelockInterface(timelock_);
        taro = TaroInterface(taro_);
        guardian = guardian_;
    }

    struct UserInputFields {
      string title;
      string typeOfAction;
      string neighborhood;
      string personInCharge;
      string description;
      uint expiration;
      uint budget;
      uint requiredTaroToVote;
      uint proposalTime;
      address proposer;
    }

    function propose(UserInputFields memory _userInputFields) public checkValidity returns (uint) {
        //A user recieves 20 Taro for each of their first five proposals
        if(userProposals[msg.sender].count < 5) {
          bool transferred = taro.transferFrom(address(this), msg.sender, 20);
          require(transferred, "Tokens not transferred to msg.sender");
          userProposals[msg.sender].count++;
        }

        uint startBlock = add256(block.number, votingDelay());
        uint endBlock = add256(startBlock, votingPeriod());
        proposalCount++;
        Proposal memory newProposal = Proposal({
            id: proposalCount,
            proposer: msg.sender,
            userInputFields: _userInputFields,
            eta: 0,
            startBlock: startBlock,
            endBlock: endBlock,
            forVotes: 0,
            againstVotes: 0,
            canceled: false,
            executed: false
        });


        proposals[newProposal.id] = newProposal;

        isProposalActive[newProposal.id] = true;
        // latestProposalIds[newProposal.proposer] = newProposal.id;
        //

        emit ProposalCreated(newProposal.id);
        return newProposal.id;
    }

    //The front end will respond based on the uint value that is returned.
    //The user cannot validate if the user is currently validated.
    //The validation period lasts for six months.
    function validate(uint _rewardedTokens) public returns(uint) {
      if(validations[msg.sender].expirationTime == 0) {
        validations[msg.sender] = Validation({
            expirationTime: block.timestamp + 15780000
        });
        bool transferred = taro.transferFrom(address(this), msg.sender, _rewardedTokens);
        require(transferred, "Tokens not transferred to msg.sender");
        return 0; //validates new user
      } else if(validations[msg.sender].expirationTime >= block.timestamp) {
          return 1; //already validated
      } else {
          validations[msg.sender] = Validation({
              expirationTime: block.timestamp + 15780000
          });
          return 2; // return 2; //renew validation
      }
    }

    //Ensure that the user is validated and making the function call prior to the expiration time.
    modifier checkValidity {
      bool isValid;
      if(validations[msg.sender].expirationTime > block.timestamp) {
          isValid = true;
      } else {
          isValid = false;
      }
      require(isValid, 'user is not currently validated');
      _;
    }

    function getValidityStatus() public view returns (uint, uint){
        return (validations[msg.sender].expirationTime, block.timestamp);
    }


    function castVote(uint proposalId, bool support) public {
        return _castVote(msg.sender, proposalId, support);
    }

    function _castVote(address voter, uint proposalId, bool support) internal {
        require(isProposalActive[proposalId] == true, "GovernorAlpha::_castVote: voting is closed");

        Proposal storage proposal = proposals[proposalId];
        Receipt storage receipt = proposal.receipts[voter];

        uint amountOfTaro = taro.balanceOf(msg.sender);
        uint96 amountOfT = uint96(amountOfTaro);

        require(receipt.hasVoted == false, "GovernorAlpha::_castVote: voter already voted");
        //The following line was causing the first proposal to not allow it to be voted on
        // uint96 votes = taro.getPriorVotes(voter, proposal.startBlock, amountOfT);

        if (support) {
            proposal.forVotes = add256(proposal.forVotes, amountOfT);
        } else {
            proposal.againstVotes = add256(proposal.againstVotes, amountOfT);
        }

        receipt.hasVoted = true;
        receipt.support = support;
        receipt.votes = amountOfT;

        emit VoteCast(voter, proposalId, support, amountOfT);
    }

    function checkHasVoted(address _user, uint proposalId) public view returns (bool) {
      Proposal storage proposal = proposals[proposalId];
      Receipt storage receipt = proposal.receipts[_user];
      return receipt.hasVoted;
    }

    function add256(uint256 a, uint256 b) internal pure returns (uint) {
        uint c = a + b;
        require(c >= a, "addition overflow");
        return c;
    }
//
    function sub256(uint256 a, uint256 b) internal pure returns (uint) {
        require(b <= a, "subtraction underflow");
        return a - b;
    }
}

interface TimelockInterface {
    function delay() external view returns (uint);
    function GRACE_PERIOD() external view returns (uint);
    function acceptAdmin() external;
    function queuedTransactions(bytes32 hash) external view returns (bool);
    function queueTransaction(address target, uint value, string calldata signature, bytes calldata data, uint eta) external returns (bytes32);
    function cancelTransaction(address target, uint value, string calldata signature, bytes calldata data, uint eta) external;
    function executeTransaction(address target, uint value, string calldata signature, bytes calldata data, uint eta) external payable returns (bytes memory);
}
//
interface TaroInterface {
    function getPriorVotes(address account, uint blockNumber) external view returns (uint96);
    function getCurrentVotes(address account) external view returns (uint96);
    function transferFrom(address src, address dst, uint rawAmount) external returns (bool);
    function balanceOf(address account) external view returns (uint);
}
