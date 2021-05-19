import { useContext, useEffect, useState } from 'react';
import {Button} from "react-bootstrap"
import {Link} from "react-router-dom";
import { ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';
import Proposal from './Proposal';
import { LanguageContext } from '../contexts/LanguageContext';
import { ValidationRequiredContext } from '../contexts/ValidationRequiredContext';
import { GovernorAlphaContext } from '../contexts/GovernorAlphaContext';
import ValidationRequired from '../alerts/ValidationRequired';
import { EthersContext } from '../contexts/EthersContext';

import Taro from '../contracts/contracts/Taro.sol/Taro.json';
import taroAddress from '../contracts/contracts/Taro/contract-address.json';

import GovernorAlpha from '../contracts/contracts/GovernorAlpha.sol/GovernorAlpha.json';
import governorAlphaAddress from '../contracts/contracts/GovernorAlpha/contract-address.json';

const ProposalList = () => {
  let [retrievedProposals, setRetrievedProposals] = useState([]);
  let [taro, setTaro] = useState();
  let [signerAddress, setSignerAddress] = useState();

  let {isValidated, setIsValidated} = useContext(ValidationRequiredContext);
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
            let userExpirationTime = _isValidated[0].toNumber();
            let currentBlockTimestamp = _isValidated[1].toNumber();

            if(userExpirationTime === 0) {
              console.log('user is zero time; not validated');
              setIsValidated(false);
            } else if (currentBlockTimestamp > userExpirationTime){
              console.log('user is past validity period; not validated');
              setIsValidated(false);
            } else {
              setIsValidated(true);
              console.log('user exp time: ', _isValidated[0].toNumber());
              console.log('block.timestamp: ', _isValidated[1].toNumber());
            };

            let proposalCount = await _governorAlpha.proposalCount();
            proposalCount = +proposalCount;

            if(proposalCount > 0) {
              let activeProposals = [];
              let proposal, currentBlockNumber, _hasVoted;
              for(let i = 1; i <= proposalCount; i++) {
                proposal = await _governorAlpha.proposals(ethers.BigNumber.from(i));
                _hasVoted = await _governorAlpha.checkHasVoted(_signerAddress, ethers.BigNumber.from(i));
                currentBlockNumber = await _ethersProvider.getBlockNumber();
                // console.log('block number: ', currentBlockNumber)
                // console.log('proposal:', proposal.endBlock.toNumber());
                // console.log('forVotes: ', proposal.forVotes.toString());
                // console.log('againstVotes: ', proposal.againstVotes.toString());
                console.log('proposal: ', proposal);
                console.log('hasVoted: ', _hasVoted);

                if(proposal.endBlock.toNumber() > currentBlockNumber) {
                  let blocksToExpiration = proposal.endBlock.toNumber() - currentBlockNumber;

                  activeProposals.push({
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
                    proposalTime: proposal[9].proposalTime.toNumber(),
                    hasVoted: _hasVoted,
                    blocksToExpiration
                  });
                };
              };
              // console.log('activeProposals: ', activeProposals)
              activeProposals.reverse();
              setRetrievedProposals(activeProposals);
            };


          };
        } catch (error) {
          console.error(error);
        };
      };
    };
    main();
  }, []);

  const list = retrievedProposals.map((proposal, i) => {
    return (
      <div key={i}>
        <Proposal
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
          proposalTime={proposal.proposalTime}
          hasVoted={proposal.hasVoted}
          blocksToExpiration={proposal.blocksToExpiration}
        />
      </div>
    )
  });
  //const handleOnClickDelegate = async () => {
  //  let delegate = await taro.delegate(signerAddress);
  //  let delegateReceipt = await delegate.wait(1);
  //  console.log('delegateReceipt: ', delegateReceipt);
  //};

  return (
  <div className= "App">
      {isEnglish === 'english'
      ?
      <div>
        <div>
          <div className= "valert">
            {isValidated ? "" : <ValidationRequired />}
          </div>
          <div className= "orangeB">
            <div className="text-large">Make a new proposal</div>
            <div className="big-icon">🦸🦸‍♂️</div>
            <div className="main">The city needs you! Generate proposals for activities, public works or needs that you have identified in your community
                Make proposals, vote for them and make them come true to get more TARO.
            </div>
            <div className ="floating">
              <Link className="alt2" to="/createproposal"> ✍🏼 Create proposal</Link>
            </div>
          </div >
        <div>
          {list.length > 0 ?
            <div className ="space">
              <div className= "yellowB">
                <div className="text-large"> Proposals to vote </div>
                <div className="big-icon">🗳️</div>
                <div className="text-large">1 TARO = 1 Vote</div>
                <div className="main">Use your TARO to vote for or against available proposals. Your voting power depends on how many TARO tokens you hold in your wallet.</div>
                {list}
                <div className="floating">
                <Link className="alt2" to="/pastproposals">📅 Past proposals</Link>
                </div>
              </div >
            </div>
          :
            <div className="space">
              <div className= "yellowB">
                <div className="text-large"> Proposals to vote </div>
                <div className="big-icon">🗳️</div>
                <div className="text-large">1 TARO = 1 Vote</div>
                <div className="main">Use your TARO to vote for or against available proposals. Your voting power depends on how many TARO tokens you hold in your wallet.</div>
                <div className="floating">
                <div className="title2">⛔There are no proposals yet.⛔</div>
                </div>
                <div className="floating">
                  <Link className="alt2" to="/pastproposals">📅 See past proposals</Link>
                </div>
              </div >
              <div className="floating">
                  <Link className="alt2" to="/">Return to home</Link>
                </div>
            </div>
          }
        </div>
      </div>
    </div>
    :
      <div>
        <div>
          <div className= "valert">
            {isValidated ? "" : <ValidationRequired />}
          </div>
          <div className= "orangeB">
            <div className="text-large">Crea una nueva propuesta</div>
            <div className="big-icon">🦸🦸‍♂️</div>
            <div className="main">¡La ciudad te necesita! genera propuestas de actividades, obras públicas o necesidades que hayas identificado en tu comunidad
              Realiza propuestas, vota por ellas y hazlas realidad para obtener más TARO.
            </div>
            <div className ="floating">
              <Link className="alt2" to="/createproposal"> ✍🏼 Crear propuesta</Link>
            </div>
          </div >
        <div>
          {list.length > 0 ?
            <div className ="space">
              <div className= "yellowB">
                <div className="text-large"> Propuestas para votar </div>
                <div className="big-icon">🗳️</div>
                <div className="text-large">1 TARO = 1 Voto</div>
                <div className="main">Usa tu taro TARO para votar a favor o en contra de las propuestas disponibles. Tu poder de voto depende de la cantidad de tokens TARO que tengas en tu wallet.
                </div>
                {list}
                <div className="floating">
                <Link className="alt2" to="/pastproposals">📅 Propestas pasadas</Link>
                </div>
              </div >
            </div>
          :
          <div className="space">
          <div className= "yellowB">
            <div className="text-large"> Propuestas para votar </div>
            <div className="big-icon">🗳️</div>
            <div className="text-large">1 TARO = 1 Voto</div>
            <div className="main">Usa tu taro TARO para votar a favor o en contra de las propuestas disponibles. Tu poder de voto depende de la cantidad de tokens TARO que tengas en tu wallet.</div>
            <div className="floating">
            <div className="title2">⛔Aún no hay propuestas.⛔</div>
            </div>
            <div className="floating">
              <Link className="alt2" to="/pastproposals">📅 Ver propuestas pasadas</Link>
            </div>
          </div >
          <div className="floating">
              <Link className="alt2" to="/">Regresar al inicio</Link>
            </div>
        </div>
          }
        </div>
      </div>
    </div>
    }
    </div>
  );
};

 export default ProposalList;
