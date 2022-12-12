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
// Sensors (Potentiometer) pin: A3, A4, A5.
// Actuators (Commons) pins: 9, 10, 11.

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
# ${BoardType.NODE_MCU_ESP8266} Board Pins
#
# Sensors pins: A0 - 31.
# Sensors (Potentiometer) pins: A1 - 32.
# Actuators (Commons) pins: 5, 6, 7 - GPIO3, GPIO4 e GPIO5.
# Button pin: 2 - GPIO1.

${props.sensor?.include || '// No Sensor Include'}
${props.actuator?.include || '// No Actuator Include'}

# Constants ==========================================
BAUD_RATE = 9600
ELEMENT_COUNT_MAX = 50

PIN_BUTTON = 2
PIN_SENSORS_INIT = 31
PIN_SENSORS_POTENTIOMETER_INIT = 32
PIN_ACTUATORS_INIT = 5

TRAINING_MODE = False
SETUP = True

QTD_SENSORS = ${props.sensorQuantity || ''}
QTD_ACTUATORS = ${props.actuatorQuantity || ''}

${props.sensor?.code || ''}
${props.actuator?.code || ''}
${props.fixed?.map((elem) => elem) || ''}
`;

      case BoardType.RASPBERRY_PI_PICO_V3:
        return `
# ${BoardType.RASPBERRY_PI_PICO_V3} Board Pins
#
# Sensors pins: A0 - GPIO26.
# Sensors (Potentiometer) pins: A1 - GPIO27.
# Actuators (Commons) pins: 5, 6, 7 - GPIO3, GPIO4 e GPIO5.
# Button pin: 2 - GPIO1.

${props.sensor?.include || '// No Sensor Include'}
${props.actuator?.include || '// No Actuator Include'}

# Constants ==========================================
BAUD_RATE = 9600
ELEMENT_COUNT_MAX = 50

PIN_BUTTON = 2
PIN_SENSORS_INIT = 26
PIN_SENSORS_POTENTIOMETER_INIT = 27
PIN_ACTUATORS_INIT = 5

TRAINING_MODE = False
SETUP = True

QTD_SENSORS = ${props.sensorQuantity || ''}
QTD_ACTUATORS = ${props.actuatorQuantity || ''}

${props.sensor?.code || ''}
${props.actuator?.code || ''}
${props.fixed?.map((elem) => elem) || ''}
`;

      default:
        return '';
    }
  };
}
