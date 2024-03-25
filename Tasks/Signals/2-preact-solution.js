'use strict';

const { signal, computed } = require('@preact/signals-core');

const electronics = [
  { name: 'Laptop', price: 1500 },
  { name: 'Keyboard', price: 100 },
  { name: 'HDMI cable', price: 10 },
];

const items = signal(electronics);
const total = computed(() => {
  let result = 0;
  for (const item of items.value) {
    result += item.price;
  }
  return result;
});

console.log(`Total: ${total.value}`);
