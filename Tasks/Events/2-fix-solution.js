'use strict';

const EventEmitter = require('node:events');

class Purchase extends EventEmitter {
  constructor({ limit }) {
    super();
    this.items = [];
    this.total = 0;
    this.on('add', (item) => {
      const total = this.total + item.price;
      if (total > limit) {
        this.emit('error', new Error('Limit reached'));
        return;
      }
      this.total = total;
      this.items.push(item);
      this.emit('buy', item);
    });
  }
}

const wallet = { money: 1600 };
console.log({ wallet });

const purchase = new Purchase({ limit: wallet.money });
purchase.on('error', (error) => {
  console.error(error.message);
});

purchase.on('add', (item) => {
  if (wallet.money < item.price) return;
  wallet.money -= item.price;
  console.log({ item, wallet });
});

purchase.on('buy', (item) => {
  console.log({ bought: item });
});

purchase.on('done', () => {
  console.log('Done');
});


const electronics = [
  { name: 'Laptop', price: 1500 },
  { name: 'Keyboard', price: 100 },
  { name: 'HDMI cable', price: 10 },
];

for (const item of electronics) {
  purchase.emit('add', item);
}
purchase.emit('done');

console.log({ wallet });
console.log({ purchase });
