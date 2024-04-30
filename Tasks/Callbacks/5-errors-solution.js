'use strict';

const MAX_PURCHASE = 2000;

const calculateSubtotal = (goods, callback) => {
  let amount = 0;
  for (const { name, price } of goods) {
    if (typeof name !== 'string') {
      return void callback(new Error('Noname in item in the bill'));
    }
    if (typeof price !== 'number') {
      return void callback(new Error(`${name} price expected to be number`));
    }
    if (price < 0) {
      return void callback(new Error(`Negative price for ${name}`));
    }
    amount += price;
  }
  callback(null, amount);
};

const calculateTotal = (order, callback) => {
  const expenses = new Map();
  let total = 0;
  const errors = [];
  const updateTotalAndExpenses = (groupName, amount) => {
    total += amount;
    expenses.set(groupName, amount);
  };

  for (const groupName in order) {
    const goods = order[groupName];
    calculateSubtotal(goods, (error, amount) => {
      if (error) return void errors.push(error);
      updateTotalAndExpenses(groupName, amount);
    });
    if (total > MAX_PURCHASE) {
      errors.push(new Error('Total is above the limit'));
      break;
    }
  }

  if (errors.length) {
    return void callback(new Error('Can not calculate total', {
      cause: AggregateError(errors, 'Caused by')
    }));
  }
  callback(null, { total, expenses });
};

const purchase = {
  Electronics: [
    { name: 'Laptop', price: 500 },
    { name: 'Keyboard', price: 1600 },
    { name: 'HDMI cable' },
  ],
  Textile: [
    { name: 'Bag', price: 50 },
    { price: 20 },
  ],
};

console.log(purchase);
calculateTotal(purchase, (error, bill) => {
  if (error) {
    console.log('Error detected');
    console.error(error);
    return;
  }
  console.log({ bill });
});
