import clsx from 'clsx';
import React from 'react';
import { Col, Row } from 'react-bootstrap';

import style from './style.module.scss';

type Props = {
  children?: React.ReactNode;
  classNames: Array<string>;
  board?: boolean;
  row?: boolean;
};

export const Lines: React.FC<Props> = ({ children, classNames, board, row }) => {
  const names = classNames.toString();

  return <Row className={clsx([names], board && style.board, row && style.row)}>{children !== undefined && <Col>{children}</Col>}</Row>;
};

export default Lines;
