const Session = require('../models/sessionModel.js');
const mongoose = require('mongoose');


    const sessionController = {}

    sessionController.isLoggedIn = async (req, res, next) =>{
    try{
    const session = await Session.findOne({cookieId: req.cookies.cookieID})
    if (session){
        return next();
    }
        //not logged in so redirect to sign up page. 
        //res.redirect('')
    }
    //if there is error, redirect to sign up page
    catch (err) {
        console.error('Error in isLoggedIn middleware', err);
        // If there is an error, redirect to the sign-up page.
        // res.redirect(...)
      }
    }

    sessionController.startSession = async (req,res,next) => {

        try{        
        res.cookie('cookieId', res.locals.ssid);
        await Session.create({cookieID: res.locals.ssid})
        return next();
        }
        catch (err) {
            return next({
              log: 'An error occured in sessionController in the startSession middleware function',
              status: 400,
              message: { err: 'Creating a new Session was not successful' },
            });
          }
    }

    sessionController.deleteSession = async (req,res,next) =>{
        try{
            await Session.remove({cookieId: req.locals.ssid})
            return next();
        }
        catch (err) {
            // If there is an error, redirect to the sign-up page.
            // res.redirect(...)
            console.log(err);
          }
    };

    module.exports = sessionController;