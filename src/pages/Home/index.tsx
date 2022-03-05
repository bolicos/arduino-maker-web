import React from "react";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Container, Image, Nav, Navbar, NavDropdown, Offcanvas, Row } from "react-bootstrap";
import { ROUTES as R, LINKS } from "#/src/constants";
import arduinoLogo from "@/assets/images/arduino-logo.png";
import arduinoMaker from "@/assets/images/arduino-maker.jpg";
import arduinoCommunity from "@/assets/images/arduino-community.png";

import style from "./style.module.scss";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
		<Container fluid>
			<Row>
				<Navbar bg="light" expand={false}>
					<Container fluid>
						<Navbar.Brand href="#">{"Arduino IFRS"}</Navbar.Brand>
						<Navbar.Toggle aria-controls="offcanvasNavbar" />
						<Navbar.Offcanvas id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" placement="end">
							<Offcanvas.Header closeButton>
								<Offcanvas.Title id="offcanvasNavbarLabel">{"Menu Lateral"}</Offcanvas.Title>
							</Offcanvas.Header>
							<Offcanvas.Body>
								<Nav className="justify-content-end flex-grow-1 pe-3">
									<Nav.Link href={R.HOME()}>{"Home"}</Nav.Link>
									<NavDropdown title="Produtos" id="products">
										<NavDropdown.Item href={R.CREATE()}>{"Arduino Criação"}</NavDropdown.Item>
										<NavDropdown.Item href={R.MAKER()}>{"Arduino Maker"}</NavDropdown.Item>
										<NavDropdown.Divider />
										<NavDropdown.Item href="#exemplo">{"Exemplo de outra coisa"}</NavDropdown.Item>
									</NavDropdown>
									<NavDropdown title="Vamos Começar" id="getStarted">
										<NavDropdown.Item target="_blank" href={LINKS.GITHUB()}>
											{"Github"}
										</NavDropdown.Item>
										<NavDropdown.Item target="_blank" href={LINKS.NOTION()}>
											{"Notion"}
										</NavDropdown.Item>
										<NavDropdown.Item target="_blank" href={LINKS.DOCS()}>
											{"Docs"}
										</NavDropdown.Item>
									</NavDropdown>
								</Nav>
							</Offcanvas.Body>
						</Navbar.Offcanvas>
					</Container>
				</Navbar>
			</Row>

			<br />

			<Row className={clsx(["justify-content-md-center", style.row])}>
				<Col xs={12} md={4}>
					<Card className={clsx([style.card])}>
						<Card.Img variant="top" src={arduinoMaker} />
						<Card.Body>
							<Card.Title>{"Project Create"}</Card.Title>
							<Card.Text>{"Este é o prejeto para criação de codigo em C para professores."}</Card.Text>
							<Button variant="primary" onClick={() => navigate(R.CREATE())}>
								{"Projeto Create"}
							</Button>
						</Card.Body>
					</Card>
				</Col>

				<Col xs={12} md={4}>
					<Image className={clsx([style.card, style.centralImage])} src={arduinoLogo} thumbnail />
				</Col>

				<Col xs={12} md={4}>
					<Card className={clsx([style.card])}>
						<Card.Img variant="top" src={arduinoCommunity} />
						<Card.Body>
							<Card.Title>{"Project Maker"}</Card.Title>
							<Card.Text>{"Este é o prejeto para criação de lógica de promação para os alunos."}</Card.Text>
							<Button variant="primary" onClick={() => navigate(R.MAKER())}>
								{"Projeto Maker"}
							</Button>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
  );
};

export default Home;
