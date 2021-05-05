//This component is under development and can't be completed without access to smart contracts

import { useContext, useEffect, useState } from 'react';
import { GovernorAlphaContext } from '../contexts/GovernorAlphaContext';
import { EthersContext } from '../contexts/EthersContext';
import { LanguageContext } from '../contexts/LanguageContext';
import IsLoadingModal from '../modals/IsLoadingModal';

const GetBallots = () => {
  let [loadingModalShow, setLoadingModalShow] = useState();
  let [formattedBallots, setFormattedBallots] = useState();

  let {governorAlpha} = useContext(GovernorAlphaContext);
  let {ethersSigner} = useContext(EthersContext);
  let {isEnglish} = useContext(LanguageContext);

  useEffect(() => {
    const main = async () => {
      let voteCastEvents = await governorAlpha.queryFilter('VoteCast', 0, 'latest');

      const id = 1;
      let submittedBallots = voteCastEvents;
      let _formattedBallots = [];
      submittedBallots.forEach((ballot) => {
        const { voter, support, votes, proposalId } = ballot.returnValues;
        if (proposalId == id) {
          _formattedBallots.push({
            blockNumber: ballot.blockNumber,
            address: voter,
            support: support ? 'In Favor' : 'Against',
            votes: (parseFloat(votes) / 1e18).toFixed(2),
          });
        }
      });

      _formattedBallots.reverse();
      setFormattedBallots(_formattedBallots);
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
          {formattedBallots.map((ballot, i) => (
            <div key={i}>
              {ballot}
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

export default GetBallots;
