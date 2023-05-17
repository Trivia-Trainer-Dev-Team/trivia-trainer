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
           message: { err: 'An error occurred userController.createUser' }
       });
   }
   try {
       console.log(req.body)
       let user = await User.create({ //Users will input their username, password, and name, score d -> 0
            username: username,
            password: password,
            name: name
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
   console.log(req.body)
   if (!username || !password) {
       return next({
           log: 'Error occurred in userController.verifyUser',
           status: 400,
           message: { err: 'An error occurred in entering username/password in verifyUser' }
       });
   }
   try {
       const user = await User.findOne({ username });
       if (!user) {
         return next({
           log: 'Error occurred in userController.verifyUser',
           status: 400,
           message: { err: 'An error occurred, cannot find user' }
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
}


userController.updateScore = async (req, res, next) => {
   const { username } = req.params; //When you finish the quiz, it should send over the username of the person and the #of correct questions
   try {
     const user = await User.findOne({ username });
     if (user) {
       await user.increaseScore();
       const updatedScore = { score: user.score }; //needs to send this cookies
       return next()
     } else {
       return next({
           log: 'Error occurred in userController.updateScore',
           status: 400,
           message: {error: "User not found"}
       })
     }
   } catch (error) {
       return next({
           log: 'Error occurred in userController.updateScore',
           status: 400,
           message: { err: 'An error occurred' },
       });
   }
 };




module.exports = userController