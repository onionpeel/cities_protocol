import {Link} from "react-router-dom";
import {Button, Card, ListGroup} from 'react-bootstrap';

const ProposalList = () => {
  return (
    <div>
      <div>
        <Link to="/createproposal">Create a proposal</Link>
      </div>
      <div>
        This will be a list of proposals
      </div>

      <main className="m-4">
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
    </div>
  );
};

export default ProposalList;
