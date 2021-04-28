import { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import IsLoadingModal from '../modals/IsLoadingModal';

const CreateProposal = () => {
  let [form, setForm] = useState();
  let [loadingModalShow, setLoadingModalShow] = useState();

  //Delay function is only for development
  const delay = () => new Promise(res => setTimeout(res, 2000));

  const handleOnSubmit = async e => {
    e.preventDefault();
    setLoadingModalShow(true);
    await delay();
    console.log(form)
    handleOnLoadingModal();
  };

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value
    });
  };

  const handleOnChangeTitle = e => {
    setField('title', e.target.value);
  };

  const handleOnChangeTypeOfAction = e => {
    setField('typeOfAction', e.target.value);
  };

  const handleOnChangeNeighborhood = e => {
    setField('neighborhood', e.target.value);
  };

  const handleOnChangePersonInCharge = e => {
    setField('personInCharge', e.target.value);
  };

  const handleOnChangeDescription = e => {
    setField('description', e.target.value);
  };

  const handleOnChangeExpiration = e => {
    setField('expiration', e.target.value);
  };

  const handleOnChangeBudget = e => {
    setField('budget', e.target.value);
  };

  const handleOnChangeRequiredTaroToVote = e => {
    setField('requiredTaroToVote', e.target.value);
  };

  const handleOnLoadingModal = () => {
    setLoadingModalShow(false);
  };

  return (
    <div>
      <Form>
        <Form.Group as={Row} controlId="formTitle">
          <Form.Label column sm={2}>
            Title
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="title" onChange={handleOnChangeTitle}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formTypeOfAction">
          <Form.Label column sm={2}>
            Type of action
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="type" onChange={handleOnChangeTypeOfAction}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formNeighborhood">
          <Form.Label column sm={2}>
            Neighborhood
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="neighborhood" onChange={handleOnChangeNeighborhood}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formPersonInCharge">
          <Form.Label column sm={2}>
            Person in charge
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="Person in charge" onChange={handleOnChangePersonInCharge}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="exampleForm.ControlTextarea1">
          <Form.Label column sm={2}>
            Description
          </Form.Label>
          <Col sm={10}>
            <Form.Control as="textarea" type="text" rows={3} placeholder="description" onChange={handleOnChangeDescription}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formExpiration">
          <Form.Label column sm={2}>
            Expiration
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="expiration" onChange={handleOnChangeExpiration}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formBudget">
          <Form.Label column sm={2}>
            Budget
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="budget" onChange={handleOnChangeBudget}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formRequiredTaroToVote">
          <Form.Label column sm={2}>
            Required TARO to vote
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="required TARO to vote" onChange={handleOnChangeRequiredTaroToVote}/>
          </Col>
        </Form.Group>


        <Form.Group as={Row}>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit" onClick={handleOnSubmit}>Submit proposal</Button>
          </Col>
        </Form.Group>
      </Form>

      <IsLoadingModal
        show={loadingModalShow}
        onHide={handleOnLoadingModal}
      />
    </div>
  );
};

export default CreateProposal;
