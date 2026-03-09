import { performance } from 'perf_hooks';

interface WidgetConfig {
  id: string;
  title: string;
  visible: boolean;
}

const widgets: WidgetConfig[] = [
  { id: 'eaten', title: 'Eaten Summary', visible: true },
  { id: 'water', title: 'Water Intake', visible: true },
  { id: 'glucose', title: 'Glucose Stat', visible: true },
  { id: 'pills', title: 'Pills Stat', visible: true },
  { id: 'activity', title: 'Activity Stat', visible: true },
  { id: 'carbs', title: 'Carbs Stat', visible: true },
  { id: 'chart', title: 'Blood Sugar Chart', visible: true },
];

function oldRenderLogic() {
  const r1 = widgets.find(w => w.id === 'eaten') && widgets.find(w => w.id === 'eaten');
  const r2 = widgets.find(w => w.id === 'water') && widgets.find(w => w.id === 'water');
  const r3 = widgets.filter(w => ['glucose', 'pills', 'activity', 'carbs'].includes(w.id));
  const r4 = widgets.find(w => w.id === 'chart') && widgets.find(w => w.id === 'chart');
  return [r1, r2, r3, r4];
}

function newRenderLogicVariables() {
  const eaten = widgets.find(w => w.id === 'eaten');
  const water = widgets.find(w => w.id === 'water');
  const chart = widgets.find(w => w.id === 'chart');

  const r1 = eaten && eaten;
  const r2 = water && water;
  const r3 = widgets.filter(w => ['glucose', 'pills', 'activity', 'carbs'].includes(w.id));
  const r4 = chart && chart;
  return [r1, r2, r3, r4];
}

// simulate useMemo map
const widgetMap = widgets.reduce((acc, widget) => {
  acc[widget.id] = widget;
  return acc;
}, {} as Record<string, WidgetConfig>);

function newRenderLogicPrebuiltMap() {
  const r1 = widgetMap['eaten'];
  const r2 = widgetMap['water'];
  const r3 = [widgetMap['glucose'], widgetMap['pills'], widgetMap['activity'], widgetMap['carbs']].filter(Boolean);
  const r4 = widgetMap['chart'];
  return [r1, r2, r3, r4];
}

function runBenchmark(name: string, fn: () => void, iterations: number = 1000000) {
  for (let i = 0; i < 10000; i++) fn();

  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    fn();
  }
  const end = performance.now();
  console.log(`${name}: ${(end - start).toFixed(2)}ms for ${iterations} iterations`);
  return end - start;
}

const oldTime = runBenchmark('Baseline (Current logic)', oldRenderLogic);
const newTimeVars = runBenchmark('Optimized (Variables)', newRenderLogicVariables);
const newTimeMap = runBenchmark('Optimized (Prebuilt Map)', newRenderLogicPrebuiltMap);

console.log(`\nImprovement (Vars): ${((oldTime - newTimeVars) / oldTime * 100).toFixed(2)}% faster`);
console.log(`Improvement (Map): ${((oldTime - newTimeMap) / oldTime * 100).toFixed(2)}% faster`);
