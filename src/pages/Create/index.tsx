import React, { ChangeEvent, useMemo, useState } from "react";
import clsx from "clsx";
import { Card, Col, Container, Form, ProgressBar, Row, Button } from "react-bootstrap";

import Header from "@/components/Header";

import style from "./style.module.scss"

const ArduinoCode = () => {
  return `
  #include <stdio.h>

  int main(){
      //imprime a mensagem que estiver entre aspas duplas
      printf("Ola mundo.");

      //valor de retorno para a função principal
      //indicando que o programa acabou
      return 0;
  }
`
}

interface State {
  code: string;
  input: string;
  output: string;
  inputPort: string;
  outputPort: string;
}

const Create: React.FC = () => {
  const [state, setState] = useState<State>({
    code: "",
    input: "",
    output: "",
    inputPort: "",
    outputPort: "",
  });

  const inputList = ["Servo", "Sensor Umidade"];
  const outputList = ["Led", "Potenciomentro"];
  const inputPortList = ["A1", "A2", "A3"];
  const outputPortList = ["D1", "D2", "D3"];

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>, type: string) => {
    const newValue = event.currentTarget.value;

    setState(prev => ({
      ...prev,
      [type]: newValue
    }));
  };

  const handleProgress = () => {
    const array = [state.input, state.output, state.inputPort, state.outputPort];
    const values: Array<number> = array.map(key => key === "" ? 0 : 25);

    return values.reduce((a, b) => a + b, 0);
  }

  const handleGenerateCode = () => {
    setState(prev => ({
      ...prev,
      code: ArduinoCode()
    }));
  }

  const progress: number = useMemo(handleProgress, [state.input, state.output, state.inputPort, state.outputPort]);

  return (
    <Container fluid>

      <Row>
        <Header title={"Projeto Create"} />
      </Row>

      <Row className="justify-content-md-center text-center">
        <Col>
          <h1>Arduino Create</h1>
        </Col>
      </Row>

      <br />

      <Row
        className={
          clsx(
            ["justify-content-md-center", style.row],
          )
        }
      >
        <Col>
          <>
            <Form.Label>Selecione o INPUT</Form.Label>
            <Form.Select
              aria-label="select-input"
              onChange={(event) => handleSelectChange(event, "input")}
            >
              <option key={"0"} value={""}>Selecione uma opção:</option>
              {inputList?.map(item => <option key={item} value={item}>{item}</option>)}
            </Form.Select>
          </>


          {state.input &&
            <>
              <br />
              <Form.Label>Selecione a porta do INPUT</Form.Label>
              <Form.Select
                aria-label="select-input"
                onChange={(event) => handleSelectChange(event, "inputPort")}
              >
                <option key={"0"} value={""}>Selecione uma opção:</option>
                {inputPortList?.map(item => <option key={item} value={item}>{item}</option>)}
              </Form.Select>
            </>
          }
        </Col>

        <Col>
          <>
            <Form.Label>Selecione o OUTPUT</Form.Label>
            <Form.Select
              aria-label="select-output"
              onChange={(event) => handleSelectChange(event, "output")}
            >
              <option value={""}>Selecione uma opção:</option>
              {outputList?.map(item => <option key={item} value={item}>{item}</option>)}
            </Form.Select>
          </>

          {state.output &&
            <>
              <br />
              <Form.Label>Selecione a porta do OUTPUT</Form.Label>
              <Form.Select
                aria-label="select-input"
                onChange={(event) => handleSelectChange(event, "outputPort")}
              >
                <option key={"0"} value={""}>Selecione uma opção:</option>
                {outputPortList?.map(item => <option key={item} value={item}>{item}</option>)}
              </Form.Select>
            </>
          }
        </Col>
      </Row>

      <Row>
        <Col>
          <br />
          <p>Progresso</p>
          <ProgressBar animated now={progress} />
        </Col>
      </Row>

      {progress === 100 &&
        <>
          <Row
            className={
              clsx(
                ["justify-content-md-center", "text-center", style.row],
              )
            }
          >
            <Col>
              <br />
              <Button variant="success" onClick={handleGenerateCode}>Gerar Código</Button>
            </Col>
          </Row>
        </>
      }

      {progress === 100 && state.code &&
        <>
          <Row
            className={
              clsx(
                ["justify-content-md-center", style.row],
              )
            }
          >
            <Col>
              <br />
              <Card>
                <Card.Header>Code</Card.Header>
                <Card.Body>
                  <blockquote className="blockquote mb-0">
                    <pre>{state.code}</pre>
                    <footer className="blockquote-footer">
                      Codigo em C gerador por <cite title="Source Title">Arduino Create IFRS</cite>
                    </footer>
                  </blockquote>
                </Card.Body>
              </Card>
              <br />
            </Col>
          </Row>
        </>
      }

    </Container>
  );
};

export default Create;
