import { Modal, Button } from 'react-bootstrap';
import {Link} from "react-router-dom";

const QuizSuccessModal = (props) => {
  return (
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
          You have earned your first <Link to="/home">TARO</Link> tokens, and you can start participating in the community by making and voting on proposals.
        </p>
      </Modal.Body>
    </Modal>
  );
};

export default QuizSuccessModal
