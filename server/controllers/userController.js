const mongoose = require('mongoose');
const User = require('../models/userModel.js');
const bcrypt = require('bcrypt');

const userController = {};

//USER SIGN UP -
userController.createUser = async (req, res, next) => {
  console.log('attempting to create user');
  const { username, password, name } = req.body; //req.body because it's a POST request
  if (!username || !password || !name) {
    return next({
      log: 'Error occurred in userController.createUser',
      status: 400,
      message: {
        err: 'An error occurred userController.createUser no pass or username',
      },
    });
  }
  try {
    console.log(req.body);
    let user = await User.create({
      //Users will input their username, password, and name, score d -> 0
      username: username,
      password: res.locals.hashedPass,
      name: name,
    });
    console.log('attempting to create user');
    res.locals.user = user;
    return next();
  } catch (err) {
    return next({
      log: 'Error occurred in userController.createUser',
      status: 400,
      message: { err: 'An error occurred in userController.createUser' },
    });
  }
};

//get user from cookie
userController.getUserFromCookie = (req, res, next) => {
  const { ssid } = req.cookies;
  User.find({ _id: ssid })
    .then((user) => {
      res.locals.user = user;
      return next();
    })
    .catch((err) =>
      next({
        log: 'Error occurred in userController.verifyUser',
        status: 400,
        message: {
          err: 'An error occurred in getting the user from the cookie',
        },
      })
    );
};

//USER LOGIN
userController.verifyUser = async (req, res, next) => {
  const { username, password } = req.query; //all we need is these two to login
  console.log(req.query);
  if (!username || !password) {
    return next({
      log: 'Error occurred in userController.verifyUser',
      status: 400,
      message: {
        err: 'An error occurred in entering username/password in verifyUser',
      },
    });
  }
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return next({
        log: 'Error occurred in userController.verifyUser',
        status: 400,
        message: { err: 'An error occurred, cannot find user' },
      });
    }
    const hashedPass = user.password;
    const matchPass = await bcrypt.compare(password, hashedPass);
    if (!matchPass) {
      return next({
        log: 'Error occurred in userController.verifyUser when matching hashed password',
        status: 400,
        message: { err: 'An error occurred' },
      });
    }
    res.locals.user = user;
    return next();
  } catch (err) {
    return next({
      log: 'Error occurred in userController.verifyUser',
      status: 400,
      message: { err: 'An error occurred' },
    });
  }
};

userController.updateScore = async (req, res, next) => {
  const { ssid } = req.cookies; //When you finish the quiz, it should send over the username of the person and the #of correct questions
  const { correctAnswer } = req.body;
  try {
    const user = await User.findOne({ _id: ssid });
    if (user) {
      await user.increaseScore(correctAnswer);
      return next();
    } else {
      return next({
        log: 'Error occurred in userController.updateScore',
        status: 400,
        message: { error: 'User not found' },
      });
    }
  } catch (error) {
    return next({
      log: 'Error occurred in userController.updateScore',
      status: 400,
      message: { err: 'An error occurred' },
    });
  }
};

userController.resetScore = async (req, res, next) => {
  const { username } = req.params;
  try {
    const user = User.findOne({ username });
    if (!user) {
      return next({
        log: 'Error occurred in userController.resetScore',
        status: 400,
        message: { err: 'An error occurred in the resetScore' },
      });
    }
    user.score = 0;
    res.locals.resetScore = user.score;
    await user.save();
    return next();
  } catch (error) {
    return next({
      log: 'Error occurred in userController.deleteUser',
      status: 400,
      message: { err: 'An error occurred in deleteUser' },
    });
  }
};

userController.hashpassword = async (req, res, next) => {
  try {
    console.log('Trying to hash password');
    const { password } = req.body;
    const hashedPass = await bcrypt.hash(password, 10);
    console.log(hashedPass);
    console.log('this is the hashed password ' + hashedPass);
    res.locals.hashedPass = hashedPass;
    return next();
  } catch (error) {
    return next({
      log: 'Error occurred in userController.hashpassword middleware function',
      status: 400,
      message: { err: 'Hashing was unsuccessful' },
    });
  }
};

module.exports = userController;
