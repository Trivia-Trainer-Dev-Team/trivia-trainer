const mongoose = require('mongoose');
const User = require('../models/userModel.js');

const userController = {};

//USER SIGN UP -
userController.createUser = async (req, res, next) => {
  const { username, password, name } = req.body; //req.body because it's a POST request
  if (!username || !password || !name) {
    return next({
      log: 'Error occurred in userController.createUser',
      status: 400,
      message: { err: 'An error occurred userController.createUser' },
    });
  }
  try {
    console.log(req.body);
    let user = await User.create({
      //Users will input their username, password, and name, score d -> 0
      username: username,
      password: password,
      name: name,
    });
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
  try {
    const { ssid } = req.cookies;
    const { correctAnswer } = req.body;
    const user = await User.findOne({ _id: ssid });
    if (user) {
      await user.increaseScore(correctAnswer);
      const updatedScore = { score: user.score }; //needs to send this cookies
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
      log: 'Error occurred in userController.deleteUser',
      status: 400,
      message: { err: 'An error occurred in deleteUser' },
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

module.exports = userController;
