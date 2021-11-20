import React, { useState } from "react";
import { Container, Row, Col, Card, Stack } from "react-bootstrap";
import Header from "@/components/Header";
import "./index.scss";

interface State {
  code: string;
}

const Home: React.FC = () => {
  const [state, setState] = useState<State>({
    code: ""
  });

  const handleCode = () => {
    setState(prev => ({
      code: ""
    }));
  }

  return (
    <Container fluid>
      <Row>
        <Header />
      </Row>
      <Row className="justify-content-md-center">

        <Col xs={2}>
          <Card className="text-center home-fluid">
            <Card.Header>Componentes</Card.Header>
            <Card.Body>
              <Card.Title>Aqui tem alguns componentes</Card.Title>
              <Card.Text>Cada compenentes representa um Bloco do Arduino.</Card.Text>
              <Container >
                <Row>
                  <Col>
                    <Stack gap={3}>
                      <div className="bg-light border" onClick={handleCode}>Primeiro componente</div>
                      <div className="bg-light border" onClick={handleCode}>Segundo componente</div>
                      <div className="bg-light border" onClick={handleCode}>Terceiro componente</div>
                    </Stack>
                  </Col>
                </Row>
              </Container>
            </Card.Body>
            <Card.Footer className="text-muted"><br /></Card.Footer>
          </Card>
        </Col>

        <Col xs={6}>
          <Card className="text-center home-fluid">
            <Card.Header>Lousa</Card.Header>
            <Card.Body>

            </Card.Body>
            <Card.Footer className="text-muted"><br /></Card.Footer>
          </Card>
        </Col>

        <Col xs={4}>
          <Card className="text-center home-fluid">
            <Card.Header>Codigo Arduino</Card.Header>
            <Card.Body>
              {state.code}
            </Card.Body>
            <Card.Footer className="text-muted"><br /></Card.Footer>
          </Card>
        </Col>

      </Row>
    </Container>
  );
};

export default Home;
