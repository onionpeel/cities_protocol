import { useContext } from 'react';
import {Button} from 'react-bootstrap';
import logo from '../assets/Logo.svg';
import { LanguageContext } from '../contexts/LanguageContext';
import ReactPlayer from "react-player";

const About = () => {
  let [isEnglish] = useContext(LanguageContext);

  return (
  <div className="App">
  {isEnglish === 'english' ?
    <div>
    <div className="about">
      <div className="text-large">🤔 What's <img src={logo} alt="VoTARO" width="250px" />?</div>
      <div className="main">A voting DApp that rewards users with $TARO when the propose or vote on cities' public needs.</div>
        <div className="text-medium-left">
            <div className="purple">✋ Propose</div>
            <div className="purple">🗳️ Vote</div>
            <div className="purple">🥇 Get $TARO</div>
        </div>
      <div className="main">
        <p>VoTaro is an Ethereum application that uses a reward system to encourage residents of Queretaro City to propose and participate
           in activities that will improve their community. It was developed on the <a className="alt" href="https://showcase.ethglobal.co/scaling/cities-protocol">Scaling Ethereum Hackathon 2021.</a></p>
        <div><ReactPlayer width="100%"  url="https://www.youtube.com/embed/6xgTw1FEuIA"/></div>
        <p>The citizens of Querétaro who use VoTARO to propose, vote and solve the needs of their neighborhood in Queretaro City, will be rewarded with
         <a className="alt" href="https://github.com/zenbitMX/VoTARO/blob/main/contracts/Taro.sol"> $TARO, an ERC20 token </a>
          which gives users voting power on these proposals and will work as an instrument to fund the costs necessary to solve them.</p>
        <p>Proposals are registered and managed in an automated way by the smart contract
        <a className="alt" href="https://github.com/onionpeel/cities_protocol/blob/main/contracts/GovernorAlpha.sol"> Governor Alpha </a>
         a version of <a className="alt" href="https://compound.finance/docs/governance?ref=github&user=ajb413&repo=compound-governance-examples"> Compound's contract </a>
         adapted to real-world interactions.</p>
        <p>VoTARO implements <a className="alt" href="https://skale.network/">SKALE Network,</a> an ethereum layer 2 solution that reduces gas charges to 0 and increases the speed of transactions without compromising security.</p>
      </div>
      <div className="orange">🎯 Objective</div>
      <div className="main">
      Transform Querétaro City into a Decentralized Autonomous Organization that exists in an automated way on the internet but that relies heavily on human talent to carry out urban or virtual tasks that the smart contracts cannot complete by itself.
        </div>
      <div className="orange">🧰 What do I need to get $ TARO?</div>
      <div className="main">You need to do 5 activities to get TARO.</div>
       <div className="text-medium-left">
          <div className="aboutC">1. 🦊 Download Metamask</div>
          <div className="aboutC" >2. 🧅 Switch to Skale Network</div>
          <div className="aboutC">3. ✔️ Get Validated</div>
          <div className="aboutC" >4. 🗳️ Delegate TARO</div>
          <div className="aboutC" >5. 🦸🦸‍♂️ Create and Vote on proposals </div>
        </div>
      <div className="main">
      <div className="aboutCo">1. 🦊 Downlad Wallet</div>
      <p> VoTARO uses web 3.0 tools so that people can interact with smart contracts
          and algorithms safely, giving them complete control over their TARO tokens. </p>
       <p> An ethereum web 3.0 wallet such as Metamask, will allow you to use VoTARO contracts and obtain TARO by proposing the needs of your neighborhood.
         If you don't have a Metamask Wallet yet, you can download it from this button </p>
        <div className ="submitbutton"><Button className="aboutbutton" href="https://metamask.io" > 🦊 Download Cartera</Button></div>

      <div className="aboutCo">2. 🧅 Switch to SKALE network</div>
       <p>
       To use decentralized Ethereum applications, you need to pay the "gas fees" for smart contracts. These are usually expensive
          and restrictive for new users. VoTARO implements SKALE, a second layer solution on Ethereum that reduces gas costs to 0.
          <p>This allows that new users can interact with VoTARO contracts without having to pay gas fees, allowing implementations of this technology
          on a large scale as in a city. Go to Home to configure your wallet with a signle click.</p>
       </p>
       <div className ="submitbutton"><Button className="aboutbutton" href="/" > 🧅 Switcht to SKALE on home</Button></div>
       <div className="aboutCo">3. ✔️ Get validated</div>
       <p>
          VoTARO focuses on the governance of Querétaro City, so you must validate that you are a citizen of Queréaro
          to be able to create proposals or vote the governance module. To validate your account, it is necessary to answer this quiz. </p>
        <p> When you answer it correctly, the contract will validate your address and you will receive from 20 to 100 TARO, depending on the answers
         correct.
       </p>
       <div className ="submitbutton"><Button className="aboutbutton" href="Quiz" >✔️ Validate address</Button></div>
       <div className="aboutCo">4. 🗳️ Delegate TARO</div>
       <p>
        The TARO tokens you receive will help you create or vote on urban governance proposals, but first
        You must indicate to the Governor Alpha contract that you want to delegate your TARO tokens to use them as voting power </p>
        <p> Once you delegate you will be able to create new proposals or vote on those that are available. Go to the governance module
          to delegate your TARO.
        </p>
       <div className ="submitbutton"><Button className="aboutbutton" href="ProposalList" >🗳️ Go to Urban Governance</Button></div>
       <div className="aboutCo">5. 🦸🦸‍♂️ Create and Vote on proposals</div>
       <p> The city needs you! generate proposals for activities, public works or needs that you have identified in your community Make proposals,
          vote for them and make them come true to get more TARO. Proposals will be available for 3 days to be voted on. </p>
         <p> You will receive 20 TAROs for each proposal you make, but the reward will only be valid for the first 5 proposals. Then you can create proposals
           but you will not receive TARO for new proposals.
         </p>
       <div className ="submitbutton"><Button className="aboutbutton" href="ProposalList" >🦸🦸‍♂️ Create Proposal</Button></div>
    </div>
      <div className="orange"> Benefits for the city</div>
      <div className="text-medium-left">
      <div className = "aboutC"> ⛓️  Urban governance on blockchain. </div>
         <div className = "aboutC"> 🏙️ Urban processes tracked in Smart Contracts. </div>
         <div className = "aboutC"> 🤖 Automation and Decentralization of services. </div>
         <div className = "aboutC"> 🧙‍♂️ Citizens develop digital skills. </div>
         <div className = "aboutC"> 🤝 Transparent and decentralized urban consensus. </div>
         <div className = "aboutC"> 🧬 Predictive Economy and Urban Development. </div>
      </div>
      <div className ="submitbutton"><Button className="alt2" href="/" >Return to Home</Button></div>
    </div>
  </div>
    :
  <div>
    <div className="about">
      <div className="text-large">🤔 ¿Qué es <img src={logo} alt="VoTARO" width="250px" />?</div>
      <div className="main">Una Aplicación Descentralizada que recompenza con $TARO por proponer, votar y resolver necesidades públicas.</div>
        <div className="text-medium-left">
            <div className="purple">✋ Propón</div>
            <div className="purple">🗳️ Vota</div>
            <div className="purple">🥇 Obtén $TARO</div>
        </div>
      <div className="main">
        <p>VoTaro es una DApp de Ethereum para digitalizar la gobernanza de la ciudad de Querétaro, utilizando contratos inteligentes
          y herramientas descentralizadas de la web 3.0, desarrollada en el  <a className="alt" href="https://showcase.ethglobal.co/scaling/cities-protocol">Scaling Ethereum Hackathon 2021.</a></p>
        <p><ReactPlayer width="100%"  url="https://www.youtube.com/embed/6xgTw1FEuIA"/></p>
        <p>Los ciudadan@s de Querétaro que utilicen VoTARO para proponer, votar y resolver necesidades de sus colonias, serán recompensados con
         <a className="alt" href="https://github.com/zenbitMX/VoTARO/blob/main/contracts/Taro.sol"> $TARO, un token ERC20 </a>
         que sirve para votar estas propuestas y como instrumento para fondear los costos necesarios para resolverlas.</p>
        <p>Las propuestas se registran y gestionan de manera automatizada por el contrato inteligente
        <a className="alt" href="https://github.com/zenbitMX/VoTARO/blob/main/contracts/Taro.sol"> Gobernador Alfa </a>
          una versión del contrato  <a className="alt" href="https://compound.finance/docs/governance?ref=github&user=ajb413&repo=compound-governance-examples"> GovernorAlpha de Compound </a>
          adaptado para gestionar la gobernanza de problemas urbanos.</p>
        <p>Implementa <a className="alt" href="https://skale.network/">SKALE Network,</a> una solución de segunda capa en Ethereum que reduce a 0 las cuotas de gas e incrementa la rapidez de las transacciones sin comprometer la seguridad</p>
      </div>
      <div className="orange">🎯 Objetivo</div>
      <div className="main">
        Convertir a la ciudad de Querétaro en una Organización Autónoma Descentralizada que exista de manera automatizada en internet pero que
        dependa fuertemente del talento humano para ejecutar tareas urbanas o virtuales que los contratos inteligentes no puedan completar por si mismo.</div>
      <div className="orange">🧰 ¿Qué necesito para obtener $TARO?</div>
      <div className="main">Necesitas realizar 5 actividades para obtener TARO.</div>
       <div className="text-medium-left">
          <div className="aboutC">1. 🦊 Descargar Metamask</div>
          <div className="aboutC" >2. 🧅 Cambiar wallet a red Skale </div>
          <div className="aboutC">3. ✔️ Validar cuenta</div>
          <div className="aboutC" >4. 🗳️ Delegar TARO para votar</div>
          <div className="aboutC" >5. 🦸🦸‍♂️ Crear y votar propuestas </div>
        </div>
      <div className="main">
      <div className="aboutCo">1. 🦊 Descargar Metamask</div>
       <p>VoTARO utiliza herramientas de la web 3.0 para que las personas puedan interactuar con contratos inteligentes
         y algoritmos de manera segura, dandoles control completo sobre tus tokens TARO.</p>
      <p>Una wallet web 3.0 de ethereum cómo Metamask, te permitirá usar los contratos de VoTARO y obtener TARO al proponer necesidades de tu colonia.
        Si aún no tienes una Wallet de Metamask, puedes descargarla en este botón</p>
        <div className ="submitbutton"><Button className="aboutbutton" href="https://metamask.io" > 🦊 Descargar Cartera</Button></div>

      <div className="aboutCo">2. 🧅 Cambiar wallet a red Skale</div>
       <p>
         Para usar aplicaciones descentralizadas de Ethereum, necesitas pagar las "cuotas de gas" de los contratos inteligentes. Estas suelen caras
         y restrictivas para nuevos usuarios. VoTARO implementa SKALE, una solución de segunda capa en Ethereum que reduce los costos de gas a 0. Esto permite
         que nuevos usuarios puedan interactuar con los contratos de VoTARO sin necesidad de pagar cuotas de gas, permitiendo implementaciones de esta tecnología
         a gran escala como en una ciudad. Ve al Inicio para confirgurar tu cartera con solo presionar un boton.
       </p>
       <div className ="submitbutton"><Button className="aboutbutton" href="/" > 🧅 Cambiar a Skale en Inicio</Button></div>
       <div className="aboutCo">3. ✔️ Validar que eres queretan@</div>
       <p>
         VoTARO se enfoca en la gobernanza de la ciudad de Querétaro, por lo que deberas validar que eres ciudadan@ de Queréaro.
         para poder crear propuestas o votar el módulo de gobernanza. Para validar tu cuenta, es necesario contestar este cuestionario</p>
       <p>Al contestarlo coorrectamente el contrato validará tu dirección y recibiras de 20 a 100 TARO, dependiendo de las respuestas
        correctas.
       </p>
       <div className ="submitbutton"><Button className="aboutbutton" href="Quiz" >✔️ Validar cuenta</Button></div>
       <div className="aboutCo">4. 🗳️ Delegar TARO para votar</div>
       <p>
       Los tokens TARO que recibas te servirán para crear o votar propuestas de gobernanza urbana, pero primero
       debes indicarle al contrato Gobernador Alpha, que deseas delegar tus tokens TARO para usarlos como poder de voto</p>
       <p>Una vez que los delegues podrás crear nuevas propuestas o votar en las que estén disponibles. Ve al modulo de gobernanza
         para delegar tus TARO.
       </p>
       <div className ="submitbutton"><Button className="aboutbutton" href="ProposalList" >🗳️ Delegar TARO para votar</Button></div>
       <div className="aboutCo">5. 🦸🦸‍♂️ Realizar y votar propuestas</div>
       <p>¡La ciudad te necesita! genera propuestas de actividades, obras públicas o necesidades que hayas identificado en tu comunidad Realiza propuestas,
         vota por ellas y hazlas realidad para obtener más TARO. Las propuestas estarán disponibles por 3 días para ser votadas.</p>
        <p>Recibirás 20 TARO por cada propuesta que realices, pero la recompensa solo será valida por las primeras 5 propuestas. Después puedes crear propuestas
          pero no recibirás TARO por crearlas.
        </p>
       <div className ="submitbutton"><Button className="aboutbutton" href="ProposalList" >🦸🦸‍♂️ Crear propuestas</Button></div>
    </div>
      <div className="orange"> Beneficios para la ciudad</div>
      <div className="text-medium-left">
        <div className="aboutC">⛓️ Registro de gobernanza urbana en blockchain.</div>
        <div className="aboutC" >🏙️ Procesos urbanos en Contratos Inteligentes.</div>
        <div className="aboutC">🤖 Automatización y Descentralización de servicios.</div>
        <div className="aboutC" >🧙‍♂️ Ciudadanos desarrollan habilidades digitales.</div>
        <div className="aboutC" >🤝 Consenso urbano transparente y descentralizado.</div>
        <div className="aboutC">🧬 Economía y Desarrollo Urbano Predictivos.</div>
      </div>
      <div className ="submitbutton"><Button className="alt2" href="/" >Regresar al inicio</Button></div>
    </div>
  </div>
      }
    </div>
  );
};

export default About;
