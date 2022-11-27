import clsx from 'clsx';
import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Card, Col, Collapse, Container, Form, ProgressBar, Row } from 'react-bootstrap';

import Code from '#/components/Code';
import Header from '#/components/Header';
import Loading from '#/components/Loading';

import { Block } from '#/models/blocks';
import { Board } from '#/models/boards';

import bff from '#/controllers/bff';

import Helpers from '#/utils/Functions';
import Htmls from '#/utils/Htmls';

import style from './style.module.scss';

type State = {
  boards: Array<Board>;
  actuators: Array<Block>;
  sensors: Array<Block>;
  fixed: Array<Block>;
};

type Values = {
  code: string;
  selectedBoard: string;
  selectedSensor: {
    value: string;
    quantity: string;
  };
  selectedActuator: {
    value: string;
    quantity: string;
  };
};

const INITIAL_STATE: State = {
  boards: [],
  actuators: [],
  sensors: [],
  fixed: [],
};

const INITIAL_VALUES: Values = {
  code: '',
  selectedBoard: '',
  selectedSensor: {
    value: '',
    quantity: '',
  },
  selectedActuator: {
    value: '',
    quantity: '',
  },
};

const QUANTITY = ['1', '2', '3'];
const TITLE = 'SmartCode';

const Create: React.FC = () => {
  const [isLoading, setLoad] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [state, setState] = useState<State>(INITIAL_STATE);
  const [values, setValues] = useState<Values>(INITIAL_VALUES);

  const setStateValue = (key: keyof State, data: Array<any>) => {
    setState((prev) => ({
      ...prev,
      [key]: data,
    }));
  };

  const handleProgress = () => {
    const array = [
      values.selectedBoard,
      values.selectedActuator.value,
      values.selectedActuator.quantity,
      values.selectedSensor.value,
      values.selectedSensor.quantity,
    ];
    const allValues: Array<number> = array.map((key) => (key === '' ? 0 : 20));

    return allValues.reduce((a, b) => a + b, 0);
  };

  const handleActuatorQuantity = () => {
    const actuator = Helpers.find(state?.actuators || [], values.selectedActuator.value, 'id');

    return actuator && actuator.quantity;
  };

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>, type: 1 | 2 | 3 | 4 | 5) => {
    const newValue = event.currentTarget.value;

    switch (type) {
      case 1:
        setValues((prev) => ({
          ...prev,
          selectedBoard: newValue,
        }));
        break;
      case 2:
        setValues((prev) => ({
          ...prev,
          selectedSensor: {
            ...prev.selectedSensor,
            value: newValue,
          },
        }));
        break;
      case 3:
        setValues((prev) => ({
          ...prev,
          selectedSensor: {
            ...prev.selectedSensor,
            quantity: newValue,
          },
        }));
        break;

      case 4:
        setValues((prev) => ({
          ...prev,
          selectedActuator: {
            ...prev.selectedActuator,
            value: newValue,
          },
        }));
        break;
      case 5:
        setValues((prev) => ({
          ...prev,
          selectedActuator: {
            ...prev.selectedActuator,
            quantity: newValue,
          },
        }));
        break;
      default:
        break;
    }
  };

  const handleGenerateCode = () => {
    const sensor = Helpers.find(state?.sensors || [], values.selectedSensor.value, 'id');
    const actuator = Helpers.find(state?.actuators || [], values.selectedActuator.value, 'id');
    const board = Helpers.find(state?.boards || [], values.selectedBoard, 'type');

    const props: Parameters<typeof Helpers.generateCode> = [
      {
        sensor: sensor,
        actuator: actuator,
        board: board,
        actuatorQuantity: values.selectedActuator.quantity,
        sensorQuantity: values.selectedSensor.quantity,
        fixed: state?.fixed?.map((elem) => elem.code) || [''],
      },
    ];

    const newCode = Helpers.generateCode(props[0]);

    setValues((prev) => ({
      ...prev,
      code: newCode,
    }));
  };

  const progress: number = useMemo(handleProgress, [values.selectedBoard, values.selectedActuator, values.selectedSensor]);
  const actuatorSelect: number | undefined = useMemo(handleActuatorQuantity, [values.selectedActuator.value]);
  const progressClass = progress === 100 ? 'success' : 'info';
  const expandOrCollapse = open === true ? 'COLLAPSE' : 'EXPAND';

  const fetchBoard = useCallback(async () => {
    setLoad(true);

    bff
      .getBoards()
      .then(({ data }) => setStateValue('boards', data))
      .catch((error) => console.error(error))
      .finally(() => setLoad(false));
  }, []);

  const fetchFixed = useCallback(async (board: string) => {
    setLoad(true);

    bff
      .getFixed(board)
      .then(({ data }) => setStateValue('fixed', data))
      .catch((error) => console.error(error))
      .finally(() => setLoad(false));
  }, []);

  const fetchSensors = useCallback(async (board: string) => {
    setLoad(true);

    bff
      .getSensors(board)
      .then(({ data }) => setStateValue('sensors', data))
      .catch((error) => console.error(error))
      .finally(() => setLoad(false));
  }, []);

  const fetchActuators = useCallback(async (board: string) => {
    setLoad(true);

    bff
      .getActuators(board)
      .then(({ data }) => setStateValue('actuators', data))
      .catch((error) => console.error(error))
      .finally(() => setLoad(false));
  }, []);

  useEffect(() => {
    fetchBoard();
  }, [fetchBoard]);

  useEffect(() => {
    if (values.selectedBoard !== '') {
      fetchFixed(values.selectedBoard);
      fetchSensors(values.selectedBoard);
      fetchActuators(values.selectedBoard);

      setValues((prev) => ({
        ...INITIAL_VALUES,
        selectedBoard: prev.selectedBoard,
      }));
    }
  }, [values.selectedBoard, fetchFixed, fetchSensors, fetchActuators]);

  useEffect(() => {
    if (actuatorSelect === 3) {
      setValues((prev) => ({ ...prev, selectedActuator: { ...prev.selectedActuator, quantity: '3' } }));
    } else {
      setValues((prev) => ({ ...prev, selectedActuator: { ...prev.selectedActuator, quantity: '' } }));
    }
  }, [values.selectedActuator.value]);

  useEffect(() => {
    setValues((prev) => ({ ...prev, selectedSensor: { ...prev.selectedSensor, quantity: '' } }));
  }, [values.selectedSensor.value]);

  useEffect(() => {
    if (values.selectedSensor.quantity && values.selectedActuator.quantity) {
      handleGenerateCode();
      setOpen(true);
    }
  }, [values.selectedSensor.quantity, values.selectedActuator.quantity]);

  return (
    <Container fluid>
      <Loading show={isLoading} />
      <Row>
        <Header title={TITLE} />
      </Row>

      <Row className="col-md-10 mx-auto">
        <Row className="justify-content-md-center text-center">
          <Col>
            <div>
              <br />
            </div>
            <h1>{TITLE}</h1>
          </Col>
        </Row>

        <br />

        <Row className={clsx(['justify-content-md-center', style.board])}>
          <Col>
            <Form.Label>{'Select the BOARD'}</Form.Label>
            <Form.Select aria-label="boards" defaultValue={''} onChange={(event) => handleSelect(event, 1)}>
              <option key="0" value="" disabled>
                {'Select one option:'}
              </option>
              {state?.boards?.map((item) => Htmls.optionBoardHTML(item))}
            </Form.Select>
          </Col>
        </Row>

        {values.selectedBoard && (
          <Row className={clsx(['justify-content-md-center', style.row])}>
            <Col>
              <>
                <Form.Label>{'Select the SENSOR'}</Form.Label>
                <Form.Select aria-label="sensors" defaultValue={''} onChange={(event) => handleSelect(event, 2)}>
                  <option key="0" value="" disabled>
                    {'Select one option:'}
                  </option>
                  {state?.sensors?.map((item) => Htmls.optionHTML(item))}
                </Form.Select>
              </>

              {values.selectedSensor.value && (
                <>
                  <br />
                  <Form.Label>{'Select the quantity of SENSORS'}</Form.Label>
                  <Form.Select
                    aria-label="quantity-sensors"
                    value={values.selectedSensor.quantity}
                    onChange={(event) => handleSelect(event, 3)}
                  >
                    <option key="0" value="" disabled>
                      {'Select one option:'}
                    </option>
                    {QUANTITY?.map((item) => Htmls.optionSimpleHTML(item))}
                  </Form.Select>
                </>
              )}
            </Col>

            <Col>
              <>
                <Form.Label>{'Select the ACTUATOR'}</Form.Label>
                <Form.Select aria-label="actuators" defaultValue={'0'} onChange={(event) => handleSelect(event, 4)}>
                  <option key="0" value="0" disabled>
                    {'Select one option:'}
                  </option>
                  {state?.actuators?.map((item) => Htmls.optionHTML(item))}
                </Form.Select>
              </>

              {values.selectedActuator.value && (
                <>
                  <br />
                  <Form.Label>{'Select the quantity of ACTUATORS'}</Form.Label>
                  <Form.Select
                    aria-label="quantity-actuators"
                    value={values.selectedActuator.quantity}
                    onChange={(event) => handleSelect(event, 5)}
                    disabled={actuatorSelect === 3}
                  >
                    <option key="0" value="" disabled>
                      {'Select one option:'}
                    </option>
                    {QUANTITY?.map((item) => Htmls.optionSimpleHTML(item))}
                  </Form.Select>
                </>
              )}
            </Col>
          </Row>
        )}

        <Row>
          <Col>
            <br />
            <p>{'Progress'}</p>
            <ProgressBar animated now={progress} variant={progressClass} />
            <br />
          </Col>
        </Row>

        {progress === 100 && values.code && (
          <Row>
            <Col>
              <Card>
                <Card.Header className="d-flex justify-content-between">
                  {'Code'}
                  <Button onClick={() => setOpen(!open)} aria-controls="example-collapse-text" aria-expanded={open}>
                    {expandOrCollapse}
                  </Button>
                  <Button variant={'dark'} onClick={() => navigator.clipboard.writeText(values.code)}>
                    COPY
                  </Button>
                </Card.Header>

                <Card.Body>
                  <blockquote className="blockquote mb-0">
                    <Collapse in={open}>
                      <div>
                        <Code code={values.code} language={'arduino'} />
                      </div>
                    </Collapse>
                    <footer className="blockquote-footer">
                      {'C code generated by '}
                      <cite title="Source Title">{`${TITLE} IFRS`}</cite>
                    </footer>
                  </blockquote>
                </Card.Body>
              </Card>
              <br />
            </Col>
          </Row>
        )}
      </Row>
    </Container>
  );
};

export default Create;
