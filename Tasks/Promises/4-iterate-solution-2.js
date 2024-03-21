'use strict';

const iterate = (items) => {
  let index = 0;
  return {
    next: () => {
      const result = index < items.length ? items[index++] : undefined;
      return Promise.resolve(result);
    }
  };
};

const electronics = [
  { name: 'Laptop', price: 1500 },
  { name: 'Keyboard', price: 100 },
  { name: 'HDMI cable', price: 10 },
];

(async () => {
  const items = iterate(electronics);
  const item1 = await items.next();
  console.log(item1);
  const item2 = await items.next();
  console.log(item2);
  const item3 = await items.next();
  console.log(item3);
  const item4 = await items.next();
  console.log(item4);
})();
