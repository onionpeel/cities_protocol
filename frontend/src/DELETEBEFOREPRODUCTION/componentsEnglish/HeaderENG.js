import {LinkContainer} from 'react-router-bootstrap';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';

const Header = () => {
  return (
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
            <NavDropdown title="Eng" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Spanish</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
