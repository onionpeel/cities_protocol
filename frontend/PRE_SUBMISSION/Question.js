import { useContext } from 'react';
import { Card } from 'react-bootstrap';
import { QuizContext } from '../contexts/QuizContext';
import { LanguageContext } from '../contexts/LanguageContext';

const Question = ({question, answers, number}) => {
  let { userAnswers, setUserAnswers } = useContext(QuizContext);
  let {isEnglish} = useContext(LanguageContext);

  const handleOnAnswer = e => {
    userAnswers.push(e.target.value);
    setUserAnswers(userAnswers);
  };

  const answer = answers.map((a, i) => (
    <div key={i}>
      <input
        type='radio'
        id={a}
        value={a}
        name={number}
        onClick={handleOnAnswer}
      />
    <label htmlFor={a}>{a}</label>
    </div>
))

  return (
    <div>
      {isEnglish

      ?

      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{question}</Card.Title>
          {answer}
        </Card.Body>
      </Card>

      :

      <Card style={{ width: '18rem' }}>
        <Card.Body>
          ESP ESP ESP ESP ESP ESP ESP ESP ESP ESP ESP ESP
          <Card.Title>{question}</Card.Title>
          {answer}
        </Card.Body>
      </Card>
    }
    </div>

  );
};

export default Question;
