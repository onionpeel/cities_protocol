import { Button, Spinner } from 'react-bootstrap';
import { useContext } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';
import '../../styles/Home.css';


const SkaleSwitch = () => {
  let [isEnglish] = useContext(LanguageContext);

  return (
    <div>
    {isEnglish === 'english' ?
    <Button variant="secondary" disabled>
   🧅 Switching to SKALE...
   <span animation="border"className="spinner-grow" role="status"></span>
  </Button>
    :
    <Button variant="secondary" disabled>
   🧅 Cambiando a SKALE...
   <span animation="border"className="spinner-grow" role="status"></span>
  </Button>
    }
    </div>

  );
};

export default SkaleSwitch;
