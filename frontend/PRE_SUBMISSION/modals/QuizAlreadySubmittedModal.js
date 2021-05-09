import { useContext } from 'react';
import { Modal } from 'react-bootstrap';
import {Link} from "react-router-dom";
import { LanguageContext } from '../contexts/LanguageContext';

const QuizAlreadySubmittedModal = (props) => {
  let {isEnglish} = useContext(LanguageContext);

  return (
    <div>
    {isEnglish

      ?

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
            Learn more about <Link to="/home">TARO</Link> tokens
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
          ESP ESP ESP ESP ESP ESP ESP ESP ESP ESP ESP ESP

            You have already submitted your quiz
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Learn more about <Link to="/home">TARO</Link> tokens
          </p>
        </Modal.Body>
      </Modal>
    }
    </div>
  );
};

export default QuizAlreadySubmittedModal;
