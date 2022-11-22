export type Board = {
  type: string;
  name: string;
};

export enum BoardType {
  ARDUINO_UNO = 'Arduino Uno',
  NODE_MCU_ESP8266 = 'Node MCU - ESP8266',
  RASPBERRY_PI_PICO_V3 = 'Raspberry Pi Pico v3',
}
