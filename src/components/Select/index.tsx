import { ActionsType, Block } from '#/models/blocks';
import { Board } from '#/models/boards';
import Htmls from '#/utils/Htmls';
import React from 'react';
import { Form } from 'react-bootstrap';

type Props = {
  label: string;
  value: string;
  ariaLabel: string;
  handle: any;
  array: Array<Block | Board | string>;
  type: ActionsType;
  disabled?: boolean;
};

export const Select: React.FC<Props> = ({ label, value, ariaLabel, handle, array, type, disabled }) => {
  const empty = Htmls.optionEmptyTML();
  const options = array?.map((item) => {
    switch (type) {
      case ActionsType.BOARD:
        return Htmls.optionBoardHTML(item as Board);

      case ActionsType.SENSOR_VALUE:
      case ActionsType.ACTUATOR_VALUE:
        return Htmls.optionBlockHTML(item as Block);

      case ActionsType.SENSOR_QUANTITY:
      case ActionsType.ACTUATOR_QUANTITY:
        return Htmls.optionSimpleHTML(item as string);

      default:
        return '';
    }
  });

  return (
    <>
      <Form.Label>{label}</Form.Label>
      <Form.Select aria-label={ariaLabel} value={value} onChange={(event) => handle(event, type)} disabled={disabled}>
        {empty}
        {options}
      </Form.Select>
    </>
  );
};

export default Select;
