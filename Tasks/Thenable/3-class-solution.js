'use strict';

class Iterator {
  #index = 0;
  #items = null;

  constructor(items) {
    this.#items = items;
  }

  then(fulfill, reject) {
    if (this.#index < this.#items.length) {
      fulfill(this.#items[this.#index++]);
    } else {
      reject(new Error('no more items'));
    }
  }
}

const electronics = [
  { name: 'Laptop', price: 1500 },
  { name: 'Keyboard', price: 100 },
  { name: 'HDMI cable', price: 10 },
];

(async () => {
  const items = new Iterator(electronics);
  // Use `new Iterator(electronics)`
  const item1 = await items;
  console.log(item1);
  const item2 = await items;
  console.log(item2);
  const item3 = await items;
  console.log(item3);
  const item4 = await items;
  console.log(item4);
})();
