import { useContext } from 'react';
import {Button} from 'react-bootstrap';
import logo from '../assets/Logo.svg';
import { LanguageContext } from '../contexts/LanguageContext';
import '../styles/Home.css';

const About = () => {
  let [isEnglish] = useContext(LanguageContext);

  return (
  <div className="App">
  {isEnglish === 'english' ?
    <div>
    <div className="App">
      <div className="gray3">
        <div className="text-large">1. What's <img src={logo} alt="VoTARO" width="250px" />?</div>
        <div className="main">Urban governance protocol for Queretaro City DAO</div>
          <div className="text-medium-left">
            <div className="purple">1 ✋ Propose</div>
            <div className="purple">2 🗳️ Vote</div>
            <div className="purple">3 🥇 Get $TARO</div>
          </div>
        <div className="main">
           VoTaro is an Ethereum application that uses a reward system to encourage residents of Queretaro City to propose and participate in activities that will
           improve their community.</div>
        <div className="orange">2. What's' TARO?</div>
        <div className="main">
          TARO is a modified version of Compound's COMP smart contract. The major difference is that TARO brings Compound's governance structure into a real world
          setting and uses the incentive of earning more tokens as a way to promote community activity.</div>
        <div className="main">
          This application would not be practical currently on Ethereum due to slow transaction speeds and high gas costs. Therefore a layer two solution, SKALE Network,
          is used as the platform for VoTaro. SKALE provides VoTaro speed and security in the near term, while offering the possibility for expansion over time.</div>
        <div className="orange">3. How do I get $TARO?</div>
        <div className="main"><p>
           New users are first instructed to install MetaMask and then connect to the application and get validated. Because the focus is on people who live in Queretaro,
           a quiz about Queretaro is used to check the validity of potential users. When validated, a user receives TARO tokens and becomes eligible to offer community proposals. TARO tokens will be received for the first five proposals a user makes.
          </p>
          <p>
            In the future there will be some changes, including more ways to earn TARO:
            If a proposal is passed and the proposed activity is carried out, the proposer will receive TARO.
            One TARO token is worth one vote. Anyone with TARO will be able to delegate their voting power to another TARO holder. After the first five proposals, a user must have received one percent of the total voting power to make a proposal.
          </p></div>
        <Button className="alt" href="https://metamask.io" >Download Wallet</Button>
        <div className="main">
          <p>$TARO token can only be obtained as a reward🥇 when:</p>
          </div>
          <div className="text-medium-left">
          <p className="main2">✔️ You verify that you are a Queretaro citizen at the end of this screen.</p>
          <p className="main2">🗳️ You participate in TARO urban governance.</p></div>
        <div className="orange">4. Benefits for the City</div>
        <div className="text-medium-left" >
          <div className="purple3"> ⛓️  Urban governance registration on blockchain</div>
          <div className="purple3"> 🏙️ Urban processes tracked on Smart Contracts. </div>
          <div className="purple3"> 🤖 Automation and Decentralization of services. </div>
          <div className="purple3"> 🧙‍♂️ Citizens develop digital skills.</div>
          <div className="purple3"> 🤝 Transparent and decentralized urban consensus</div>
          <div className="purple3"> 🧬 Predictive Economy and Urban Development. </div>
        </div>
        </div>
      <div className="gray3">
        <div className="orange">Do you live in Querétaro? Prove it and get 100 TARO</div>
        <div className="main">Answer this questionnaire to verify that you are from Queretaro and receive up to 100 TAROs to vote for the proposals.</div>
        <Button className="alt" href="/quiz" >Verify Queretaro citizenship</Button>
      </div>
  </div>
</div>
    :
  <div>
    <div className="gray3">
      <div className="text-large">1. ¿Qué es <img src={logo} alt="VoTARO" width="250px" />?</div>
      <div className="main">Protocolo de gobernanza urbana para proponer, votar y ejectuar tareas y recompensarlas con la moneda digital de la ciudad de QueréTARO.</div>
        <div className="text-medium-left">
            <div className="purple">1 ✋ Propon</div>
            <div className="purple">2 🗳️ Vota</div>
            <div className="purple">3 🥇 Obtén $TARO</div>
        </div>
      <div className="main">
      VoTaro es una aplicación de Ethereum que utiliza un sistema de recompensas para alentar a los residentes de la ciudad de Querétaro a proponer y participar en
      actividades que mejoran su comunidad.</div>
      <div className="orange">2. Objetivo</div>
      <div className="main">
        Convertir a la ciudad de Querétaro en una Organización Autónoma Descentralizada que exista de manera automatizada en internet pero que
        dependa fuertemente del talento humano para ejecutar tareas urbanas o virtuales que el algoritmo no pueda completar por si mismo.</div>
      <div className="orange">3. ¿Qué es $TARO?</div>
      <div className="main">
        TARO es una versión modificada del contrato inteligente COMP de Compound. Funciona como moneda digital de la ciudad de Querétaro, cada moneda te da poder de
        voto en el sistema de gobernanza VoTARO, donde puedes proponer votar y ejectuar propuestas de actividades o eventos en la ciudad para obtener más TARO.</div>
      <div className="orange">4. ¿Cómo obtengo $TARO?</div>
      <div className="main">
       <p>1. Para obener TARO necesitas una cartera web 3 como Metamask, puedes descargar una al dar click en el botón.</p></div>
      <Button  a className="alt" href="https://metamask.io" >Descargar Cartera</Button>
      <div className="main">
        <p>2. El token TARO solo se puede obtener como recompensa 🥇 al:</p>
      </div>
      <div className="text-medium-left">
          <p className="main2">✔️ Verificar que eres ciudadan@ queretan@ al final de esta pantalla.</p>
          <p className="main2">🗳️ Participar en la gobernanza de la ciudad.</p>
        </div>
      <div className="orange">5. Beneficios para la ciudad</div>
      <div className="text-medium-left">
        <div className="purple3">⛓️ Registro de gobernanza urbana en blockchain.</div>
        <div className="purple3" >🏙️ Procesos urbanos en Contratos Inteligentes.</div>
        <div className="purple3">🤖 Automatización y Descentralización de servicios.</div>
        <div className="purple3" >🧙‍♂️ Ciudadanos desarrollan habilidades digitales.</div>
        <div className="purple3" >🤝 Consenso urbano transparente y descentralizado.</div>
        <div className="purple3">🧬 Economía y Desarrollo Urbano Predictivos.</div>
      </div>
    </div>
    <div className="gray3">
      <div className="orange">¿Vives en Querétaro? pruebalo y obtén 100 TARO</div>
      <div className="main">Contesta este cuestionario para verififcar que eres queretano y recibe hasta 100 TARO para votar por las propuestas.</div>
      <Button className="alt" href="/quiz" >Verificar Queretan@</Button>
    </div>
    </div>
      }
    </div>
  );
};

export default About;
