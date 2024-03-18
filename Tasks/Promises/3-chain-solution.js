'use strict';

const CURRENCY_RATE = 1.09;

const convert = ({ price }) => Promise.resolve(price * CURRENCY_RATE);

const electronics = [
  { name: 'Laptop', price: 1500 },
  { name: 'Keyboard', price: 100 },
  { name: 'HDMI cable', price: 10 },
];

const prices = electronics.map(convert);

const formatMoney = (x) => parseFloat(x.toFixed(2));

const sum = (a, b) => a + b;

// Solution
Promise.all(prices)
  .then(data => data.reduce(sum))
  .catch(console.error)
  .then(total => console.log('total:', formatMoney(total)))
  .finally(() => {
    console.log('Calculation finished')
  })