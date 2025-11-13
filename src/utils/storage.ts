import { UserProfile, FoodItem, DailySummary } from '../types/nutrition';

// Local storage keys
const STORAGE_KEYS = {
  USER_PROFILE: 'calorie_buddy_profile',
  FOOD_LOG: 'calorie_buddy_food_log',
  DAILY_SUMMARY: 'calorie_buddy_daily_summary'
} as const;

// User Profile Storage
export function saveUserProfile(profile: UserProfile): void {
  localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
}

export function getUserProfile(): UserProfile | null {
  const stored = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
  if (!stored) return null;
  
  const profile = JSON.parse(stored);
  return {
    ...profile,
    createdAt: new Date(profile.createdAt)
  };
}

// Food Log Storage
export function saveFoodItem(foodItem: FoodItem): void {
  const existingLog = getFoodLog();
  const updatedLog = [...existingLog, { ...foodItem, timestamp: new Date() }];
  localStorage.setItem(STORAGE_KEYS.FOOD_LOG, JSON.stringify(updatedLog));
}

export function getFoodLog(): FoodItem[] {
  const stored = localStorage.getItem(STORAGE_KEYS.FOOD_LOG);
  if (!stored) return [];
  
  const log = JSON.parse(stored);
  return log.map((item: any) => ({
    ...item,
    timestamp: new Date(item.timestamp)
  }));
}

export function removeFoodItem(foodId: string): void {
  const existingLog = getFoodLog();
  const updatedLog = existingLog.filter(item => item.id !== foodId);
  localStorage.setItem(STORAGE_KEYS.FOOD_LOG, JSON.stringify(updatedLog));
}

export function getTodaysFoodItems(): FoodItem[] {
  const allFoods = getFoodLog();
  const today = new Date().toDateString();
  
  return allFoods.filter(food => 
    food.timestamp.toDateString() === today
  );
}

// Daily Summary Storage
export function getTodaysSummary(profile: UserProfile | null): DailySummary {
  const todaysFood = getTodaysFoodItems();
  const today = new Date().toDateString();
  
  const totals = todaysFood.reduce(
    (acc, food) => ({
      totalCalories: acc.totalCalories + food.calories,
      totalProtein: acc.totalProtein + food.protein,
      totalFat: acc.totalFat + food.fat,
      totalCarbs: acc.totalCarbs + food.carbs
    }),
    { totalCalories: 0, totalProtein: 0, totalFat: 0, totalCarbs: 0 }
  );
  
  return {
    date: today,
    foods: todaysFood,
    ...totals,
    targetCalories: profile?.dailyCalorieTarget || 2000,
    targetProtein: profile?.proteinTarget || 150,
    targetFat: profile?.fatTarget || 67,
    targetCarbs: profile?.carbTarget || 250
  };
}

// Clear all data (for testing/reset)
export function clearAllData(): void {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
}