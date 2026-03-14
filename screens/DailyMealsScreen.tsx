
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import DatePicker from '../components/DatePicker';
import { useAppContext } from '../contexts/AppContext';
import { DailyMealGroup, MealEntry, MealType } from '../types';
import { Calendar, ChevronDown, ChevronUp, Plus, Flame } from 'lucide-react';

interface MealAccordionProps {
  mealGroup: DailyMealGroup;
  onAddFood: (mealType: MealType) => void;
}

const MealAccordion: React.FC<MealAccordionProps> = ({ mealGroup, onAddFood }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden transition-all duration-300"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-5 text-left focus:outline-none hover:bg-slate-800/50 transition-colors"
      >
        <div>
          <h3 className="text-lg font-bold text-white capitalize">{mealGroup.mealType.replace('_', ' ')}</h3>
          <p className="text-sm font-medium text-slate-400">{mealGroup.totalCalories} kcal</p>
        </div>
        <div className="p-2 bg-slate-800 rounded-full">
          {isOpen ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-5 pt-0 border-t border-slate-800/50 mt-2">
              {mealGroup.entries.length === 0 ? (
                <p className="text-slate-500 text-sm italic py-2">No items added for {mealGroup.mealType.replace('_', ' ').toLowerCase()}.</p>
              ) : (
                <ul className="space-y-3 py-2">
                  {mealGroup.entries.map((entry: MealEntry) => (
                    <li key={entry.id} className="flex justify-between items-center text-sm group">
                      <span className="text-slate-300 font-medium group-hover:text-white transition-colors">
                        {entry.foodItem.name} <span className="text-slate-500 ml-1">x{entry.quantity}</span>
                      </span>
                      <span className="text-emerald-400 font-semibold">{entry.foodItem.calories * entry.quantity} kcal</span>
                    </li>
                  ))}
                </ul>
              )}
              <button
                onClick={() => onAddFood(mealGroup.mealType)}
                className="mt-4 w-full py-3 bg-slate-800 hover:bg-slate-700 text-emerald-400 font-medium rounded-xl flex items-center justify-center transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" /> Add Food
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const DailyMealsScreen: React.FC = () => {
  const navigate = useNavigate();
  const { userMeals } = useAppContext();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { totalCaloriesToday, maxTimestampStr } = useMemo(() => {
    // ⚡ Bolt: Optimized nested reduce calls into a single pass and added memoization for improved performance.
    let calories = 0;
    let maxTS = "";
    for (const group of userMeals) {
      calories += group.totalCalories;
      for (const entry of group.entries) {
        if (entry.loggedAt > maxTS) {
          maxTS = entry.loggedAt;
        }
      }
    }
    return { totalCaloriesToday: calories, maxTimestampStr: maxTS };
  }, [userMeals]);

  const lastAddedTime = maxTimestampStr ? new Date(maxTimestampStr) : undefined;

  const handleAddFoodToMeal = (mealType: MealType) => {
    navigate('/add-meal', { state: { targetMealType: mealType, selectedDate: selectedDate.toISOString() } });
  };

  // ⚡ Bolt: Replaced isSameDay and new Date() instantiation with memoized manual integer comparisons to avoid expensive calculations on every render.
  const mealsForSelectedDate = useMemo(() => {
    const today = new Date();
    if (
      selectedDate.getFullYear() === today.getFullYear() &&
      selectedDate.getMonth() === today.getMonth() &&
      selectedDate.getDate() === today.getDate()
    ) {
      return userMeals;
    }
    return [];
  }, [selectedDate, userMeals]);

  return (
    <div className="flex flex-col md:flex-row h-full bg-slate-950 flex-1 w-full overflow-hidden">
      <div className="flex flex-col flex-1 w-full overflow-hidden order-1 md:order-2">
        <Header
          title="Daily meals"
          showBackButton
          backPath="/dashboard"
          rightContent={
            <button className="p-2 text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-700 rounded-full transition-all duration-200">
              <Calendar className="w-5 h-5" />
            </button>
          }
        />
        <DatePicker selectedDate={selectedDate} onDateChange={setSelectedDate} />

        <main className="flex-1 overflow-y-auto p-5 space-y-5 pb-24 md:pb-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex justify-between items-center bg-gradient-to-r from-amber-900/40 to-orange-900/20 border border-amber-800/30 p-5 rounded-3xl"
          >
            <div>
              <p className="text-sm font-medium text-amber-200/70 mb-1">Total Consumed</p>
              <p className="text-3xl font-bold text-white tracking-tight">{totalCaloriesToday} <span className="text-lg text-amber-400 font-medium">kcal</span></p>
            </div>
            <div className="flex flex-col items-end">
              <div className="p-3 bg-amber-500/20 rounded-2xl mb-2">
                <Flame className="w-7 h-7 text-amber-500" />
              </div>
              {lastAddedTime && (
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Last added</p>
                  <p className="text-xs font-medium text-slate-300">{lastAddedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
              )}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.values(MealType).map(mealType => {
              const mealGroup = mealsForSelectedDate.find(mg => mg.mealType === mealType);
              return (
                <MealAccordion
                  key={mealType}
                  mealGroup={mealGroup || { mealType, entries: [], totalCalories: 0 }}
                  onAddFood={handleAddFoodToMeal}
                />
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="pt-2"
          >
            <button
              onClick={() => navigate('/add-meal', { state: { selectedDate: selectedDate.toISOString() } })}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-4 px-4 rounded-2xl shadow-xl shadow-emerald-500/20 transition-all duration-300 active:scale-[0.98] flex items-center justify-center"
            >
              <Plus className="w-5 h-5 mr-2 stroke-[3px]" />
              Add New Meal
            </button>
          </motion.div>

        </main>
      </div>
      <BottomNav />
    </div>
  );
};

export default DailyMealsScreen;