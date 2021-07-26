import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
      <LinkContainer to='/'>
        <Navbar.Brand><i class="fa fa-book" aria-hidden="true"></i> Biblioteca</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer to="/categorias">
            <Nav.Link><i class="fa fa-bookmark" aria-hidden="true"></i> Categorias</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/personas">
            <Nav.Link><i class="fa fa-user-circle-o" aria-hidden="true"></i> Personas</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;