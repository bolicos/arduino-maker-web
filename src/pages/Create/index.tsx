import clsx from 'clsx';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Card, Col, Collapse, Container, ProgressBar, Row } from 'react-bootstrap';

import Code from '#/components/Code';
import Lines from '#/components/Line';
import Header from '#/components/Header';
import Select from '#/components/Select';
import Loading from '#/components/Loading';

import { ActionsType, Block } from '#/models/blocks';
import { Board } from '#/models/boards';

import bff from '#/controllers/bff';
import Helpers from '#/utils/Functions';

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

  const handleSelect = (newValue: string, type: ActionsType) => {
    switch (type) {
      case ActionsType.BOARD:
        setValues((prev) => ({
          ...prev,
          selectedBoard: newValue,
        }));
        break;
      case ActionsType.SENSOR_VALUE:
        setValues((prev) => ({
          ...prev,
          selectedSensor: {
            ...prev.selectedSensor,
            value: newValue,
          },
        }));
        break;
      case ActionsType.SENSOR_QUANTITY:
        setValues((prev) => ({
          ...prev,
          selectedSensor: {
            ...prev.selectedSensor,
            quantity: newValue,
          },
        }));
        break;

      case ActionsType.ACTUATOR_VALUE:
        setValues((prev) => ({
          ...prev,
          selectedActuator: {
            ...prev.selectedActuator,
            value: newValue,
          },
        }));
        break;
      case ActionsType.ACTUATOR_QUANTITY:
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
      handleSelect('3', ActionsType.ACTUATOR_QUANTITY);
    } else {
      handleSelect('', ActionsType.ACTUATOR_QUANTITY);
    }
  }, [values.selectedActuator.value]);

  useEffect(() => {
    handleSelect('', ActionsType.SENSOR_QUANTITY);
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
        <Lines classNames={['justify-content-md-center', 'text-center']}>
          <>
            <div>
              <br />
            </div>
            <h1>{TITLE}</h1>
          </>
        </Lines>

        <br />

        <Row className={clsx(['justify-content-md-center', style.board])}>
          <Col>
            <Select
              label={'Select the BOARD'}
              ariaLabel={'boards'}
              value={values.selectedBoard}
              array={state?.boards}
              handle={handleSelect}
              type={ActionsType.BOARD}
            />
          </Col>
        </Row>

        {values.selectedBoard && (
          <Row className={clsx(['justify-content-md-center', style.row])}>
            <Col>
              <Select
                label={'Select the SENSOR'}
                ariaLabel={'sensors'}
                value={values.selectedSensor.value}
                array={state?.sensors}
                handle={handleSelect}
                type={ActionsType.SENSOR_VALUE}
              />

              {values.selectedSensor.value && (
                <>
                  <br />

                  <Select
                    label={'Select the quantity of SENSORS'}
                    ariaLabel={'quantity-sensors'}
                    value={values.selectedSensor.quantity}
                    array={QUANTITY}
                    handle={handleSelect}
                    type={ActionsType.SENSOR_QUANTITY}
                  />
                </>
              )}
            </Col>

            <Col>
              <Select
                label={'Select the ACTUATOR'}
                ariaLabel={'actuators'}
                value={values.selectedActuator.value}
                array={state?.actuators}
                handle={handleSelect}
                type={ActionsType.ACTUATOR_VALUE}
              />

              {values.selectedActuator.value && (
                <>
                  <br />

                  <Select
                    label={'Select the quantity of ACTUATORS'}
                    ariaLabel={'quantity-actuators'}
                    value={values.selectedActuator.quantity}
                    array={QUANTITY}
                    handle={handleSelect}
                    type={ActionsType.ACTUATOR_QUANTITY}
                    disabled={actuatorSelect === 3}
                  />
                </>
              )}
            </Col>
          </Row>
        )}

        <Lines classNames={[]}>
          <>
            <br />
            <p>{'Progress'}</p>
            <ProgressBar animated now={progress} variant={progressClass} />
            <br />
          </>
        </Lines>

        {progress === 100 && values.code && (
          <Lines classNames={[]}>
            <>
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
                        <Code code={values.code} language={values.selectedBoard === 'ARDUINO_UNO' ? 'arduino' : 'python'} />
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
            </>
          </Lines>
        )}
      </Row>
    </Container>
  );
};

export default Create;
