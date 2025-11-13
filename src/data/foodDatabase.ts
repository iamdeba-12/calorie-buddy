import { NutritionAnalysis } from '../types/nutrition';

// Comprehensive food database with Indian and international foods
export const FOOD_DATABASE: Record<string, any> = {
  // Indian Foods
  'roti': { calories: 71, protein: 3, fat: 0.4, carbs: 15, unit: '1 piece' },
  'chapati': { calories: 71, protein: 3, fat: 0.4, carbs: 15, unit: '1 piece' },
  'naan': { calories: 137, protein: 4.6, fat: 3.3, carbs: 23, unit: '1 piece' },
  'rice': { calories: 130, protein: 2.7, fat: 0.3, carbs: 28, unit: '100g' },
  'dal': { calories: 116, protein: 9, fat: 0.5, carbs: 20, unit: '100g' },
  'omelette': { calories: 154, protein: 11, fat: 12, carbs: 0.6, unit: '2 eggs' },
  'egg': { calories: 77, protein: 6, fat: 5, carbs: 0.6, unit: '1 piece' },
  'paneer': { calories: 321, protein: 25, fat: 25, carbs: 3, unit: '100g' },
  'chicken curry': { calories: 180, protein: 25, fat: 8, carbs: 5, unit: '100g' },
  'mutton curry': { calories: 250, protein: 26, fat: 15, carbs: 4, unit: '100g' },
  'fish curry': { calories: 150, protein: 20, fat: 6, carbs: 4, unit: '100g' },
  'samosa': { calories: 262, protein: 5, fat: 17, carbs: 23, unit: '1 piece' },
  'paratha': { calories: 126, protein: 3, fat: 4.5, carbs: 18, unit: '1 piece' },
  'dosa': { calories: 168, protein: 4, fat: 3.7, carbs: 31, unit: '1 piece' },
  'idli': { calories: 58, protein: 2, fat: 0.3, carbs: 12, unit: '1 piece' },
  'upma': { calories: 150, protein: 4, fat: 2, carbs: 30, unit: '100g' },
  'poha': { calories: 160, protein: 3, fat: 1, carbs: 35, unit: '100g' },
  
  // International Foods
  'bread': { calories: 80, protein: 4, fat: 1, carbs: 15, unit: '1 slice' },
  'toast': { calories: 80, protein: 4, fat: 1, carbs: 15, unit: '1 slice' },
  'pasta': { calories: 220, protein: 8, fat: 1.5, carbs: 44, unit: '100g' },
  'pizza': { calories: 266, protein: 11, fat: 10, carbs: 33, unit: '1 slice' },
  'burger': { calories: 354, protein: 16, fat: 16, carbs: 35, unit: '1 piece' },
  'sandwich': { calories: 200, protein: 8, fat: 7, carbs: 28, unit: '1 piece' },
  'salad': { calories: 33, protein: 3, fat: 0.2, carbs: 6, unit: '100g' },
  'apple': { calories: 52, protein: 0.3, fat: 0.2, carbs: 14, unit: '1 medium' },
  'banana': { calories: 89, protein: 1.1, fat: 0.3, carbs: 23, unit: '1 medium' },
  'orange': { calories: 47, protein: 0.9, fat: 0.1, carbs: 12, unit: '1 medium' },
  'milk': { calories: 42, protein: 3.4, fat: 1, carbs: 5, unit: '100ml' },
  'yogurt': { calories: 59, protein: 10, fat: 0.4, carbs: 3.6, unit: '100g' },
  'cheese': { calories: 113, protein: 7, fat: 9, carbs: 1, unit: '1 slice' },
  'chicken breast': { calories: 165, protein: 31, fat: 3.6, carbs: 0, unit: '100g' },
  'fish': { calories: 206, protein: 22, fat: 12, carbs: 0, unit: '100g' },
  'almonds': { calories: 579, protein: 21, fat: 50, carbs: 22, unit: '100g' },
  'walnuts': { calories: 654, protein: 15, fat: 65, carbs: 14, unit: '100g' },
};

// Food name normalization patterns
const NORMALIZATION_PATTERNS: Record<string, string> = {
  'rotis': 'roti',
  'chapatis': 'chapati',
  'eggs': 'egg',
  'omelettes': 'omelette',
  'breads': 'bread',
  'apples': 'apple',
  'bananas': 'banana',
  'oranges': 'orange',
  'parathas': 'paratha',
  'dosas': 'dosa',
  'idlis': 'idli',
  'samosas': 'samosa',
};

export function normalizeFood(input: string): string {
  const normalized = input.toLowerCase().trim();
  return NORMALIZATION_PATTERNS[normalized] || normalized;
}

export function parseNutritionInput(input: string): NutritionAnalysis[] {
  const results: NutritionAnalysis[] = [];
  
  // Parse quantities and food items (e.g., "2 roti", "1 omelette")
  const pattern = /(\d+(?:\.\d+)?)\s*([a-zA-Z\s]+)/g;
  let match;
  
  while ((match = pattern.exec(input)) !== null) {
    const quantity = parseFloat(match[1]);
    const foodName = normalizeFood(match[2]);
    const foodData = FOOD_DATABASE[foodName];
    
    if (foodData) {
      results.push({
        food: `${quantity} ${foodName}`,
        calories: Math.round(foodData.calories * quantity),
        protein: Math.round(foodData.protein * quantity * 10) / 10,
        fat: Math.round(foodData.fat * quantity * 10) / 10,
        carbs: Math.round(foodData.carbs * quantity * 10) / 10,
        confidence: 0.95,
        suggestions: []
      });
    } else {
      // Fallback for unknown foods
      results.push({
        food: `${quantity} ${foodName}`,
        calories: Math.round(150 * quantity), // Average estimate
        protein: Math.round(8 * quantity * 10) / 10,
        fat: Math.round(5 * quantity * 10) / 10,
        carbs: Math.round(20 * quantity * 10) / 10,
        confidence: 0.3,
        suggestions: [`Food "${foodName}" not found in database. Using estimated values.`]
      });
    }
  }
  
  return results;
}