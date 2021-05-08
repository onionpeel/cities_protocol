import { useContext, useEffect } from 'react';
import {Link} from "react-router-dom";
import {ListGroup} from 'react-bootstrap';
import { ethers } from 'ethers';
import Proposal from './Proposal';
import { LanguageContext } from '../contexts/LanguageContext';
import { ValidationRequiredContext } from '../contexts/ValidationRequiredContext';
import { GovernorAlphaContext } from '../contexts/GovernorAlphaContext';
import ValidationRequired from '../alerts/ValidationRequired';

import { proposalArray } from '../DELETEBEFOREPRODUCTION/proposalArray.js';

const ProposalList = () => {
  let {isValidated} = useContext(ValidationRequiredContext);
  let {isEnglish} = useContext(LanguageContext);
  let {governorAlpha} = useContext(GovernorAlphaContext);


  useEffect(() => {
    const main = async () => {

      const getActiveProposals = async () => {
        let proposalCount = await governorAlpha.proposalCount();
        proposalCount = proposalCount.toString();

        let activeProposals = [];
        let proposal, currentBlockNumber;
        for(let i = 1; i <= proposalCount; i++) {
          proposal = await governorAlpha.proposals(ethers.BigNumber.from(i));
          currentBlockNumber = await ethers.provider.getBlockNumber();
          console.log('block number: ', currentBlockNumber)
          console.log('proposal:', proposal.endBlock.toNumber());

          if(proposal.endBlock.toNumber() > currentBlockNumber) {
            activeProposals.push(proposal);
          };
        };
        return activeProposals;
      };

      let currentlyActiveProposals = await getActiveProposals();
      console.log(currentlyActiveProposals);

    };
    main();
  }, []);



  const list = proposalArray.map((proposal, i) => (
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
          <ListGroup>
            <ListGroup.Item>Cras justo odio</ListGroup.Item>
            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
            <ListGroup.Item>Morbi leo risus</ListGroup.Item>
            <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
          </ListGroup>
        </main>
      </div>

      :

      <div>
        <div>
          ESP ESP ESP ESP ESP ESP ESP ESP ESP ESP ESP ESP
        </div>
        {isValidated ? "" : <ValidationRequired />}
        <div>
          <Link to="/createproposal">Create a proposal</Link>
        </div>

        <main className="m-4">
          {list}
          <ListGroup>
            <ListGroup.Item>Cras justo odio</ListGroup.Item>
            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
            <ListGroup.Item>Morbi leo risus</ListGroup.Item>
            <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
          </ListGroup>
        </main>
      </div>
    }
    </div>
  );
};

export default ProposalList;
