'use strict';

const TIMEOUT = 1000

const total = (items, callback) => {
  let result = 0;
  let counter = 0;
  let timer = setInterval(() => {
    if ((items.length) <= counter) {
      // if (timer) {} //TODO: is possible to break it? how?
      clearInterval(timer);
      timer = null;
      return callback(null, result); //TODO: is 'void' necessary here
    }

    const item = items[counter];
    console.log({ check: { item }});

    if (item.price < 0) {
      clearInterval(timer);
      timer = null  //TODO: doc we need it?
      return callback(new Error('Negative price is not allowed'));
    }
    counter++;
    result += item.price;
  }, TIMEOUT)
};

const electronics = [
  { name: 'Laptop', price: 1500 },
  { name: 'Keyboard', price: 100 },
  { name: 'HDMI cable', price: 10 },
];

total(electronics, (error, money) => {
  if (error) console.error({ error });
  else console.log({ money });
});

total(electronics, (error, money) => {
  if (error) console.error({ error });
  else console.log({ money });
});
