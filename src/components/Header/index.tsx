import React from "react";
import { Image, Navbar, Button, Container } from "react-bootstrap";
import arduinoImage from "@/assets/images/arduino.png";
import "./index.scss";

const Header: React.FC = () => {

  return (

    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand className="me-auto">
          <Image
            src={arduinoImage}
            rounded
            className="d-inline-block align-top spacing"
            alt="Logo"
            width="50px"
            height="50px" />
          {' '}
          Arduino Maker
        </Navbar.Brand>

        <Button variant="outline-secondary" className="spacing">Importar</Button>{' '}
        <Button variant="outline-success" className="spacing">Baixar</Button>{' '}
        <Button variant="outline-danger" className="spacing">Excluir Tudo</Button>{' '}
      </Container>
    </Navbar>
  );
};

export default Header;
