import React from 'react';
import './App.css';
import {
  Container,
  Row,
  Col
} from "reactstrap";
import Login from './components/Login'

function App() {
  return (
    <div className="App">
      <Container>
        <Row>
          <Col></Col>
          <Col xs="6">
            <Login />
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
