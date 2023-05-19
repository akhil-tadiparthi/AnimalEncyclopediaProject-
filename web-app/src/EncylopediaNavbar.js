import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import React from 'react';

export class EncylopediaNavbar extends React.Component {
    render() {
      return (
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="/">Encylopedia of Life</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Nav className="me-auto">
                <Nav.Link href="/about">About</Nav.Link>
              </Nav>
          </Container>
        </Navbar>
      );
    }
  }