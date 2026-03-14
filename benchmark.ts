import { addDays } from 'date-fns';

const TEST_ITERATIONS = 10000;

function runBaseline() {
  const start = performance.now();
  let totalDates = 0;
  for(let j=0; j<TEST_ITERATIONS; j++) {
    const datesArray = [];
    const centerDate = new Date();
    for (let i = -10; i <= 10; i++) {
      datesArray.push(addDays(centerDate, i));
    }
    totalDates += datesArray.length;
  }
  const end = performance.now();
  return end - start;
}

function runOptimized() {
  const start = performance.now();
  let totalDates = 0;
  for(let j=0; j<TEST_ITERATIONS; j++) {
    const datesArray = [];
    const centerDate = new Date();

    // Instead of using addDays from date-fns which clones the date and uses full date logic
    // we can do simple timestamp addition
    const centerTimestamp = centerDate.getTime();
    const DAY_IN_MS = 24 * 60 * 60 * 1000;

    for (let i = -10; i <= 10; i++) {
      datesArray.push(new Date(centerTimestamp + i * DAY_IN_MS));
    }
    totalDates += datesArray.length;
  }
  const end = performance.now();
  return end - start;
}

const baselineTime = runBaseline();
const optimizedTime = runOptimized();

console.log(`Baseline: ${baselineTime.toFixed(2)}ms`);
console.log(`Optimized: ${optimizedTime.toFixed(2)}ms`);
console.log(`Improvement: ${((baselineTime - optimizedTime) / baselineTime * 100).toFixed(2)}% faster`);
