'use strict';

const total = async (items) => {
  let result = 0;
  for (const item of items) {
    if (item.price < 0) {
      throw new Error('Negative price is not allowed');
    }
    result += item.price;
  }
  return result;
};

const electronics = [
  { name: 'Laptop', price: 1500 },
  { name: 'Keyboard', price: 100 },
  { name: 'HDMI cable', price: 10 },
];

(async () => {
  try {
    const money = await total(electronics);
    console.log({ money });
  } catch (error) {
    console.error({ error });
  }
})();
