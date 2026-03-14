
const generateMockData = () => {
  return [
    {
      totalCalories: 100,
      entries: [
        { loggedAt: new Date(1700000000000).toISOString() },
        { loggedAt: new Date(1700000000001).toISOString() }
      ]
    },
    {
      totalCalories: 200,
      entries: [
        { loggedAt: new Date(1700000001000).toISOString() },
        { loggedAt: new Date(1700000000500).toISOString() }
      ]
    },
    {
      totalCalories: 50,
      entries: []
    }
  ];
};

const userMeals = generateMockData();

// Baseline
const baselineCalories = userMeals.reduce((sum, group) => sum + group.totalCalories, 0);
const baselineMaxTimestampStr = userMeals.reduce((maxGroup, group) => {
  const maxEntry = group.entries.reduce((max, entry) => {
    return entry.loggedAt > max ? entry.loggedAt : max;
  }, "");
  return maxEntry > maxGroup ? maxEntry : maxGroup;
}, "");

// Optimized Combined
function getOptimized(data) {
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

const optimized = getOptimized(userMeals);

console.log('Calories - Baseline:', baselineCalories, 'Optimized:', optimized.totalCaloriesToday);
console.log('MaxTimestampStr - Baseline:', baselineMaxTimestampStr, 'Optimized:', optimized.maxTimestampStr);
console.log('Match?', baselineCalories === optimized.totalCaloriesToday && baselineMaxTimestampStr === optimized.maxTimestampStr);

const emptyUserMeals = [ { totalCalories: 0, entries: [] }, { totalCalories: 0, entries: [] } ];
const baselineCaloriesEmpty = emptyUserMeals.reduce((sum, group) => sum + group.totalCalories, 0);
const baselineMaxTimestampStrEmpty = emptyUserMeals.reduce((maxGroup, group) => {
  const maxEntry = group.entries.reduce((max, entry) => {
    return entry.loggedAt > max ? entry.loggedAt : max;
  }, "");
  return maxEntry > maxGroup ? maxEntry : maxGroup;
}, "");

const optimizedEmpty = getOptimized(emptyUserMeals);

console.log('Empty - Calories - Baseline:', baselineCaloriesEmpty, 'Optimized:', optimizedEmpty.totalCaloriesToday);
console.log('Empty - MaxTimestampStr - Baseline:', baselineMaxTimestampStrEmpty, 'Optimized:', optimizedEmpty.maxTimestampStr);
console.log('Match Empty?', baselineCaloriesEmpty === optimizedEmpty.totalCaloriesToday && baselineMaxTimestampStrEmpty === optimizedEmpty.maxTimestampStr);
