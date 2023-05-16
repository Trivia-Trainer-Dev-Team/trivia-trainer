const express = require('express');
const app = express();
const PORT = 3000;

const apiController = require('./controllers/apiController.js');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//login handler
app.get('/users/', userController.verifyUser, (req, res) => {
  if (res.locals.user) {
    return res.status(200).send(res.locals.user);
  } else {
    return res.status(204).send('Wrong credentials');
  }
});
// signup handler
app.post('/users/signup', userController.createUser, (req, res) => {
  return res.status(201).send(res.locals.user);
});

//handler for getting all questions from the api
app.post('/questions/:category', apiController.retrieveData, (req, res) => {
  return res.status(200).json(res.locals.result);
});

app.patch('/users/:user', userController.updateScore, (req, res) => {
  return res.status(202).json('Score Updated');
});

//global error handler
app.use((err, req, res, next) => {
  const defaultError = {
    log: 'Express error handle caught unknown middleware error',
    status: 400,
    message: { err: 'An error occured' },
  };
  const errObj = Object.assign(defaultError, err);
  return res.status(errObj.status).json(errObj.message);
});

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});

module.exports = app;

// const signupUser = async () => {
//   const response = await fetch('/users/signup', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ username, password }),
//   });
//   const signedupUser = await response.json();
// };
// const loginUser = async () => {
//   const response = await fetch('/users/login', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ username, password }),
//   });
//   const signedupUser = await response.json();
// };
// const getQuestions = async ()=>{

//   const response = await fetch('/questions/')
// }
