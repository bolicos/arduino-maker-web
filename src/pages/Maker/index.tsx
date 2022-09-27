import React, { useState } from "react";
import { Card, Col, Container, Row, Stack } from "react-bootstrap";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import Header from "#/components/Header";
import Block from "#/components/Block";
import Board from "#/components/Board";
import { BlockTypesEnum } from "#/models/blocks";

import "./index.scss";

export interface StateMaker {
  code: string;
}

const Maker: React.FC = () => {
  const [state, setState] = useState<StateMaker>({
    code: "",
  });

  const blocks = [BlockTypesEnum.SMART_MOTORS, BlockTypesEnum.IF];

  const handleCode = () => {
    setState(prev => ({
      ...prev,
      code: "",
    }));
  };

  return (
		<Container fluid>
			<Row>
				<Header title="Projeto Maker" />
			</Row>
			<Row className="justify-content-md-center">
				<DndProvider backend={HTML5Backend}>
					<Col xs={2}>
						<Card className="text-center maker-fluid">
							<Card.Header>{"Componentes"}</Card.Header>
							<Card.Body>
								<Card.Title>{"Aqui tem alguns componentes"}</Card.Title>
								<Card.Text>{"Cada componentes representa um Bloco do Arduino."}</Card.Text>
								<Container>
									<Row>
										<Col>
											<Stack gap={3}>
												{blocks.map(block => (
													<Block block={block} setState={setState} onClick={handleCode} />
												))}
											</Stack>
										</Col>
									</Row>
								</Container>
							</Card.Body>
							<Card.Footer className="text-muted">
								<br />
							</Card.Footer>
						</Card>
					</Col>

					<Col xs={6}>
						<Card className="text-center maker-fluid">
							<Card.Header>{"Lousa"}</Card.Header>
							<Card.Body>
								<Board />
							</Card.Body>
							<Card.Footer className="text-muted">
								<br />
							</Card.Footer>
						</Card>
					</Col>
				</DndProvider>

				<Col xs={4}>
					<Card className="text-center maker-fluid">
						<Card.Header>{"Codigo Arduino"}</Card.Header>
						<Card.Body>{state.code}</Card.Body>
						<Card.Footer className="text-muted">
							<br />
						</Card.Footer>
					</Card>
				</Col>
			</Row>
		</Container>
  );
};

export default Maker;
