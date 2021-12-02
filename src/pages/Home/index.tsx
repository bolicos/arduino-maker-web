import Board from "#/src/components/Board";
import Block from "@/components/Block";
import Header from "@/components/Header";
import { blocks, BlockTypes } from '@/models/blocks';
import React, { useState } from "react";
import { Card, Col, Container, Row, Stack } from "react-bootstrap";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
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

        <DndProvider backend={HTML5Backend}>

          <Col xs={2}>
            <Card className="text-center home-fluid">
              <Card.Header>Componentes</Card.Header>
              <Card.Body>
                <Card.Title>Aqui tem alguns componentes</Card.Title>
                <Card.Text>Cada componentes representa um Bloco do Arduino.</Card.Text>
                <Container >
                  <Row>
                    <Col>
                      <Stack gap={3}>
                        {blocks.map((block) => {
                          return <Block id={block.id} type={block.type} />
                        })}
                      </Stack>
                    </Col>
                  </Row>
                </Container>
              </Card.Body>
              <Card.Footer className="text-muted"><br /></Card.Footer>
            </Card>
          </Col>

          <Col xs={6}>
            <Board></Board>
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
