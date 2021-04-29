import { Card } from 'react-bootstrap';

const Leader = ({person}) => {
  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{person}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Some text</Card.Subtitle>
          <Card.Text>
            Stats about {person}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Leader;
