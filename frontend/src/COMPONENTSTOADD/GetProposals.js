//This componet is under development.  It should replace ProposalList when it is finished and can connect with the smart contract.
// Component borrows from https://github.com/compound-developers/compound-governance-examples/blob/master/web3-examples/get_proposals.html

import { useContext, useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import {ListGroup} from 'react-bootstrap';
import Proposal from './Proposal';
import { LanguageContext } from '../contexts/LanguageContext';
import { GovernorAlphaContext } from '../contexts/GovernorAlphaContext';
import { ValidationRequiredContext } from '../contexts/ValidationRequiredContext';
import ValidationRequired from '../alerts/ValidationRequired';

import { proposalArray } from '../DELETEBEFOREPRODUCTION/proposalArray.js';

const GetProposals = () => {
  let [proposalList, setProposalList] = useState(null);

  let {isValidated} = useContext(ValidationRequiredContext);
  let {isEnglish} = useContext(LanguageContext);
  let {governorAlpha} = useContext(GovernorAlphaContext);

  useEffect(() => {
    const main = async () => {
      const proposalCount = await governorAlpha.proposalCount();
      const proposalGets = [];
      const proposalStateGets[];
      for (const i of Array.from(Array(parseInt(proposalCount)),(n,i) => i+1)) {
        proposalGets.push(await governorAlpha.proposals(i));
        proposalStateGets.push(await governorAlpha.state(i));
      };

      const proposals = await Promise.all(proposalGets);
      const proposalStates = await Promise.all(proposalStateGets);
      //This query might need to be changed.  One problem is that ethers.js has a limit of 10000 events, which could eventually be a problem if all events must be retrieved before being filtered locally since the query would include all past events that are no longer active.
      const proposalCreatedEvents = await governorAlpha.queryFilter('ProposalCreated', 0, 'latest')

      proposals.reverse();
      proposalStates.reverse();
      proposalCreatedEvents.reverse();

      const enumerateProposalState = (state) => {
        const proposalStates = ['Pending', 'Active', 'Canceled', 'Defeated', 'Succeeded', 'Queued', 'Expired', 'Executed'];
        return proposalStates[state];
      };

      //Will this work?  It is taken directly from the Compound github, so it probably needs to be modified
      let _proposalList = proposal.map((p, i) => {
        const { description } = proposalCreatedEvents[i].returnValues;
        p.title = description.split(/# |\n/g)[1] || 'Untitled';
        p.description = description.split(/# |\n/g)[2] || 'No description.';
        p.state = enumerateProposalState(proposalStates[i]);
        p.for_votes = (parseFloat(p.forVotes) / 1e18).toFixed(2);
        p.against_votes = (parseFloat(p.againstVotes) / 1e18).toFixed(2);
      });
      setProposalList(_proposalList);
    };
    main();
  }, []);

  //This needs to be re-worked so that it handles the data that is received from the smart contract
  const list = proposalList.map((proposal, i) => (
    <div key={i}>
      <Proposal
        title={proposal.title}
        typeOfAction={proposal.typeOfAction}
        neighborhood={proposal.neighborhood}
        personInCharge={proposal.personInCharge}
        description={proposal.description}
        expiration={proposal.expiration}
        budget={proposal.budget}
        taroToVote={proposal.taroToVote}
      />
    </div>
  ));

  return (
    <div>
      {isEnglish

      ?

      <div>
        {isValidated ? "" : <ValidationRequired />}
        <div>
          <Link to="/createproposal">Create a proposal</Link>
        </div>

        <main className="m-4">
          {list}
        </main>
      </div>

      :

      <div>
        Spanish version here
      </div>
    }
    </div>
  );
};

export default GetProposals;
