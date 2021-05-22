import { useContext } from 'react';
import { Modal } from 'react-bootstrap';
import {Link} from "react-router-dom";
import { LanguageContext } from '../contexts/LanguageContext';

const QuizFailureModal = (props) => {
  let [isEnglish] = useContext(LanguageContext);

  return (
    <div>
      {isEnglish === 'english' ?


        <Modal
          {...props}
          size="md"
          centered
          className="modal-2"
        >

      <div className="big-icon">😅<div className="modalheader">
        You didn't pass the quiz</div>
            </div>
            <p className="white">Please learn more about Queretaro and take the quiz again</p>
          <Modal.Body>
            <Link className="alt2" to="/home">Return to home</Link>
          </Modal.Body>
        </Modal>


      :

      <Modal
      {...props}
      size="md"
      centered
      className="modal-2"
    >

  <div className="big-icon">😅<div className="modalheader">
  No pasaste el cuestionario</div>
        </div>
        <p className="white">Aprende más sobre Querétaro e intentalo de nuevo</p>
      <Modal.Body>
        <Link className="alt2" to="/home">Regresar al Inicio</Link>
      </Modal.Body>
    </Modal>
    }
    </div>
  );
};

export default QuizFailureModal;
