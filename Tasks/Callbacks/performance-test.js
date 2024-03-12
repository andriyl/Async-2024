const measureExecutionPerformance = ({ fn }) => {
  const startTime = performance.now();
  fn();
  const endTime = performance.now();
  return endTime - startTime;
};

const measureExecutionTime = ({ fn, name}) => {
  console.time(`performance: ${name}`);
  fn();
  console.timeEnd(`performance: ${name}`);
};

const arr = Array.from({ length: 10000000 }, (_, index) => index);
const approaches = [
  { name: 'slice()', fn: () => arr.slice() },
  { name: 'spread (...) operator', fn: () => [...arr] },
  { name: 'Array.from()', fn: () => Array.from(arr) },
  { name: 'concat()', fn: () => [].concat(arr) },
  { name: 'Loop', fn: () => {
      let newArray = [];
      for (let i = 0; i < arr.length; i++) {
        newArray.push(arr[i]);
      }
      return newArray;
    }
  }
];

approaches.forEach(approach => {
  measureExecutionTime(approach);
  const executionTime = measureExecutionPerformance(approach);
  console.log(`Time taken for ${approach.name}: ${executionTime} milliseconds \n`);
});
