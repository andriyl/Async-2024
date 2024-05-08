'use strict';

const { EventEmitter, captureRejectionSymbol } = require('node:events');

const purchase = new EventEmitter({ captureRejections: true });
const electronics = [
  { name: 'Laptop', price: 1500 },
  { name: 'Keyboard', price: -100 },
  { name: 'HDMI cable', price: 10 },
];

purchase[captureRejectionSymbol] = (error) => void console.error(error.message);
purchase.on('add', async (item) => {
  console.log({ item });
  if (item.price < 0) {
    throw new Error('Negative price');
  }
});

for (const item of electronics) {
  purchase.emit('add', item);
}
