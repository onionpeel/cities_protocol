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
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Congratulations!  You passed the quiz!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            You have earned TARO tokens, and you can start participating in the community by making and voting on proposals.
          </p>
          <p>
            <Link className="alt2" to="/ProposalList">Delegate and make your first proposal</Link>
          </p>
        </Modal.Body>
      </Modal>
      :
      <div className="modal">
      <Modal
        className="orange-modal"
        {...props}
        centered
      >
        <Modal.Header >
          <Modal.Title >
          !Felicidades! pasaste el cuestionario!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Has ganado tokens TARO y ahora puedes participar en la gobernanza de la ciudad al crear o votar propuestas.
          </p>
          <p>
            <Link className="alt2" to="/ProposalList">Delega tokens y crea tu primer propuesta</Link>
          </p>
        </Modal.Body>
      </Modal>
      </div>
    }
    </div>
  );
};

export default QuizSuccessModal;
