import { useContext } from 'react';
import { Modal } from 'react-bootstrap';
import {Link} from "react-router-dom";
import { LanguageContext } from '../contexts/LanguageContext';

const CreateProposalSuccessModal = (props) => {
  let [isEnglish] = useContext(LanguageContext);

  return (
    <div>
      {isEnglish === 'english' ?

      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Congratulations!  You have successfully submitted your proposal!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <Link className="alt" to="/ProposalList">Take a look at your proposal</Link>
          </p>
        </Modal.Body>
      </Modal>
      :
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
          !Felicidades! pasaste el cuestionario!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Has ganado tokens TARO y ahora puedes participar en la gobernanza de la ciudad al crear o votar propuestas.
          </p>
          <p>
            <Link className="alt" to="/ProposalList">Delega tokens y crea tu primer propuesta</Link> para empezar a ganar más TARO
          </p>
        </Modal.Body>
      </Modal>
    }
    </div>
  );
};

export default CreateProposalSuccessModal;
