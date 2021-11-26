import Header from "@/components/Header";
import React, { useState } from "react";
import { Card, Col, Container, Row, Stack } from "react-bootstrap";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Board } from "../../components/Blocks/Board";
import { Block } from "../../components/Blocks/Block";
import "./index.scss";
import { ComponentsDrop } from "#/src/components/Blocks/ComponentsDrop";

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

        <Col xs={9}>
              <DndProvider backend={HTML5Backend}>
                <div style={{ overflow: 'hidden', clear: 'both' }}>
                  <ComponentsDrop />
                </div>
              </DndProvider>

        </Col>

        <Col xs={3}>
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
