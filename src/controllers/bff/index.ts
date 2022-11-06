import { Block } from "#/models/classes/classes";
import { BFF_INSTANCE, Bff, Get, ListDto, ObjectDto } from "#/controllers/server";

const ENDPOINTS = {
  BLOCKS: "/api/v1/blocks",
  ACTUATORS: "/api/v1/blocks/actuators",
  SENSORS: "/api/v1/blocks/sensors",
  FIXED: "/api/v1/blocks/fixed",
};

class BffController {
  private GET: Get;

  constructor(service: Bff) {
    this.GET = service.get;
  }

  getBlocks(): ListDto<Block> {
    return this.GET(ENDPOINTS.BLOCKS);
  }

  getActuators(): ListDto<Block> {
    return this.GET(ENDPOINTS.ACTUATORS);
  }

  getSensors(): ListDto<Block> {
    return this.GET(ENDPOINTS.SENSORS);
  }

  getFixed(): ObjectDto<Block> {
    return this.GET(ENDPOINTS.FIXED);
  }
}

export default new BffController(BFF_INSTANCE);
