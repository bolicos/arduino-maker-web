import { BFF_INSTANCE, Bff, ListDto } from '#/controllers/server';
import { Block } from '#/models/blocks';
import { Board } from '#/models/boards';

const ENDPOINTS = {
  BLOCKS: '/api/v1/boards',
  ACTUATORS: '/api/v1/blocks/actuators',
  SENSORS: '/api/v1/blocks/sensors',
  FIXED: '/api/v1/blocks/fixed',
};

class BffController {
  private BFF: Bff;

  constructor(service: Bff) {
    this.BFF = service;
  }

  getBoards(): ListDto<Board> {
    return this.BFF.get(ENDPOINTS.BLOCKS);
  }

  getActuators(): ListDto<Block> {
    return this.BFF.get(ENDPOINTS.ACTUATORS);
  }

  getSensors(): ListDto<Block> {
    return this.BFF.get(ENDPOINTS.SENSORS);
  }

  getFixed(): ListDto<Block> {
    return this.BFF.get(ENDPOINTS.FIXED);
  }
}

export default new BffController(BFF_INSTANCE);
