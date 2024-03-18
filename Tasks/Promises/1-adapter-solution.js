'use strict';

const total = (items, callback) => {
  let result = 0;
  for (const item of items) {
    if (item.price < 0) {
      callback(new Error('Negative price is not allowed'));
      return;
    }
    result += item.price;
  }
  callback(null, result);
};

const totalAsync = (items) =>
  new Promise((resolve, reject) => {
    total(items, (error, data) => {
      if (error) reject(error);
      else resolve(data);
    });
  });

const electronics = [
  { name: 'Laptop', price: 1500 },
  { name: 'Keyboard', price: 100 },
  { name: 'HDMI cable', price: 10 },
];

totalAsync(electronics).then(money => {
  console.log({ money });
})
.catch(console.error);
