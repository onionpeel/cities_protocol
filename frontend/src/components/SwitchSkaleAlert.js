import { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';
import {Alert, Button} from 'react-bootstrap';



const InstallMetamaskAlert = () => {
  let [isEnglish] = useContext(LanguageContext);

  return (
    <div>
      {isEnglish === 'english' ?

    <Alert className= "valert">
      <div >
        <div className="big-icon">⚠️</div>
        <div className="title3">It appears you are connected to other network</div>
      </div>

   </Alert>
    :
    <Alert className= "valert">
        <div >
          <div className="big-icon">⚠️</div>
          <div className="title3">Parece que estas conectado a otra red</div>
        </div>

    </Alert>
    }</div>
  );
};

export default InstallMetamaskAlert;
