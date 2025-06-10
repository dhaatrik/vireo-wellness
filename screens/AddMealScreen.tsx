
import React, { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import { useAppContext } from '../contexts/AppContext';
import { FoodItem, SelectedFoodItem, MealType } from '../types';
import { SearchIcon, CheckCircleIcon, CircleIcon } from '../components/Icons';

type TabName = "Recently added" | "Meals" | "Recipes";

interface FoodListItemProps {
  item: SelectedFoodItem;
  onToggleSelect: (itemId: string) => void;
  onViewDetails: (itemId: string) => void;
}

const FoodListItem: React.FC<FoodListItemProps> = ({ item, onToggleSelect, onViewDetails }) => {
  return (
    <div className="flex items-center bg-slate-700 p-3 rounded-lg shadow hover:bg-slate-600 transition-colors duration-300">
      <img 
        src={item.imageUrl || `https://picsum.photos/seed/${item.id}/100/100`} 
        alt={item.name} 
        className="w-14 h-14 rounded-md object-cover mr-4 cursor-pointer"
        onClick={() => onViewDetails(item.id)}
      />
      <div className="flex-grow cursor-pointer" onClick={() => onViewDetails(item.id)}>
        <h3 className="text-base font-medium text-slate-100">{item.name}</h3>
        <p className="text-xs text-slate-400">{item.calories} kcal</p>
      </div>
      <button onClick={() => onToggleSelect(item.id)} className="ml-4 p-2">
        {item.isSelected ? <CheckCircleIcon className="w-6 h-6 text-emerald-400" /> : <CircleIcon className="w-6 h-6 text-slate-500" />}
      </button>
    </div>
  );
};


const AddMealScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { allFoodItems, addMealEntry } = useAppContext();
  
  const targetMealTypeFromState = location.state?.targetMealType as MealType | undefined;
  const selectedDateFromState = location.state?.selectedDate as string | undefined;

  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<TabName>("Meals");
  const [selectedItems, setSelectedItems] = useState<Record<string, SelectedFoodItem>>({});
  
  const foodItemsWithSelection: SelectedFoodItem[] = useMemo(() => {
    return allFoodItems.map(item => ({
      ...item,
      isSelected: !!selectedItems[item.id],
    }));
  }, [allFoodItems, selectedItems]);

  const filteredFoodItems = useMemo(() => {
    return foodItemsWithSelection.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [foodItemsWithSelection, searchTerm]);

  const handleToggleSelect = (itemId: string) => {
    setSelectedItems(prev => {
      const item = allFoodItems.find(fi => fi.id === itemId);
      if (!item) return prev;

      const newSelectedItems = { ...prev };
      if (newSelectedItems[itemId]) {
        delete newSelectedItems[itemId];
      } else {
        newSelectedItems[itemId] = { ...item, isSelected: true };
      }
      return newSelectedItems;
    });
  };
  
  const numSelected = Object.keys(selectedItems).length;
  const totalSelectedCalories = Object.values(selectedItems).reduce((sum, item) => sum + item.calories, 0);

  const handleAddSelectedItems = () => {
    if (numSelected === 0) return;
    
    const mealTypeToAdd = targetMealTypeFromState || MealType.SNACK; 

    Object.values(selectedItems).forEach(item => {
      addMealEntry(mealTypeToAdd, item, 1); 
    });
    
    navigate('/daily-meals', { state: { date: selectedDateFromState } });
  };

  const handleViewDetails = (foodId: string) => {
    navigate(`/meal/${foodId}`, { state: { backgroundLocation: location, targetMealType: targetMealTypeFromState, selectedDate: selectedDateFromState } });
  };


  const tabs: TabName[] = ["Recently added", "Meals", "Recipes"];

  return (
    <div className="flex flex-col h-full">
      <Header title="Add meal" showBackButton />
      <div className="p-4 bg-slate-800 transition-colors duration-300">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-700 text-slate-100 placeholder-slate-500 p-3 pl-10 rounded-lg focus:ring-1 focus:ring-emerald-500 focus:outline-none shadow-sm"
          />
          <SearchIcon className="w-5 h-5 text-slate-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
      </div>

      <div className="px-4 pt-2 pb-1 bg-slate-800 border-b border-slate-600 transition-colors duration-300">
        <div className="flex space-x-1">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-t-md text-sm font-medium transition-colors
                ${activeTab === tab ? 'bg-slate-700 text-emerald-400' : 'text-slate-400 hover:text-slate-200'}
              `}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <main className="flex-grow overflow-y-auto p-4 space-y-3 bg-slate-800 transition-colors duration-300">
        {filteredFoodItems.length > 0 ? (
            filteredFoodItems.map(item => (
              <FoodListItem 
                key={item.id} 
                item={item} 
                onToggleSelect={handleToggleSelect}
                onViewDetails={handleViewDetails}
              />
            ))
        ) : (
            <p className="text-center text-slate-400 mt-8">No food items found matching "{searchTerm}".</p>
        )}
      </main>

      {numSelected > 0 && (
        <div className="bg-slate-700 p-4 border-t border-slate-600 transition-colors duration-300">
          <button
            onClick={handleAddSelectedItems}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition duration-150 ease-in-out"
          >
            {numSelected} item{numSelected > 1 ? 's' : ''} selected ({totalSelectedCalories} kcal)
          </button>
        </div>
      )}
    </div>
  );
};

export default AddMealScreen;