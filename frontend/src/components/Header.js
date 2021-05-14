import { useContext, useState, useEffect } from 'react'
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import logo from '../assets/Logo.svg';
import { LanguageContext } from '../contexts/LanguageContext';

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
            <Navbar.Brand  className="alt" href="/Home"><a className="Vo">Vo</a><a className="TARO">TARO</a>
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="responsive-navbar-nav" />

            <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
             <NavDropdown title="🌐">
                 <NavDropdown.Item className="alt" onSelect={handleOnSelect}>Español</NavDropdown.Item>
                </NavDropdown>
              <Nav>
                <Nav.Link className="alt" href="/About">🤔 about VoTARO</Nav.Link>
                <Nav.Link className="alt" href="/About">✔️ Get Validaded</Nav.Link>
                <Nav.Link className="alt" href="/ProposalList">🗳️ Use TARO</Nav.Link>
                <Nav.Link className="alt" href="/CreateProposal">🦸🦸‍♂️ New Proposal</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          </div>
      :
      <div>
        <Navbar className="Nav" fixed="top" expand="sm">
          <Navbar.Brand className="alt" href="/Home"><a className="Vo">Vo</a><a className="TARO">TARO</a>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
          <NavDropdown className="alt" title="🌐">
              <NavDropdown.Item className="alt" onSelect={handleOnSelect}>English</NavDropdown.Item>
              </NavDropdown>
            <Nav>
              <Nav.Link className="alt" href="/About">🤔 ¿Qué es VoTARO?</Nav.Link>
              <Nav.Link className="alt" href="/About">✔️ Validar cuenta</Nav.Link>
              <Nav.Link className="alt" href="/ProposalList">🗳️ Usa TARO</Nav.Link>
              <Nav.Link className="alt" href="/CreateProposal">🦸🦸‍♂️ Nueva Propuesta</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          </Navbar>
        </div>


      }
    </div>
  );
};


export default Header;
