import React, { FC, memo } from "react";
import { Card, Row } from "react-bootstrap";
import "./../../pages/Home/index.scss";
import { Block } from './Block';
import { Board } from './Board';

export const ComponentsDrop: FC = memo(function Container() {
  return (
    <div className="flex-container">

      <div className="flex-child">
        <Card className="text-center home-fluid">
          <Card.Header>Components</Card.Header>
          <Card.Body>
            <div>
              <Row>
                <div style={{ overflow: 'hidden', clear: 'both' }}>
                  <Block name="IF" />
                  <Block name="FOR" />
                  <Block name="WHILE" />
                </div>
              </Row>
            </div>
          </Card.Body>
          <Card.Footer className="text-muted"><br /></Card.Footer>
        </Card>
      </div>


      <div className="flex-child">
        <Card className="text-center home-fluid">
          <Card.Header>Board</Card.Header>
          <Card.Body>

            <Board />

          </Card.Body>
          <Card.Footer className="text-muted"><br /></Card.Footer>
        </Card>
      </div>

    </div>
  )
})
