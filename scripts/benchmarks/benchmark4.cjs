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

// Optimized 5: nested reduce string compare
const runOptimized5 = () => {
  const start = performance.now();
  for (let i = 0; i < 100; i++) {
    const maxTimestampStr = userMeals.reduce((maxGroup, group) => {
      const maxEntry = group.entries.reduce((max, entry) => {
        return entry.loggedAt > max ? entry.loggedAt : max;
      }, "");
      return maxEntry > maxGroup ? maxEntry : maxGroup;
    }, "");
    const lastAddedTime = maxTimestampStr ? new Date(maxTimestampStr) : undefined;
  }
  return performance.now() - start;
};


const baselineTime = runBaseline();
const optimizedTime5 = runOptimized5();

console.log(`Baseline (sort): ${baselineTime.toFixed(2)}ms`);
console.log(`Optimized 5 (nested reduce string compare): ${optimizedTime5.toFixed(2)}ms`);
console.log(`Improvement: ${((baselineTime - optimizedTime5) / baselineTime * 100).toFixed(2)}%`);
