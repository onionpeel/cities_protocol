import {Link} from "react-router-dom";
import {ListGroup} from 'react-bootstrap';
import Proposal from './Proposal';
import { proposalArray } from '../DELETEBEFOREPRODUCTION/proposalArray.js';

const ProposalList = () => {
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
  );
};

export default ProposalList;
