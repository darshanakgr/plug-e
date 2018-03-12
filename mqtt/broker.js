const mosca = require('mosca');

const init = () => {
  let backend = {
    type: 'mongo',
    url: 'mongodb://localhost:27017/pluge',
    pubsubCollection: 'ascoltatori',
    mongo: {}
  };
  
  let settings = {
    port: 1883,
    backend: backend
  };
  
  let server = new mosca.Server(settings);
  
  server.on('clientConnected', (client) => console.log(`Client connected : ${client.id}`));
  
  server.on('ready', () => console.log('MQTT broker is up on 1883'));
}

module.exports = { init };
