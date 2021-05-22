import {Card, Button } from 'react-bootstrap';
import { useContext } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';
import '../../styles/Home.css';


const SkaleButton = ({handleOnConnect}) => {
  let [isEnglish] = useContext(LanguageContext);

  return (
    <div>
      {isEnglish === 'english' ?

    <div>
      <div className="purple2">
        <Card.Text >and switch your Metamask to the skale network</Card.Text>
        <Button onClick={handleOnConnect}>🧅 Switch to SKALE network</Button>
      </div>
    </div>
    :
    <div>
      <Card.Text className="purple2">y cambiar tu Metamask a la red Skale </Card.Text>
      <Button onClick={handleOnConnect}> 🧅 Cambiar a red SKALE</Button>
    </div>
}</div>
  );
};

export default SkaleButton;
