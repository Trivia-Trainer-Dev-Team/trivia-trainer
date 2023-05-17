
/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import HomeElement from '../src/pages/home';
import PageContainer from '../src/pages/login';
import QuizPage from '../src/pages/QuizPage';

// xdescribe('tests the QuizPage component ', () => {

//   test('renders QuizPage component without errors', () => {
//     render(<QuizPage />);
//   });

//   test('displays loading message when data is loading', () => {
//     render(<QuizPage />);
//     const loadMsg = screen.getByText('...Data Loading...');
//     expect(loadingMessage).toBeInTheDocument();
//   });

// });

test('expects login page to have username and password fields', async () => {
  render(<PageContainer />);

  const inputLabels = await screen.findAllByRole('p');
  expect(inputLabels[0]).toHaveTextContent('Username');
  expect(inputLabels[1]).toHaveTextContent('Password');
});
