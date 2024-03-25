'use strict';

const sleep = (msec) => new Promise((resolve) => {
  setTimeout(resolve, msec);
});

const variantPromise = 'Variant [Promise]';
console.log(variantPromise, { start: new Date().toISOString() });
console.log(variantPromise, 'Wait 3 sec...');
sleep(3000).then(() => {
  console.log(variantPromise, { finish: new Date().toISOString() });
});

const variantAsyncAwait = 'Variant [AsyncAwait]';
(async () => {
  console.log(variantAsyncAwait, { start: new Date().toISOString() });
  console.log(variantAsyncAwait, 'Wait 3 sec...');
  await sleep(3000);
  console.log(variantAsyncAwait, { finish: new Date().toISOString() });
})();
