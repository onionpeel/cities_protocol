import { useContext } from 'react';
import { Modal } from 'react-bootstrap';
import {Link} from "react-router-dom";
import { LanguageContext } from '../contexts/LanguageContext';

const QuizFailureModal = (props) => {
  let [isEnglish] = useContext(LanguageContext);

  return (
    <div>
      {isEnglish === 'english' ?

      <div className="modal">
        <Modal
          {...props}
          centered
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              You didn't pass the quiz
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Please learn more about Queretaro and take the quiz again.
            </p>
            <Link className="alt2" to="/home">TARO</Link>
          </Modal.Body>
        </Modal>
      </div>

      :

      <div className="modal">
        <Modal
          {...props}
          centered
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              No pasaste el cuestionario
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Aprende más sobre Querétaro e intentalo de nuevo
            </p>
            <Link className="alt2" to="/home">TARO</Link>
          </Modal.Body>
        </Modal>
      </div>
    }
    </div>
  );
};

export default QuizFailureModal;
