import { useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import { ethers } from 'ethers';
import {Link} from "react-router-dom";
import Question from './Question';
import { englishQuiz } from '../REALQUIZ/englishQuiz';
import { QuizContext } from '../contexts/QuizContext';
import QuizFailureModal from '../modals/QuizFailureModal';
import QuizSuccessModal from '../modals/QuizSuccessModal';
import QuizAlreadySubmittedModal from '../modals/QuizAlreadySubmittedModal';
import IsLoadingModal from '../modals/IsLoadingModal';
import { LanguageContext } from '../contexts/LanguageContext';
import { GovernorAlphaContext } from '../contexts/GovernorAlphaContext';
import { ConnectedContext } from '../contexts/ConnectedContext';

const Quiz = () => {
  let [userAnswers, setUserAnswers] = useState([]);
  let [checkedAnswers, setCheckedAnswers] = useState([]);
  let [failureModalShow, setFailureModalShow] = useState(false);
  let [successModalShow, setSuccessModalShow] = useState(false);
  let [loadingModalShow, setLoadingModalShow] = useState();
  let [alreadySubmittedModal, setAlreadSubmittedModal] = useState(false);
  let [hasSubmitted, setHasSubmitted] = useState(false);

  let {isEnglish} = useContext(LanguageContext);
  let {governorAlpha} = useContext(GovernorAlphaContext);
  let {isConnected} = useContext(ConnectedContext);

  const handleOnSubmitAnswers = async e => {
    e.preventDefault();
    let quizQuestions
    if(isEnglish) {
      quizQuestions = englishQuiz;
    };
    if(!hasSubmitted) {
      setHasSubmitted(true);
      console.log(userAnswers);
      console.log(quizQuestions);
      for (let i = 0; i < quizQuestions.length; i++) {
        for (let j = 0; j < userAnswers.length; j++) {
          if (quizQuestions[i].correctAnswer.toString().toLowerCase().trim() === userAnswers[j].toString().toLowerCase().trim()) {
            setCheckedAnswers(checkedAnswers.push(quizQuestions[i].correctAnswer));
          };
        };
      };
      console.log(checkedAnswers);

      //Delay function is only for development
      // const delay = () => new Promise(res => setTimeout(res, 2000));

      if(checkedAnswers.length === 10) {
        // setLoadingModalShow(true);
        //Make network call to receive 100 tokens
        let submitAnswers = await governorAlpha.validate(ethers.BigNumber.from('100'));
        let submitAnswersReceipt = await submitAnswers.wait(1);
        console.log(submitAnswersReceipt);
        // handleOnLoadingModal();

        // console.log('length: ', checkedAnswers.length);
        // setSuccessModalShow(true);
        // setCheckedAnswers([]);
      } else if(checkedAnswers.length >= 8) {
        let submitAnswers = await governorAlpha.validate(ethers.BigNumber.from('80'));
        let submitAnswersReceipt = await submitAnswers.wait(1);
        console.log(submitAnswersReceipt);
        // setLoadingModalShow(true);
        // //Make network call to receive 80 tokens
        // handleOnLoadingModal();
        //
        // console.log('length: ', checkedAnswers.length);
        // setSuccessModalShow(true);
        // setCheckedAnswers([]);
      } else if(checkedAnswers.length >= 6) {
        let submitAnswers = await governorAlpha.validate(ethers.BigNumber.from('20'));
        let submitAnswersReceipt = await submitAnswers.wait(1);
        console.log(submitAnswersReceipt);
        // setLoadingModalShow(true);
        // //Make network call to receive 20 tokens
        // handleOnLoadingModal();
        //
        // console.log('length: ', checkedAnswers.length)
        // setSuccessModalShow(true);
        // setCheckedAnswers([]);
      } else {
        // setLoadingModalShow(true);
        // handleOnLoadingModal();
        //
        // console.log('length: ', checkedAnswers.length)
        // setFailureModalShow(true);
        // setCheckedAnswers([]);
      };
    } else {
      setAlreadSubmittedModal(true);
    };
  };

  const englishQuestions = englishQuiz.map((q, i) => (
    <Question
      key={q.question.toString()}
      question={q.question}
      answers={q.answers}
      number={q.number}
    />
  ))

  const spanishQuestions = englishQuiz.map((q, i) => (
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

  const handleOnLoadingModal = () => {
    setLoadingModalShow(false);
  };

  return (
    <div>
      {isEnglish

      ?

      <div>
        {isConnected

        ?

        <div>
          <QuizContext.Provider value={{userAnswers, setUserAnswers}}>
            <div>
              {englishQuestions}
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
          <QuizAlreadySubmittedModal
            show={alreadySubmittedModal}
            onHide={handleOnAlreadySubmitted}
          />
          <IsLoadingModal
            show={loadingModalShow}
            onHide={handleOnLoadingModal}
          />
        </div>

        :

        <div>
          <div>
            To take the quiz and start earning Taro, you first need to get connected to the Ethereum network
          </div>
          <Link to="/">Return home and click on "Connect Wallet to Unlock"</Link>
        </div>
        }
      </div>

      :

      <div>
        {isConnected

        ?

        <div>
          <div>
            ESP ESP ESP
          </div>
          <QuizContext.Provider value={{userAnswers, setUserAnswers}}>
            <div>
              {englishQuestions}
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
          <QuizAlreadySubmittedModal
            show={alreadySubmittedModal}
            onHide={handleOnAlreadySubmitted}
          />
          <IsLoadingModal
            show={loadingModalShow}
            onHide={handleOnLoadingModal}
          />
        </div>

        :

        <div>
          <div>
            ESP ESP ESP ESP
          </div>
          <div>
            To take the quiz and start earning Taro, you first need to get connected to the Ethereum network
          </div>
          <Link to="/">Return home and click on "Connect Wallet to Unlock"</Link>
        </div>
        }
      </div>
    }
    </div>
  );
};

export default Quiz;
