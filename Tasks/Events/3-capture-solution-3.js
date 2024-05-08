'use strict';

const { EventEmitter, captureRejectionSymbol } = require('node:events');

class EventManager extends EventEmitter {
  constructor() {
    super({ captureRejections: true });
    this.listenersMap = new Map();
  }

  [captureRejectionSymbol](error, event, ...args) {
    this.destroy({ error, event, args });
  }

  destroy(args) {
    console.log(args);
    const listener = this.listenersMap.get(args.event);
    if (listener) {
      this.removeListener(args.event, listener);
      this.listenersMap.delete(args.event);
    }
  }

  on(event, listener) {
    super.on(event, listener);
    this.listenersMap.set(event, listener);
  }
}

// Usage:
const purchase = new EventManager();
const electronics = [
  { name: 'Laptop', price: 1500 },
  { name: 'Keyboard', price: -100 },
  { name: 'HDMI cable', price: 10 },
];

purchase.on('add', async (item) => {
  console.log({ item });
  if (item.price < 0) {
    throw new Error('Negative price');
  }
});

for (const item of electronics) {
  purchase.emit('add', item);
}
