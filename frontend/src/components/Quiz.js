import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Question from './Question';
import { quizQuestions } from '../quizQuestions/quizQuestions';
import { QuizContext } from '../contexts/QuizContext';
import QuizFailureModal from '../modals/QuizFailureModal';
import QuizSuccessModal from '../modals/QuizSuccessModal';

const Quiz = () => {
let [userAnswers, setUserAnswers] = useState([]);
let [checkedAnswers, setCheckedAnswers] = useState([]);
let [failureModalShow, setFailureModalShow] = useState(false);
let [successModalShow, setSuccessModalShow] = useState(false);

const handleOnSubmitAnswers = () => {
  console.log(userAnswers);
  console.log(quizQuestions);
  for (let i = 0; i < quizQuestions.length; i++) {
    for (let j = 0; j < userAnswers.length; j++) {
      if (quizQuestions[i].correctAnswer == userAnswers[j]) {
        setCheckedAnswers(checkedAnswers.push(quizQuestions[i].correctAnswer));
      };
    };
  };
  console.log(checkedAnswers);

  //Update the threshold number for production
  if(checkedAnswers.length >= 2) {
    console.log('length: ', checkedAnswers.length)
    setCheckedAnswers([]);
    //Make network call
    setSuccessModalShow(true);
  } else {
    console.log('length: ', checkedAnswers.length)

    setCheckedAnswers([]);
    setFailureModalShow(true);
  };
};

const questions = quizQuestions.map((q, i) => (
  <Question
    key={q.question.toString()}
    question={q.question}
    answers={q.answers}
    number={q.number}
  />
))

const handleOnFailure = () => {
  setFailureModalShow(false);
  window.location.reload();
};

const handleOnSuccess = () => {
  setSuccessModalShow(false);
};

  return (
    <div>
      <QuizContext.Provider value={{userAnswers, setUserAnswers}}>
        <div>
          {questions}
        </div>
      </QuizContext.Provider>
      <Button onClick={handleOnSubmitAnswers}>Submit your answers</Button>
      <QuizFailureModal
        show={failureModalShow}
        onHide={handleOnFailure}
      />
      <QuizSuccessModal
        show={successModalShow}
        onHide={handleOnSuccess}
      />
    </div>
  );
};

export default Quiz;
