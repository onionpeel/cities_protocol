import { Modal, Spinner } from 'react-bootstrap';

const IsLoadingModal = (props) => {
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <div>
          Loading
        </div>
        <div>
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default IsLoadingModal;
