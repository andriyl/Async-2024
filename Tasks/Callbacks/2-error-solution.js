'use strict';

const total = (items, callback) => {
  let result = 0;
  for (const item of items) {
    if (item.price < 0) {
      const errorMessage = `${item.name} has negative price: ${item.price}`;
      return void callback(new Error(errorMessage));
    }
    result += item.price;
  }
  callback(null, result);
};

const electronics = [
  { name: 'Laptop', price: -1500 },
  { name: 'Keyboard', price: 100 },
  { name: 'HDMI cable', price: 10 },
];

total(electronics, (error, money) => {
  if (error) return void console.error({ error });
  console.log({ money });
});
