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
          !Felicidades! Creaste una propuesta, ahora puedes votar por ella
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Delega tus token TARO y comienza a votar las propuestas disponibles.
            !Las primeras 5 propuestas que hagas te daran tokens TARO!
          </p>
          <p>
            <Link className="alt2" to="/ProposalList">Ver propuestas</Link>
          </p>
        </Modal.Body>
      </Modal>
    }
    </div>
  );
};

export default CreateProposalSuccessModal;
