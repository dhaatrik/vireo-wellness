const { performance } = require('perf_hooks');

const isSameDay = (date1, date2) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

const entries = Array.from({ length: 1000 }).map((_, i) => ({
  takenAt: new Date(Date.now() - Math.random() * 10000000000).toISOString()
}));

// Warmup
for (let i = 0; i < 100; i++) {
  entries.filter(e => isSameDay(new Date(e.takenAt), new Date())).length;
  const today = new Date();
  entries.filter(e => isSameDay(new Date(e.takenAt), today)).length;
}

// Baseline
let baselineTime = 0;
for (let i = 0; i < 10000; i++) {
  const start = performance.now();
  entries.filter(e => isSameDay(new Date(e.takenAt), new Date())).length;
  baselineTime += performance.now() - start;
}
baselineTime /= 10000;

// Optimized
let optimizedTime = 0;
for (let i = 0; i < 10000; i++) {
  const start = performance.now();
  const today = new Date();
  entries.filter(e => isSameDay(new Date(e.takenAt), today)).length;
  optimizedTime += performance.now() - start;
}
optimizedTime /= 10000;

console.log(`Baseline Time: ${baselineTime.toFixed(4)} ms`);
console.log(`Optimized Time: ${optimizedTime.toFixed(4)} ms`);
console.log(`Improvement: ${((baselineTime - optimizedTime) / baselineTime * 100).toFixed(2)}%`);
