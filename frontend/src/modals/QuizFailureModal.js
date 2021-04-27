import { Modal } from 'react-bootstrap';
import {Link} from "react-router-dom";

const QuizFailureModal = (props) => {
  return (
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
  );
};

export default QuizFailureModal
