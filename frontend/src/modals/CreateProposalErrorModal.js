import { useContext } from 'react';
import { Modal } from 'react-bootstrap';
import { LanguageContext } from '../contexts/LanguageContext';

const CreateProposalErrorModal = (props) => {
  let [isEnglish] = useContext(LanguageContext);

  return (
    <div>
      {isEnglish === 'english'

      ?

      <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="modal-2"
    >

      <div className="big-icon">🚫<div className="modalheader">
        Your proposal was not submitted</div>
      </div>
      <Modal.Body className="main">
        <div>
        ⚠️ 1. Please be sure you are connected to MetaMask and that you entered your information correctly.
        </div>
        <p/>
        <div>
        ⚠️ 2. Make sure you have passed the quiz so that you are validated to make proposals.
        </div>
        <p/>
        <div>
        ⚠️ 3. The cost of the proposal must be a number.
        </div>
        <p/>
        <div className="modalheader">
         Verify and try again
        </div>
      </Modal.Body>
    </Modal>

      :

      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="modal-2"
      >
        <div className="big-icon">🚫<div className="modalheader">
          No se envió tu propuesta</div>
        </div>
        <Modal.Body className="main">
          <div>
          ⚠️ 1. Asegúrese de estar conectado a MetaMask y de haber ingresado su información correctamente.
          </div>
          <p/>
          <div>
          ⚠️ 2. Además, asegurate de haber validado tu cuenta y haber llenado todos los campos.
          </div>
          <p/>
          <div>
          ⚠️ 3. El costo deben ser solo números.
          </div>
          <p/>
          <div className="modalheader">
            Verifica e intenta de nuevo
          </div>
        </Modal.Body>
      </Modal>
      }
    </div>
  );
};

export default CreateProposalErrorModal;
