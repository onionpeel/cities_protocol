import { Button, Spinner } from 'react-bootstrap';
import { useContext } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';
import '../../styles/Home.css';


const ConnectingButton = () => {
  let {isEnglish} = useContext(LanguageContext);
  return (
    <div>
    {isEnglish ?    
    <Button variant="secondary" disabled>
    <Spinner
      as="span"
      animation="border"
      size="sm"
      role="status"
      aria-hidden="true"
    />
    Connecting...
  </Button>
    :
    <Button variant="secondary" disabled>
    <Spinner
      as="span"
      animation="border"
      size="sm"
      role="status"
      aria-hidden="true"
    />
    Conectando...
  </Button>
    }
    </div>

  );
};

export default ConnectingButton;
