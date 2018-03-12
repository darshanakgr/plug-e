const { mongoose } = require("./db/connection");

const { updateUsage } = require("./controller/UsageController");

updateUsage("d001", new Date(), 10);