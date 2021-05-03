import { Modal } from 'react-bootstrap';
import {Link} from "react-router-dom";

const QuizAlreadySubmittedModal = (props) => {
  return (
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
  );
};

export default QuizAlreadySubmittedModal;
