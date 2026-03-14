import { isSameDay } from 'date-fns';

const runBenchmark = () => {
  const selectedDate = new Date();

  const startUnoptimized = performance.now();
  let countUnoptimized = 0;
  for (let i = 0; i < 100000; i++) {
    if (isSameDay(selectedDate, new Date())) {
      countUnoptimized++;
    }
  }
  const endUnoptimized = performance.now();

  const startOptimized = performance.now();
  let countOptimized = 0;
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();
  const todayDate = today.getDate();

  for (let i = 0; i < 100000; i++) {
    if (selectedDate.getFullYear() === todayYear &&
        selectedDate.getMonth() === todayMonth &&
        selectedDate.getDate() === todayDate) {
      countOptimized++;
    }
  }
  const endOptimized = performance.now();

  console.log(`Unoptimized: ${endUnoptimized - startUnoptimized}ms (isSameDay + new Date())`);
  console.log(`Optimized: ${endOptimized - startOptimized}ms (manual extraction + strict equality)`);
};

runBenchmark();
