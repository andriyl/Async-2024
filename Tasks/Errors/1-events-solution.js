'use strict';

const EventEmitter = require('node:events');
const ee = new EventEmitter({ captureRejections: true });

ee.on('item', async (price) => {
  if (price < 0) throw new Error('Negative price');
  else console.log({ price });
});

ee.on('error', (error) => {
  console.error(error.message);
});

const items = [1500, -100, 10, -2, 70];
for (const item of items) {
  setTimeout(() => ee.emit('item', item));
}
