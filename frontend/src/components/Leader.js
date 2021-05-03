import { useContext } from 'react';
import { Card } from 'react-bootstrap';
import { LanguageContext } from '../contexts/LanguageContext';

const Leader = ({person}) => {
  let {isEnglish} = useContext(LanguageContext);

  return (
    <div>
      {isEnglish

      ?

      <div>
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>{person}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Some text</Card.Subtitle>
            <Card.Text>
              Stats about {person}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>

      :

      <div>
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>{person}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Some text</Card.Subtitle>
            <Card.Text>
            ESP ESP ESP ESP ESP ESP ESP ESP ESP ESP ESP ESP

              Stats about {person}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      }
    </div>
  );
};

export default Leader;
