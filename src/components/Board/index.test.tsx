import { render } from "@testing-library/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Board from ".";

function setup() {
	return render(
		<DndProvider backend={HTML5Backend}>
			<Board />
		</DndProvider>
	);
}

describe("Board :", () => {
	test("Component is alive", () => {
		const { getByTestId } = setup();
		const element = getByTestId("board");
		expect(element).toBeInTheDocument();
	});
});
