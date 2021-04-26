import {Alert} from 'react-bootstrap';
import {Link} from "react-router-dom";

const InstallMetamaskAlert = () => {
  return (
    <Alert variant="primary">
      <Alert.Heading>It appears you don't have MetaMask installed</Alert.Heading>
      <p>
      <Link to="/createproposal">Get started so you can start earning TARO</Link>
      </p>
    </Alert>
  );
};

export default InstallMetamaskAlert;
