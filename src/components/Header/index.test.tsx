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
			</Router>
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
		const navImport = getByTestId("navImport");
		const navDownload = getByTestId("navDownload");
		const navDelete = getByTestId("navDelete");

		expect(navBrand).toBeInTheDocument();
		expect(navImport).toBeInTheDocument();
		expect(navDownload).toBeInTheDocument();
		expect(navDelete).toBeInTheDocument();
	});

	it("Should make the replace of the title", () => {
		const { getByTestId } = setup("Example");
		const navBrand = getByTestId("navBrand");

		expect(navBrand).toBeInTheDocument();
		expect(navBrand).toContainHTML("img");
		expect(navBrand).toContainHTML("Example");
	});
});
