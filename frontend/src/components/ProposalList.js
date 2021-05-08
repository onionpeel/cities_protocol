import { useContext, useEffect, useState } from 'react';
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
  let [retrievedProposals, setRetrievedProposals] = useState([]);

  let {isValidated} = useContext(ValidationRequiredContext);
  let {isEnglish} = useContext(LanguageContext);
  let {governorAlpha} = useContext(GovernorAlphaContext);

  useEffect(() => {
    const main = async () => {

      const getActiveProposals = async () => {
        if(governorAlpha) {
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
        } else {
          return null;
        };
      };

      let currentlyActiveProposals = await getActiveProposals();
      if(currentlyActiveProposals !== null) {
        setRetrievedProposals(currentlyActiveProposals);
        console.log(currentlyActiveProposals);
      };
    };
    main();
  }, []);



  const list = retrievedProposals.map((proposal, i) => (
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

        <div>
          {!retrievedProposals

          ?

          {list}

          :

          <div>
            <div>
              <Link to="/">Please return to the home page</Link>
            </div>
            <div>
              *****There is a glitch right now.  If there are zero proposals or if someone refreshes this page, it will not show any proposals.  They can only see proposals if they come from the home page.  That is why this link is here--it is displayed to keep the whole page from breaking
            </div>
          </div>
          }
        </div>

        <ListGroup>
          <ListGroup.Item>Cras justo odio</ListGroup.Item>
          <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
          <ListGroup.Item>Morbi leo risus</ListGroup.Item>
          <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
          <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
        </ListGroup>
      </div>

      :

      <div>
        <div>
          ESP ESP ESP ESP
        </div>
        {isValidated ? "" : <ValidationRequired />}
        <div>
          <Link to="/createproposal">Create a proposal</Link>
        </div>

        <div>
          {!retrievedProposals

          ?

          {list}

          :

          <div>
            <div>
              <Link to="/">Please return to the home page</Link>
            </div>
            <div>
              *****There is a glitch right now.  If there are zero proposals or if someone refreshes this page, it will not show any proposals.  They can only see proposals if they come from the home page.  That is why this link is here--it is displayed to keep the whole page from breaking
            </div>
          </div>
          }
        </div>

        <ListGroup>
          <ListGroup.Item>Cras justo odio</ListGroup.Item>
          <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
          <ListGroup.Item>Morbi leo risus</ListGroup.Item>
          <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
          <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
        </ListGroup>
      </div>
    }
    </div>
  );
};

export default ProposalList;
