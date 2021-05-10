import { useContext } from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import { LanguageContext } from '../contexts/LanguageContext';

const IsLoadingModal = (props) => {
  let [isEnglish] = useContext(LanguageContext);

  return (
    <div>
      {isEnglish === 'english' ?

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

      :

      <Modal
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
        <div>
        </div>
          <div>
            Cargando
          </div>
          <div>
            <Spinner animation="border" role="status">
              <span className="sr-only">Cargando...</span>
            </Spinner>
          </div>
        </Modal.Body>
      </Modal>
      }
    </div>
  );
};

export default IsLoadingModal;
