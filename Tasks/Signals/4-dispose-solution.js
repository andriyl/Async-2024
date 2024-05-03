'use strict';

const { signal, effect } = require('@preact/signals-core');

const PURCHASE_LIMIT = 1600;
const electronics = [
  { name: 'Laptop', price: 1500 },
  { name: 'Keyboard', price: 100 },
  { name: 'HDMI cable', price: 10 },
];

const total = signal(0);
const dispose = effect(() => {
  console.log(`Total: ${total.value}`);
});

for (const item of electronics) {
  if (total.value >= PURCHASE_LIMIT) dispose();
  total.value += item.price;
}
