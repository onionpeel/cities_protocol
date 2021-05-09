import { useContext } from 'react';
import { Alert } from 'react-bootstrap';
import {Link} from "react-router-dom";
import { LanguageContext } from '../contexts/LanguageContext';

const ValidationRequired = () => {
  let {isEnglish} = useContext(LanguageContext);

  return (
    <div>
      {isEnglish

      ?

      <Alert variant="secondary">
        Only users who have validated their account can create a new proposal. To get validated, take a <Link to="/quiz">quiz</Link> about Queretaro.
      </Alert>

      :
      <Alert variant="secondary">
        ESP ESP ESP ESP ESP ESP
        Only users who have validated their account can create a new proposal. To get validated, take a <Link to="/quiz">quiz</Link> about Queretaro.
      </Alert>
      }
    </div>
  );
};

export default ValidationRequired;
