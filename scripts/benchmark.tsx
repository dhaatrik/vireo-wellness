import React from 'react';
import { renderToString } from 'react-dom/server';
import DashboardScreen from '../screens/DashboardScreen';
import { MemoryRouter } from 'react-router-dom';
import { AppContextProvider } from '../contexts/AppContext';

let getItemCalled = 0;

global.localStorage = {
  getItem: (key) => {
    getItemCalled++;
    // block to simulate slow synchronous read
    let i = 0; while(i < 10000000) { i++; } // increase simulation loop to make it clear
    return JSON.stringify([{ id: 'eaten', title: 'Eaten Summary', visible: true }]);
  },
  setItem: () => {},
  removeItem: () => {},
  clear: () => {},
} as any;

const iterations = 50;
const start = performance.now();

for (let i = 0; i < iterations; i++) {
  renderToString(
    <MemoryRouter>
      <AppContextProvider>
        <DashboardScreen />
      </AppContextProvider>
    </MemoryRouter>
  );
}

const end = performance.now();
console.log(`Render time for ${iterations} iterations (synchronous LocalStorage): ${(end - start).toFixed(2)}ms`);
console.log(`localStorage.getItem was called ${getItemCalled} times.`);
