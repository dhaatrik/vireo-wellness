const { performance } = require('perf_hooks');

// Generate mock data
const generateMockData = (numGroups, entriesPerGroup) => {
  const userMeals = [];
  let currentTime = Date.now();
  for (let i = 0; i < numGroups; i++) {
    const group = { entries: [] };
    for (let j = 0; j < entriesPerGroup; j++) {
      group.entries.push({ loggedAt: new Date(currentTime - Math.random() * 100000000).toISOString() });
    }
    userMeals.push(group);
  }
  return userMeals;
};

const userMeals = generateMockData(50, 20); // 1000 entries

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

// Optimized 4: reduce string compare
const runOptimized4 = () => {
  const start = performance.now();
  for (let i = 0; i < 100; i++) {
    const maxTimestampStr = userMeals
      .flatMap(group => group.entries)
      .reduce((max, entry) => {
        return entry.loggedAt > max ? entry.loggedAt : max;
      }, "");
    const lastAddedTime = maxTimestampStr ? new Date(maxTimestampStr) : undefined;
  }
  return performance.now() - start;
};


const baselineTime = runBaseline();
const optimizedTime4 = runOptimized4();

console.log(`Baseline (sort): ${baselineTime.toFixed(2)}ms`);
console.log(`Optimized 4 (reduce string compare): ${optimizedTime4.toFixed(2)}ms`);
