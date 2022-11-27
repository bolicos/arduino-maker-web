import { Block } from '#/models/blocks';
import { Board } from '#/models/boards';

const EMPTY_OPTION = 'Select one option:';

export default class Htmls {
  static optionBlockHTML = (item: Block) => {
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

  static optionEmptyTML = () => {
    return (
      <option key={'0'} value={''} disabled>
        {EMPTY_OPTION}
      </option>
    );
  };
}
