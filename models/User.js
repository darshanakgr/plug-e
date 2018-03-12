const mongoose = require("mongoose");
const bcrypt   = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});

userSchema.methods.generateHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(8), undefined);

userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

const User = mongoose.model("User", userSchema);

module.exports = { User };