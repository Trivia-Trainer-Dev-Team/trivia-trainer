const User = require('../models/userModel.js');

const cookieController = {};

cookieController.setSSIDCookie = async (req, res, next) => {
  try {
    console.log('ssid', res.locals.user.id);
    res.cookie('ssid', res.locals.user.id);
    return next();
  } catch (err) {
    next({
      log: 'An error occurred in cookieController in the setSSIDCookie middleware function',
      status: 400,
      message: { err: 'Setting an SSID cookie was unsuccessful' },
    });
  }
};

cookieController.deleteCookie = async (req, res, next) => {
  try {
    console.log('trying to delete');
    res.clearCookie('ssid');
    return next();
  } catch (err) {
    next({
      log: 'An error occurred in cookieController in the deleteCookie middleware function',
      status: 400,
      message: { err: 'Deleting cookie was unsuccessful' },
    });
  }
};

module.exports = cookieController;
