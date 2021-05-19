import { useState, useContext, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';
import {Link} from "react-router-dom";
import Question from './Question';
import { englishQuiz } from '../REALQUIZ/englishQuiz';
import { spanishQuiz } from '../REALQUIZ/spanishQuiz';
import { QuizContext } from '../contexts/QuizContext';
import QuizFailureModal from '../modals/QuizFailureModal';
import QuizSuccessModal from '../modals/QuizSuccessModal';
import QuizAlreadySubmittedModal from '../modals/QuizAlreadySubmittedModal';
import IsLoadingModal from '../modals/IsLoadingModal';
import { LanguageContext } from '../contexts/LanguageContext';
import { GovernorAlphaContext } from '../contexts/GovernorAlphaContext';
import { EthersContext } from '../contexts/EthersContext';
import { TaroContext } from '../contexts/TaroContext';

import Taro from '../contracts/contracts/Taro.sol/Taro.json';
import taroAddress from '../contracts/contracts/Taro/contract-address.json';

import GovernorAlpha from '../contracts/contracts/GovernorAlpha.sol/GovernorAlpha.json';
import governorAlphaAddress from '../contracts/contracts/GovernorAlpha/contract-address.json';

const Quiz = () => {
  let [userAnswers, setUserAnswers] = useState([]);
  let [checkedAnswers, setCheckedAnswers] = useState([]);
  let [failureModalShow, setFailureModalShow] = useState(false);
  let [successModalShow, setSuccessModalShow] = useState(false);
  let [loadingModalShow, setLoadingModalShow] = useState();
  let [alreadySubmittedModal, setAlreadSubmittedModal] = useState(false);
  let [hasSubmitted, setHasSubmitted] = useState(false);
  let [signerAddress, setSignerAddress] = useState();
  let [ethersProvider, setEthersProvider] = useState();
  let [isConnected, setIsConnected] = useState();


  let [isEnglish] = useContext(LanguageContext);
  let {governorAlpha, setGovernorAlpha} = useContext(GovernorAlphaContext);
  let {taro, setTaro} = useContext(TaroContext);
  let {ethersSigner, setEthersSigner, provider, setProvider} = useContext(EthersContext);

  useEffect(() => {
    const main = async () => {
      // setIsMetamaskInstalled(true);
      setIsConnected(false);
      try {
        //detect whether the browser is connected to a provider
        let ethereumProvider = await detectEthereumProvider();
        if (ethereumProvider) {
          // setProvider(ethereumProvider);
          startApp(ethereumProvider);
        } else {
          // setIsMetamaskInstalled(false);
          return;
        };
      } catch (error) {
        console.error(error);
      };

      async function startApp(_ethereumProvider) {
        try {
          //The provider detected by detectEthereumProvider() must be the same as window.ethereum
          if (_ethereumProvider !== window.ethereum) {
            // setIsMetamaskInstalled(false);
            return;
          };

          //Check if a MetaMask account has permission to connect to app
          let metamaskAccount;
          let accounts = await _ethereumProvider.request({ method: 'eth_accounts' });
            if (accounts.length > 0) {
              metamaskAccount = accounts[0];
              // setCurrentMetaMaskAccount(accounts[0]);
              // setIsMetamaskInstalled(true);
              setIsConnected(true);
            };
          console.log(`metamaskAccount ${metamaskAccount}`);

          //Force the browser to refresh whenever the network chain is changed
          // let chainId = await _ethereumProvider.request({ method: 'eth_chainId' });
          // _ethereumProvider.on('chainChanged', handleChainChanged);
          // console.log('chainId: ', chainId);

          //Create the Ethers.js provider and set it in state
          let _ethersProvider = await new ethers.providers.Web3Provider(_ethereumProvider);
          setEthersProvider(_ethersProvider);
          console.log('_ethersProvider: ', _ethersProvider)
          // make call to contract to check if current user is validated.
          // this may need to be done inside handleOnConnect as well
          // if user is validated, then set isValidated(true)

          if(accounts.length !== 0) {
            let signer = await _ethersProvider.getSigner();
            setEthersSigner(signer);

            const _taro = new ethers.Contract(
              taroAddress.Taro,
              Taro.abi,
              signer
            );
            setTaro(_taro);

            let _signerAddress = await signer.getAddress();
            // console.log("signerAddress: ", _signerAddress);
            setSignerAddress(_signerAddress);

            // let _userBalance = await _taro.balanceOf(signerAddress);
            // console.log('_userBalance in useEffect: ', _userBalance.toString());
            // if(_userBalance) {
            //   setUserBalance(_userBalance.toString());
            // };

            const _governorAlpha = new ethers.Contract(
              governorAlphaAddress.GovernorAlpha,
              GovernorAlpha.abi,
              signer
            );
            setGovernorAlpha(_governorAlpha);
          };
        } catch (error) {
          console.error(error);
        };
      };
    };
    main();
  }, []);


  const handleOnSubmitAnswers = async e => {
    e.preventDefault();
    let quizQuestions;
    let _checkedAnswers = [];
    if(isEnglish) {
      quizQuestions = englishQuiz;
    } else {
      quizQuestions = spanishQuiz;
    };
    if(!hasSubmitted) {
      setHasSubmitted(true);
      console.log("userAnswers: ", userAnswers);
      console.log('quizQuestions: ', quizQuestions);
      for (let i = 0; i < quizQuestions.length; i++) {
        for (let j = 0; j < userAnswers.length; j++) {
          if (quizQuestions[i].correctAnswer.toString().toLowerCase().trim() === userAnswers[j].toString().toLowerCase().trim()) {
            _checkedAnswers.push(quizQuestions[i].correctAnswer);
          };
        };
      };
      console.log('_checkedAnswers: ', _checkedAnswers);
      //Delay function is only for development
      // const delay = () => new Promise(res => setTimeout(res, 2000));

      if(_checkedAnswers.length === 10) {
        setLoadingModalShow(true);
        //Make network call to receive 100 tokens
        let submitAnswers = await governorAlpha.validate(ethers.BigNumber.from('100'));
        let submitAnswersReceipt = await submitAnswers.wait(1);
        console.log('submitAnswersReceipt: ', submitAnswersReceipt);
        handleOnLoadingModal();

        let signerAddress = await ethersSigner.getAddress();
        console.log("signerAddress in Quiz: ", signerAddress);

        let _userBalance = await taro.balanceOf(signerAddress);
        console.log('_userBalance in Quiz: ', _userBalance.toString());


        // console.log('length: ', checkedAnswers.length);
        setSuccessModalShow(true);
        setCheckedAnswers([]);
      } else if(_checkedAnswers.length >= 8) {
        setLoadingModalShow(true);
        let submitAnswers = await governorAlpha.validate(ethers.BigNumber.from('80'));
        let submitAnswersReceipt = await submitAnswers.wait(1);
        console.log(submitAnswersReceipt);
        handleOnLoadingModal();
        //
        // console.log('length: ', checkedAnswers.length);
        setSuccessModalShow(true);
        setCheckedAnswers([]);
      } else if(_checkedAnswers.length >= 6) {
        setLoadingModalShow(true);
        let submitAnswers = await governorAlpha.validate(ethers.BigNumber.from('20'));
        let submitAnswersReceipt = await submitAnswers.wait(1);
        console.log(submitAnswersReceipt);
        handleOnLoadingModal();
        //
        // console.log('length: ', checkedAnswers.length)
        setSuccessModalShow(true);
        setCheckedAnswers([]);
      } else {
        setLoadingModalShow(true);
        handleOnLoadingModal();
        //
        console.log('length: ', _checkedAnswers.length)
        setFailureModalShow(true);
        setCheckedAnswers([]);
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

  const spanishQuestions = spanishQuiz.map((q, i) => (
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
    <div className="App">
      {isEnglish === 'english' ?
        <div className="app">
        {isConnected ?
            <div className="gray2">
            <div>
              <div className="main">
              <div className="text-large"> Validate your account</div>
              <div className="big-icon">✔️</div>
              <div>
              <p> VoTARO focuses on the governance of the city of Querétaro, so you must <span className = "yellow"> validate that you are a citizen of Queréaro to be able to create proposals or vote using the governance module. </span> </p>
                <p> To validate your account, it is necessary to pass this Quiz. After you pass it the contract will validate your address and you will receive <span className = "orange3"> 20 to 100 TARO </span>, depending on the number of correct answers. </ p>
              </div>
                <QuizContext.Provider  value={{userAnswers, setUserAnswers}}>
                {englishQuestions}
                </QuizContext.Provider>

                <div className="floating">
                      <Button className="alt" onClick={handleOnSubmitAnswers}> ✔️ Verify answers</Button>
                    </div>
                </div>

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
            </div>

          :

          <div className="valert">
            <div className="main">
              <div className="big-icon">⚠️</div>
              <div className="white">To take the quiz and start earning TARO, you first need to get connected to the Ethereum network</div>
              <Link className="alt2" to="/">Return home and click on "Connect Wallet to Unlock"</Link>
            </div>
          </div>
          }
        </div>

        :
        <div className="app">
          {isConnected ?
              <div className="gray2">
                <div>
                  <div className="main">
                  <div className="text-large"> Valida tu cuenta</div>
                  <div className="big-icon">✔️</div>
                  <div>
                    <p>VoTARO se enfoca en la gobernanza de la ciudad de Querétaro, por lo que deberas<span className="yellow"> validar que eres ciudadan@ de Queréaro. para poder crear propuestas o votar el módulo de gobernanza.</span></p>
                    <p>Para validar tu cuenta, es necesario contestar este cuestionario Al contestarlo coorrectamente el contrato validará tu dirección y recibiras de <span className="orange3">20 a 100 TARO</span>, dependiendo de las respuestas correctas.</p>
                  </div>
                    <QuizContext.Provider  value={{userAnswers, setUserAnswers}}>
                    {spanishQuestions}
                    </QuizContext.Provider>

                    <div className="floating">
                      <Button className="alt" onClick={handleOnSubmitAnswers}> ✔️ Verificar respuestas</Button>
                    </div>
                  </div>


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
              </div>
              :
              <div className="valert">
            <div className="main">
              <div className="big-icon">⚠️</div>
              <div className="white">Necesitas conectarte con una wallet de Metamask a la red de Ethereum para poder contestar el cuestionario</div>
              <Link className="alt2" to="/">Regresa al inicio para conectar Wallet</Link>
            </div>
          </div>
          }
        </div>
      }
    </div>
  );
};

export default Quiz;
