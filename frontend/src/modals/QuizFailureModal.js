import { Modal, Button } from 'react-bootstrap';

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
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default QuizFailureModal
