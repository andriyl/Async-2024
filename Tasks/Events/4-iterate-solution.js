'use strict';

const { EventEmitter, on } = require('node:events');
const purchase = new EventEmitter();

const electronics = [
  { name: 'Laptop', price: 1500 },
  { name: 'Keyboard', price: 100 },
  { name: 'HDMI cable', price: 10 },
];

(async () => {
  const iterator = on(purchase, 'add');
  for await (const [value] of iterator) {
    console.log(value);
  }
})();

for (const item of electronics) {
  purchase.emit('add', item);
}
