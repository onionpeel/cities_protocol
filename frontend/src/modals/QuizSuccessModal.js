import { useContext } from 'react';
import { Modal } from 'react-bootstrap';
import {Link} from "react-router-dom";
import { LanguageContext } from '../contexts/LanguageContext';

const QuizSuccessModal = (props) => {
  let [isEnglish] = useContext(LanguageContext);

  return (
    <div>
      {isEnglish === 'english' ?

      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="big-icon">🎉<div className="modalheader">
        Congratulations! You passed the quiz!</div>
            </div>
            <p className="main">You have earned TARO tokens, and you can start participating in the community by making and voting on proposals.</p>
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Link className="alt2" to="/ProposalList">🗳️ Create or vote on proposals</Link>
        </Modal.Body>
      </Modal>
      :


      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="big-icon">🎉<div className="modalheader">
        !Felicidades! pasaste el cuestionario!</div>
            </div>
            <p className="main">Has ganado tokens TARO y ahora puedes participar en la gobernanza de la ciudad al crear o votar propuestas.</p>
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Link className="alt2" to="/ProposalList">🗳️ Crea o vota propuestas</Link>
        </Modal.Body>
      </Modal>
    }
    </div>
  );
};

export default QuizSuccessModal;
