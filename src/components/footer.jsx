import React, { Component } from "react";
import {
  Container,
} from "react-bootstrap";

class Footer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isVisible: false,
    };
  }

  render() {
    return (
      <Container fluid>
        <footer>
          Images brought to you by <a href="https://unsplashunsplash.com">Unsplash</a>
        </footer>
      </Container>
    );
  }
}

export default Footer;
