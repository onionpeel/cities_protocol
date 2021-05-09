import {Card, Button } from 'react-bootstrap';
import { useContext } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';
import '../../styles/Home.css';


const ConnectButton = ({handleOnConnect}) => {
  let {isEnglish} = useContext(LanguageContext);
  return (
    <div>
      {isEnglish ?
    <div>
      <Card.Text className="purple2">You need a Metamask wallet to use VoTARO</Card.Text>
      <Button onClick={handleOnConnect}>Connect Wallet</Button>
    </div>
    :
    <div>
      <Card.Text className="purple2">Necesitas una wallet de Metamask para usar VoTARO</Card.Text>
      <Button onClick={handleOnConnect}>Conectar Wallet</Button>
      
    </div>
}</div>
  );
};

export default ConnectButton;
