import { useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import { LanguageContext } from '../contexts/LanguageContext';

const Proposal = ({title, typeOfAction, neighborhood, personInCharge, description, expiration, budget, requiredTaroToVote, forVotes, againstVotes}) => {
  let {isEnglish} = useContext(LanguageContext);
  console.log('forVotes in Proposal: ', forVotes)

  return (
    <div>
      {isEnglish

      ?

      <Card className="gray mb-4">
        <Card.Body>
            <div>
              title: {title}
            </div>
            <div>
              type of action: {typeOfAction}
            </div>
            <div>
              Where: {neighborhood}
            </div>
            <div>
              Person in charge: {personInCharge}
            </div>
            <div>
              description: {description}
            </div>
            <div>
              expiration: {expiration}
            </div>
            <div>
              cost: {budget}
            </div>
            <div>
              Required TARO to vote: {requiredTaroToVote}
            </div>
            <div>
              For: {forVotes}
            </div>
            <div>
              Against: {againstVotes}
            </div>
            <Button disabled block>Vote for this proposal</Button>
            <Button disabled block>Vote against this proposal</Button>
        </Card.Body>
      </Card>

      :

      <Card className="gray mb-4">
        <Card.Body>
            <div>
              ESP ESP ESP ESP
            </div>
            <div>
              title: {title}
            </div>
            <div>
              type of action: {typeOfAction}
            </div>
            <div>
              Where: {neighborhood}
            </div>
            <div>
              Person in charge: {personInCharge}
            </div>
            <div>
              description: {description}
            </div>
            <div>
              expiration: {expiration}
            </div>
            <div>
              cost: {budget}
            </div>
            <div>
              Required TARO to vote: {requiredTaroToVote}
            </div>
            <div>
              For: {forVotes}
            </div>
            <div>
              Against: {againstVotes}
            </div>
            <Button disabled block>Vote for this proposal</Button>
            <Button disabled block>Vote against this proposal</Button>
        </Card.Body>
      </Card>
      }
    </div>
  );
};

export default Proposal;
