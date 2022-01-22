import React from "react";
import { Spinner } from "react-bootstrap";
import "./index.scss";

export const Loading: React.FC = () => {
	return (
		<div className="alignMe">
			<Spinner animation="border" variant="dark" />
		</div>
	);
};

export default Loading;
