import { useState, useEffect } from 'react';
import Question from './Question';
import { quizQuestions } from '../quizQuestions/quizQuestions';

const Quiz = () => {
let [correctAnswers, setCorrectAnswers] = useState();

const questions = quizQuestions.map((q, i) => (
  <Question
    key={q.question.toString()}
    question={q.question}
    answers={q.answers}
  />
))

  return (
    <div>
      {questions}
    </div>

  );
};

export default Quiz;
