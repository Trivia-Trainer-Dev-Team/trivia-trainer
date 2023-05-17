const User = require('../models/userModel.js');

const cookieController = {};

cookieController.setSSIDCookie = async (req, res, next) => {
  try {
    res.cookie('ssid', res.locals.user.id);
    next();
  } catch (err) {
    next({
      log: 'An error occurred in cookieController in the setSSIDCookie middleware function',
      status: 400,
      message: { err: 'Setting an SSID cookie was unsuccessful' },
    });
  }
};

module.exports = cookieController;
