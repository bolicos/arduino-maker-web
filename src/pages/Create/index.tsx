import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { Card, Col, Container, Form, ProgressBar, Row, Button } from "react-bootstrap";

import Header from "@/components/Header";
import { Class } from "@/models/classes/classes";
import { BFF } from "@/services/bff/routes";

import style from "./style.module.scss";

interface State {
	sensors: Array<Class>;
	actuators: Array<Class>;
	fixed: Class;
	code: string;
	sensor: string;
	actuator: string;
	quantitySensor: string;
	quantityActuator: string;
}

const Create: React.FC = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [state, setState] = useState<State>({
		sensors: [],
		actuators: [],
		fixed: {
			id: "",
			name: "",
			code: "",
			include: "",
			type: "",
			quantity: 0,
		},
		code: "",
		sensor: "",
		actuator: "",
		quantitySensor: "",
		quantityActuator: "",
	});

	const quantitySelect = ["1", "2", "3"];

	const fetchBlocks = useCallback(async () => {
		setLoading(true);

		const actuators: Array<Class> = (await BFF.ACTUATORS()).data;
		const sensors: Array<Class> = (await BFF.SENSORS()).data;
		const fixed: Class = (await BFF.FIXED()).data;

		setState((prev) => ({
			...prev,
			actuators: actuators,
			sensors: sensors,
			fixed: fixed,
		}));

		setLoading(false);
	}, []);

	const extract = (type: string, id: string) => {
		const sensors = state.sensors;
		const actuators = state.actuators;
		return type === "SENSOR"
			? sensors.find(item => item.id === id)
			: actuators.find(item => item.id === id);
	};

	const handleSelectActuator = () => {
		const id = state.actuator;
		const actuator = state.actuators.find(item => item.id === id);
		return actuator && actuator.quantity;
	};

	const handleProgress = () => {
		const array = [state.sensor, state.actuator, state.quantitySensor, state.quantityActuator];
		const values: Array<number> = array.map(key => (key === "" ? 0 : 25));

		return values.reduce((a, b) => a + b, 0);
	};

	const handleGenerateCode = () => {
		const sensor = extract("SENSOR", state.sensor);
		const actuator = extract("ACTUATOR", state.actuator);

		const codeIFRS = `
    ${sensor?.include}
    ${actuator?.include}
    const int act_num=${state.quantityActuator};
    const int sen_num=${state.quantitySensor};
    ${sensor?.code}
    ${actuator?.code}
    ${state.fixed?.code}
    `;

		setState(prev => ({
			...prev,
			code: codeIFRS,
		}));
	};

	const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>, type: string) => {
		const newValue = event.currentTarget.value;

		setState(prev => ({
			...prev,
			[type]: newValue,
		}));

		if (handleSelectActuator() === 3) {
			setState((prev) => ({ ...prev, quantityActuator: "3" }));
		}
	};

	const progress: number = useMemo(handleProgress, [state.sensor, state.actuator, state.quantitySensor, state.quantityActuator]);
	const actuatorSelect: number | undefined = useMemo(handleSelectActuator, [state.actuator]);

	useEffect(() => {
		fetchBlocks();
	}, [fetchBlocks]);

	return (

		loading ? <div>LOADING </div> :
			< Container fluid >
				<Row>
					<Header title="Projeto Create" />
				</Row >

				<Row className="col-md-10 mx-auto">

					<Row className="justify-content-md-center text-center">
						<Col>
							<h1>{"Arduino Create"}</h1>
						</Col>
					</Row>

					<br />

					<Row className={clsx(["justify-content-md-center", style.row])}>
						<Col>
							<>
								<Form.Label>{"Selecione o SENSOR"}</Form.Label>
								<Form.Select
									aria-label="select-input"
									defaultValue={"0"}
									onChange={event => handleSelectChange(event, "sensor")}
								>
									<option key="0" value="0" disabled>{"Selecione uma opção:"}</option>
									{state.sensors?.map(item => (
										<option key={item.id} value={item.id}>
											{item.name}
										</option>
									))}
								</Form.Select>
							</>

							{state.sensor && (
								<>
									<br />
									<Form.Label>{"Selecione a quantidade de SENSORES"}</Form.Label>
									<Form.Select
										aria-label="select-input"
										defaultValue={"0"}
										onChange={event => handleSelectChange(event, "quantitySensor")}
									>
										<option key="0" value="0" disabled>{"Selecione uma opção:"}</option>
										{quantitySelect?.map(item => (
											<option key={item} value={item}>
												{item}
											</option>
										))}
									</Form.Select>
								</>
							)}
						</Col>

						<Col>
							<>
								<Form.Label>{"Selecione o ATUADOR"}</Form.Label>
								<Form.Select
									aria-label="select-output"
									defaultValue={"0"}
									onChange={event => handleSelectChange(event, "actuator")}
								>
									<option key="0" value="0" disabled>{"Selecione uma opção:"}</option>
									{state.actuators?.map(item => (
										<option key={item.id} value={item.id}>
											{item.name}
										</option>
									))}
								</Form.Select>
							</>

							{state.actuator && (

								actuatorSelect === 3 ? (
									<>
										<br />
										<Form.Label>{"Selecione a quantidade de ATUADORES"}</Form.Label>
										<Form.Select
											aria-label="select-input"
											defaultValue={"3"}
											disabled
											onChange={event => handleSelectChange(event, "quantityActuator")}
										>
											<option key="0" value="3">{"3"}</option>
										</Form.Select>
									</>)
									: (
										<>
											<br />
											<Form.Label>{"Selecione a quantidade de ATUADORES"}</Form.Label>
											<Form.Select
												aria-label="select-input"
												defaultValue={"0"}
												onChange={event => handleSelectChange(event, "quantityActuator")}
											>
												<option key="0" value="0" disabled>{"Selecione uma opção:"}</option>
												{quantitySelect?.map(item => (
													<option key={item} value={item}>
														{item}
													</option>
												))}
											</Form.Select>
										</>
									)
							)}


						</Col>
					</Row>

					<Row>
						<Col>
							<br />
							<p>{"Progresso"}</p>
							<ProgressBar animated now={progress} variant={progress === 100 ? "success" : "info"} />
						</Col>
					</Row>

					{progress === 100 && (
						<Row className={clsx(["justify-content-md-center", "text-center", style.row])}>
							<Col>
								<br />
								<Button variant="success" onClick={handleGenerateCode}>
									{"Gerar Código"}
								</Button>
							</Col>
						</Row>
					)}

					{progress === 100 && state.code && (
						<Row >
							<Col>
								<br />
								<Card>
									<Card.Header>{"Code"}</Card.Header>
									<Card.Body>
										<blockquote className="blockquote mb-0">
											<pre>{state.code}</pre>
											<footer className="blockquote-footer">
												{"Codigo em C gerador por "}
												<cite title="Source Title">{"Arduino Create IFRS"}</cite>
											</footer>
										</blockquote>
									</Card.Body>
								</Card>
								<br />
							</Col>
						</Row>
					)}
				</Row>
			</Container >


	);
};

export default Create;
