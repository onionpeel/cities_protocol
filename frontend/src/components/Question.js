import { Card } from 'react-bootstrap';

const Question = ({question, answers}) => {
  const answer = answers.map((a, i) => (
    <div key={i}>
      <input
        type='radio'
        id={a}
        value={a}
        name="answer"
      />
    <label htmlFor={a}>{a}</label>
    </div>
))

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{question}</Card.Title>
        {answer}
      </Card.Body>
    </Card>
  );
};

export default Question;
