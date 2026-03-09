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

const userMealsEmpty = generateMockData(50, 0); // 0 entries

// Baseline: sort empty
const runBaseline = () => {
  const start = performance.now();
  for (let i = 0; i < 100; i++) {
    const lastAddedTime = userMealsEmpty
      .flatMap(group => group.entries)
      .map(entry => new Date(entry.loggedAt))
      .sort((a,b) => b.getTime() - a.getTime())[0];
  }
  return performance.now() - start;
};

// Optimized 5 empty
const runOptimized5 = () => {
  const start = performance.now();
  for (let i = 0; i < 100; i++) {
    const maxTimestampStr = userMealsEmpty.reduce((maxGroup, group) => {
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

console.log(`Baseline empty: ${baselineTime.toFixed(2)}ms`);
console.log(`Optimized empty: ${optimizedTime5.toFixed(2)}ms`);
