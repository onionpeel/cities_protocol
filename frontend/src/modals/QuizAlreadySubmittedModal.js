import { useContext } from 'react';
import { Modal } from 'react-bootstrap';
import {Link} from "react-router-dom";
import { LanguageContext } from '../contexts/LanguageContext';

const QuizAlreadySubmittedModal = (props) => {
  let [isEnglish] = useContext(LanguageContext);

  return (
    <div>
    {isEnglish === 'english' ?

      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="modal-2"
      >

<div className="big-icon">🚫<div className="modalheader">
You have already submitted your quiz</div>
      </div>

        <Modal.Body>
          <p>
            Now you can create and vote on proposals on the urban governance page<Link className="alt2" to="/proposalList">🗳️ See proposals</Link>
          </p>
        </Modal.Body>
      </Modal>
      :
      <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="modal-2"
    >

<div className="big-icon">🚫<div className="modalheader">
Ya has respondido el cuestionario</div>
    </div>

      <Modal.Body>
        <p>
         Ahora puedes crear y votar propuestas en la gobernanza urbana<Link className="alt2" to="/proposalList">🗳️ Ver propuestas</Link>
        </p>
      </Modal.Body>
    </Modal>
    }
    </div>
  );
};

export default QuizAlreadySubmittedModal;
