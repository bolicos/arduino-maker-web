import React, { useState } from "react";
import { Card, Col, Container, Row, Stack } from "react-bootstrap";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Header from "@/components/Header";
import Block from "@/components/Block";
import Board from "@/components/Board";
import { BlockTypes } from '@/models/blocks';

import "./index.scss";


interface State {
  code: string;
}

const Home: React.FC = () => {
  const [state, setState] = useState<State>({
    code: ""
  });

  const blocks = [
    BlockTypes.SMART_MOTORS,
    BlockTypes.IF,
  ];

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

        <DndProvider backend={HTML5Backend}>

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
                        {blocks.map(block => <Block block={block} onClick={handleCode} />)}
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
                <Board />
              </Card.Body>
              <Card.Footer className="text-muted"><br /></Card.Footer>
            </Card>
          </Col>

        </DndProvider>

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
