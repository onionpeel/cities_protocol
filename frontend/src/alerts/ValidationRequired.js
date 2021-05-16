import { useContext } from 'react';
import { Alert } from 'react-bootstrap';
import {Link} from "react-router-dom";
import { LanguageContext } from '../contexts/LanguageContext';

const ValidationRequired = () => {
  let [isEnglish] = useContext(LanguageContext);

  return (
    <div>
      {isEnglish === 'english'
      ?
      <Alert>
        <div className="main">
          <div className="title3">Get validated to vote</div>
          <div className="big-icon">⚠️</div>
          <div className="white">
            Only validated Queretaro citizens can create new proposals or vote on the available
          </div>
        </div>
        <div className ="floating">
          <Link className="alt2" to="/quiz">Validate account</Link>
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
