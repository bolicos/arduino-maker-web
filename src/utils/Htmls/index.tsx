import { Block } from '#/models/blocks';
import { Board } from '#/models/boards';

export default class Htmls {
  static optionHTML = (item: Block) => {
    return (
      <option key={item.id} value={item.id}>
        {item.name}
      </option>
    );
  };

  static optionBoardHTML = (item: Board) => {
    return (
      <option key={item.type} value={item.type}>
        {item.name}
      </option>
    );
  };

  static optionSimpleHTML = (item: string) => {
    return (
      <option key={item} value={item}>
        {item}
      </option>
    );
  };
}
