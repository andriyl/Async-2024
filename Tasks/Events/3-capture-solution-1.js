'use strict';

const EventEmitter = require('node:events');
const purchase = new EventEmitter({ captureRejections: true });

const electronics = [
  { name: 'Laptop', price: 1500 },
  { name: 'Keyboard', price: -100 },
  { name: 'HDMI cable', price: 10 },
];

purchase.on('error', (error)=> {
  console.error(error.message);
});

purchase.on('add', async (item) => {
  console.log({ item });
  if (item.price < 0) {
    throw new Error('Negative price');
  }
});

for (const item of electronics) {
  purchase.emit('add', item);
}
