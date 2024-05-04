'use strict';

const { EventEmitter, once } = require('node:events');

const application = new EventEmitter();
const electronics = [
  { name: 'Laptop', price: 1500 },
  { name: 'Keyboard', price: 100 },
  { name: 'HDMI cable', price: 10 },
];

application.on('buy', (items) => {
  if (!Array.isArray(items)) {
    application.emit('error', new Error('Array expected'));
  } else {
    application.emit('purchase', items);
  }
});

(async () => {
  const [error] = await once(application, 'error');
  console.error(error);
})();

application
  .once('purchase', console.log)
  .emit('buy', electronics);
