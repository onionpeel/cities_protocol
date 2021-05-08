import { useEffect, useState, useContext } from 'react';
import detectEthereumProvider from '@metamask/detect-provider'
import { ethers } from 'ethers';
import {Card} from 'react-bootstrap';
import {Link} from "react-router-dom";
import ConnectButton from './buttons/ConnectButton';
import ConnectingButton from './buttons/ConnectingButton';
import InstallMetamaskAlert from './InstallMetamaskAlert';
import '../styles/Home.css';
import { ValidationRequiredContext } from '../contexts/ValidationRequiredContext';
import { TaroContext } from '../contexts/TaroContext';
import { GovernorAlphaContext } from '../contexts/GovernorAlphaContext';
import { LanguageContext } from '../contexts/LanguageContext';
import { EthersContext } from '../contexts/EthersContext';
import { ConnectedContext } from '../contexts/ConnectedContext';
import LeaderBoard from './LeaderBoard';

import Taro from '../contracts/contracts/Taro.sol/Taro.json';
import taroAddress from '../contracts/contracts/Taro/contract-address.json';

import GovernorAlpha from '../contracts/contracts/GovernorAlpha.sol/GovernorAlpha.json'
import governorAlphaAddress from '../contracts/contracts/GovernorAlpha/contract-address.json';


