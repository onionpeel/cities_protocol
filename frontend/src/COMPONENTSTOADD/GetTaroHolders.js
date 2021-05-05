//This component can be used to populate the leaderbaord.  The problem with it is that it can only retrieve the last 10000 events, so it is not a good solution.  The better approach is to have a block tracker store data in a database and then query the database for leaderboard info.
//This component is under development and can't be completed without access to smart contracts

import { useContext, useEffect, useState } from 'react';
import { TaroContext } from '../contexts/TaroContext';
import { EthersContext } from '../contexts/EthersContext';
import { LanguageContext } from '../contexts/LanguageContext';
import IsLoadingModal from '../modals/IsLoadingModal';

const GetTaroHolders = () => {
  let [loadingModalShow, setLoadingModalShow] = useState();
  let [holders, setHolders] = useState();

  let {taro} = useContext(TaroContext);
  let {ethersSigner} = useContext(EthersContext);
  let {isEnglish} = useContext(LanguageContext);

  useEffect(() => {
    const main = async () => {
      let transfers = await governorAlpha.queryFilter('Transfer', 0, 'latest');

      const pastHolders = [];
      const pastHolderBalanceGets = [];
      const delegateGets = [];

      //The rest of this useEffect is borrowed almost directly from Compound github, so it may not fit here
      transfers = transfers.map((transfer, i) => {
        const address = transfer.returnValues.to;

        if (pastHolders.indexOf(address) > -1) return;

        pastHolders.push(address);
        pastHolderBalanceGets.push(comp.methods.balanceOf(address).call());
        delegateGets.push(comp.methods.delegates(address).call());
      });

      let balances = await Promise.all(pastHolderBalanceGets);
      const delegates = await Promise.all(delegateGets);
      const _holders = [];

      balances = balances.forEach((balance, i) => {
        if (balance > 0) {
          _holders.push({
            address: pastHolders[i],
            balance: parseFloat(balance / 1e18).toFixed(4),
            delegate: delegates[i] == 0 ? 'None' : delegates[i]
          });
        }
      });

      _holders.sort((a,b) => {
        return parseFloat(a.balance) < parseFloat(b.balance) ? 1 : -1;
      });

      setHolders(_holders);
    };
    main();
  }, []);


  const handleOnLoadingModal = () => {
    setLoadingModalShow(false);
  };

  return (
    <div>
      {isEnglish

      ?

      <div>
        <div>
          {holders.map((holder, i) => (
            <div key={i}>
              {holder}
            </div>
          ))}
        </div>
        <IsLoadingModal
          show={loadingModalShow}
          onHide={handleOnLoadingModal}
        />
      </div>

      :

      <div>
        Spanish version goes here
      </div>
      }
    </div>
  );
};

export default GetTaroHolders;
