
import React, { useMemo, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { motion } from 'motion/react';

interface DatePickerProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ selectedDate, onDateChange }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // ⚡ Bolt: Optimized date generation using useMemo and manual integer math to avoid addDays and unnecessary state updates
  const currentMonthDates = useMemo(() => {
    const today = new Date();
    const datesArray: Date[] = [];
    const centerDate = selectedDate || today;
    const year = centerDate.getFullYear();
    const month = centerDate.getMonth();
    const date = centerDate.getDate();

    for (let i = -10; i <= 10; i++) { 
      datesArray.push(new Date(year, month, date + i));
    }
    return datesArray;
  }, [selectedDate]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const selectedEl = scrollContainerRef.current.querySelector('[aria-pressed="true"]');
      if (selectedEl) {
        selectedEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, [currentMonthDates, selectedDate]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -150 : 150;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const today = new Date();

  // ⚡ Bolt: Extracted date components outside the render loop for faster comparison
  const selY = selectedDate?.getFullYear();
  const selM = selectedDate?.getMonth();
  const selD = selectedDate?.getDate();

  const todY = today.getFullYear();
  const todM = today.getMonth();
  const todD = today.getDate();

  return (
    <div className="flex items-center justify-center py-4 px-2 bg-slate-900 border-b border-slate-800/50 transition-colors duration-300">
      <button onClick={() => handleScroll('left')} className="p-2 text-slate-500 hover:text-white transition-colors bg-slate-800/30 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500" aria-label="Previous date">
        <ChevronLeft className="w-5 h-5" />
      </button>
      <div 
        ref={scrollContainerRef} 
        className="flex overflow-x-auto space-x-3 px-2 no-scrollbar mx-2 snap-x" 
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {currentMonthDates.map((date, index) => {
          const dayName = format(date, 'EEE');
          const dayNumber = format(date, 'd');
          const fullDateStr = format(date, 'EEEE, MMMM do, yyyy');

          // ⚡ Bolt: Manual integer comparison is significantly faster than date-fns isSameDay inside a loop
          const dY = date.getFullYear();
          const dM = date.getMonth();
          const dD = date.getDate();

          const isSelected = dY === selY && dM === selM && dD === selD;
          const isToday = dY === todY && dM === todM && dD === todD;

          return (
            <button
              key={index}
              onClick={() => onDateChange(date)}
              aria-pressed={isSelected}
              aria-label={fullDateStr}
              className={`relative flex flex-col items-center justify-center min-w-[3rem] h-16 rounded-2xl p-2 transition-all duration-300 ease-out snap-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500
                ${isSelected ? 'text-white shadow-lg shadow-emerald-500/20 scale-110' : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700 hover:text-slate-200'}
                ${isToday && !isSelected ? 'border border-emerald-500/50' : 'border border-transparent'} 
              `}
            >
              {isSelected && (
                <motion.div 
                  layoutId="date-indicator"
                  className="absolute inset-0 bg-emerald-500 rounded-2xl -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className={`text-[10px] font-medium uppercase tracking-wider mb-0.5 ${isSelected ? 'text-emerald-100' : 'text-slate-500'}`}>{dayName}</span>
              <span className={`font-bold text-lg leading-none ${isSelected ? 'text-white' : 'text-slate-200'}`}>{dayNumber}</span>
              {isToday && <div className={`w-1 h-1 rounded-full mt-1 ${isSelected ? 'bg-white' : 'bg-emerald-500'}`} />}
            </button>
          );
        })}
      </div>
       <button onClick={() => handleScroll('right')} className="p-2 text-slate-500 hover:text-white transition-colors bg-slate-800/30 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500" aria-label="Next date">
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default DatePicker;