import React from "react";
import { useNavigate } from "react-router";
import { Image, Navbar, Button, Container } from "react-bootstrap";
import { ROUTES as R } from "#/src/constants"
import arduinoImage from "@/assets/images/arduino.png";

import "./index.scss";

interface Props {
  title: string;
}
const Header: React.FC<Props> = ({ title }) => {
  const navigate = useNavigate();

  return (

    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand className="me-auto">
          <Image
            src={arduinoImage}
            className="d-inline-block align-top spacing"
            onClick={() => navigate(R.HOME())}
            rounded
            alt="Logo"
            width="50px"
            height="50px"
          />
          {' '}
          {title}
        </Navbar.Brand>

        <Button variant="outline-secondary" className="spacing">Importar</Button>{' '}
        <Button variant="outline-success" className="spacing">Baixar</Button>{' '}
        <Button variant="outline-danger" className="spacing">Excluir Tudo</Button>{' '}
      </Container>
    </Navbar>
  );
};

export default Header;
