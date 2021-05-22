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
        <Modal.Body className="text-large">
          <div>
            Loading...
          </div>
          <p/>
          <div>
            <span animation="border"className="spinner-grow" role="status"></span>
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
            Cargando...
          </div>
          <p/>
          <div>
            <span animation="border"className="spinner-grow" role="status"></span>
          </div>

        </Modal.Body>
      </Modal>
      }
    </div>
  );
};

export default IsLoadingModal;
