
import { FoodItem, Device, BloodSugarReading, DashboardStats, User, DailyMealGroup, MealType, MealEntry, Medication, MedicationEntry, Reminder } from './types';

export const MOCK_USER: User = {
  name: 'Rohit Kumar',
  email: 'rohit.kumar@example.com',
  phone: '5551234567',
  countryCode: 'IN',
};

export const MOCK_FOOD_ITEMS: FoodItem[] = [
  { id: '1', name: 'Spaghetti Carbonara', calories: 640, carbs: 66, fat: 31, protein: 32, imageUrl: 'https://picsum.photos/seed/carbonara/400/300', description: 'Carbonara is an Italian pasta dish from Rome made with eggs, hard cheese, cured pork, and black pepper.', category: 'Italian' },
  { id: '2', name: 'Eggs', calories: 70, carbs: 1, fat: 5, protein: 6, imageUrl: 'https://picsum.photos/seed/eggs/400/300', description: 'A versatile and protein-rich food.', category: 'Protein' },
  { id: '3', name: 'Ice Cream Late', calories: 210, carbs: 25, fat: 11, protein: 3, imageUrl: 'https://picsum.photos/seed/icecream/400/300', description: 'A creamy and sweet dessert, typically flavored.', category: 'Dessert' },
  { id: '4', name: 'Apple', calories: 95, carbs: 25, fat: 0.3, protein: 0.5, imageUrl: 'https://picsum.photos/seed/apple/400/300', description: 'A crisp and juicy fruit, rich in fiber.', category: 'Fruit' },
  { id: '5', name: 'Grilled Chicken Salad', calories: 350, carbs: 15, fat: 18, protein: 30, imageUrl: 'https://picsum.photos/seed/chickensalad/400/300', description: 'A healthy salad with grilled chicken breast, mixed greens, and a light vinaigrette.', category: 'Salad' },
  { id: '6', name: 'Oatmeal with Berries', calories: 250, carbs: 45, fat: 5, protein: 8, imageUrl: 'https://picsum.photos/seed/oatmeal/400/300', description: 'Warm oatmeal topped with fresh berries, a great start to the day.', category: 'Breakfast' },
];

export const MOCK_MEAL_ENTRIES: MealEntry[] = [
  { id: 'me1', foodItem: MOCK_FOOD_ITEMS[0], quantity: 1, loggedAt: new Date().toISOString() },
  { id: 'me2', foodItem: MOCK_FOOD_ITEMS[1], quantity: 2, loggedAt: new Date().toISOString() },
];

export const MOCK_MEDICATIONS: Medication[] = [
  { id: '1', name: 'Metformin', dosage: '500mg', form: 'pill', description: 'Take with typical meals.' },
  { id: '2', name: 'Lisinopril', dosage: '10mg', form: 'pill', description: 'For blood pressure control.' },
  { id: '3', name: 'Albuterol', dosage: '2 puffs', form: 'inhaler', description: 'As needed for shortness of breath.' },
  { id: '4', name: 'Insulin Glargine', dosage: '15 units', form: 'injection', description: 'Once daily at bedtime.' },
];

export const MOCK_MEDICATION_ENTRIES: MedicationEntry[] = [
  { id: 'mede1', medication: MOCK_MEDICATIONS[0], takenAt: new Date(new Date().setHours(8, 0, 0, 0)).toISOString() },
  { id: 'mede2', medication: MOCK_MEDICATIONS[1], takenAt: new Date(new Date().setHours(8, 0, 0, 0)).toISOString() },
];

export const MOCK_REMINDERS: Reminder[] = [
  { id: 'rem1', type: 'medication', time: '08:00', message: 'Morning Medications', isActive: true },
  { id: 'rem2', type: 'medication', time: '20:00', message: 'Evening Medications', isActive: true },
  { id: 'rem3', type: 'water', time: '10:00', message: 'Drink a glass of water', isActive: true },
  { id: 'rem4', type: 'glucose', time: '14:00', message: 'Post-lunch Glucose Check', isActive: false },
];

export const MOCK_DAILY_MEALS_TODAY: DailyMealGroup[] = [
  {
    mealType: MealType.BREAKFAST,
    entries: [
      { id: 'me1b', foodItem: MOCK_FOOD_ITEMS[0], quantity: 1, loggedAt: new Date(new Date().setHours(8, 0, 0, 0)).toISOString() },
      { id: 'me2b', foodItem: MOCK_FOOD_ITEMS[1], quantity: 2, loggedAt: new Date(new Date().setHours(8, 5, 0, 0)).toISOString() },
    ],
    totalCalories: MOCK_FOOD_ITEMS[0].calories + MOCK_FOOD_ITEMS[1].calories * 2,
  },
  {
    mealType: MealType.SNACK,
    entries: [
      { id: 'me3s', foodItem: MOCK_FOOD_ITEMS[3], quantity: 1, loggedAt: new Date(new Date().setHours(10, 30, 0, 0)).toISOString() },
    ],
    totalCalories: MOCK_FOOD_ITEMS[3].calories,
  },
];

export const MOCK_DEVICES: Device[] = [
  { id: '1', name: 'Contour Next One', isConnected: true, chargeLevel: 75, type: 'glucose_monitor', imageUrl: 'https://picsum.photos/seed/contour/100/50', description: 'On your meter, press and hold down the meter button until you see a flashing blue light.' },
  { id: '2', name: 'Dexcom', isConnected: false, type: 'glucose_monitor', imageUrl: 'https://picsum.photos/seed/dexcom/100/50' },
  { id: '3', name: 'Apple Health Data', isConnected: true, type: 'health_data_platform', imageUrl: 'https://picsum.photos/seed/applehealth/100/50' },
  { id: '4', name: 'Glucose Buddy Meter', isConnected: false, chargeLevel: 88, type: 'glucose_monitor', imageUrl: 'https://picsum.photos/seed/glucosebuddy/100/50' },
];

export const MOCK_BLOOD_SUGAR_READINGS: BloodSugarReading[] = [
  { timestamp: new Date().setHours(7, 0, 0, 0), value: 90, type: 'before_meal' },
  { timestamp: new Date().setHours(9, 0, 0, 0), value: 140, type: 'after_meal' },
  { timestamp: new Date().setHours(12, 0, 0, 0), value: 85, type: 'before_meal' },
  { timestamp: new Date().setHours(14, 0, 0, 0), value: 130, type: 'after_meal' },
  { timestamp: new Date().setHours(18, 0, 0, 0), value: 95, type: 'before_meal' },
  { timestamp: new Date().setHours(20, 0, 0, 0), value: 120, type: 'after_meal' },
];

export const MOCK_DASHBOARD_STATS: DashboardStats = {
  eatenGL: 24, // GL often refers to Glycemic Load, can be similar to calories in this context or a specific unit
  totalGL: 64,
  glucose: 136, // mg/dL
  pillsTaken: 2, // Example
  activitySteps: 244,
  carbsIntake: 522, // Example, this seems high, adjust if it's daily total
  waterIntake: 3, // Initial mock water intake
  dailyWaterGoal: 8, // Goal for daily glasses
};
