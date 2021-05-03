import { Button, Spinner } from 'react-bootstrap';

const ConnectingButtonENG = () => {
  return (
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
  );
};

export default ConnectingButtonENG;
