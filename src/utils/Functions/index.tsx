// type TypeBoard = 'SENSOR' | 'ACTUATOR';

export default class Helpers {
  static frutas = () => {
    return '';
  };

  static find = <V,>(list: Array<V>, value: string, key: keyof V) => {
    return list.find((item) => item[key] === value);
  };
}
