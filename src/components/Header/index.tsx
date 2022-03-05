import React from "react";
import { Navbar, Container, Stack, Figure } from "react-bootstrap";
import ifrsImage from "@/assets/images/ifrs.png";
import bottomlessEngineImage from "@/assets/images/bottomless-engine.png";
import tuftsImage from "@/assets/images/tufts.png";

import "./index.scss";

interface Props {
  title: string;
}
const Header: React.FC<Props> = ({ title }) => {
  const screenWidth = screen.width;
  const ifrsLink = "https://www.poa.ifrs.edu.br/";
  const tuftsLink = "https://www.tufts.edu";
  const smartMotorsLink = "https://sites.google.com/tuftsceeo.org/smartmotors/home";

  return (
		<Navbar data-testid="navbar" collapseOnSelect expand="lg" bg="secondary" variant="light" >
			<Container>
				<h1 className="title" data-testid="title">{title}</h1>

				{screenWidth > 540
				  ? (<Stack gap={2} className="mx-auto" direction="horizontal">
						<Navbar.Brand data-testid="navBrand" className="d-flex justify-content-between">
							<a
								href={ifrsLink}
								target="_blank"
								rel="noopener noreferrer"
							>
								<Figure>
									<Figure.Image
										width={250}
										height={250}
										alt="IFRS Logo"
										className="round"
										data-testid="ifrsImage"
										src={ifrsImage}
									/>
								</Figure>
							</a>

						</Navbar.Brand>


						<a
							href={tuftsLink}
							target="_blank"
							rel="noopener noreferrer"
						>
							<Figure>
								<Figure.Image
									width={250}
									height={250}
									alt="Tufts University Logo"
									data-testid="tuftsImage"
									src={tuftsImage}
								/>
							</Figure>
						</a>

						<a
							href={smartMotorsLink}
							target="_blank"
							rel="noopener noreferrer"
						>
							<Figure>
								<Figure.Image
									width={100}
									height={100}
									alt="Smart Motors Project"
									data-testid="bottomlessEngineImage"
									src={bottomlessEngineImage}
								/>

							</Figure>
						</a>
					</Stack>)
				  : (
						<Stack gap={2} className="mx-auto">
							<Navbar.Brand data-testid="navBrand" className="d-flex justify-content-center">
								<a
									href={ifrsLink}
									target="_blank"
									rel="noopener noreferrer"
								>
									<Figure>
										<Figure.Image
											width={150}
											height={150}
											alt="IFRS Logo"
											className="round"
											data-testid="ifrsImage"
											src={ifrsImage}
										/>
									</Figure>
								</a>

								<a
									href={tuftsLink}
									target="_blank"
									rel="noopener noreferrer"
								>
									<Figure>
										<Figure.Image
											width={150}
											height={150}
											alt="Tufts University Logo"
											data-testid="tuftsImage"
											src={tuftsImage}
										/>
									</Figure>
								</a>

								<a
									href={smartMotorsLink}
									target="_blank"
									rel="noopener noreferrer"
								>
									<Figure>
										<Figure.Image
											width={100}
											height={100}
											alt="Smart Motors Project"
											data-testid="bottomlessEngineImage"
											src={bottomlessEngineImage}
										/>
									</Figure>
								</a>

							</Navbar.Brand>
						</Stack>
				  )}
			</Container>
		</Navbar >
  );
};

export default Header;
