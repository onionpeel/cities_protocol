//This component is under development and can't be completed without access to smart contracts

import { useContext, useEffect, useState } from 'react';
import { TaroContext } from '../contexts/TaroContext';
import { EthersContext } from '../contexts/EthersContext';
import { LanguageContext } from '../contexts/LanguageContext';
import IsLoadingModal from '../modals/IsLoadingModal';

const GetDelegates = () => {
  let [loadingModalShow, setLoadingModalShow] = useState();
  let [delegates, setDelegates] = useState();

  let {taro} = useContext(TaroContext);
  let {ethersSigner} = useContext(EthersContext);
  let {isEnglish} = useContext(LanguageContext);

  useEffect(() => {
    const main = async () => {
      let delegations = await governorAlpha.queryFilter('DelegateVotesChanged', 0, 'latest');

      const delegateAccounts = {};

      delegations.map(e => {
        const { delegate, newBalance } = e.returnValues;
        delegateAccounts[delegate] = newBalance;
      });

      const _delegates = [];
      Object.keys(delegateAccounts).forEach((account) => {
        const voteWeight = +delegateAccounts[account];
        if (voteWeight === 0) return;
        _delegates.push({
          delegate: account,
          vote_weight: voteWeight
        });
      });

      _delegates.sort((a, b) => {
        return a.vote_weight < b.vote_weight ? 1 : -1;
      });

      _delegates.forEach(d => {
        d.vote_weight = (100 * ((d.vote_weight / 1e18) / 10000000)).toFixed(6) + '%';
      });

      setDelegates(_delegates);
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
          {delegates.map((delegate, i) => (
            <div key={i}>
              {delegate}
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

export default GetDelegates;
