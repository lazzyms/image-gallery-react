import React, { Component } from "react";
import {
  Navbar,
  Container,
} from "react-bootstrap";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isVisible: false,
    };
  }

  render() {
    return (
      <Container fluid>
        <Navbar
          collapseOnSelect
          expand="lg"
          bg="dark"
          variant="dark"
          className="justify-content-between"
        >
          <Navbar.Brand href="/">Galería by Maulik</Navbar.Brand>
          
        </Navbar>
      </Container>
    );
  }
}

export default Header;
