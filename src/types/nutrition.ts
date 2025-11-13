export interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  fiber?: number;
  sugar?: number;
  quantity: number;
  unit: string;
  timestamp: Date;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  age: number;
  weight: number;
  height: number;
  gender: 'male' | 'female' | 'other';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  fitnessGoal: 'weight_loss' | 'muscle_gain' | 'maintain' | 'athlete';
  dailyCalorieTarget: number;
  proteinTarget: number;
  fatTarget: number;
  carbTarget: number;
  createdAt: Date;
}

export interface DailySummary {
  date: string;
  totalCalories: number;
  totalProtein: number;
  totalFat: number;
  totalCarbs: number;
  foods: FoodItem[];
  targetCalories: number;
  targetProtein: number;
  targetFat: number;
  targetCarbs: number;
}

export interface MealRecommendation {
  id: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  name: string;
  description: string;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  ingredients: string[];
  cookingMethod: string;
  prepTime: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface NutritionAnalysis {
  food: string;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  confidence: number;
  suggestions: string[];
}