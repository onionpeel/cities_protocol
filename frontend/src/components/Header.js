import { useContext} from 'react'
import {NavLink} from 'react-router-dom'
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import { LanguageContext } from '../contexts/LanguageContext';
import logo from '../assets/Logo.svg';


const Header = () => {
  let [isEnglish, setLoc] = useContext(LanguageContext);

  const handleOnSelect = () => {
    setLoc();
    window.location.reload();
  };

  return (
  <div>
      {isEnglish === 'english' ?

        <div >
          <Navbar collapseOnSelect fixed="top" expand="sm">
            <Navbar.Brand href="/Home"><img src={logo} alt="VoTARO" width="150px" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
             <NavDropdown drop="left"  className="language" title="🌐" >
                 <NavDropdown.Item onSelect={handleOnSelect}>Español</NavDropdown.Item>
                </NavDropdown>
              <Nav >
                <NavLink className="NavLink" to="/About">🤔 About </NavLink>
                <NavLink className="NavLink" to="/Quiz">✔️ Validate</NavLink>
                <NavLink className="NavLink" to="/ProposalList">🗳️ Vote </NavLink>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          </div>
      :
      <div>
        <Navbar className="Nav" fixed="top" expand="sm">
        <Navbar.Brand href="/Home"><img src={logo} alt="VoTARO" width="150px" />
            </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
          <NavDropdown drop="left" className="language" title="🌐">
              <NavDropdown.Item onSelect={handleOnSelect}>English</NavDropdown.Item>
              </NavDropdown>
            <Nav>
              <NavLink className="NavLink" to="/About">🤔 ¿Qué es VoTARO?</NavLink>
              <NavLink className="NavLink" to="/Quiz">✔️ Validar</NavLink>
              <NavLink className="NavLink" to="/ProposalList">🗳️ Votar</NavLink>
            </Nav>
          </Navbar.Collapse>
          </Navbar>
        </div>


      }
    </div>
  );
};


export default Header;