function Home() {
  let [ethersProvider, setEthersProvider] = useState();
  let [isConnecting, setIsConnecting] = useState();
  let [isMetamastInstalled, setIsMetamaskInstalled] = useState();
  let [currentMetaMaskAccount, setCurrentMetaMaskAccount] = useState(null);
  let [userBalance, setUserBalance] = useState();

  let {setIsValidated} = useContext(ValidationRequiredContext);
  let {taro, setTaro} = useContext(TaroContext);
  let {governorAlpha, setGovernorAlpha} = useContext(GovernorAlphaContext);
  let {isEnglish} = useContext(LanguageContext);
  let {ethersSigner, setEthersSigner, provider, setProvider} = useContext(EthersContext);
  let {isConnected, setIsConnected} = useContext(ConnectedContext);


  useEffect(() => {
    const init = async () => {
      setIsMetamaskInstalled(true);
      setIsConnected(false);
      try {
        //detect whether the browser is connected to a provider
        let ethereumProvider = await detectEthereumProvider();
        if (ethereumProvider) {
          setProvider(ethereumProvider);
          startApp(ethereumProvider);
        } else {
          setIsMetamaskInstalled(false);
          return;
        };
      } catch (error) {
        console.error(error);
      };

      async function startApp(_ethereumProvider) {
        try {
          //The provider detected by detectEthereumProvider() must be the same as window.ethereum
          if (_ethereumProvider !== window.ethereum) {
            setIsMetamaskInstalled(false);
            return;
          };

          //Check if a MetaMask account has permission to connect to app
          let metamaskAccount;
          let accounts = await _ethereumProvider.request({ method: 'eth_accounts' });
            if (accounts.length > 0) {
              metamaskAccount = accounts[0];
              setCurrentMetaMaskAccount(accounts[0]);
              setIsMetamaskInstalled(true);
              setIsConnected(true);
            } else {
            };
          console.log(`metamaskAccount ${metamaskAccount}`);

          //Force the browser to refresh whenever the network chain is changed
          let chainId = await _ethereumProvider.request({ method: 'eth_chainId' });
          _ethereumProvider.on('chainChanged', handleChainChanged);
          console.log('chainId: ', chainId);

          //Create the Ethers.js provider and set it in state
          let _ethersProvider = await new ethers.providers.Web3Provider(_ethereumProvider);
          setEthersProvider(_ethersProvider);
          console.log('_ethersProvider: ', _ethersProvider)
          // make call to contract to check if current user is validated.
          // this may need to be done inside handleOnConnect as well
          // if user is validated, then set isValidated(true)

          if(accounts.length !== 0) {
            let signer = await _ethersProvider.getSigner();
            setEthersSigner(signer);

            const _taro = new ethers.Contract(
              taroAddress.Taro,
              Taro.abi,
              signer
            );
            setTaro(_taro);

            let signerAddress = await signer.getAddress();
            console.log("signerAddress: ", signerAddress);

            let _userBalance = await _taro.balanceOf(signerAddress);
            console.log('_userBalance in useEffect: ', _userBalance.toString());
            if(_userBalance) {
              setUserBalance(_userBalance.toString());
            };

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
    init();
  }, []);

  const getAccounts = async () => {
    try {
      const accounts = await provider.request({ method: 'eth_requestAccounts' });
      await handleAccountsChanged(accounts);
    } catch (error) {
      console.error(error);
    };
  };

  function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
      console.log('Please connect to MetaMask.');
    } else if (accounts[0] !== currentMetaMaskAccount) {
      console.log('account[0]: ', accounts[0]);
      setCurrentMetaMaskAccount(accounts[0]);
      setIsConnected(true);
      setIsConnecting(false);
      setIsMetamaskInstalled(true);
    }
  };

  function handleChainChanged(_chainId) {
    window.location.reload();
  };

  //Give a MetaMask account permission to interact with the app
  const handleOnConnect = async () => {
    setIsConnecting(true);
    try {
      await getAccounts();

      provider.on('accountsChanged', handleAccountsChanged);

      let signer = await ethersProvider.getSigner();
      setEthersSigner(signer);

      const _taro = new ethers.Contract(
        '0x5081a39b8A5f0E35a8D959395a630b68B74Dd30f',
        Taro.abi,
        signer
      );
      setTaro(_taro);

      let signerAddress = await signer.getAddress();
      console.log("signerAddress in handleOnConnect: ", signerAddress);

      let _userBalance = await _taro.balanceOf(signerAddress.toString());
      _userBalance = _userBalance.toString();
      if(_userBalance) {
        setUserBalance(_userBalance);
      };

      const _governorAlpha = new ethers.Contract(
        '0xfbC22278A96299D91d41C453234d97b4F5Eb9B2d',
        GovernorAlpha.abi,
        signer
      );
      setGovernorAlpha(_governorAlpha);
    } catch (error) {
      console.error(error);
    };
  };

  return (
    <div>
      {isEnglish

        ?

        <div className="App">

          {!isMetamastInstalled
            ?
              <InstallMetamaskAlert />
            :
              isConnected
              ? ''
              : isConnecting
                ? <ConnectingButton />
                : <ConnectButton handleOnConnect={handleOnConnect}/>
          }

          {isConnected
            ?
            <Card className="gray mb-4">
              <Card.Body>
                <div>
                  Your currently have {userBalance} TARO tokens
                </div>
              </Card.Body>
            </Card>
            :
            <Card className="gray mb-4">
              <Card.Body>
                <div>
                  Get connected so you can see your TARO balance
                </div>
              </Card.Body>
            </Card>
          }

          <Card className="gray mb-4">
            <Card.Body>
              <div>
                <Link to="/proposallist">See proposals</Link>
              </div>
            </Card.Body>
          </Card>

          <LeaderBoard />
        </div>

        :

        <div className="App">
          <div>
            ESP ESP ESP ESP ESP ESP ESP ESP ESP ESP ESP ESP This is App.js
          </div>
          {!isMetamastInstalled
            ?
              <InstallMetamaskAlert />
            :
              isConnected
              ? ''
              : isConnecting
                ? <ConnectingButton />
                : <ConnectButton handleOnConnect={handleOnConnect}/>
          }

          {isConnected
            ?
            <Card className="gray mb-4">
              <Card.Body>
                <div>
                  Your currently have {userBalance} TARO tokens
                </div>
              </Card.Body>
            </Card>
            :
            <Card className="gray mb-4">
              <Card.Body>
                <div>
                  Get connected so you can see your TARO balance
                </div>
              </Card.Body>
            </Card>
          }

          <Card className="gray mb-4">
            <Card.Body>
              <div>
                <Link to="/proposallist">See proposals</Link>
              </div>
            </Card.Body>
          </Card>

          <LeaderBoard />
        </div>
      }
    </div>
  );
}

export default Home;
