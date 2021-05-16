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
    >
    <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
        ⚠️Your proposal was not submitted⚠️
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="main">
          Please be sure you are connected to MetaMask and that you entered your information correctly.
        </div>
        <div className="main">
          Also, make sure you have passed the quiz so that you are validated to make proposals.
        </div>
      </Modal.Body>
    </Modal>

      :

      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
      <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
          ⚠️No se envió tu propuesta⚠️
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="main">
          Asegúrese de estar conectado a MetaMask y de haber ingresado su información correctamente.
          </div>
          <div className="main">
          Además, asegurate de haber validado tu cuenta y haber llenado todos los campos.
          </div>
        </Modal.Body>
      </Modal>
      }
    </div>
  );
};

export default CreateProposalErrorModal;
