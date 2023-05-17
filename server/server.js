const express = require('express');
const app = express();
const PORT = 3000;

const userController = require('./controllers/userController.js');
const apiController = require('./controllers/apiController.js');
const sessionController = require('./controllers/sessionController.js');
const cookieController = require('./controllers/cookieController.js');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//MongoDB database

const mongoose = require('mongoose');
mongoose.connect(
  'mongodb+srv://Fabrizzio:Knicksarenumber1!@cluster0.my2wym6.mongodb.net/'
);
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

//login handler
app.get('/users/', userController.verifyUser, (req, res) => {
  if (res.locals.user) {
    return res.status(200).json(res.locals.user);
  } else {
    return res.status(204).json('Wrong credentials');
  }
});
// signup handler
app.post('/users/', userController.createUser, cookieController.setSSIDCookie, (req, res) => {
  return res.status(201).json(res.locals.user);
});

//handler for getting all questions from the api
app.get('/questions/:category', apiController.retrieveData, (req, res) => {
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
