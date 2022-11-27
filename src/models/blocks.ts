export type Block = {
  id: string;
  board: string;
  name: string;
  code: string;
  include: string;
  type: string;
  quantity: number;
};

export enum BlockTypesEnum {
  SMART_MOTORS = 'Smart Motors',
  IF = 'If',
}

export enum ActionsType {
  BOARD = 1,
  SENSOR_VALUE = 2,
  SENSOR_QUANTITY = 3,
  ACTUATOR_VALUE = 4,
  ACTUATOR_QUANTITY = 5,
}
