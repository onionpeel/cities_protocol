import { useContext } from 'react';
import {Alert} from 'react-bootstrap';
import {Link} from "react-router-dom";
import { LanguageContext } from '../contexts/LanguageContext';

const InstallMetamaskAlert = () => {
  let {isEnglish} = useContext(LanguageContext);

  return (
    <div>
      {isEnglish

      ?

      <div>
        <Alert variant="primary">
          <Alert.Heading>It appears you don't have MetaMask installed</Alert.Heading>
          <p>
          <Link to="/createproposal">Get started so you can start earning TARO</Link>
          </p>
        </Alert>
      </div>

      :

      <div>
        <Alert variant="primary">
          <Alert.Heading>It appears you don't have MetaMask installed</Alert.Heading>
          <p>
          ESP ESP ESP ESP ESP ESP ESP ESP ESP ESP ESP ESP

          <Link to="/createproposal">Get started so you can start earning TARO</Link>
          </p>
        </Alert>
      </div>
      }
    </div>
  );
};

export default InstallMetamaskAlert;
