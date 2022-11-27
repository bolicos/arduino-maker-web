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

  getFixed(board?: string | undefined): ListDto<Block> {
    return board
      ? this.BFF.get(ENDPOINTS.FIXED, {
          params: {
            board: board,
          },
        })
      : this.BFF.get(ENDPOINTS.FIXED);
  }

  getSensors(board?: string | undefined): ListDto<Block> {
    return board
      ? this.BFF.get(ENDPOINTS.SENSORS, {
          params: {
            board: board,
          },
        })
      : this.BFF.get(ENDPOINTS.SENSORS);
  }

  getActuators(board?: string | undefined): ListDto<Block> {
    return board
      ? this.BFF.get(ENDPOINTS.ACTUATORS, {
          params: {
            board: board,
          },
        })
      : this.BFF.get(ENDPOINTS.ACTUATORS);
  }
}

export default new BffController(BFF_INSTANCE);
