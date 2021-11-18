import React from "react";
import { BrowserRouter, Routes as Switch, Route } from "react-router-dom";
import { ROUTES as R } from "#/src/constants";

import HomePage from "@/pages/Home";
// import NotFoundPage from "@/pages/NotFound";

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={R.HOME()} element={<HomePage />} />
        <Route path={R.NOT_FOUND()} element={<> NOT FOUND</>} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
