import { useContext, useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import detectEthereumProvider from '@metamask/detect-provider';
import { ethers } from 'ethers';
import CountdownClock from './CountdownClock';
import { LanguageContext } from '../contexts/LanguageContext';
import { EthersContext } from '../contexts/EthersContext';
import { GovernorAlphaContext } from '../contexts/GovernorAlphaContext';

import Taro from '../contracts/contracts/Taro.sol/Taro.json';
import taroAddress from '../contracts/contracts/Taro/contract-address.json';

import GovernorAlpha from '../contracts/contracts/GovernorAlpha.sol/GovernorAlpha.json';
import governorAlphaAddress from '../contracts/contracts/GovernorAlpha/contract-address.json';

const Proposal = ({title, typeOfAction, neighborhood, personInCharge, description, expiration, budget, requiredTaroToVote, forVotes, againstVotes, id, proposer, proposalTime, hasVoted, timeToExpiration}) => {
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

  <Card className="proposal">
  <Card.Body className="proposal-table">
    <div className="proposal-main">
      <div className="proposal-title">🎯{title}</div>
      <div className="proposal-subaction">
        <div className="white-card">📍 Where:<p className="purple4">{neighborhood}</p></div>
      </div>
    </div>
    <div className="proposal-main">
      <div className="proposal-title3">✍🏼 Author: {proposer}<div className="proposal-titles">🦸🦸‍♂️In charge: {personInCharge}</div></div>
      <div className="orange-card2">⚙️ Type: <p>{typeOfAction}</p></div>
    </div>
    <div className="proposal-main">
        <div className="proposal-titles"></div>
        <div className="yellow-card">⏳ Expiration: <CountdownClock timeToExpiration={timeToExpiration}></CountdownClock></div>
      </div>
    </Card.Body>
      <div className="proposal-description"><div className="white2">📑 Description:</div><p>{description}</p></div>
      <div className="white-cost">💸 Cost: {budget} pesos</div>
    {/*}
    <div className ="proposal-main">
      <div className="proposal-sub">Costo: {budget}</div>
      <div className="proposal-subaction">TARO to vote:{requiredTaroToVote} TARO</div>
    </div>
    */}

  <Card.Body className="proposal-table">
    <div className="proposal-main">
      <div className="proposal-favor">
        <div>
          ✔️ For:
        </div>
        <p className="big-iconf">{forVotes}
          {!hasVoted
            ?
            <Button className="favor" block onClick={handleOnClickFor}>
              ✔️ Vote for
            </Button>
            :
            ''
          }
        </p>
      </div>
      <div className="proposal-action">
        <div className="proposal-against">
          ❌ Against:
        </div>
        <p className="big-icona">{againstVotes}
          {!hasVoted
            ?
            <Button className="against" block onClick={handleOnClickAgainst}>
              ❌ Vote against
            </Button>
            :
            ''
          }
        </p>
      </div>
    </div>
  </Card.Body>
</Card>

      :

      <Card className="proposal">
      <Card.Body className="proposal-table">
        <div className="proposal-main">
          <div className="proposal-title">🎯{title}</div>
          <div className="proposal-subaction">
            <div className="white-card">📍 Donde:<p className="purple4">{neighborhood}</p></div>
          </div>
        </div>
        <div className="proposal-main">
          <div className="proposal-title3">✍🏼 Autor: {proposer}<div className="proposal-titles">🦸🦸‍♂️ Responsable: {personInCharge}</div></div>
          <div className="orange-card2">⚙️Tipo de trabajo: <p>{typeOfAction}</p></div>
        </div>
        <div className="proposal-main">
            <div className="proposal-titles"></div>
            <div className="yellow-card">⏳ Expiración: <CountdownClock timeToExpiration={timeToExpiration}></CountdownClock></div>
          </div>
        </Card.Body>
          <div className="proposal-description"><div className="white2">📑 Descripción:</div><p>{description}</p></div>
          <div className="white-cost">💸 Costo: {budget} pesos</div>
        {/*}
        <div className ="proposal-main">
          <div className="proposal-sub">Costo: {budget}</div>
          <div className="proposal-subaction">TARO to vote:{requiredTaroToVote} TARO</div>
        </div>
        */}

      <Card.Body className="proposal-table">
        <div className="proposal-main">
          <div className="proposal-favor">
            <div>
              ✔️ A favor:
            </div>
            <p className="big-iconf">{forVotes}
              {!hasVoted
                ?
                <Button className="favor" block onClick={handleOnClickFor}>
                  ✔️ Votar a favor
                </Button>
                :
                ''
              }
            </p>
          </div>
          <div className="proposal-action">
            <div className="proposal-against">
              ❌ En contra:
            </div>
            <p className="big-icona">{againstVotes}
              {!hasVoted
                ?
                <Button className="against" block onClick={handleOnClickAgainst}>
                  ❌ Votar en contra
                </Button>
                :
                ''
              }
            </p>
          </div>
        </div>
      </Card.Body>
    </Card>
      }
    </div>
  );
};

export default Proposal;
