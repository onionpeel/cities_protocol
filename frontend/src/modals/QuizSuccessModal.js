import { Modal } from 'react-bootstrap';
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
          You have earned TARO tokens, and you can start participating in the community by making and voting on proposals.
        </p>
        <p>
          Click <Link to="/home">TARO</Link> to start earning more!
        </p>
      </Modal.Body>
    </Modal>
  );
};

export default QuizSuccessModal;
