'use strict';

// Task: rewrite error handling to use callback-last-error-first
// contract to return errors instead of throwing them.
// So remove all try/catch blocks and pass errors to callbacks.
// Hint: You may also use error.cause to wrap escalated errors.
// Extra credit task: use AggregateError to combine escalated errors.
// Extra credit task: fix eslint error: "Function declared in a loop
//   contains unsafe references to variable(s) 'total'  no-loop-func"

// TODO: can't reproduce eslint error

const MAX_PURCHASE = 2000;

const calculateSubtotal = (goods, callback) => {
  let amount = 0;
  for (const { name, price } of goods) {
    if (typeof name !== 'string') {
      return void callback(new Error('Noname in item in the bill'));
    }
    if (typeof price !== 'number') {
      return void callback(new Error(`${name} price expected to be number`))
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
  for (const groupName in order) {
    const goods = order[groupName];
    calculateSubtotal(goods, (error, amount) => {
      if (error) return void errors.push(error);
      total += amount;
      expenses.set(groupName, amount);
    });
    if (total > MAX_PURCHASE) {
      errors.push(new Error('Total is above the limit'))
      break;
    }
  }

  if (errors.length) {
    return void callback(new Error('Can not calculate total', {
      cause: AggregateError(errors, 'Caused by')
    }));
  }
  return void callback(null, { total, expenses });
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
