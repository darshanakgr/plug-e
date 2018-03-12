const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/pluge", (err) => {
    if(err){
        return console.log(err);
    }
    console.log("Connected to mongodb");
});

module.exports = {mongoose};