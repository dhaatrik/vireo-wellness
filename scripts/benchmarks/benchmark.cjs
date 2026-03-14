const { performance } = require('perf_hooks');
const crypto = require('crypto');

// Generate mock data
const generateMockData = (numGroups, entriesPerGroup) => {
  const userMeals = [];
  let currentTime = Date.now();
  for (let i = 0; i < numGroups; i++) {
    const group = { entries: [] };
    for (let j = 0; j < entriesPerGroup; j++) {
      group.entries.push({ loggedAt: new Date(currentTime - crypto.randomInt(0, 100000000)).toISOString() });
    }
    userMeals.push(group);
  }
  return userMeals;
};

const userMeals = generateMockData(50, 200); // 10000 entries

// Baseline: sort
const runBaseline = () => {
  const start = performance.now();
  for (let i = 0; i < 100; i++) {
    const lastAddedTime = userMeals
      .flatMap(group => group.entries)
      .map(entry => new Date(entry.loggedAt))
      .sort((a,b) => b.getTime() - a.getTime())[0];
  }
  return performance.now() - start;
};

// Optimized: reduce
const runOptimized = () => {
  const start = performance.now();
  for (let i = 0; i < 100; i++) {
    const maxTimestamp = userMeals
      .flatMap(group => group.entries)
      .reduce((max, entry) => {
        const time = new Date(entry.loggedAt).getTime();
        return time > max ? time : max;
      }, -Infinity);
    const lastAddedTime = maxTimestamp !== -Infinity ? new Date(maxTimestamp) : undefined;
  }
  return performance.now() - start;
};

const baselineTime = runBaseline();
const optimizedTime = runOptimized();

console.log(`Baseline (sort): ${baselineTime.toFixed(2)}ms`);
console.log(`Optimized (reduce): ${optimizedTime.toFixed(2)}ms`);
console.log(`Improvement: ${((baselineTime - optimizedTime) / baselineTime * 100).toFixed(2)}%`);
