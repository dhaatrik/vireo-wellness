
import React, { createContext, useState, useContext, useCallback } from 'react';
import { FoodItem, Device, DailyMealGroup, MealEntry, MealType, User, Medication, MedicationEntry, Reminder } from '../types';
import { MOCK_FOOD_ITEMS, MOCK_DEVICES, MOCK_DAILY_MEALS_TODAY, MOCK_USER, MOCK_MEDICATIONS, MOCK_MEDICATION_ENTRIES, MOCK_REMINDERS, MOCK_DASHBOARD_STATS } from '../constants';

interface AppContextType {
  userProfile: User;
  updateUserProfile: (profile: User) => void;
  userMeals: DailyMealGroup[];
  addMealEntry: (mealType: MealType, foodItem: FoodItem, quantity: number) => void;
  devices: Device[];
  connectDevice: (deviceId: string) => void;
  disconnectDevice: (deviceId: string) => void;
  allFoodItems: FoodItem[];
  getFoodItemById: (id: string) => FoodItem | undefined;
  getDeviceById: (id: string) => Device | undefined;
  waterIntake: number;
  setWaterIntake: (amount: number) => void;
  medicationEntries: MedicationEntry[];
  logMedication: (medication: Medication) => void;
  allMedications: Medication[];
  reminders: Reminder[];
  addReminder: (reminder: Omit<Reminder, 'id'>) => void;
  toggleReminder: (id: string) => void;
  deleteReminder: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [userProfile, setUserProfile] = useState<User>(MOCK_USER);
  const [userMeals, setUserMeals] = useState<DailyMealGroup[]>(MOCK_DAILY_MEALS_TODAY);
  const [devices, setDevices] = useState<Device[]>(MOCK_DEVICES);
  const [waterIntake, setWaterIntakeState] = useState<number>(MOCK_DASHBOARD_STATS.waterIntake);
  const [medicationEntries, setMedicationEntries] = useState<MedicationEntry[]>(MOCK_MEDICATION_ENTRIES);
  const [reminders, setReminders] = useState<Reminder[]>(MOCK_REMINDERS);

  const allFoodItems = MOCK_FOOD_ITEMS;
  const allMedications = MOCK_MEDICATIONS;

  const updateUserProfile = useCallback((profile: User) => {
    setUserProfile(profile);
  }, []);

  const addMealEntry = useCallback((mealType: MealType, foodItem: FoodItem, quantity: number) => {
    setUserMeals(prevMeals => {
      const newEntry: MealEntry = {
        id: `me-${Date.now()}`,
        foodItem,
        quantity,
        loggedAt: new Date().toISOString(),
      };

      const existingGroup = prevMeals.find(group => group.mealType === mealType);
      if (existingGroup) {
        return prevMeals.map(group =>
          group.mealType === mealType
            ? {
              ...group,
              entries: [...group.entries, newEntry],
              totalCalories: group.totalCalories + foodItem.calories * quantity,
            }
            : group
        );
      } else {
        return [
          ...prevMeals,
          {
            mealType,
            entries: [newEntry],
            totalCalories: foodItem.calories * quantity,
          },
        ];
      }
    });
  }, []);

  const connectDevice = useCallback((deviceId: string) => {
    setDevices(prevDevices =>
      prevDevices.map(d => (d.id === deviceId ? { ...d, isConnected: true } : d))
    );
  }, []);

  const disconnectDevice = useCallback((deviceId: string) => {
    setDevices(prevDevices =>
      prevDevices.map(d => (d.id === deviceId ? { ...d, isConnected: false } : d))
    );
  }, []);

  const getFoodItemById = useCallback((id: string): FoodItem | undefined => {
    return allFoodItems.find(item => item.id === id);
  }, [allFoodItems]);

  const getDeviceById = useCallback((id: string): Device | undefined => {
    return devices.find(device => device.id === id);
  }, [devices]);

  const setWaterIntake = useCallback((amount: number) => {
    setWaterIntakeState(Math.max(0, amount)); // Prevent negative water intake
  }, []);

  const logMedication = useCallback((medication: Medication) => {
    setMedicationEntries(prev => [
      ...prev,
      {
        id: `mede-${Date.now()}`,
        medication,
        takenAt: new Date().toISOString()
      }
    ]);
  }, []);

  const addReminder = useCallback((reminderData: Omit<Reminder, 'id'>) => {
    setReminders(prev => [
      ...prev,
      { ...reminderData, id: `rem-${Date.now()}` }
    ]);
  }, []);

  const toggleReminder = useCallback((id: string) => {
    setReminders(prev => prev.map(r => r.id === id ? { ...r, isActive: !r.isActive } : r));
  }, []);

  const deleteReminder = useCallback((id: string) => {
    setReminders(prev => prev.filter(r => r.id !== id));
  }, []);


  return (
    <AppContext.Provider value={{
      userProfile, updateUserProfile,
      userMeals, addMealEntry,
      devices, connectDevice, disconnectDevice, getDeviceById,
      allFoodItems, getFoodItemById,
      waterIntake, setWaterIntake,
      medicationEntries, logMedication, allMedications,
      reminders, addReminder, toggleReminder, deleteReminder
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};
