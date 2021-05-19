import { useContext, useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import {ListGroup, Button} from 'react-bootstrap';
import { ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';
import ApprovedProposal from './ApprovedProposal';
import RejectedProposal from './RejectedProposal';
import { LanguageContext } from '../contexts/LanguageContext';
import { ValidationRequiredContext } from '../contexts/ValidationRequiredContext';
import { GovernorAlphaContext } from '../contexts/GovernorAlphaContext';
import ValidationRequired from '../alerts/ValidationRequired';
import { EthersContext } from '../contexts/EthersContext';

import Taro from '../contracts/contracts/Taro.sol/Taro.json';
import taroAddress from '../contracts/contracts/Taro/contract-address.json';

import GovernorAlpha from '../contracts/contracts/GovernorAlpha.sol/GovernorAlpha.json';
import governorAlphaAddress from '../contracts/contracts/GovernorAlpha/contract-address.json';


const PastProposals = () => {
  let [taro, setTaro] = useState();
  let [signerAddress, setSignerAddress] = useState();
  let [approvedProposals, setApprovedProposals] = useState([]);
  let [rejectedProposals, setRejectedProposals] = useState([]);
  let [showApproved, setShowApproved] = useState(true);

  let {isValidated} = useContext(ValidationRequiredContext);
  let [isEnglish] = useContext(LanguageContext);
  let {governorAlpha} = useContext(GovernorAlphaContext);
  let {provider} = useContext(EthersContext);

  useEffect(() => {
    const main = async () => {
      // setIsMetamaskInstalled(true);
      // setIsConnected(false);
      try {
        //detect whether the browser is connected to a provider
        let ethereumProvider = await detectEthereumProvider();
        if (ethereumProvider) {
          // setProvider(ethereumProvider);
          startApp(ethereumProvider);
        } else {
          // setIsMetamaskInstalled(false);
          return;
        };
      } catch (error) {
        console.error(error);
      };

      async function startApp(_ethereumProvider) {
        try {
          //The provider detected by detectEthereumProvider() must be the same as window.ethereum
          if (_ethereumProvider !== window.ethereum) {
            // setIsMetamaskInstalled(false);
            return;
          };

          //Check if a MetaMask account has permission to connect to app
          let metamaskAccount;
          let accounts = await _ethereumProvider.request({ method: 'eth_accounts' });
            if (accounts.length > 0) {
              metamaskAccount = accounts[0];
              // setCurrentMetaMaskAccount(accounts[0]);
              // setIsMetamaskInstalled(true);
              // setIsConnected(true);
            };
          console.log(`metamaskAccount ${metamaskAccount}`);

          //Force the browser to refresh whenever the network chain is changed
          // let chainId = await _ethereumProvider.request({ method: 'eth_chainId' });
          // _ethereumProvider.on('chainChanged', handleChainChanged);
          // console.log('chainId: ', chainId);

          //Create the Ethers.js provider and set it in state
          let _ethersProvider = await new ethers.providers.Web3Provider(_ethereumProvider);
          // setEthersProvider(_ethersProvider);
          console.log('_ethersProvider: ', _ethersProvider)
          // make call to contract to check if current user is validated.
          // this may need to be done inside handleOnConnect as well
          // if user is validated, then set isValidated(true)

          if(accounts.length !== 0) {
            let signer = await _ethersProvider.getSigner();
            // setEthersSigner(signer);

            const _taro = new ethers.Contract(
              taroAddress.Taro,
              Taro.abi,
              signer
            );
            setTaro(_taro);

            let _signerAddress = await signer.getAddress();
            // console.log("signerAddress: ", signerAddress);
            setSignerAddress(_signerAddress);

            // let _userBalance = await _taro.balanceOf(signerAddress);
            // console.log('_userBalance in useEffect: ', _userBalance.toString());
            // if(_userBalance) {
            //   setUserBalance(_userBalance.toString());
            // };

            const _governorAlpha = new ethers.Contract(
              governorAlphaAddress.GovernorAlpha,
              GovernorAlpha.abi,
              signer
            );
            // setGovernorAlpha(_governorAlpha);

            let _isValidated = await _governorAlpha.getValidityStatus();
            // console.log(_isValidated);

            let proposalCount = await _governorAlpha.proposalCount();
            proposalCount = +proposalCount;

            if(proposalCount > 0) {
              let pastProposals = [];
              let proposal, currentTimeInSeconds;
              for(let i = 1; i <= proposalCount; i++) {
                proposal = await _governorAlpha.proposals(ethers.BigNumber.from(i));
                currentTimeInSeconds = Date.parse(new Date(Date.now())) / 1000;
                // currentBlockNumber = await _ethersProvider.getBlockNumber();
                // console.log('block number: ', currentBlockNumber)
                // console.log('proposal:', proposal.endBlock.toNumber());
                // console.log('forVotes: ', proposal.forVotes.toString());
                // console.log('againstVotes: ', proposal.againstVotes.toString());
                // console.log('proposal: ', proposal);
                // console.log('eb: ', proposal.endBlock.toNumber());
                // console.log('currentBlockNumber: ', currentBlockNumber);


                if(proposal.endBlock.toNumber() <= currentTimeInSeconds) {
                  let _proposalTime = proposal.startBlock.toString();
                  let dateObject = new Date(_proposalTime * 1000);
                  let year = dateObject.toLocaleString("en-US", {year: 'numeric'});
                  let month = dateObject.toLocaleString("en-US", {month: 'numeric'});
                  let day = dateObject.toLocaleString("en-US", {day: 'numeric'});

                  pastProposals.push({
                    title: proposal[9][0],
                    typeOfAction: proposal[9][1],
                    neighborhood: proposal[9][2],
                    personInCharge: proposal[9][3],
                    description: proposal[9][4],
                    expiration: proposal[9][5].toString(),
                    budget: proposal[9][6].toString(),
                    requiredTaroToVote: proposal[9][7].toString(),
                    forVotes: proposal.forVotes.toString(),
                    againstVotes: proposal.againstVotes.toString(),
                    id: proposal.id.toString(),
                    proposer: proposal.proposer.toString(),
                    proposalYear: year,
                    proposalMonth: month,
                    proposalDay: day
                  });
                };
              };
              // console.log('pastProposals: ', pastProposals)
              pastProposals.reverse();

              let approved = [];
              for(let i = 0; i < pastProposals.length; i++) {
                if(pastProposals[i].forVotes > pastProposals[i].againstVotes) {
                  approved.push(pastProposals[i]);
                };
              };
              setApprovedProposals(approved);

              let rejected = []
              for(let i = 0; i < pastProposals.length; i++) {
                if(pastProposals[i].forVotes <= pastProposals[i].againstVotes) {
                  rejected.push(pastProposals[i]);
                };
              };
              setRejectedProposals(rejected);
            };
          };
        } catch (error) {
          console.error(error);
        };
      };
    };
    main();
  }, []);

  const approvedList = approvedProposals.map((proposal, i) => {
    return (
      <div key={i}>
        <ApprovedProposal
          title={proposal.title}
          typeOfAction={proposal.typeOfAction}
          neighborhood={proposal.neighborhood}
          personInCharge={proposal.personInCharge}
          description={proposal.description}
          expiration={proposal.expiration}
          budget={proposal.budget}
          taroToVote={proposal.taroToVote}
          forVotes={proposal.forVotes}
          againstVotes={proposal.againstVotes}
          id={proposal.id}
          proposer={proposal.proposer}
          proposalYear={proposal.proposalYear}
          proposalMonth={proposal.proposalMonth}
          proposalDay={proposal.proposalDay}
        />
      </div>
    )
  });

  const rejectedList = rejectedProposals.map((proposal, i) => {
    return (
      <div key={i}>
        <RejectedProposal
          title={proposal.title}
          typeOfAction={proposal.typeOfAction}
          neighborhood={proposal.neighborhood}
          personInCharge={proposal.personInCharge}
          description={proposal.description}
          expiration={proposal.expiration}
          budget={proposal.budget}
          taroToVote={proposal.taroToVote}
          forVotes={proposal.forVotes}
          againstVotes={proposal.againstVotes}
          id={proposal.id}
          proposer={proposal.proposer}
          proposalYear={proposal.proposalYear}
          proposalMonth={proposal.proposalMonth}
          proposalDay={proposal.proposalDay}
        />
      </div>
    )
  });

  const handleOnApprove = () => {
    setShowApproved(!showApproved);
  };

  return (
    <div className= "App">
        {isEnglish === 'english'
        ?
        <div>
          <div>
              <div className= "past">
               <div className="text-large">Past proposals</div>
               <div className="big-icon">📅 </div>
                <div>
                  {showApproved
                    ?
                    <div className="space">
                      {approvedList.length > 0
                        ?
                        <div className="space">
                          <div className="floating">
                          <Button className="alt2" onClick={handleOnApprove}>
                            Rejected proposals
                          </Button>
                          </div>
                          <div className="title2">✔️ Approved proposals</div>
                          {approvedList}

                          <div className ="floating">
                            <Link className="alt2" to="/ProposalList"> 🗳️ Return to Governance</Link>
                          </div>
                        </div>

                        :
                        <div>
                          <Button onClick={handleOnApprove}>
                            See rejected proposals
                          </Button>
                          <div className ="main">
                          <div className="title2">⛔There are no past rejected proposals right now.⛔</div>
                          </div>
                          <div className ="floating">
                            <Link className="alt2" to="/ProposalList"> 🗳️ Return to Governance</Link>
                          </div>
                        </div>
                      }
                    </div>
                    :
                    <div>
                      {rejectedList.length > 0
                        ?
                        <div className="space">
                          <div className="floating">
                          <Button className="alt2" onClick={handleOnApprove}>
                            Approved proposals
                          </Button>
                          </div>
                          <div className="title2">❌ Rejected Proposals</div>
                          {rejectedList}
                          <div className ="floating">
                            <Link className="alt2" to="/ProposalList"> 🗳️ Return to Governance</Link>
                          </div>
                        </div>
                        :
                        <div className="main">
                          <Button onClick={handleOnApprove}>
                            See approved proposals
                          </Button>
                          <div className ="main">
                          <div className="titlep">⛔There are no past rejected proposals right now.⛔</div>
                          </div>
                          <div className ="floating">
                            <Link className="alt2" to="/">Return to home</Link>
                          </div>
                        </div>
                      }
                    </div>
                  }
                </div>
              </div>
              <div className="floating">
                  <Link className="alt2" to="/">Return to home</Link>
              </div>
          </div>

        </div>

        :
        <div>
          <div>
              <div className= "past">
               <div className="text-large">Propuestas Pasadas</div>
               <div className="big-icon">📅 </div>
                <div>
                  {showApproved
                    ?
                    <div className="space">
                      {approvedList.length > 0
                        ?
                        <div className="space">
                          <div className="floating">
                          <Button className="alt2" onClick={handleOnApprove}>
                            Ver propuestas rechazadas
                          </Button>
                          </div>
                          <div className="title2">✔️ Propuestas Aprobadas</div>
                          {approvedList}

                          <div className ="floating">
                            <Link className="alt2" to="/ProposalList"> 🗳️ Regresar a Gobernanza </Link>
                          </div>
                        </div>
                        :
                        <div>
                          <Button onClick={handleOnApprove}>
                          Ver propuestas rechazadas
                          </Button>
                          <div className ="main">
                           <div className="title2">⛔Aún no hay propuestas aprobadas⛔</div>
                          </div>
                          <div className ="floating">
                          <Link className="alt2" to="/ProposalList"> 🗳️ Regresar a Gobernanza</Link>
                          </div>
                        </div>
                      }
                    </div>
                    :
                    <div>
                      {rejectedList.length > 0
                        ?
                        <div className="space">
                          <div className="floating">
                          <Button className="alt2" onClick={handleOnApprove}>
                            Ver propuestas aceptadas
                          </Button>
                          </div>
                          <div className="title2">❌ Propuestas Rechazadas</div>
                          {rejectedList}
                          <div className ="floating">
                            <Link className="alt2" to="/ProposalList"> 🗳️ Regresar a Gobernanza</Link>
                          </div>
                        </div>
                        :
                        <div>
                          <Button onClick={handleOnApprove}>
                            Ver propuestas aprobadas
                          </Button>
                          <div className ="main">
                           <div className="title2">⛔Aún no hay propuestas rechazadas⛔</div>
                          </div>
                          <div className ="floating">
                            <Link className="alt2" to="/">Regresar al inicio</Link>
                          </div>
                        </div>
                      }
                    </div>
                  }
                </div>
              </div>
              <div className="floating">
                  <Link className="alt2" to="/">Regresar al inicio</Link>
              </div>
          </div>

        </div>
      }
      </div>
  );
};

 export default PastProposals;
