import { useContext } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { LanguageContext } from '../../contexts/LanguageContext';

const ConnectingButton = () => {
  let {isEnglish} = useContext(LanguageContext);

  return (
    <div>
      {isEnglish

        ?

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
          ESP Connecting...
        </Button>
      }
    </div>

  );
};

export default ConnectingButton;
