'use strict';

const { signal, effect } = require('@preact/signals-core');

const electronics = [
  { name: 'Laptop', price: 1500 },
  { name: 'Keyboard', price: 100 },
  { name: 'HDMI cable', price: 10 },
];

const total = signal(0);

effect(() => {
  console.log(`Total: ${total.value}`);
});

for (const item of electronics) {
  total.value += item.price;
}
