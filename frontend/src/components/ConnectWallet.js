import { useEffect, useState } from 'react';
import detectEthereumProvider from '@metamask/detect-provider'
import { ethers } from 'ethers';

const ConnectWallet = () => {
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

        let metamaskAccount;
        let accounts = await _ethereumProvider.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            metamaskAccount = accounts[0];
            setCurrentMetaMaskAccount(accounts[0]);
          };
        console.log(`metamaskAccount ${metamaskAccount}`);

        let _ethersProvider = await new ethers.providers.Web3Provider(_ethereumProvider);
        setEthersProvider(_ethersProvider);
      };
    };
    init();
  }, []);

    return (
      <div>
        ConnectWallet
      </div>
    );
};

export default ConnectWallet;
