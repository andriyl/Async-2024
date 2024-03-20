'use strict';

const { EventEmitter } = require('node:events');
const purchase = new EventEmitter();

purchase.on('buy', bought => {
  console.log({ bought });
});

const electronics = [
  { name: 'Laptop', price: 1500 },
  { name: 'Keyboard', price: 100 },
  { name: 'HDMI cable', price: 10 },
];

for (const item of electronics) {
  purchase.emit('buy', item);
}
