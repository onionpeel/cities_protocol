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
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
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
            <Link className="alt" to="/ProposalList">Delegate and make your first proposal</Link> to start earning more TARO tokens!
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
          !Felicidades! pasaste el cuestionario!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Has ganado tokens TARO y ahora puedes participar en la gobernanza de la ciudad al crear o votar propuestas.
          </p>
          <p>
            <Link className="alt" to="/ProposalList">Delega tokens y crea tu primer propuesta</Link> para empezar a ganar más TARO
          </p>
        </Modal.Body>
      </Modal>
    }
    </div>
  );
};

export default QuizSuccessModal;
