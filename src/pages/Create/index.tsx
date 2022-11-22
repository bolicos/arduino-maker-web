import clsx from 'clsx';
import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Card, Col, Collapse, Container, Form, ProgressBar, Row } from 'react-bootstrap';

import Code from '#/components/Code';
import Header from '#/components/Header';
import Loading from '#/components/Loading';
import { Block } from '#/models/blocks';

import style from './style.module.scss';
import { Board } from '#/models/boards';
import bff from '#/controllers/bff';

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

const Create: React.FC = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [state, setState] = useState<State>();
  const [values, setValues] = useState<Values>({
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
  });

  const quantitySelect = ['1', '2', '3'];
  const title = 'SmartCode';

  const extract = (type: string, id: string) => {
    const sensors = state?.sensors;
    const actuators = state?.actuators;
    return type === 'SENSOR' ? sensors?.find((item) => item.id === id) : actuators?.find((item) => item.id === id);
  };

  const handleProgress = () => {
    const array = [
      values.selectedBoard,
      values.selectedActuator.value,
      values.selectedSensor.value,
      values.selectedActuator.quantity,
      values.selectedSensor.quantity,
    ];
    const allValues: Array<number> = array.map((key) => (key === '' ? 0 : 20));

    return allValues.reduce((a, b) => a + b, 0);
  };

  const handleActuatorQuantity = () => {
    const id = values.selectedActuator.value;
    const actuator = state?.actuators?.find((item) => item.id === id);

    return actuator && actuator.quantity;
  };

  const progress: number = useMemo(handleProgress, [
    values.selectedBoard,
    values.selectedActuator.value,
    values.selectedSensor.value,
    values.selectedActuator.quantity,
    values.selectedSensor.quantity,
  ]);

  const actuatorSelect: number | undefined = useMemo(handleActuatorQuantity, [values.selectedActuator.value]);

  const handleSelectBoard = (event: ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.currentTarget.value;

    setValues((prev) => ({
      ...prev,
      selectedBoard: newValue,
    }));
  };

  const handleSelectSensor = (event: ChangeEvent<HTMLSelectElement>, type: 'value' | 'quantity') => {
    const newValue = event.currentTarget.value;

    if (type === 'value') {
      setValues((prev) => ({
        ...prev,
        selectedSensor: {
          ...prev.selectedSensor,
          value: newValue,
        },
      }));
    } else {
      setValues((prev) => ({
        ...prev,
        selectedSensor: {
          ...prev.selectedSensor,
          quantity: newValue,
        },
      }));
    }
  };

  const handleChangeActuator = (event: ChangeEvent<HTMLSelectElement>, type: 'value' | 'quantity') => {
    const newValue = event.currentTarget.value;

    if (type === 'value') {
      setValues((prev) => ({
        ...prev,
        selectedActuator: {
          ...prev.selectedActuator,
          value: newValue,
        },
      }));
    } else {
      setValues((prev) => ({
        ...prev,
        selectedActuator: {
          ...prev.selectedActuator,
          quantity: newValue,
        },
      }));
    }
  };

  const handleGenerateCode = () => {
    const sensor = extract('SENSOR', values.selectedSensor.value);
    const actuator = extract('ACTUATOR', values.selectedActuator.value);

    const newCode = `
    ${sensor?.include || ''}
    ${actuator?.include || ''}
    const int act_num=${values.selectedActuator.quantity || ''};
    const int sen_num=${values.selectedSensor.quantity || ''};
    ${sensor?.code || ''}
    ${actuator?.code || ''}
    ${state?.fixed?.map((elem) => elem?.code) || ''}
    `;

    setValues((prev) => ({
      ...prev,
      code: newCode,
    }));
  };

  const optionHTML = (item: Block) => {
    return (
      <option key={item.id} value={item.id}>
        {item.name}
      </option>
    );
  };

  const optionBoardHTML = (item: Board) => {
    return (
      <option key={item.type} value={item.type}>
        {item.name}
      </option>
    );
  };

  const optionSimpleHTML = (item: string) => {
    return (
      <option key={item} value={item}>
        {item}
      </option>
    );
  };

  const actuatorSelectHTML =
    actuatorSelect === 3 ? (
      <>
        <br />
        <Form.Label>{'Select the quantity of ACTUATORS'}</Form.Label>
        <Form.Select
          aria-label="quantity-actuators"
          value={values.selectedActuator.value}
          disabled
          onChange={(event) => handleChangeActuator(event, 'value')}
        >
          <option key="0" value="3">
            {'3'}
          </option>
        </Form.Select>
      </>
    ) : (
      <>
        <br />
        <Form.Label>{'Select the quantity of ACTUATORS'}</Form.Label>
        <Form.Select
          aria-label="quantity-actuators"
          value={values.selectedActuator.quantity}
          onChange={(event) => handleChangeActuator(event, 'quantity')}
        >
          <option key="0" value="" disabled>
            {'Select one option:'}
          </option>
          {quantitySelect?.map((item) => optionSimpleHTML(item))}
        </Form.Select>
      </>
    );

  const progressClass = progress === 100 ? 'success' : 'info';
  const expandOrCollapse = open === true ? 'COLLAPSE' : 'EXPAND';

  const fetchAll = useCallback(async () => {
    setLoading(true);

    try {
      const data1 = await bff.getActuators();
      const data2 = await bff.getSensors();
      const data3 = await bff.getBoards();
      const data4 = await bff.getFixed();

      setState(() => ({
        actuators: data1.data,
        sensors: data2.data,
        boards: data3.data,
        fixed: data4.data,
      }));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

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
  }, [values.selectedBoard, values.selectedSensor.quantity, values.selectedActuator.quantity]);

  return isLoading ? (
    <Loading />
  ) : (
    <Container fluid>
      <Row>
        <Header title={title} />
      </Row>

      <Row className="col-md-10 mx-auto">
        <Row className="justify-content-md-center text-center">
          <Col>
            <div>
              <br />
            </div>
            <h1>{title}</h1>
          </Col>
        </Row>

        <br />

        <Row className={clsx(['justify-content-md-center', style.board])}>
          <Col>
            <Form.Label>{'Select the BOARD'}</Form.Label>
            <Form.Select aria-label="boards" defaultValue={''} onChange={(event) => handleSelectBoard(event)}>
              <option key="0" value="" disabled>
                {'Select one option:'}
              </option>
              {state?.boards?.map((item) => optionBoardHTML(item))}
            </Form.Select>
          </Col>
        </Row>

        {values.selectedBoard && (
          <Row className={clsx(['justify-content-md-center', style.row])}>
            <Col>
              <>
                <Form.Label>{'Select the SENSOR'}</Form.Label>
                <Form.Select aria-label="sensors" defaultValue={''} onChange={(event) => handleSelectSensor(event, 'value')}>
                  <option key="0" value="" disabled>
                    {'Select one option:'}
                  </option>
                  {state?.sensors?.map((item) => optionHTML(item))}
                </Form.Select>
              </>

              {values.selectedSensor.value && (
                <>
                  <br />
                  <Form.Label>{'Select the quantity of SENSORS'}</Form.Label>
                  <Form.Select
                    aria-label="quantity-sensors"
                    value={values.selectedSensor.quantity}
                    onChange={(event) => handleSelectSensor(event, 'quantity')}
                  >
                    <option key="0" value="" disabled>
                      {'Select one option:'}
                    </option>
                    {quantitySelect?.map((item) => optionSimpleHTML(item))}
                  </Form.Select>
                </>
              )}
            </Col>

            <Col>
              <>
                <Form.Label>{'Select the ACTUATOR'}</Form.Label>
                <Form.Select aria-label="actuators" defaultValue={'0'} onChange={(event) => handleChangeActuator(event, 'value')}>
                  <option key="0" value="0" disabled>
                    {'Select one option:'}
                  </option>
                  {state?.actuators?.map((item) => optionHTML(item))}
                </Form.Select>
              </>

              {values.selectedActuator.value && actuatorSelectHTML}
            </Col>
          </Row>
        )}

        <Row>
          <Col>
            <br />
            <p>{'Progress'}</p>
            <ProgressBar animated now={progress} variant={progressClass} />
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
    </Container>
  );
};

export default Create;
