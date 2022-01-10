import React from "react";
import { render } from "@testing-library/react";
import Footer from ".";

function setup() {
	return render(<Footer />);
}

describe("Footer :", () => {
	test("Component is alive", () => {
		const { getByTestId } = setup();
		const element = getByTestId("footer");
		expect(element).toBeInTheDocument();
	});
});
