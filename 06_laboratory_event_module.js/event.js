const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

myEmitter.on('start', () => {
  console.log('Application Started!');
});

myEmitter.on('data', (data) => {
  console.log(`Data received: ${JSON.stringify(data)}`);
});

myEmitter.on('error', (err) => {
  console.error(`Error occurred: ${err.message}`);
});


myEmitter.emit('start');
myEmitter.emit('data', { name: "John Doe", age: 25 });
myEmitter.emit('error', new Error('Sample error message'));
