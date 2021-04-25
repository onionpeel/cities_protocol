import { useEffect, useState } from 'react';
import detectEthereumProvider from '@metamask/detect-provider'
import { ethers } from 'ethers';
import {Card} from 'react-bootstrap';
import {Link} from "react-router-dom";
import ConnectButton from './buttons/ConnectButton';
import ConnectingButton from './buttons/ConnectingButton';
import '../styles/App.css';


function Home() {
  let [provider, setProvider] = useState();
  let [ethersProvider, setEthersProvider] = useState();
  let [ethersSigner, setEthersSigner] = useState();
  let [isConnected, setIsConnected] = useState();
  let [isConnecting, setIsConnecting] = useState();
  let [isMetamastInstalled, setIsMetamaskInstalled] = useState();
  let [currentMetaMaskAccount, setCurrentMetaMaskAccount] = useState(null);

  useEffect(() => {
    const init = async () => {
      setIsConnected(false);
      //detect whether the browser is connected to a provider
      let ethereumProvider = await detectEthereumProvider();
      if (ethereumProvider) {
        setProvider(ethereumProvider);
        startApp(ethereumProvider);
      } else {
        setIsMetamaskInstalled(false);
        return;
      };

      async function startApp(_ethereumProvider) {
        //The provider detected by detectEthereumProvider() must be the same as window.ethereum
        if (_ethereumProvider !== window.ethereum) {
          setIsMetamaskInstalled(false);
          // alert('Do you have multiple wallets installed?');
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

        let _ethersProvider = await new ethers.providers.Web3Provider(_ethereumProvider);
        setEthersProvider(_ethersProvider);
      };
    };
    init();
  }, []);

  const getAccounts = async () => {
    const accounts = await provider.request({ method: 'eth_requestAccounts' });
    await handleAccountsChanged(accounts);
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
      // window.location.reload();
    }
  };
  //Give a MetaMask account permission to interact with the app
  const handleOnConnect = async () => {
    setIsConnecting(true);
    await getAccounts();
    provider.on('accountsChanged', handleAccountsChanged);

    let signer = await ethersProvider.getSigner();
    setEthersSigner(signer);
  };

  return (
      <div className="App">

        {!isMetamastInstalled
          ?
            <Card className="gray mb-4">
              <Card.Body>
                <div>
                  Are you new here?
                  This will be an alert if the user does not have metamask installed.  It will have a link the the About page so they get it installed.  Otherwise, will be a 'get connected' type of button.  Or there will be nothing if they are already connected
                </div>
              </Card.Body>
            </Card>
          :
            <Card className="gray mb-4">
              <div>
                This will be a button to connect users who already have metamask.  It will disappear when they get connected
              </div>
              <Card.Body>
                { isConnected
                  ? ''
                  : isConnecting
                    ? <ConnectingButton />
                    : <ConnectButton handleOnConnect={handleOnConnect}/>
                }
              </Card.Body>
            </Card>
        }

        <Card className="gray mb-4">
          <Card.Body>
            <div>
              Your current TARO balance:
            </div>
          </Card.Body>
        </Card>

        <Card className="gray mb-4">
          <Card.Body>
            <div>
              <Link to="/proposallist">See proposals</Link>
            </div>
          </Card.Body>
        </Card>
      </div>

  );
}

export default Home;
