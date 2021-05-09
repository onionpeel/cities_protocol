import { useContext } from 'react';
import { Modal } from 'react-bootstrap';
import {Link} from "react-router-dom";
import { LanguageContext } from '../contexts/LanguageContext';

const QuizFailureModal = (props) => {
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
            You didn't pass the quiz
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Please learn more about Queretaro and take the quiz again.
          </p>
        </Modal.Body>
        <Link to="/home">TARO</Link>
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
            No pasaste el cuestionario
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Aprende más sobre Querétaro e intentalo de nuevo
          </p>
        </Modal.Body>
        <Link to="/home">TARO</Link>
      </Modal>
    }
    </div>
  );
};

export default QuizFailureModal