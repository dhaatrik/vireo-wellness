
export enum MealType {
  BREAKFAST = 'Breakfast',
  LUNCH = 'Lunch',
  DINNER = 'Dinner',
  SNACK = 'Snack',
}

export interface FoodItem {
  id: string;
  name: string;
  calories: number;
  carbs: number; // in grams
  fat: number; // in grams
  protein: number; // in grams
  imageUrl?: string;
  description?: string;
  category?: string; // e.g., 'Italian', 'Fruit'
}

export interface MealEntry {
  id: string; // Unique ID for the entry
  foodItem: FoodItem;
  quantity: number; // servings
  loggedAt: string; // ISO timestamp
}

export interface Medication {
  id: string;
  name: string;
  dosage: string; // e.g., '10mg', '2 puffs'
  form: 'pill' | 'liquid' | 'inhaler' | 'injection';
  imageUrl?: string;
  description?: string;
}

export interface MedicationEntry {
  id: string;
  medication: Medication;
  takenAt: string; // ISO timestamp
}

export type ReminderType = 'medication' | 'water' | 'glucose' | 'other';

export interface Reminder {
  id: string;
  type: ReminderType;
  time: string; // HH:mm format
  message: string;
  isActive: boolean;
}

export interface DailyMealGroup {
  mealType: MealType;
  entries: MealEntry[];
  totalCalories: number;
}

export interface Device {
  id: string;
  name: string;
  imageUrl?: string;
  isConnected: boolean;
  chargeLevel?: number; // Percentage 0-100
  type: 'glucose_monitor' | 'fitness_tracker' | 'health_data_platform';
  description?: string; // for connect device screen
}

export interface BloodSugarReading {
  timestamp: number; // Unix timestamp
  value: number; // mg/dL
  type: 'before_meal' | 'after_meal' | 'fasting' | 'random';
}

export interface DashboardStats {
  eatenGL: number;
  totalGL: number;
  glucose: number;
  pillsTaken: number;
  activitySteps: number;
  carbsIntake: number; // grams
  waterIntake: number; // glasses/bottles
  dailyWaterGoal: number; // glasses/bottles
}

export interface User {
  name: string;
  email: string;
  phone: string;
  countryCode: string;
}

export interface SelectedFoodItem extends FoodItem {
  isSelected: boolean;
}

export interface WidgetConfig {
  id: string;
  title: string;
  visible: boolean;
}
