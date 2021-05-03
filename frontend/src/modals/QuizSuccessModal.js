import { useContext } from 'react';
import { Modal } from 'react-bootstrap';
import {Link} from "react-router-dom";
import { LanguageContext } from '../contexts/LanguageContext';

const QuizSuccessModal = (props) => {
  let {isEnglish} = useContext(LanguageContext);

  return (
    <div>
      {isEnglish

      ?

      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Congratulations!  You passed the quiz!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            You have earned TARO tokens, and you can start participating in the community by making and voting on proposals.
          </p>
          <p>
            Click <Link to="/home">TARO</Link> to start earning more!
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
          ESP ESP ESP ESP ESP ESP ESP ESP ESP ESP ESP ESP

            Congratulations!  You passed the quiz!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            You have earned TARO tokens, and you can start participating in the community by making and voting on proposals.
          </p>
          <p>
            Click <Link to="/home">TARO</Link> to start earning more!
          </p>
        </Modal.Body>
      </Modal>
    }
    </div>
  );
};

export default QuizSuccessModal;
