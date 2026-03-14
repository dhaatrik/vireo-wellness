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

    const year = centerDate.getFullYear();
    const month = centerDate.getMonth();
    const date = centerDate.getDate();

    for (let i = -10; i <= 10; i++) {
      datesArray.push(new Date(year, month, date + i));
    }
    totalDates += datesArray.length;
  }
  const end = performance.now();
  return end - start;
}

const baselineTime = runBaseline();
const optimizedTime = runOptimized();

console.log(`Baseline (addDays): ${baselineTime.toFixed(2)}ms`);
console.log(`Optimized (new Date(y, m, d)): ${optimizedTime.toFixed(2)}ms`);
console.log(`Improvement: ${((baselineTime - optimizedTime) / baselineTime * 100).toFixed(2)}% faster`);
