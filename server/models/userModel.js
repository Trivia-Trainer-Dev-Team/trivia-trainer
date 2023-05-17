//MongoDB database
const mongoose = require('mongoose');
const Schema = mongoose.Schema;




const userSchema = new Schema ({
   username: {type: String, required:true, unique:true},
   password: {type: String, required: true},
   name: {type: String, required: true},
   score: {type: Number, default: 0} //every person starts with a score of 0
})


userSchema.methods.increaseScore = function(numCorrectQuestions) {
   this.score += 1;
   return this.save();
 };


module.exports = mongoose.model('User', userSchema);