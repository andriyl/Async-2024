'use strict';

const TIMEOUT = 1000

const clearTimer = (timer) => {
  if (timer) {
    clearInterval(timer);
  }
  return null;
};

const total = (items, callback) => {
  let result = 0;
  let counter = 0;
  let timer = setInterval(() => {
    if ((items.length) <= counter) {
      timer = clearTimer(timer);
      return void callback(null, result);
    }

    const item = items[counter++];
    console.log({ check: { item }});

    if (item.price < 0) {
      timer = clearTimer(timer);
      return void callback(new Error('Negative price is not allowed'));
    }
    result += item.price;
  }, TIMEOUT)
};

const electronics = [
  { name: 'Laptop', price: 1500 },
  { name: 'Keyboard', price: 100 },
  { name: 'HDMI cable', price: 10 },
];

total(electronics, (error, money) => {
  if (error) return void console.error({ error });
  console.log({ money });
});

total(electronics, (error, money) => {
  if (error) return void console.error({ error });
  console.log({ money });
});
