
import { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import { useAppContext } from '../contexts/AppContext';
import { SelectedFoodItem, MealType } from '../types';
import { Search, CheckCircle2, Circle, SlidersHorizontal } from 'lucide-react';

type TabName = "Recently added" | "Meals" | "Recipes";

interface SelectionBarProps {
  numSelected: number;
  totalSelectedCalories: number;
  onAdd: () => void;
  isSubmitting: boolean;
}

const SelectionBar = ({ numSelected, totalSelectedCalories, onAdd, isSubmitting }: SelectionBarProps) => (
  <AnimatePresence>
    {numSelected > 0 && (
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="absolute bottom-0 left-0 right-0 p-5 bg-linear-to-t from-slate-950 via-slate-950 to-transparent pt-12 pb-safe"
      >
        <button
          type="button"
          onClick={onAdd}
          disabled={isSubmitting}
          className={`w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-4 px-4 rounded-2xl shadow-xl shadow-emerald-500/20 transition-all duration-300 active:scale-[0.98] flex items-center justify-between ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          <div className="flex items-center">
            <div className="bg-slate-950/20 px-3 py-1 rounded-lg mr-3 min-w-8 flex justify-center">
              {isSubmitting ? '...' : numSelected}
            </div>
            <span>{isSubmitting ? 'Adding...' : 'Add Selected'}</span>
          </div>
          {!isSubmitting && <span className="bg-slate-950/10 px-3 py-1 rounded-lg">{totalSelectedCalories} kcal</span>}
        </button>
      </motion.div>
    )}
  </AnimatePresence>
);

interface EmptyStateProps {
  searchTerm: string;
  onClear: () => void;
}

const EmptyState = ({ searchTerm, onClear }: EmptyStateProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex flex-col items-center justify-center pt-12 text-center col-span-full"
  >
    <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mb-4">
      <Search className="w-8 h-8 text-slate-600" />
    </div>
    <p className="text-slate-400 font-medium">No food items found matching "{searchTerm}"</p>
    <p className="text-slate-500 text-sm mt-1">Try searching for something else</p>
    <button
      onClick={onClear}
      className="mt-6 px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-emerald-400 font-medium rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
    >
      Clear search
    </button>
  </motion.div>
);

interface CategoryTabsProps {
  tabs: TabName[];
  activeTab: TabName;
  onTabSelect: (tab: TabName) => void;
}

const CategoryTabs = ({ tabs, activeTab, onTabSelect }: CategoryTabsProps) => (
  <div className="px-5 pt-2 pb-3 bg-slate-950 border-b border-slate-800/50">
    <div className="flex space-x-2 overflow-x-auto no-scrollbar pb-1">
      {tabs.map(tab => (
        <button
          type="button"
          key={tab}
          onClick={() => onTabSelect(tab)}
          className={`px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-300
            ${activeTab === tab
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
              : 'bg-slate-900 text-slate-400 border border-slate-800 hover:bg-slate-800 hover:text-slate-200'}
          `}
        >
          {tab}
        </button>
      ))}
    </div>
  </div>
);

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar = ({ searchTerm, onSearchChange }: SearchBarProps) => (
  <div className="px-5 pt-4 pb-2 bg-slate-950">
    <div className="relative group">
      <input
        aria-label="Search food"
        type="text"
        placeholder="Search food..."
        value={searchTerm}
        maxLength={100}
        onChange={onSearchChange}
        className="w-full bg-slate-900 border border-slate-800 text-white placeholder-slate-500 p-4 pl-12 rounded-2xl focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 focus:outline-none transition-all duration-300"
      />
      <Search className="w-5 h-5 text-slate-500 absolute left-4 top-1/2 transform -translate-y-1/2 group-focus-within:text-emerald-500 transition-colors" />
      <button
        type="button"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
        aria-label="Filter search results"
      >
        <SlidersHorizontal className="w-4 h-4" />
      </button>
    </div>
  </div>
);

interface FoodListItemProps {
  item: SelectedFoodItem;
  onToggleSelect: (itemId: string) => void;
  onViewDetails: (itemId: string) => void;
}

const FoodListItem = ({ item, onToggleSelect, onViewDetails }: FoodListItemProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center p-3 rounded-2xl transition-all duration-300 border ${
        item.isSelected 
          ? 'bg-emerald-900/20 border-emerald-500/30 shadow-lg shadow-emerald-900/10' 
          : 'bg-slate-800/50 border-slate-700/50 hover:bg-slate-800 hover:border-slate-600'
      }`}
    >
      <div
        role="button"
        tabIndex={0}
        onClick={() => onViewDetails(item.id)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onViewDetails(item.id);
          }
        }}
        aria-label={`View details for ${item.name}`}
        className="flex flex-1 items-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 rounded-xl"
      >
        <img
          src={item.imageUrl || `https://picsum.photos/seed/${item.id}/100/100`}
          alt={item.name}
          className="w-16 h-16 rounded-xl object-cover mr-4 shadow-sm"
        />
        <div className="grow">
          <h3 className="text-base font-bold text-white mb-0.5">{item.name}</h3>
          <p className="text-sm font-medium text-emerald-400">{item.calories} <span className="text-slate-500 text-xs">kcal</span></p>
        </div>
      </div>
      <button 
        type="button"
        onClick={() => onToggleSelect(item.id)} 
        className="ml-4 p-3 rounded-full hover:bg-slate-700/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
        aria-label={item.isSelected ? `Deselect ${item.name}` : `Select ${item.name}`}
      >
        {item.isSelected ? (
          <CheckCircle2 className="w-7 h-7 text-emerald-500 fill-emerald-500/20" />
        ) : (
          <Circle className="w-7 h-7 text-slate-500" />
        )}
      </button>
    </motion.div>
  );
};

const AddMealScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { allFoodItems, addMealEntry } = useAppContext();
  
  const targetMealTypeFromState = location.state?.targetMealType as MealType | undefined;
  const selectedDateFromState = location.state?.selectedDate as string | undefined;

  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<TabName>("Meals");
  const [selectedItems, setSelectedItems] = useState<Record<string, SelectedFoodItem>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // ⚡ Bolt: Pre-compute lower-case names to avoid expensive string transformations on every search keystroke.
  const allFoodItemsWithLower = useMemo(() => {
    return allFoodItems.map(item => ({
      ...item,
      lowerName: item.name.toLowerCase()
    }));
  }, [allFoodItems]);

  // ⚡ Bolt: Memoize the filtered base list independently to avoid re-running expensive string matching on the entire dataset every time a user toggles an item selection.
  const filteredFoodItems = useMemo(() => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    return allFoodItemsWithLower.filter(item =>
      item.lowerName.includes(lowerSearchTerm)
    );
  }, [allFoodItemsWithLower, searchTerm]);

  const displayItems: SelectedFoodItem[] = useMemo(() => {
    // ⚡ Bolt: Replaced .map() with a faster for loop to avoid callback overhead and improve rendering performance.
    const result = new Array(filteredFoodItems.length);
    const len = filteredFoodItems.length;
    for (let i = 0; i < len; i++) {
      const item = filteredFoodItems[i];
      result[i] = {
        ...item,
        isSelected: !!selectedItems[item.id],
      };
    }
    return result;
  }, [filteredFoodItems, selectedItems]);

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
  
  const selectedFoodItemsList = Object.values(selectedItems) as SelectedFoodItem[];
  const numSelected = selectedFoodItemsList.length;
  const totalSelectedCalories = selectedFoodItemsList.reduce((sum, item) => sum + item.calories, 0);

  const handleAddSelectedItems = async () => {
    if (numSelected === 0 || isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      const mealTypeToAdd = targetMealTypeFromState || MealType.SNACK; 

      await Promise.all(
        selectedFoodItemsList.map(item => addMealEntry(mealTypeToAdd, item, 1))
      );
      
      navigate('/daily-meals', { state: { date: selectedDateFromState } });
    } catch (error) {
      console.error('Failed to add meals:', error);
      setIsSubmitting(false);
    }
  };

  const handleViewDetails = (foodId: string) => {
    navigate(`/meal/${foodId}`, { state: { backgroundLocation: location, targetMealType: targetMealTypeFromState, selectedDate: selectedDateFromState } });
  };

  const tabs: TabName[] = ["Recently added", "Meals", "Recipes"];

  return (
    <div className="flex flex-col md:flex-row h-full bg-slate-950 flex-1 w-full overflow-hidden relative">
      <div className="flex flex-col flex-1 w-full overflow-hidden order-1 md:order-2">
        <Header title="Add meal" showBackButton />
      
      <SearchBar searchTerm={searchTerm} onSearchChange={(e) => setSearchTerm(e.target.value)} />

      <CategoryTabs tabs={tabs} activeTab={activeTab} onTabSelect={setActiveTab} />

      <main className="flex-1 overflow-y-auto p-5 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <AnimatePresence>
            {displayItems.length > 0 ? (
                displayItems.map(item => (
                  <FoodListItem 
                    key={item.id} 
                    item={item} 
                    onToggleSelect={handleToggleSelect}
                    onViewDetails={handleViewDetails}
                  />
                ))
            ) : (
                <EmptyState searchTerm={searchTerm} onClear={() => setSearchTerm('')} />
            )}
          </AnimatePresence>
        </div>
      </main>

      <SelectionBar
        numSelected={numSelected}
        totalSelectedCalories={totalSelectedCalories}
        onAdd={handleAddSelectedItems}
        isSubmitting={isSubmitting}
      />
      </div>
    </div>
  );
};

export default AddMealScreen;
