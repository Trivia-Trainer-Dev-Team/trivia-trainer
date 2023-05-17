/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginFeature } from '../src/pages/login';

describe('Unit Testing React Components', () => {
  let login;
  beforeAll(() => {
    login = render(
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginFeature />} />
        </Routes>
      </BrowserRouter>
    );
  });

  test('Renders the login component that has  text Login Page', () => {
    expect(login.getByText('Welcome Back!')).toBeInTheDocument();
  });
});
