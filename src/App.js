import React from 'react';

import Header from './components/header'
import Footer from './components/footer'
import { MemoryRouter, Switch, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Gallery from './components/gallery'
// import './App.css';
import { Row } from 'react-bootstrap';

const Home = () => <Gallery />;

const App = () => (
  <MemoryRouter>
    <Container fluid>
      <Row>
        <Header />
        <Switch>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        <Footer/>
      </Row>
    </Container>
  </MemoryRouter>
);

export default App;
