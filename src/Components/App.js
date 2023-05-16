import React from 'react';
// import LandingPage from './LandingPage';
import QuizPage from '../pages/QuizPage.jsx';
import Home from '../pages/home.jsx';

import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/home' element={<Home />} />
      <Route path='/quizPage/:quizGenre' element={<QuizPage />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
