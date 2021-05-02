Home
get user's balance
Comp.balanceOf(address)

ProposalList
get list of current proposals
let count = GovernorAlpha.proposalCount();
iterate the length of count and each time make a call to GovernorAlpha.getActions(uint256 proposalId)

CreateProposal
create a new proposal
GovernorAlpha.propose()
parameters have to be worked out yet
