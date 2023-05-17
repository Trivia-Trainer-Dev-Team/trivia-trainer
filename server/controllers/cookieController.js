const User = require('../models/userModel.js');


const cookieController = {};

cookieController.setSSIDCookie = (req, res, next) => {

    res.locals.ssid = res.locals.user[0].id;
    res.cookie('ssid', res.locals.ssid, { httpOnly: true });
    return next();
}

module.exports = cookieController;