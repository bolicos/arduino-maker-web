// type TypeBoard = 'SENSOR' | 'ACTUATOR';

import { Block } from '#/models/blocks';
import { Board, BoardType } from '#/models/boards';

export type CodeProps = {
  sensor: Block | undefined;
  actuator: Block | undefined;
  board: Board | undefined;
  actuatorQuantity: string;
  sensorQuantity: string;
  fixed: Array<string>;
};

export default class Helpers {
  static find = <V>(list: Array<V>, value: string, key: keyof V) => {
    return list.find((item) => item[key] === value);
  };

  static generateCode = (props: CodeProps) => {
    switch (props.board?.name) {
      case BoardType.ARDUINO_UNO:
        return `
// ${BoardType.ARDUINO_UNO} Board Pins
//
// Sensors pins: A0, A1, A2.
// Actuators (Commons) pins: 9, 10, 11.
// Actuators (Potentiometer) pin: A3, A4, A5.

${props.sensor?.include || '// No Sensor Include'}
${props.actuator?.include || '// No Actuator Include'}

const int act_num=${props.actuatorQuantity || ''};
const int sen_num=${props.sensorQuantity || ''};

${props.sensor?.code || ''}
${props.actuator?.code || ''}

${props.fixed?.map((elem) => elem) || ''}
`;

      case BoardType.NODE_MCU_ESP8266:
        return `
// ${BoardType.NODE_MCU_ESP8266} Board Pins
//
// Sensors pins: A0, A1, A2.
// Actuators (Commons) pins: 9, 10, 11.
// Actuators (Potentiometer) pin: A3, A4, A5.

${props.sensor?.include || '// No Sensor Include'}
${props.actuator?.include || '// No Actuator Include'}

const int act_num=${props.actuatorQuantity || ''};
const int sen_num=${props.sensorQuantity || ''};

${props.sensor?.code || ''}
${props.actuator?.code || ''}
${props.fixed?.map((elem) => elem) || ''}
`;

      case BoardType.RASPBERRY_PI_PICO_V3:
        return `
// ${BoardType.RASPBERRY_PI_PICO_V3} Board Pins
//
// Sensors pins: A0, A1, A2.
// Actuators (Commons) pins: 9, 10, 11.
// Actuators (Potentiometer) pin: A3, A4, A5.

${props.sensor?.include || '// No Sensor Include'}
${props.actuator?.include || '// No Actuator Include'}

const int act_num=${props.actuatorQuantity || ''};
const int sen_num=${props.sensorQuantity || ''};
${props.sensor?.code || ''}
${props.actuator?.code || ''}
${props.fixed?.map((elem) => elem) || ''}
`;

      default:
        return '';
    }
  };
}
