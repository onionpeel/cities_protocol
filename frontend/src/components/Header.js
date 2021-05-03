import { useContext } from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import { LanguageContext } from '../contexts/LanguageContext';

const Header = () => {
  let {isEnglish, setIsEnglish} = useContext(LanguageContext);

  const handleOnSelect = () => {
    setIsEnglish(!isEnglish);
  };

  return (
    <div>
      {isEnglish

      ?

      <div>
        <Navbar bg="light" expand="lg">
          <LinkContainer to="/">
            <Navbar.Brand>Cities Protocol</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
            <Nav>
              <LinkContainer to="/about">
                <Nav.Link>How do I get TARO</Nav.Link>
              </LinkContainer>
              <Nav.Link href="#home">0</Nav.Link>
              <Nav.Link href="#link">0/8</Nav.Link>
              <NavDropdown title="Language" id="basic-nav-dropdown">
                <NavDropdown.Item onSelect={handleOnSelect}>Spanish</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>

      :

      <div>
        <Navbar bg="light" expand="lg">
          <LinkContainer to="/">
            <Navbar.Brand>Cities Protocol ESP ESP ESP ESP ESP ESP ESP</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
            <Nav>
              <LinkContainer to="/about">
                <Nav.Link>How do I get TARO</Nav.Link>
              </LinkContainer>
              <Nav.Link href="#home">0</Nav.Link>
              <Nav.Link href="#link">0/8</Nav.Link>
              <NavDropdown title="Language" id="basic-nav-dropdown">
                <NavDropdown.Item onSelect={handleOnSelect}>English</NavDropdown.Item>
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
