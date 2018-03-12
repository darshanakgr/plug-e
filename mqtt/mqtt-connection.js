const mqtt = require('mqtt');

const client  = mqtt.connect('mqtt://localhost:1883');

client.on('connect', function () {
    console.log('Connected to the broker...');    
});

const subscribeDevice = (deviceId) => {
    console.log(`Subscribed to device loggers/${deviceId}`)
    return new Promise((resolve, reject) => {
        client.subscribe(`loggers/${deviceId}`, undefined, function(err, res){
            if(err){
                return reject(err);
            }
            return resolve(res);
        });
    });
}

const unsubscribeDevice = (deviceId) => {
    console.log(`Unsubscribed to device loggers/${deviceId}`)
    return new Promise((resolve, reject) => {
        client.subscribe(`loggers/${deviceId}`, function(err, res){
            if(err){
                return reject(err);
            }
            return resolve(res);
        });
    });
}

const publishMessage = (deviceId, message) => {
    console.log(`Published to device loggers/${deviceId} : ${message}`);
    return new Promise((resolve, reject) => {
        client.publish(`loggers/${deviceId}`, message, {}, function(err, res){
            if(err){
                return reject(err);
            }
            return resolve(res);
        });
    });
}

const subscribeTopic = (topic) => {
    return new Promise((resolve, reject) => {
        client.subscribe(topic, undefined, function(err, res){
            if(err){
                return reject(err);
            }
            return resolve(res);
        });
    });
}

const addListener = (listener) => {
    client.on("message", listener);
}

module.exports = {
    subscribeDevice,
    unsubscribeDevice,
    publishMessage,
    addListener,
    subscribeTopic
};