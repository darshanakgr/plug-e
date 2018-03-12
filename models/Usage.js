const mongoose = require("mongoose");

const usageSchema = new mongoose.Schema({
    deviceId: String,
    year: Number,
    month: Number,
    date: Number,
    day: Number,
    usage: Number
});

const Usage = mongoose.model("Usage", usageSchema);

module.exports = { Usage };