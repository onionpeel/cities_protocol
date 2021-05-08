import { useContext, useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import detectEthereumProvider from '@metamask/detect-provider';
import { ethers } from 'ethers';
import { LanguageContext } from '../contexts/LanguageContext';
import { EthersContext } from '../contexts/EthersContext';
import { GovernorAlphaContext } from '../contexts/GovernorAlphaContext';

import Taro from '../contracts/contracts/Taro.sol/Taro.json';
import taroAddress from '../contracts/contracts/Taro/contract-address.json';

import GovernorAlpha from '../contracts/contracts/GovernorAlpha.sol/GovernorAlpha.json';
import governorAlphaAddress from '../contracts/contracts/GovernorAlpha/contract-address.json';

const Proposal = ({title, typeOfAction, neighborhood, personInCharge, description, expiration, budget, requiredTaroToVote, forVotes, againstVotes, id}) => {
  let [governorAlpha, setGovernorAlpha] = useState();
  let [taro, setTaro] = useState();
  let [signerAddress, setSignerAddress] = useState();

  let {isEnglish} = useContext(LanguageContext);
  // let {governorAlpha} = useContext(GovernorAlphaContext);
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
            // console.log("signerAddress: ", _signerAddress);
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
            setGovernorAlpha(_governorAlpha);
          };
        } catch (error) {
          console.error(error);
        };
      };
    };
    main();
  }, []);


  const handleOnClickDelegate = async () => {
    let delegate = await taro.delegate(signerAddress);
    let delegateReceipt = await delegate.wait(1);
    console.log('delegateReceipt: ', delegateReceipt);
  };

  const handleOnClickFor = async () => {
    // console.log('signer address in handle for: ', signerAddress);

    let voteTx = await governorAlpha.castVote(ethers.BigNumber.from(id), true);
    let voteTxReceipt = await voteTx.wait(1);
    console.log(voteTxReceipt);
  };

  const handleOnClickAgainst = async () => {
    let voteTx = await governorAlpha.castVote(ethers.BigNumber.from(id), false);
    let voteTxReceipt = await voteTx.wait(1);
    console.log(voteTxReceipt);
  };

  return (
    <div>
      {isEnglish

      ?

      <Card className="gray mb-4">
        <Card.Body>
            <div>
              title: {title}
            </div>
            <div>
              type of action: {typeOfAction}
            </div>
            <div>
              Where: {neighborhood}
            </div>
            <div>
              Person in charge: {personInCharge}
            </div>
            <div>
              description: {description}
            </div>
            <div>
              expiration: {expiration}
            </div>
            <div>
              cost: {budget}
            </div>
            <div>
              Required TARO to vote: {requiredTaroToVote}
            </div>
            <div>
              For: {forVotes}
            </div>
            <div>
              Against: {againstVotes}
            </div>
            <Button block onClick={handleOnClickDelegate}>Delegate so you can vote</Button>
            <Button block onClick={handleOnClickFor}>Vote for this proposal</Button>
            <Button block onClick={handleOnClickAgainst}>Vote against this proposal</Button>
        </Card.Body>
      </Card>

      :

      <Card className="gray mb-4">
        <Card.Body>
            <div>
              ESP ESP ESP ESP
            </div>
            <div>
              title: {title}
            </div>
            <div>
              type of action: {typeOfAction}
            </div>
            <div>
              Where: {neighborhood}
            </div>
            <div>
              Person in charge: {personInCharge}
            </div>
            <div>
              description: {description}
            </div>
            <div>
              expiration: {expiration}
            </div>
            <div>
              cost: {budget}
            </div>
            <div>
              Required TARO to vote: {requiredTaroToVote}
            </div>
            <div>
              For: {forVotes}
            </div>
            <div>
              Against: {againstVotes}
            </div>
            <Button block onClick={handleOnClickDelegate}>Delegate so you can vote</Button>
            <Button block onClick={handleOnClickFor}>Vote for this proposal</Button>
            <Button block onClick={handleOnClickAgainst}>Vote against this proposal</Button>
        </Card.Body>
      </Card>
      }
    </div>
  );
};

export default Proposal;
