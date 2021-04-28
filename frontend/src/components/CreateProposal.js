import { Form, Button, Row, Col } from 'react-bootstrap';

const CreateProposal = () => {
  return (
    <Form>
      <Form.Group as={Row} controlId="formTitle">
        <Form.Label column sm={2}>
          Title
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" placeholder="title" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formTypeOfAction">
        <Form.Label column sm={2}>
          Type of action
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" placeholder="type" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formNeighborhood">
        <Form.Label column sm={2}>
          Neighborhood
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" placeholder="neighborhood" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formPersonInCharge">
        <Form.Label column sm={2}>
          Person in charge
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" placeholder="Person in charge" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="exampleForm.ControlTextarea1">
        <Form.Label column sm={2}>
          Description
        </Form.Label>
        <Col sm={10}>
          <Form.Control as="textarea" type="text" rows={3} placeholder="description" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formExpiration">
        <Form.Label column sm={2}>
          Expiration
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" placeholder="expiration" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formBudget">
        <Form.Label column sm={2}>
          Budget
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" placeholder="budget" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formRequiredTaroToVote">
        <Form.Label column sm={2}>
          Required TARO to vote
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" placeholder="required TARO to vote" />
        </Col>
      </Form.Group>


      <Form.Group as={Row}>
        <Col sm={{ span: 10, offset: 2 }}>
          <Button type="submit">Submit proposal</Button>
        </Col>
      </Form.Group>
    </Form>
  );
};

export default CreateProposal;
