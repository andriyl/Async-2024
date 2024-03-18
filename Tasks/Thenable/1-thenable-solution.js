'use strict';

const iterate = (items) => {
  let index = 0;
  return {
    then(onFulfilled) {
      if (index < items.length) {
        onFulfilled(items[index++]);
      }
    }
  }
};

const electronics = [
  { name: 'Laptop', price: 1500 },
  { name: 'Keyboard', price: 100 },
  { name: 'HDMI cable', price: 10 },
];

(async () => {
  const items = iterate(electronics);
  for (let i = 0; i < electronics.length; i++) {
    const item = await items;
    console.log(item);
  }
})();
