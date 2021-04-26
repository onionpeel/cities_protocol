import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import Question from './Question';

const Quiz = () => {

let [a1, setA1] = useState();

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the bulk of
          the card's content.
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Quiz;
