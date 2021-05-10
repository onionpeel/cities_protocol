import { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';
import {Alert, Button} from 'react-bootstrap';
import {Link} from "react-router-dom";



const InstallMetamaskAlert = () => {
  let [isEnglish] = useContext(LanguageContext);

  return (
    <div>
      {isEnglish === 'english' ?

    <Alert className= "valert">
      <div >
        <div className="big-icon">⚠️</div>
        <div className="title3">It appears you don't have MetaMask installed</div>

        <div className ="floating">
          <Button className="alt2" to="https://metamask.io/">Download Wallet</Button>
        </div>
      </div>

   </Alert>
    :
    <Alert className= "valert">
        <div >
          <div className="big-icon">⚠️</div>
          <div className="title3">Parece que no tienes una wallet de Metamask</div>

          <div className ="floating">
            <Button className="alt2" to="https://metamask.io/">Descargar Wallet</Button>
          </div>
        </div>

    </Alert>
    }</div>
  );
};

export default InstallMetamaskAlert;
