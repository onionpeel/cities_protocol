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
            <img src={logo} alt="Procotol Cities" width="150px" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
              <Nav>
                <Nav.Link  href="/About">What is VoTARO?</Nav.Link>
                <Nav.Link  href="/ProposalList">🥇 0</Nav.Link>
                <Nav.Link  href="/CreateProposal">🗳️ 0</Nav.Link>
                <NavDropdown  title="🌐Language" id="basic-nav-dropdown">
                 <NavDropdown.Item className="lan" onSelect={handleOnSelect}>Español</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          </div>

      :
      <div>
        <Navbar className="Nav">
          <Navbar.Brand href="/Home">
          <img src={logo} alt="Procotol Cities" width="150px" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
            <Nav>
              <Nav.Link href="/About">¿Qué es VoTARO?</Nav.Link>
              <Nav.Link style={{color: 'white'}} href="/ProposalList">🥇 0</Nav.Link>
              <Nav.Link style={{color: 'white'}} href="/CreateProposal">🗳️ 0</Nav.Link>
              <NavDropdown style={{color: '#fff'}} title="🌐Idioma"id="basic-nav-dropdown">
              <NavDropdown.Item className="lan" onSelect={handleOnSelect}>English</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
          </Navbar>
        </div>


      }
    </div>
  );
};


export default Header;
