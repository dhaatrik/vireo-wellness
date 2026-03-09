const { performance } = require('perf_hooks');

const readings = Array.from({ length: 10000 }, (_, i) => ({
  id: String(i),
  value: 100 + i % 20,
  timestamp: new Date().toISOString(),
  type: i % 2 === 0 ? 'before_meal' : 'after_meal',
  notes: ''
}));

function baseline() {
  return readings.map(reading => ({
    ...reading,
    time: new Date(reading.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    beforeMeal: reading.type === 'before_meal' ? reading.value : null,
    afterMeal: reading.type === 'after_meal' ? reading.value : null,
  }));
}

const timeFormatter = new Intl.DateTimeFormat(undefined, { hour: '2-digit', minute: '2-digit' });
function optimized() {
  return readings.map(reading => ({
    ...reading,
    time: timeFormatter.format(new Date(reading.timestamp)),
    beforeMeal: reading.type === 'before_meal' ? reading.value : null,
    afterMeal: reading.type === 'after_meal' ? reading.value : null,
  }));
}

// Warmup
for (let i = 0; i < 10; i++) {
  baseline();
  optimized();
}

const startBase = performance.now();
for (let i = 0; i < 100; i++) {
  baseline();
}
const endBase = performance.now();
console.log(`Baseline: ${endBase - startBase} ms`);

const startOpt = performance.now();
for (let i = 0; i < 100; i++) {
  optimized();
}
const endOpt = performance.now();
console.log(`Optimized: ${endOpt - startOpt} ms`);
