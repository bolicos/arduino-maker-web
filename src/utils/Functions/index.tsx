type TypeBoard = 'SENSOR' | 'ACTUATOR';

export default class Functions {
  static frutas = () => {
    return '';
  };

  static find = <V,>(list: Array<V>, value: string, key: keyof V, type: TypeBoard) => {
    return list.find((item) => item[key] === value);
  };
}
