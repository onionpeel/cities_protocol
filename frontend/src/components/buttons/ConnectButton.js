import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { LanguageContext } from '../../contexts/LanguageContext';

const ConnectButton = ({handleOnConnect}) => {
  let {isEnglish} = useContext(LanguageContext);

  return (
    <div>
      {isEnglish

        ?

        <Button className="mb-4" onClick={handleOnConnect}>Connect Wallet to Unlock</Button>

        :

        <Button className="mb-4" onClick={handleOnConnect}>ESP Connect Wallet to Unlock</Button>
      }
    </div>
  );
};

export default ConnectButton;
