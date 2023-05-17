import React from 'react';
// import LandingPage from './LandingPage';
import QuizPage from '../pages/QuizPage.jsx';
import Home from '../pages/home.jsx';
import Login from '../pages/login.jsx';
import Signup from '../pages/signup.jsx';

import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import QuizPage from '../pages/QuizPage.jsx';
import Home from '../pages/home.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/home' element={<Home />} />
      <Route path='/quiz'>
        <Route path=':genre' element={<QuizPage />} />
      </Route>
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
