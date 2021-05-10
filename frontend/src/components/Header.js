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

        <div className="Nav">
          <Navbar>
            <Navbar.Brand href="/Home">
            <img src={logo} className="nohover" alt="VoTARO" width="150px" />
            </Navbar.Brand>
            <NavDropdown className="alt3"  title="🌐">
                 <NavDropdown.Item className="alt3" onSelect={handleOnSelect}>Español</NavDropdown.Item>
                </NavDropdown>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
              <Nav>
                <Nav.Link className="alt3" href="/About">🤔 What is VoTARO?</Nav.Link>
                <Nav.Link className="alt3" href="/ProposalList">🥇 Use TARO</Nav.Link>
                <Nav.Link className="alt3" href="/CreateProposal">🗳️ New Proposal</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          </div>
      :
      <div>
        <Navbar className="Nav">
          <Navbar.Brand className="" href="/Home">
          <img src={logo} className="nohover" alt="VoTARO" width="150px" />
          </Navbar.Brand>
          <NavDropdown className="alt3" title="🌐">
              <NavDropdown.Item className="alt3" onSelect={handleOnSelect}>English</NavDropdown.Item>
              </NavDropdown>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
            <Nav>
              <Nav.Link className="alt3" href="/About">🤔 ¿Qué es VoTARO?</Nav.Link>
              <Nav.Link className="alt3" href="/ProposalList">🥇 Usa TARO</Nav.Link>
              <Nav.Link className="alt3" href="/CreateProposal">🗳️ Nueva Propuesta</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          </Navbar>
        </div>


      }
    </div>
  );
};


export default Header;
