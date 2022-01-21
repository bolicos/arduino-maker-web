import React from "react";
import { render } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { Server } from "miragejs";
import { ROUTES } from "@/constants";
import { MirageServer } from "#/src/services/mirage/server.config";
import Header from ".";

function setup(title: string) {
	const history = createMemoryHistory({
		initialEntries: [ROUTES.HOME()],
	});

	return {
		...render(
			<Router location={ROUTES.HOME()} navigator={history}>
				<Header title={title} />
			</Router>,
		),
		history,
	};
}

describe("Header :", () => {
	let server: Server;

	beforeEach(() => {
		server = MirageServer();
	});

	afterEach(() => {
		server.shutdown();
	});

	it("Component is alive", () => {
		const { getByTestId } = setup("Example");
		const element = getByTestId("navbar");

		expect(element).toBeInTheDocument();
	});

	it("Verify that the elements are present on screen", () => {
		const { getByTestId } = setup("Example");
		const navBrand = getByTestId("navBrand");
		const ifrsImage = getByTestId("ifrsImage");
		const tuftsImage = getByTestId("tuftsImage");
		const bottomlessEngineImage = getByTestId("bottomlessEngineImage");

		expect(navBrand).toBeInTheDocument();
		expect(ifrsImage).toBeInTheDocument();
		expect(tuftsImage).toBeInTheDocument();
		expect(bottomlessEngineImage).toBeInTheDocument();
	});

	it("Should make the replace of the title", () => {
		const { getByTestId } = setup("Example");
		const title = getByTestId("title");

		expect(title).toBeInTheDocument();
		expect(title).toContainHTML("Example");
	});
});
