import React from "react";
import ReactDOM from "react-dom";
import Web3 from "web3";
import "./styles.css";

let web3 = "";
let endpoint = "https://dev-testnet-v1-1.skalelabs.com";
let chainId = "0x54173";

/**
 * MetaMask Documentation: https://docs.metamask.io/guide/rpc-api.html#other-rpc-methods
 *
 * For more information on how to
 * form the encrypted message please see:
 * https://eips.ethereum.org/EIPS/eip-3085
 */
let switchToSKALE = {
  chainId: chainId,
  chainName: "SKALE Network Testnet",
  rpcUrls: [endpoint],
  nativeCurrency: {
    name: "SKALE ETH",
    symbol: "skETH",
    decimals: 18
  },
  blockExplorerUrls: [
    "https://expedition.dev/?network=SKALE&rpcUrl=" + endpoint
  ]
};

async function getWeb3() {
  web3 = window.web3;

  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    try {
      // Request account access if needed
      await window.ethereum.enable();
      console.log("MetaMask - Web 3 Initialized!");

      //Get user wallet accounts
      window.web3.eth.getAccounts((error, accounts) => {
        if (error) {
          console.error(error);
        }
        console.log(accounts);

        //request change to SKALE Network
        window.ethereum
          .request({
            method: "wallet_addEthereumChain",
            params: [switchToSKALE, accounts[0]]
          })
          .catch((error) => console.log(error.message));
      });
    } catch (error) {
      // User denied account access...
    }
  }
  // Legacy dapp browsers...
  else if (window.web3) {
    window.web3 = new Web3(web3.currentProvider);
    console.log("MetaMask - Web 3 Initialized!");
  }
  // Non-dapp browsers...
  else {
    console.log(
      "Non-Ethereum browser detected. You should consider trying MetaMask!"
    );
  }
}

function App() {
  return (
    <div className="App">
      <h1>SKALE - MetaMask</h1>
      <br />
      <button onClick={getWeb3}>Switch MetaMask to SKALE</button>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);


https://expedition.dev/?network=SKALE&rpcUrl=https://dev-testnet-v1-1.skalelabs.com                      skETH                           344435                   https://dev-testnet-v1-1.skalelabs.com                    SKALE Network Testnet
