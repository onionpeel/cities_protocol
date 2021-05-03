import { useContext, useState } from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import { LanguageContext } from '../contexts/LanguageContext';

const Header = () => {
  const [expanded, setExpanded] = useState(false);
  let {isEnglish, setIsEnglish} = useContext(LanguageContext);

  const handleOnSelect = () => {
    setIsEnglish(!isEnglish);
  };

  return (
    <div>
      {isEnglish

      ?

      <div>
        <Navbar bg="light" expand="lg" expanded={expanded}>
          <LinkContainer to="/">
            <Navbar.Brand>VoTaro</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setExpanded(expanded ? false : "expanded")}
          />
          <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
            <Nav>
              <LinkContainer to="/about">
                <Nav.Link onClick={() => setExpanded(false)}>How do I get TARO?</Nav.Link>
              </LinkContainer>
              <NavDropdown title="Language" id="basic-nav-dropdown">
                <NavDropdown.Item
                  onClick={() => setExpanded(false)}
                  onSelect={handleOnSelect}
                  >
                  Spanish
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>

      :

      <div>
        <Navbar bg="light" expand="lg" expanded={expanded}>
          <LinkContainer to="/">
            <Navbar.Brand>VoTaro ESP ESP ESP ESP ESP ESP ESP</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setExpanded(expanded ? false : "expanded")}
          />
          <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
            <Nav>
              <LinkContainer to="/about">
                <Nav.Link onClick={() => setExpanded(false)}>How do I get TARO?</Nav.Link>
              </LinkContainer>
                <NavDropdown title="Language" id="basic-nav-dropdown">
                  <NavDropdown.Item
                    onClick={() => setExpanded(false)}
                    onSelect={handleOnSelect}
                    >
                    English
                  </NavDropdown.Item>
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
