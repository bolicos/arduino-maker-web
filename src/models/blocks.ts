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
