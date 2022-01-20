import React from "react";
import { useNavigate } from "react-router";
import { Image, Navbar, Button, Container, Stack } from "react-bootstrap";
import { ROUTES as R } from "#/src/constants";
import arduinoImage from "@/assets/images/arduino.png";

import "./index.scss";

interface Props {
	title: string;
}
const Header: React.FC<Props> = ({ title }) => {
	const navigate = useNavigate();
	const screenWidth = screen.width;

	return (
		<Navbar data-testid="navbar" collapseOnSelect expand="lg" bg="dark" variant="dark">
			<Container>

				<Stack gap={2} className="col-md-10 mx-auto" direction="horizontal">
					<Navbar.Brand data-testid="navBrand" className="me-auto justify-content-center">
						<Image
							data-testid="navImage"
							src={arduinoImage}
							className="d-inline-block align-top"
							onClick={() => navigate(R.HOME())}
							rounded
							alt="Logo"
							width="50px"
							height="50px"
						/>{" "}
						{title}
					</Navbar.Brand>

					{screenWidth > 540 &&
            (<>
            	<Button data-testid="navImport" variant="outline-secondary">
            		{"Importar"}
            	</Button>
            	<Button data-testid="navDownload" variant="outline-success">
            		{"Baixar"}
            	</Button>
            	<Button data-testid="navDelete" variant="outline-danger">
            		{"Excluir Tudo"}
            	</Button>
            </>)}

				</Stack>


			</Container>

			{screenWidth <= 540 &&
        (
        	<>
        		<Stack gap={2} className="col-md-8 mx-auto">
        			<Button data-testid="navImport" variant="outline-secondary">
        				{"Importar"}
        			</Button>
        			<Button data-testid="navDownload" variant="outline-success">
        				{"Baixar"}
        			</Button>
        			<Button data-testid="navDelete" variant="outline-danger">
        				{"Excluir Tudo"}
        			</Button>
        		</Stack>
        	</>
        )}
		</Navbar >
	);
};

export default Header;
