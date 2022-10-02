import { ROUTES as R } from "#/constants";
import React from "react";
import { BrowserRouter, Route, Routes as Switch } from "react-router-dom";

// import HomePage from "#/pages/Home";
import Code from "#/pages/Code";
import CreatePage from "#/pages/Create";
import MakerPage from "#/pages/Maker";
import NotFoundPage from "#/pages/NotFound";

const Routes: React.FC = () => {
	return (
		<BrowserRouter>
			<Switch>
				{/* <Route path={R.HOME()} element={<HomePage />} /> */}
				<Route path={R.HOME()} element={<CreatePage />} />
				<Route path={R.MAKER()} element={<MakerPage />} />
				<Route path={R.CODE()} element={<Code />} />
				<Route path={R.NOT_FOUND()} element={<NotFoundPage />} />
			</Switch>
		</BrowserRouter>
	);
};

export default Routes;
