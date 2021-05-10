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

  let [isEnglish] = useContext(LanguageContext);
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
      {isEnglish === 'english'

      ?

      <Card className="gray">
      <Card.Body className="proposal-table">
        <div className="proposal-main">
          <div className="proposal-title"> Clases de baile en el parque {title}</div>
          <div className="proposal-action">type of action: {typeOfAction}</div>
        </div>

        <div className="proposal-main">
          <div className="proposal-sub">Where: {neighborhood}</div>
          <div className="proposal-subaction"> Person in charge: {personInCharge}</div>
        </div>


        <div className ="proposal-main">
          <div className="proposal-sub">description: {description}</div>
          <div className="proposal-action">expiration:{expiration}</div>
        </div>

        <div className ="proposal-main">
          <div className="proposal-sub">cost: {budget}</div>
          <div className="proposal-subaction">TARO to vote:{requiredTaroToVote} TARO</div>
        </div>

        <div className="proposal-main">
          <div className="proposal-sub">For:{forVotes}</div>
          <div className="proposal-action">Against: {againstVotes}</div>
        </div>
        <div className="proposal-main">
          <Button className="wallet" block onClick={handleOnClickFor}>Vote for this proposal</Button>
          <Button claasName="wallet" block onClick={handleOnClickAgainst}>Vote against this proposal</Button>
        </div>
      </Card.Body>
    </Card>

      :

<Card className="gray">
  <Card.Body className="proposal-table">
    <div className="proposal-main">
      <div className="proposal-title">{title}</div>
      <div className="proposal-action">Tipo de acción: {typeOfAction}</div>
    </div>

    <div className="proposal-main">
      <div className="proposal-sub">Donde: {neighborhood}</div>
      <div className="proposal-subaction"> Persona a cargo: {personInCharge}</div>
    </div>


    <div className ="proposal-main">
      <div className="proposal-sub">Descripción: {description}</div>
      <div className="proposal-action">Expiración:{expiration}</div>
    </div>

    <div className ="proposal-main">
      <div className="proposal-sub">Costo: {budget}</div>
      <div className="proposal-subaction">TARO to vote:{requiredTaroToVote} TARO</div>
    </div>

    <div className="proposal-main">
      <div className="proposal-sub">A favor:{forVotes}</div>
      <div className="proposal-action">En contra: {againstVotes}</div>
    </div>
    <div className="proposal-main">
      <Button className="wallet" block onClick={handleOnClickFor}>Votar a favor</Button>
      <Button claasName="wallet" block onClick={handleOnClickAgainst}>Votar en contra</Button>
    </div>
  </Card.Body>
</Card>
      }
    </div>
  );
};

export default Proposal;
