// Generate some complex mock data
const generateMockData = () => {
  return [
    {
      entries: [
        { loggedAt: new Date(1700000000000).toISOString() },
        { loggedAt: new Date(1700000000001).toISOString() }
      ]
    },
    {
      entries: [
        { loggedAt: new Date(1700000001000).toISOString() },
        { loggedAt: new Date(1700000000500).toISOString() }
      ]
    },
    {
      entries: []
    }
  ];
};

const userMeals = generateMockData();

// Baseline
const baseline = userMeals
  .flatMap(group => group.entries)
  .map(entry => new Date(entry.loggedAt))
  .sort((a,b) => b.getTime() - a.getTime())[0];

// Optimized
const maxTimestampStr = userMeals.reduce((maxGroup, group) => {
  const maxEntry = group.entries.reduce((max, entry) => {
    return entry.loggedAt > max ? entry.loggedAt : max;
  }, "");
  return maxEntry > maxGroup ? maxEntry : maxGroup;
}, "");
const optimized = maxTimestampStr ? new Date(maxTimestampStr) : undefined;

console.log('Baseline:', baseline);
console.log('Optimized:', optimized);
console.log('Match?', baseline?.getTime() === optimized?.getTime());

const emptyUserMeals = [ { entries: [] }, { entries: [] } ];

// Baseline empty
const baselineEmpty = emptyUserMeals
  .flatMap(group => group.entries)
  .map(entry => new Date(entry.loggedAt))
  .sort((a,b) => b.getTime() - a.getTime())[0];

// Optimized empty
const maxTimestampStrEmpty = emptyUserMeals.reduce((maxGroup, group) => {
  const maxEntry = group.entries.reduce((max, entry) => {
    return entry.loggedAt > max ? entry.loggedAt : max;
  }, "");
  return maxEntry > maxGroup ? maxEntry : maxGroup;
}, "");
const optimizedEmpty = maxTimestampStrEmpty ? new Date(maxTimestampStrEmpty) : undefined;

console.log('Baseline Empty:', baselineEmpty);
console.log('Optimized Empty:', optimizedEmpty);
console.log('Match Empty?', baselineEmpty === optimizedEmpty);
