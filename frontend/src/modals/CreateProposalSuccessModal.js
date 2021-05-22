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
        className="main"
      >

        <div className="big-icon">🎉<div className="modalheader">
            Proposal created!</div>
            </div>
            <p className="white">You have successfully submitted your proposal!</p>
        <Modal.Body>
             <p>
            Create more proposals to increase your voting power.
            The first 5 proposals will give you 20 TARO each!
          </p>
          <p>
            <Link className="alt2" to="/ProposalList">Take a look at your proposal</Link>
          </p>
        </Modal.Body>
      </Modal>
      :
      <Modal
        {...props}
        size="lg"
        centered
        className="main"
      >
        <div className="big-icon">🎉<div className="modalheader">
          ¡Creaste una propuesta!</div>
        </div>
         <p className="white">Ve a la siguiente pantalla para votar por ella</p>

        <Modal.Body>

          <p className="main">
            Crea más propuestas para incrementar tu poder de voto.
            ¡Las primeras 5 propuestas te daran 20 TARO cada una !
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
