const User = require('../models/userModel.js');


const cookieController = {};

cookieController.setSSIDCookie = async (req, res, next) => {
    const {username} = req.params;
    try{
    console.log('attempting to find username in cookiecontroller')
    await User.find({username})
    .then(response => response.json())
    .then(data =>{
        console.log('found user. data is ' + data);
        res.locals.ssid = response[0]._id;
        res.cookie('ssid', res.locals.ssid, { httpOnly: true });
        return next();
    })
} catch (err) {
    return next({
      log: 'An error occured in cookieController in the setSSIDCookie middleware function',
      status: 400,
      message: { err: 'Setting an SSID cookie was unsuccessful' },
    });
  }
}

module.exports = cookieController;