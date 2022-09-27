import React from "react";
import { render } from "@testing-library/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BlockTypesEnum } from "#/models/blocks";
import Block from ".";

function setup(type: BlockTypesEnum, fn: jest.Mock<any, any>) {
  return render(
		<DndProvider backend={HTML5Backend}>
			<Block block={type} setState={fn} />
		</DndProvider>,
  );
}

describe("Block :", () => {
  test("Component is alive", () => {
    const type = BlockTypesEnum.SMART_MOTORS;
    const fnMock = jest.fn();
    const name = `block-${type}`;

    const { getByTestId } = setup(type, fnMock);
    const element = getByTestId(name);
    expect(element).toBeInTheDocument();
  });
});
