/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginFeature } from '../src/pages/login';
import { UserContainer } from '../src/pages/home';
import { QuizElements } from '../src/pages/home';

describe('Unit Testing React Components', () => {
  describe('Login Header', () => {
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
  describe('Usercontainer', () => {
    let userCont;
    const name = 'Shahmar';
    const score = 5;
    beforeEach(() => {
      userCont = render(
        <BrowserRouter>
          <Routes>
            <Route
              path='/'
              element={<UserContainer name={name} score={score} />}
            />
          </Routes>
        </BrowserRouter>
      );
    });
    test('Renders the passed in props:score inside the component', () => {
      expect(
        userCont.getByText('Questions Correct').nextSibling
      ).toHaveTextContent(score);
    });
    test('Renders the passed in props:name inside the component', () => {
      console.log('render container:', userCont.container);
      expect(userCont.container.lastChild).toHaveTextContent(name);
    });
  });
  describe('Quiz Link click evenet', () => {
    let quiz;
    beforeEach(() => {
      quiz = render(
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<QuizElements />} />
          </Routes>
        </BrowserRouter>
      );
    });

    test('on click  needs to navigate to quiz page', async () => {
      const button = screen.getAllByRole('button')[0];
      fireEvent.click(button);
      waitFor(() => {
        expect(screen.getByText('...Data Loading...')).toBeInTheDocument();
      });
    });
  });
});
