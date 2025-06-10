
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import DatePicker from '../components/DatePicker';
import { useAppContext } from '../contexts/AppContext';
import { DailyMealGroup, MealEntry, MealType } from '../types';
import { CalendarIcon, ChevronDownIcon, ChevronUpIcon, PlusIcon, FireIcon } from '../components/Icons';

interface MealAccordionProps {
  mealGroup: DailyMealGroup;
  onAddFood: (mealType: MealType) => void;
}

const MealAccordion: React.FC<MealAccordionProps> = ({ mealGroup, onAddFood }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="bg-slate-700 rounded-lg shadow overflow-hidden transition-colors duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 text-left focus:outline-none"
      >
        <div>
          <h3 className="text-lg font-semibold text-slate-100">{mealGroup.mealType}</h3>
          <p className="text-sm text-slate-400">{mealGroup.totalCalories} kcal</p>
        </div>
        {isOpen ? <ChevronUpIcon className="w-5 h-5 text-slate-400" /> : <ChevronDownIcon className="w-5 h-5 text-slate-400" />}
      </button>
      {isOpen && (
        <div className="p-4 border-t border-slate-600">
          {mealGroup.entries.length === 0 ? (
            <p className="text-slate-400 text-sm">No items added for {mealGroup.mealType.toLowerCase()}.</p>
          ) : (
            <ul className="space-y-2">
              {mealGroup.entries.map((entry: MealEntry) => (
                <li key={entry.id} className="flex justify-between items-center text-sm">
                  <span className="text-slate-200">{entry.foodItem.name} ({entry.quantity}x)</span>
                  <span className="text-slate-300">{entry.foodItem.calories * entry.quantity} kcal</span>
                </li>
              ))}
            </ul>
          )}
           <button 
            onClick={() => onAddFood(mealGroup.mealType)}
            className="mt-3 text-emerald-400 hover:text-emerald-300 text-sm flex items-center"
          >
            <PlusIcon className="w-4 h-4 mr-1" /> Add Food
          </button>
        </div>
      )}
    </div>
  );
};


const DailyMealsScreen: React.FC = () => {
  const navigate = useNavigate();
  const { userMeals } = useAppContext(); 
  const [selectedDate, setSelectedDate] = useState(new Date());

  const totalCaloriesToday = userMeals.reduce((sum, group) => sum + group.totalCalories, 0);
  
  const lastAddedTime = userMeals
    .flatMap(group => group.entries)
    .map(entry => new Date(entry.loggedAt))
    .sort((a,b) => b.getTime() - a.getTime())[0];

  const handleAddFoodToMeal = (mealType: MealType) => {
     navigate('/add-meal', { state: { targetMealType: mealType, selectedDate: selectedDate.toISOString() } });
  };

  const mealsForSelectedDate = isSameDay(selectedDate, new Date()) ? userMeals : [];


  return (
    <div className="flex flex-col h-full">
      <Header 
        title="Daily meals" 
        showBackButton 
        backPath="/dashboard"
        rightContent={null}
      />
      <DatePicker selectedDate={selectedDate} onDateChange={setSelectedDate} />
      
      <main className="flex-grow overflow-y-auto p-4 space-y-4 bg-slate-800 transition-colors duration-300">
        <div className="flex justify-between items-center mb-2">
            <div>
                <p className="text-sm text-slate-400">Today</p>
                <p className="text-2xl font-bold text-slate-100">{totalCaloriesToday} kcal</p>
            </div>
            {lastAddedTime && (
                <div className="text-right">
                    <p className="text-xs text-slate-500">Last added</p>
                    <p className="text-sm text-slate-300">{lastAddedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})}</p>
                </div>
            )}
            <div className="p-2 bg-amber-400/20 rounded-full"> {/* Was red-500/20 */}
                 <FireIcon className="w-6 h-6 text-amber-400" /> {/* Was red-400 */}
            </div>
        </div>

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
        
        <div className="pt-4">
            <button 
                onClick={() => navigate('/add-meal', { state: { selectedDate: selectedDate.toISOString() }})}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition duration-150 ease-in-out flex items-center justify-center"
            >
                <PlusIcon className="w-5 h-5 mr-2" />
                Add meal
            </button>
        </div>

      </main>
      <BottomNav />
    </div>
  );
};

const isSameDay = (date1: Date, date2: Date) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

export default DailyMealsScreen;