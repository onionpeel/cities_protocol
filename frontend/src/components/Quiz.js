import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Question from './Question';
import { quizQuestions } from '../quizQuestions/quizQuestions';
import { QuizContext } from '../contexts/QuizContext';
import QuizFailureModal from '../modals/QuizFailureModal';
import QuizSuccessModal from '../modals/QuizSuccessModal';
import QuizAlreadySubmittedModal from '../modals/QuizAlreadySubmittedModal';

const Quiz = () => {
  let [userAnswers, setUserAnswers] = useState([]);
  let [checkedAnswers, setCheckedAnswers] = useState([]);
  let [failureModalShow, setFailureModalShow] = useState(false);
  let [successModalShow, setSuccessModalShow] = useState(false);
  let [alreadySubmittedModal, setAlreadSubmittedModal] = useState(false);
  let [hasSubmitted, setHasSubmitted] = useState(false);


  const handleOnSubmitAnswers = () => {
    if(!hasSubmitted) {
      setHasSubmitted(true);
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
      if(checkedAnswers.length === 10) {
        //Make network call to receive 100 tokens
        setSuccessModalShow(true);
        setCheckedAnswers([]);
      } else if(checkedAnswers.length >= 8) {
        console.log('length: ', checkedAnswers.length)
        //Make network call to receive 80 tokens
        setSuccessModalShow(true);
        setCheckedAnswers([]);
      } else if(checkedAnswers.length >= 6) {
        console.log('length: ', checkedAnswers.length)
        setSuccessModalShow(true);
        setCheckedAnswers([]);
        //Make network call to receive 20 tokens
      } else {
        console.log('length: ', checkedAnswers.length)
        setFailureModalShow(true);
        setCheckedAnswers([]);
      };
    } else {
      setAlreadSubmittedModal(true);
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
  };

  const handleOnSuccess = () => {
    setSuccessModalShow(false);
  };

  const handleOnAlreadySubmitted = () => {
    setAlreadSubmittedModal(false);
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
        tokens={checkedAnswers.length}
      />
    <QuizAlreadySubmittedModal
      show={alreadySubmittedModal}
      onHide={handleOnAlreadySubmitted}
    />
    </div>
  );
};

export default Quiz;
