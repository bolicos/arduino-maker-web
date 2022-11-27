import React from 'react';
import { Spinner } from 'react-bootstrap';
import './index.scss';

type Props = {
  show: boolean;
};

export const Loading: React.FC<Props> = ({ show }) => {
  return show ? (
    <div className="alignMe">
      <Spinner animation="border" variant="dark" />
    </div>
  ) : (
    <div>{''}</div>
  );
};

export default Loading;
