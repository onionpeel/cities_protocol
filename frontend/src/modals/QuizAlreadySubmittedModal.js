import { useContext } from 'react';
import { Modal } from 'react-bootstrap';
import {Link} from "react-router-dom";
import { LanguageContext } from '../contexts/LanguageContext';

const QuizAlreadySubmittedModal = (props) => {
  let {isEnglish} = useContext(LanguageContext);

  return (
    <div>
    {isEnglish?

      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            You have already submitted your quiz
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Learn more about <Link to="/about">TARO</Link> tokens
          </p>
        </Modal.Body>
      </Modal>
      :
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
          Ya has enviado tus respuestas 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Conoce más sobre <Link to="/about">TARO</Link> 
          </p>
        </Modal.Body>
      </Modal>
    }
    </div>
  );
};

export default QuizAlreadySubmittedModal;