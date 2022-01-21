import React from "react";
import { BrowserRouter, Routes as Switch, Route } from "react-router-dom";
import { ROUTES as R } from "#/src/constants";

// import HomePage from "#/src/pages/Home";
import CreatePage from "@/pages/Create";
import MakerPage from "@/pages/Maker";
import NotFoundPage from "@/pages/NotFound";

const Routes: React.FC = () => {
	return (
		<BrowserRouter>
			<Switch>
				{/* <Route path={R.HOME()} element={<HomePage />} /> */}
				<Route path={R.HOME()} element={<CreatePage />} />
				<Route path={R.MAKER()} element={<MakerPage />} />
				<Route path={R.NOT_FOUND()} element={<NotFoundPage />} />
			</Switch>
		</BrowserRouter>
	);
};

export default Routes;
