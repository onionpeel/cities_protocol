import { useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import { LanguageContext } from '../contexts/LanguageContext';

const Proposal = ({title, typeOfAction, neighborhood, personInCharge, description, expiration, budget, requiredTaroToVote}) => {
  let {isEnglish} = useContext(LanguageContext);

  return (
    <div>
      {isEnglish

      ?

      <Card className="gray mb-4">
        <Card.Body>
          <Card.Text>
            {title}
            {typeOfAction}
            Where: {neighborhood}
            Person in charge: {personInCharge}
          </Card.Text>
          <Card.Title className="text-large">Locked</Card.Title>
          <Card.Text>
            {description}
            expiration: {expiration}
            cost: {budget}
            Required TARO to vote: {requiredTaroToVote}
          </Card.Text>
          <Button disabled block>Claim Tokens</Button>
        </Card.Body>
      </Card>
      
      :

      <Card className="gray mb-4">
        <Card.Body>
          <Card.Text>
          ESP ESP ESP ESP ESP ESP ESP ESP ESP ESP ESP ESP

            {title}
            {typeOfAction}
            Where: {neighborhood}
            Person in charge: {personInCharge}
          </Card.Text>
          <Card.Title className="text-large">Locked</Card.Title>
          <Card.Text>
            {description}
            expiration: {expiration}
            cost: {budget}
            Required TARO to vote: {requiredTaroToVote}
          </Card.Text>
          <Button disabled block>Claim Tokens</Button>
        </Card.Body>
      </Card>
      }
    </div>


  );
};

export default Proposal;
