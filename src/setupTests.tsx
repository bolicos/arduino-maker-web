// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom

import { ROUTES } from '#/constants';
import "@testing-library/jest-dom";
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router';

afterEach(() => {
  jest.useRealTimers();
});

export const setup = (ui: React.ReactNode) => {
  const history = createMemoryHistory({
    initialEntries: [ROUTES.HOME()],
  });

  return {
    ...render(
      <Router location={ROUTES.HOME()} navigator={history}>
        {ui}
      </Router>,
    ),
    history,
  };
}