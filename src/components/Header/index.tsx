import React from "react";
import { useNavigate } from "react-router";
import { Image, Navbar, Button, Container } from "react-bootstrap";
import { ROUTES as R } from "#/src/constants";
import arduinoImage from "@/assets/images/arduino.png";

import "./index.scss";

interface Props {
	title: string;
}
const Header: React.FC<Props> = ({ title }) => {
	const navigate = useNavigate();

	return (
		<Navbar data-testid="navbar" collapseOnSelect expand="lg" bg="dark" variant="dark">
			<Container>
				<Navbar.Brand data-testid="navBrand" className="me-auto">
					<Image
						data-testid="navImage"
						src={arduinoImage}
						className="d-inline-block align-top spacing"
						onClick={() => navigate(R.HOME())}
						rounded
						alt="Logo"
						width="50px"
						height="50px"
					/>{" "}
					{title}
				</Navbar.Brand>
				<Button data-testid="navImport" variant="outline-secondary" className="spacing">
					Importar
				</Button>{" "}
				<Button data-testid="navDownload" variant="outline-success" className="spacing">
					Baixar
				</Button>{" "}
				<Button data-testid="navDelete" variant="outline-danger" className="spacing">
					Excluir Tudo
				</Button>{" "}
			</Container>
		</Navbar>
	);
};

export default Header;
