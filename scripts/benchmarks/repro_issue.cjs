const { performance } = require('perf_hooks');

const generateMockData = (numGroups, entriesPerGroup) => {
  const userMeals = [];
  let currentTime = Date.now();
  for (let i = 0; i < numGroups; i++) {
    const group = {
        totalCalories: Math.floor(Math.random() * 500),
        entries: []
    };
    for (let j = 0; j < entriesPerGroup; j++) {
      group.entries.push({
          loggedAt: new Date(currentTime - Math.random() * 100000000).toISOString(),
          foodItem: { name: 'Food', calories: 100 },
          quantity: 1
      });
    }
    userMeals.push(group);
  }
  return userMeals;
};

const userMeals = generateMockData(5, 10); // Realistic small dataset
const userMealsLarge = generateMockData(50, 100); // Larger dataset for measurement

function baseline(data) {
    const totalCaloriesToday = data.reduce((sum, group) => sum + group.totalCalories, 0);
    const maxTimestampStr = data.reduce((maxGroup, group) => {
        const maxEntry = group.entries.reduce((max, entry) => {
            return entry.loggedAt > max ? entry.loggedAt : max;
        }, "");
        return maxEntry > maxGroup ? maxEntry : maxGroup;
    }, "");
    return { totalCaloriesToday, maxTimestampStr };
}

function optimizedSingleLoop(data) {
    const totalCaloriesToday = data.reduce((sum, group) => sum + group.totalCalories, 0);
    let maxTimestampStr = "";
    for (let i = 0; i < data.length; i++) {
        const entries = data[i].entries;
        for (let j = 0; j < entries.length; j++) {
            const entry = entries[j];
            if (entry.loggedAt > maxTimestampStr) {
                maxTimestampStr = entry.loggedAt;
            }
        }
    }
    return { totalCaloriesToday, maxTimestampStr };
}

function optimizedCombined(data) {
    let totalCaloriesToday = 0;
    let maxTimestampStr = "";
    for (let i = 0; i < data.length; i++) {
        const group = data[i];
        totalCaloriesToday += group.totalCalories;
        const entries = group.entries;
        for (let j = 0; j < entries.length; j++) {
            const entry = entries[j];
            if (entry.loggedAt > maxTimestampStr) {
                maxTimestampStr = entry.loggedAt;
            }
        }
    }
    return { totalCaloriesToday, maxTimestampStr };
}

function optimizedCombinedForEach(data) {
    let totalCaloriesToday = 0;
    let maxTimestampStr = "";
    data.forEach(group => {
        totalCaloriesToday += group.totalCalories;
        group.entries.forEach(entry => {
            if (entry.loggedAt > maxTimestampStr) {
                maxTimestampStr = entry.loggedAt;
            }
        });
    });
    return { totalCaloriesToday, maxTimestampStr };
}

// Measure
function measure(fn, data, iterations = 10000) {
    const start = performance.now();
    for (let i = 0; i < iterations; i++) {
        fn(data);
    }
    return performance.now() - start;
}

console.log("Small dataset (5 groups, 10 entries each):");
console.log(`Baseline: ${measure(baseline, userMeals).toFixed(4)}ms`);
console.log(`Optimized (Single Loop): ${measure(optimizedSingleLoop, userMeals).toFixed(4)}ms`);
console.log(`Optimized (Combined): ${measure(optimizedCombined, userMeals).toFixed(4)}ms`);
console.log(`Optimized (Combined ForEach): ${measure(optimizedCombinedForEach, userMeals).toFixed(4)}ms`);

console.log("\nLarge dataset (50 groups, 100 entries each):");
console.log(`Baseline: ${measure(baseline, userMealsLarge, 1000).toFixed(4)}ms`);
console.log(`Optimized (Single Loop): ${measure(optimizedSingleLoop, userMealsLarge, 1000).toFixed(4)}ms`);
console.log(`Optimized (Combined): ${measure(optimizedCombined, userMealsLarge, 1000).toFixed(4)}ms`);
console.log(`Optimized (Combined ForEach): ${measure(optimizedCombinedForEach, userMealsLarge, 1000).toFixed(4)}ms`);
