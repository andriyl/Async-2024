'use strict';

const total = (items, callback) => {
  let result = 0;
  const errors = [];
  for (const item of items) {
    if (item.price < 0) {
      errors.push(new Error('Negative price is not allowed'));
    }
    result += item.price;
  }
  if (errors.length) {
    return void callback(AggregateError(errors, 'Can not calculate total'));
  }
  callback(null, result);
};

const electronics = [
  { name: 'Laptop', price: 1500 },
  { name: 'Keyboard', price: -100 },
  { name: 'HDMI cable', price: 10 },
  { name: 'Bag', price: -50 },
];

total(electronics, (error, money) => {
  if (error) return void console.error({ error });
  console.log({ money });
});
