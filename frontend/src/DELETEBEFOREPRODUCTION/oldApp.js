import { useEffect, useState } from 'react';
import detectEthereumProvider from '@metamask/detect-provider'
import { ethers } from 'ethers';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
import Quiz from './Quiz';
import Proposal from './Proposal';
import Signup from './Signup';
import Governance from './Governance';

function App() {
  let [provider, setProvider] = useState();
  let [ethersProvider, setEthersProvider] = useState();
  let [isConnected, setIsConnected] = useState();
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
        alert('Please install MetaMask!');
        return;
      };

      async function startApp(_ethereumProvider) {
        //The provider detected by detectEthereumProvider() must be the same as window.ethereum
        if (_ethereumProvider !== window.ethereum) {
          alert('Do you have multiple wallets installed?');
          return;
        };

        //Check if a MetaMask account has permission to connect to app
        let metamaskAccount;
        let accounts = await _ethereumProvider.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            metamaskAccount = accounts[0];
            setIsConnected(true);
            setCurrentMetaMaskAccount(accounts[0]);
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
      // window.location.reload();
    }
  };
  //Give a MetaMask account permission to interact with the app
  const handleOnConnect = async () => {
    await getAccounts();
    provider.on('accountsChanged', handleAccountsChanged);
  };

  return (
    <div className="App">
      <Header />
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">HomeLocked</Link>
              </li>
              <li>
                <Link to="/quiz">Quiz</Link>
              </li>
              <li>
                <Link to="/proposal">Proposal</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
              <li>
                <Link to="/governance">Governance</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path="/quiz">
              <Quiz />
            </Route>
            <Route path="/proposal">
              <Proposal />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/governance">
              <Governance />
            </Route>
            <Route path="/">
              <HomeLocked />
            </Route>
          </Switch>
        </div>
      </Router>
      <br></br>
      <div>
        <button onClick={handleOnConnect}>Connect to MetaMask</button>
      </div>
      <Footer />
    </div>
  );
}

export default App;
