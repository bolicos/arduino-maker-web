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
            ${props.sensor?.include || ''}
            ${props.actuator?.include || ''}
            const int act_num=${props.actuatorQuantity || ''};
            const int sen_num=${props.sensorQuantity || ''};
            ${props.sensor?.code || ''}
            ${props.actuator?.code || ''}
            ${props.fixed?.map((elem) => elem) || ''}
            `;
      case BoardType.NODE_MCU_ESP8266:
        return `
            ${props.sensor?.include || ''}
            ${props.actuator?.include || ''}
            const int act_num=${props.actuatorQuantity || ''};
            const int sen_num=${props.sensorQuantity || ''};
            ${props.sensor?.code || ''}
            ${props.actuator?.code || ''}
            ${props.fixed?.map((elem) => elem) || ''}
            `;
      case BoardType.RASPBERRY_PI_PICO_V3:
        return `
            ${props.sensor?.include || ''}
            ${props.actuator?.include || ''}
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
