import { useContext, useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import {ListGroup} from 'react-bootstrap';
import { ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider'
import Proposal from './Proposal';
import { LanguageContext } from '../contexts/LanguageContext';
import { ValidationRequiredContext } from '../contexts/ValidationRequiredContext';
import { GovernorAlphaContext } from '../contexts/GovernorAlphaContext';
import ValidationRequired from '../alerts/ValidationRequired';
import { EthersContext } from '../contexts/EthersContext';

import GovernorAlpha from '../contracts/contracts/GovernorAlpha.sol/GovernorAlpha.json'
import governorAlphaAddress from '../contracts/contracts/GovernorAlpha/contract-address.json';

import { proposalArray } from '../DELETEBEFOREPRODUCTION/proposalArray.js';

const ProposalList = () => {
  let [retrievedProposals, setRetrievedProposals] = useState([]);

  let {isValidated} = useContext(ValidationRequiredContext);
  let {isEnglish} = useContext(LanguageContext);
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

            // const _taro = new ethers.Contract(
            //   taroAddress.Taro,
            //   Taro.abi,
            //   signer
            // );
            // setTaro(_taro);

            // let signerAddress = await signer.getAddress();
            // console.log("signerAddress: ", signerAddress);

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

            let proposalCount = await _governorAlpha.proposalCount();
            proposalCount = +proposalCount;

            if(proposalCount > 0) {
              let activeProposals = [];
              let proposal, currentBlockNumber;
              for(let i = 1; i <= proposalCount; i++) {
                proposal = await _governorAlpha.proposals(ethers.BigNumber.from(i));
                currentBlockNumber = await _ethersProvider.getBlockNumber();
                // console.log('block number: ', currentBlockNumber)
                // console.log('proposal:', proposal.endBlock.toNumber());
                console.log('forVotes: ', proposal.forVotes.toString());
                console.log('againstVotes: ', proposal.againstVotes.toString());
                console.log('proposal: ', proposal);

                if(proposal.endBlock.toNumber() > currentBlockNumber) {
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
                    againstVotes: proposal.againstVotes.toString()
                  });
                };
              };
              // console.log('activeProposals: ', activeProposals)
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
        />
      </div>
    )
  });

  return (
    <div>
      {isEnglish

      ?

      <div>
        {isValidated ? "" : <ValidationRequired />}
        <div>
          <Link to="/createproposal">Create a proposal</Link>
        </div>

        <div>
          {list.length > 0

          ?

          <div>
            {list}
          </div>

          :

          <div>
            <div>
              <Link to="/">Please return to the home page</Link>
            </div>
            <div>
              There are no proposals right now.
            </div>
          </div>
          }
        </div>

        <ListGroup>
          <ListGroup.Item>Cras justo odio</ListGroup.Item>
          <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
          <ListGroup.Item>Morbi leo risus</ListGroup.Item>
          <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
          <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
        </ListGroup>
      </div>

      :

      <div>
        <div>
          ESP ESP ESP ESP
        </div>
        {isValidated ? "" : <ValidationRequired />}
        <div>
          <Link to="/createproposal">Create a proposal</Link>
        </div>

        <div>
          {list.length > 0

          ?

          <div>
            {list}
          </div>

          :

          <div>
            <div>
              <Link to="/">Please return to the home page</Link>
            </div>
            <div>
              There are no proposals right now.
            </div>
          </div>
          }
        </div>

        <ListGroup>
          <ListGroup.Item>Cras justo odio</ListGroup.Item>
          <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
          <ListGroup.Item>Morbi leo risus</ListGroup.Item>
          <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
          <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
        </ListGroup>
      </div>
    }
    </div>
  );
};

export default ProposalList;
