import { useContext } from 'react';
import { Modal } from 'react-bootstrap';
import {Link} from "react-router-dom";
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
        <Modal.Body>
          <div>
            Your form was not submitted.  Please be sure you are connected to MetaMask and that you entered your information correctly.
          </div>
          <div>
            Also, make sure you have passed the quiz so that you are validated to make proposals.
          </div>
          <div>
            <Link to="/">VoTaro</Link>
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
        <Modal.Body>
          <div>
            Your form was not submitted.  Please be sure you are connected to MetaMask and that you entered your information correctly.
          </div>
          <div>
            Also, make sure you have passed the quiz so that you are validated to make proposals.
          </div>
          <div>
            <Link to="/">VoTaro</Link>
          </div>
        </Modal.Body>
      </Modal>
      }
    </div>
  );
};

export default CreateProposalErrorModal;
