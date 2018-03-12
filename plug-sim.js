const mqtt = require("./mqtt/mqtt-connection");

mqtt.subscribeDevice("ASD001");

mqtt.addListener((topic, message) => {
    console.log(message.toString());
})

mqtt.publishMessage("ASD001", "00");
// mqtt.publishMessage("ASD001", "00");
// setInterval(() => {
//     mqtt.publishMessage("asd001", "012365");
// },5000);