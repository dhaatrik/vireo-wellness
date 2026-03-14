import React, { useState, useEffect, useMemo } from 'react';
import { render } from '@testing-library/react';
import { addDays } from 'date-fns';

const BaselinePicker = ({ selectedDate }: { selectedDate: Date }) => {
  const [currentMonthDates, setCurrentMonthDates] = useState<Date[]>([]);

  useEffect(() => {
    const today = new Date();
    const datesArray: Date[] = [];
    const centerDate = selectedDate || today;
    for (let i = -10; i <= 10; i++) {
      datesArray.push(addDays(centerDate, i));
    }
    setCurrentMonthDates(datesArray);
  }, [selectedDate]);

  return <div>{currentMonthDates.length}</div>;
};

const OptimizedPicker = ({ selectedDate }: { selectedDate: Date }) => {
  const currentMonthDates = useMemo(() => {
    const centerDate = selectedDate || new Date();
    const datesArray: Date[] = [];

    const year = centerDate.getFullYear();
    const month = centerDate.getMonth();
    const date = centerDate.getDate();

    for (let i = -10; i <= 10; i++) {
      datesArray.push(new Date(year, month, date + i));
    }
    return datesArray;
  }, [selectedDate]);

  return <div>{currentMonthDates.length}</div>;
};

const d1 = new Date(2023, 5, 1);
const d2 = new Date(2023, 5, 2);

console.time('baseline');
for(let i=0; i<1000; i++) {
  const { rerender, unmount } = render(<BaselinePicker selectedDate={d1} />);
  rerender(<BaselinePicker selectedDate={d2} />);
  unmount();
}
console.timeEnd('baseline');

console.time('optimized');
for(let i=0; i<1000; i++) {
  const { rerender, unmount } = render(<OptimizedPicker selectedDate={d1} />);
  rerender(<OptimizedPicker selectedDate={d2} />);
  unmount();
}
console.timeEnd('optimized');
