import React from "react";
import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import PathFinder from "./Component/PathFinder";

function App() {
  return (
    <div className="App">
      <Navbar bg="light" expand="md">
        <Navbar.Brand href="#home">PathFinder</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown title="Algorithms" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Dijkstra</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Button variant="outline-success">Start!</Button>
          <Button variant="outline-success">Clear Board</Button>
          <Button variant="outline-success">Clear wall</Button>
          <NavDropdown title="Speed" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Fast</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Normal</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Slow</NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Navbar>
      <PathFinder></PathFinder>
    </div>
  );
}

export default App;
