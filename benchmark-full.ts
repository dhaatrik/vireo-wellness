import { isSameDay, addDays, format } from 'date-fns';

const TEST_ITERATIONS = 10000;

function runBaseline() {
  const selectedDate = new Date();
  const today = new Date();

  const start = performance.now();
  let dummyCount = 0;

  for(let j=0; j<TEST_ITERATIONS; j++) {
    const datesArray: Date[] = [];
    const centerDate = selectedDate || today;
    for (let i = -10; i <= 10; i++) {
      datesArray.push(addDays(centerDate, i));
    }

    // Simulate render loop
    for (const date of datesArray) {
      const isSelected = isSameDay(date, selectedDate);
      const isToday = isSameDay(date, today);
      if (isSelected || isToday) dummyCount++;
    }
  }

  const end = performance.now();
  return end - start;
}

function runOptimized() {
  const selectedDate = new Date();
  const today = new Date();

  const start = performance.now();
  let dummyCount = 0;

  for(let j=0; j<TEST_ITERATIONS; j++) {
    // 1. Optimized date generation
    const centerDate = selectedDate || today; // Note: today fallback handled correctly
    const datesArray: Date[] = [];
    const year = centerDate.getFullYear();
    const month = centerDate.getMonth();
    const dateNum = centerDate.getDate();

    for (let i = -10; i <= 10; i++) {
      datesArray.push(new Date(year, month, dateNum + i));
    }

    // 2. Optimized comparisons
    const selY = selectedDate.getFullYear();
    const selM = selectedDate.getMonth();
    const selD = selectedDate.getDate();

    const todY = today.getFullYear();
    const todM = today.getMonth();
    const todD = today.getDate();

    // Simulate render loop
    for (const date of datesArray) {
      const dY = date.getFullYear();
      const dM = date.getMonth();
      const dD = date.getDate();

      const isSelected = dY === selY && dM === selM && dD === selD;
      const isToday = dY === todY && dM === todM && dD === todD;

      if (isSelected || isToday) dummyCount++;
    }
  }

  const end = performance.now();
  return end - start;
}

const baselineTime = runBaseline();
const optimizedTime = runOptimized();

console.log(`Baseline: ${baselineTime.toFixed(2)}ms`);
console.log(`Optimized: ${optimizedTime.toFixed(2)}ms`);
console.log(`Improvement: ${((baselineTime - optimizedTime) / baselineTime * 100).toFixed(2)}% faster`);
