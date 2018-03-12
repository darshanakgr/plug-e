const { Usage } = require("../models/Usage");

const updateUsage = async function (deviceId, date, usage){
    const deviceDetail = {
        deviceId: deviceId, 
        year: date.getFullYear(),
        month: date.getMonth(),
        date: date.getDate(),
        day: date.getDay()
    };
    const usageObj = await Usage.findOne(deviceDetail);

    if(usageObj){
        const res = await Usage.findOneAndUpdate(deviceDetail , {
            $inc: {usage}
        });
        return;
    }
    
    const res = await new Usage({
        deviceId: deviceId, 
        year: date.getFullYear(),
        month: date.getMonth(),
        date: date.getDate(),
        day: date.getDay(),
        usage: usage
    }).save();

    return;
}

module.exports = { updateUsage };