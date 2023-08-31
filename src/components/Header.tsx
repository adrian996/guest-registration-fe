import "./Header.css";
import logo from "../assets/logo.svg";
import symbol from "../assets/symbol.svg";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <>
      <Navbar className="navbar" bg="light" expand="lg">
        <Container>
          <Navbar.Brand>
            <img
              src={logo}
              width="auto"
              height="auto"
              className="d-inline-block align-top"
              alt="Logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto menu">
              <div className="wrapper">
                <Nav.Link as={NavLink} to="/home">
                  AVALEHT
                </Nav.Link>
              </div>
              <div className="wrapper">
                <Nav.Link as={NavLink} to="/event-add">
                  ÜRITUSE LISAMINE
                </Nav.Link>
              </div>
            </Nav>
            <img
              src={symbol}
              width="auto"
              height="auto"
              className="d-inline-block align-top"
              alt="Symbol"
            />
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
    </>
  );
}
