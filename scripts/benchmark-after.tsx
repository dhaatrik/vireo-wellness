import React, { useState, useEffect, useMemo } from 'react';
import { renderToString } from 'react-dom/server';

let getItemCalled = 0;
global.localStorage = {
  getItem: (key) => {
    getItemCalled++;
    let i = 0; while(i < 1000000) { i++; } // Simulating I/O
    return JSON.stringify([{ id: 'eaten', title: 'Eaten Summary', visible: true }]);
  },
  setItem: () => {},
  removeItem: () => {},
  clear: () => {},
} as any;

const DEFAULT_WIDGETS = [{ id: 'eaten', title: 'Eaten Summary', visible: true }];

const DashboardScreenAfter = () => {
  const [widgets, setWidgets] = useState(DEFAULT_WIDGETS);
  useEffect(() => {
    const saved = localStorage.getItem('dashboardWidgets');
    if (saved) setWidgets(JSON.parse(saved));
  }, []);
  return <div>{widgets.length}</div>;
};

const iterations = 500;
const start = performance.now();
for (let i = 0; i < iterations; i++) {
  renderToString(<DashboardScreenAfter />);
}
const end = performance.now();
console.log(`Render time AFTER optimization for ${iterations} iterations: ${(end - start).toFixed(2)}ms`);
console.log(`localStorage.getItem was called ${getItemCalled} times.`);
