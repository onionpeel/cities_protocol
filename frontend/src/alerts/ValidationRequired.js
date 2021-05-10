import { useContext } from 'react';
import { Alert } from 'react-bootstrap';
import {Link} from "react-router-dom";
import { LanguageContext } from '../contexts/LanguageContext';
import {ListGroup, Button} from 'react-bootstrap';

const ValidationRequired = () => {
  let [isEnglish, setLoc] = useContext(LanguageContext);

  return (
    <div>
      {isEnglish === 'english'
      ?
      <Alert>
      <div>
      Only users who have validated their account can create a new proposal. Take the Quiz to get validated
      </div>
      <div className ="floating">
        <Link className="alt2" to="/quiz">Take the quiz to get validated</Link>
      </div>


    </Alert>

      :
      <Alert>
        <div className="main">
          <div className="title3">Valida tu cuenta</div>
          <div className="big-icon">⚠️</div>
          <div className="white">
          Solo los usuarios que validen ser ciudadanos de Querétaro podran crear nuevas propuestas, presiona aquí para validarte
          </div>
        </div>
        <div className ="floating">
          <Link className="alt2" to="/quiz">Validar que soy Queretan@</Link>
        </div>


      </Alert>
      }
    </div>
  );
};

export default ValidationRequired;
