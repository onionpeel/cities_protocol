import { useEffect, useState } from 'react';
import detectEthereumProvider from '@metamask/detect-provider'
import { ethers } from 'ethers';
import ConnectButton from './buttons/ConnectButton';
import ConnectingButton from './buttons/ConnectingButton';
import '../styles/App.css';
import {Navbar, Nav, NavDropdown, Button, Card, ListGroup} from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import NewUser from './NewUser';

function App() {
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
    <Router>
      <div className="App">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">Cities Protocol</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
            <Nav>
              <Nav.Link href="#home">0</Nav.Link>
              <Nav.Link href="#link">0/8</Nav.Link>
              <NavDropdown title="Eng" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Spanish</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <main className="m-4">

        {!isMetamastInstalled
          ?
            <Card className="gray mb-4">
              <Card.Body>
                <div>
                  Are you new here?
                </div>
                <Link to="/newuser">Get started</Link>
              </Card.Body>
            </Card>
          :
            <Card className="gray mb-4">
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
            <Card.Text>
              TARO in wallet
            </Card.Text>
            <Card.Title className="text-large">Locked</Card.Title>
            <Card.Text>
              TARO to harvest
            </Card.Text>
            <Button disabled block>Claim Tokens</Button>
          </Card.Body>
        </Card>
        <Card className="gray mb-4">
          <Card.Body>
            <Card.Text>
              TARO in wallet
            </Card.Text>
            <Card.Title className="text-large">Locked</Card.Title>
            <Card.Text>
              TARO to harvest
            </Card.Text>
            <Button disabled block>Claim Tokens</Button>
          </Card.Body>
        </Card>
        <Card className="gray mb-4">
          <Card.Body>
            <Card.Text>
              Proposals
            </Card.Text>
            <Card.Title className="text-large">Locked</Card.Title>
            <Button disabled block>Vote</Button>
          </Card.Body>
        </Card>
          <ListGroup>
            <ListGroup.Item>Cras justo odio</ListGroup.Item>
            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
            <ListGroup.Item>Morbi leo risus</ListGroup.Item>
            <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
          </ListGroup>
        </main>

        <Switch>
          <Route path="/newuser">
            <NewUser />
          </Route>
          <Route path="/">
            <NewUser />
          </Route>
        </Switch>
      </div>
    </Router>

  );
}

export default App;
