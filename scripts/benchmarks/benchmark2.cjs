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

// Optimized: reduce
const runOptimized1 = () => {
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

// Optimized: manual loop
const runOptimized2 = () => {
  const start = performance.now();
  for (let i = 0; i < 100; i++) {
    let maxTimestamp = -Infinity;
    for (let g = 0; g < userMeals.length; g++) {
      const entries = userMeals[g].entries;
      for (let e = 0; e < entries.length; e++) {
        const time = new Date(entries[e].loggedAt).getTime();
        if (time > maxTimestamp) {
          maxTimestamp = time;
        }
      }
    }
    const lastAddedTime = maxTimestamp !== -Infinity ? new Date(maxTimestamp) : undefined;
  }
  return performance.now() - start;
};

// Optimized: manual loop string comparison
const runOptimized3 = () => {
  const start = performance.now();
  for (let i = 0; i < 100; i++) {
    let latestEntry = undefined;
    for (let g = 0; g < userMeals.length; g++) {
      const entries = userMeals[g].entries;
      for (let e = 0; e < entries.length; e++) {
        if (!latestEntry || entries[e].loggedAt > latestEntry) {
          latestEntry = entries[e].loggedAt;
        }
      }
    }
    const lastAddedTime = latestEntry ? new Date(latestEntry) : undefined;
  }
  return performance.now() - start;
};

const baselineTime = runBaseline();
const optimizedTime1 = runOptimized1();
const optimizedTime2 = runOptimized2();
const optimizedTime3 = runOptimized3();

console.log(`Baseline (sort): ${baselineTime.toFixed(2)}ms`);
console.log(`Optimized 1 (reduce flatmap): ${optimizedTime1.toFixed(2)}ms`);
console.log(`Optimized 2 (manual loop date parse): ${optimizedTime2.toFixed(2)}ms`);
console.log(`Optimized 3 (manual loop string compare): ${optimizedTime3.toFixed(2)}ms`);
