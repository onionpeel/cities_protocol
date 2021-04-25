import { Button } from 'react-bootstrap';

const ConnectButton = ({handleOnConnect}) => {
  return (
    <Button className="mb-4" onClick={handleOnConnect}>Connect Wallet to Unlock</Button>
  );
};

export default ConnectButton;
