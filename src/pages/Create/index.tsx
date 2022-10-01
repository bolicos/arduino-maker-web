import clsx from "clsx";
import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { Button, Card, Col, Collapse, Container, Form, ProgressBar, Row } from "react-bootstrap";

import Code from "#/components/Code";
import Header from "#/components/Header";
import Loading from "#/components/Loading";
import { Class } from "#/models/classes/classes";
import { BFF } from "#/services/bff/routes";

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
  const [isLoading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
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
  const title = "SmartCode";

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

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>, type: string) => {
    const newValue = event.currentTarget.value;

    setState(prev => ({
      ...prev,
      [type]: newValue,
    }));
  };

  const progress: number = useMemo(handleProgress, [state.sensor, state.actuator, state.quantitySensor, state.quantityActuator]);
  const actuatorSelect: number | undefined = useMemo(handleSelectActuator, [state.actuator]);

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

  const progressClass = progress === 100 ? "success" : "info";
  const expandOrCollapse = open === true ? "COLLAPSE" : "EXPAND";

  const optionHTML = (item: Class) => {
    return (<option key={item.id} value={item.id}>
      {item.name}
    </option>);
  };
  const optionSimpleHTML = (item: string) => {
    return (<option key={item} value={item}>
      {item}
    </option>);
  };
  const actuatorSelectHTML = actuatorSelect === 3 ? (
    <>
      <br />
      <Form.Label>{"Select the quantity of ACTUATORS"}</Form.Label>
      <Form.Select
        aria-label="select-input"
        value={state.actuator}
        disabled
        onChange={event => handleSelectChange(event, "quantityActuator")}
      >
        <option key="0" value="3">{"3"}</option>
      </Form.Select>
    </>)
    : (
      <>
        <br />
        <Form.Label>{"Select the quantity of ACTUATORS"}</Form.Label>
        <Form.Select
          aria-label="select-input"
          value={state.quantityActuator}
          onChange={event => handleSelectChange(event, "quantityActuator")}
        >
          <option key="0" value="" disabled>{"Select one option:"}</option>
          {quantitySelect?.map(item => optionSimpleHTML(item))}
        </Form.Select>
      </>
    );

  useEffect(() => {
    fetchBlocks();
  }, [fetchBlocks]);

  useEffect(() => {
    if (handleSelectActuator() === 3) {
      setState((prev) => ({ ...prev, quantityActuator: "3" }));
    } else {
      setState((prev) => ({ ...prev, quantityActuator: "" }));
    }
  }, [state.actuator]);

  useEffect(() => {
    setState((prev) => ({ ...prev, quantitySensor: "" }));
  }, [state.sensor]);

  useEffect(() => {
    if (state.quantitySensor && state.quantityActuator) {
      handleGenerateCode();
      setOpen(true);
    }
  }, [state.quantitySensor, state.quantityActuator]);


  return (isLoading
    ? (<Loading />)
    : (
      < Container fluid >
        <Row>
          <Header title={title} />
        </Row >

        <Row className="col-md-10 mx-auto">

          <Row className="justify-content-md-center text-center">
            <Col>
              <div><br /></div>
              <h1>{title}</h1>
            </Col>
          </Row>

          <br />

          <Row className={clsx(["justify-content-md-center", style.row])}>
            <Col>
              <>
                <Form.Label>{"Select the SENSOR"}</Form.Label>
                <Form.Select
                  aria-label="select-input"
                  defaultValue={""}
                  onChange={event => handleSelectChange(event, "sensor")}
                >
                  <option key="0" value="" disabled>{"Select one option:"}</option>
                  {state.sensors?.map(item => optionHTML(item))}
                </Form.Select>
              </>

              {state.sensor && (
                <>
                  <br />
                  <Form.Label>{"Select the quantity of SENSORS"}</Form.Label>
                  <Form.Select
                    aria-label="select-input"
                    value={state.quantitySensor}
                    onChange={event => handleSelectChange(event, "quantitySensor")}
                  >
                    <option key="0" value="" disabled>{"Select one option:"}</option>
                    {quantitySelect?.map(item => optionSimpleHTML(item))}
                  </Form.Select>
                </>
              )}
            </Col>

            <Col>
              <>
                <Form.Label>{"Select the ACTUATOR"}</Form.Label>
                <Form.Select
                  aria-label="select-output"
                  defaultValue={"0"}
                  onChange={event => handleSelectChange(event, "actuator")}
                >
                  <option key="0" value="0" disabled>{"Select one option:"}</option>
                  {state.actuators?.map(item => optionHTML(item))}
                </Form.Select>
              </>

              {state.actuator && (actuatorSelectHTML)}

            </Col>
          </Row>

          <Row>
            <Col>
              <br />
              <p>{"Progress"}</p>
              <ProgressBar animated now={progress} variant={progressClass} />
            </Col>
          </Row>

          {progress === 100 && state.code && (
            <Row >
              <Col>
                <Card>
                  <Card.Header className="d-flex justify-content-between">
                    {"Code"}
                    <Button
                      onClick={() => setOpen(!open)}
                      aria-controls="example-collapse-text"
                      aria-expanded={open}
                    >
                      {expandOrCollapse}
                    </Button>
                    <Button variant={"dark"} onClick={() => navigator.clipboard.writeText(state.code)}>COPY</Button>
                  </Card.Header>

                  <Card.Body>
                    <blockquote className="blockquote mb-0">
                      <Collapse in={open}>
                        <div>
                          <Code code={state.code} language={"arduino"} />
                        </div>
                      </Collapse>
                      <footer className="blockquote-footer">
                        {"C code generated by "}
                        <cite title="Source Title">{`${title} IFRS`}</cite>
                      </footer>
                    </blockquote>
                  </Card.Body>
                </Card>
                <br />
              </Col>
            </Row>
          )}
        </Row>
      </Container >)
  );
};

export default Create;
