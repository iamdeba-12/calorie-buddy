// Enhanced food database with more comprehensive nutrition data
const FOOD_DATABASE = {
  // Indian Foods
  'roti': { calories: 71, protein: 3, fat: 0.4, carbs: 15, unit: '1 piece', fiber: 2.7 },
  'chapati': { calories: 71, protein: 3, fat: 0.4, carbs: 15, unit: '1 piece', fiber: 2.7 },
  'naan': { calories: 137, protein: 4.6, fat: 3.3, carbs: 23, unit: '1 piece', fiber: 1.2 },
  'rice': { calories: 130, protein: 2.7, fat: 0.3, carbs: 28, unit: '100g', fiber: 0.4 },
  'dal': { calories: 116, protein: 9, fat: 0.5, carbs: 20, unit: '100g', fiber: 8 },
  'omelette': { calories: 154, protein: 11, fat: 12, carbs: 0.6, unit: '2 eggs', fiber: 0 },
  'egg': { calories: 77, protein: 6, fat: 5, carbs: 0.6, unit: '1 piece', fiber: 0 },
  'paneer': { calories: 321, protein: 25, fat: 25, carbs: 3, unit: '100g', fiber: 0 },
  'chicken curry': { calories: 180, protein: 25, fat: 8, carbs: 5, unit: '100g', fiber: 1 },
  'mutton curry': { calories: 250, protein: 26, fat: 15, carbs: 4, unit: '100g', fiber: 1 },
  'fish curry': { calories: 150, protein: 20, fat: 6, carbs: 4, unit: '100g', fiber: 1 },
  'samosa': { calories: 262, protein: 5, fat: 17, carbs: 23, unit: '1 piece', fiber: 2 },
  'paratha': { calories: 126, protein: 3, fat: 4.5, carbs: 18, unit: '1 piece', fiber: 2.5 },
  'dosa': { calories: 168, protein: 4, fat: 3.7, carbs: 31, unit: '1 piece', fiber: 2 },
  'idli': { calories: 58, protein: 2, fat: 0.3, carbs: 12, unit: '1 piece', fiber: 1 },
  'upma': { calories: 150, protein: 4, fat: 2, carbs: 30, unit: '100g', fiber: 3 },
  'poha': { calories: 160, protein: 3, fat: 1, carbs: 35, unit: '100g', fiber: 2 },
  'rajma': { calories: 127, protein: 9, fat: 0.5, carbs: 23, unit: '100g', fiber: 6 },
  'chole': { calories: 164, protein: 8, fat: 2.6, carbs: 27, unit: '100g', fiber: 8 },
  'biryani': { calories: 290, protein: 12, fat: 8, carbs: 45, unit: '1 cup', fiber: 2 },
  
  // International Foods
  'bread': { calories: 80, protein: 4, fat: 1, carbs: 15, unit: '1 slice', fiber: 2 },
  'toast': { calories: 80, protein: 4, fat: 1, carbs: 15, unit: '1 slice', fiber: 2 },
  'pasta': { calories: 220, protein: 8, fat: 1.5, carbs: 44, unit: '100g', fiber: 3 },
  'pizza': { calories: 266, protein: 11, fat: 10, carbs: 33, unit: '1 slice', fiber: 2 },
  'burger': { calories: 354, protein: 16, fat: 16, carbs: 35, unit: '1 piece', fiber: 3 },
  'sandwich': { calories: 200, protein: 8, fat: 7, carbs: 28, unit: '1 piece', fiber: 4 },
  'salad': { calories: 33, protein: 3, fat: 0.2, carbs: 6, unit: '100g', fiber: 3 },
  
  // Fruits
  'apple': { calories: 52, protein: 0.3, fat: 0.2, carbs: 14, unit: '1 medium', fiber: 2.4 },
  'banana': { calories: 89, protein: 1.1, fat: 0.3, carbs: 23, unit: '1 medium', fiber: 2.6 },
  'orange': { calories: 47, protein: 0.9, fat: 0.1, carbs: 12, unit: '1 medium', fiber: 2.4 },
  'mango': { calories: 60, protein: 0.8, fat: 0.4, carbs: 15, unit: '100g', fiber: 1.6 },
  
  // Dairy
  'milk': { calories: 42, protein: 3.4, fat: 1, carbs: 5, unit: '100ml', fiber: 0 },
  'yogurt': { calories: 59, protein: 10, fat: 0.4, carbs: 3.6, unit: '100g', fiber: 0 },
  'cheese': { calories: 113, protein: 7, fat: 9, carbs: 1, unit: '1 slice', fiber: 0 },
  
  // Proteins
  'chicken breast': { calories: 165, protein: 31, fat: 3.6, carbs: 0, unit: '100g', fiber: 0 },
  'fish': { calories: 206, protein: 22, fat: 12, carbs: 0, unit: '100g', fiber: 0 },
  'salmon': { calories: 208, protein: 20, fat: 13, carbs: 0, unit: '100g', fiber: 0 },
  
  // Nuts and Seeds
  'almonds': { calories: 579, protein: 21, fat: 50, carbs: 22, unit: '100g', fiber: 12 },
  'walnuts': { calories: 654, protein: 15, fat: 65, carbs: 14, unit: '100g', fiber: 7 },
  'peanuts': { calories: 567, protein: 26, fat: 49, carbs: 16, unit: '100g', fiber: 8 },
  
  // Beverages
  'tea': { calories: 2, protein: 0, fat: 0, carbs: 0.7, unit: '1 cup', fiber: 0 },
  'coffee': { calories: 2, protein: 0.3, fat: 0, carbs: 0, unit: '1 cup', fiber: 0 },
  'green tea': { calories: 2, protein: 0.5, fat: 0, carbs: 0, unit: '1 cup', fiber: 0 }
};

// Food name normalization patterns
const NORMALIZATION_PATTERNS = {
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
  'mangoes': 'mango',
  'mangos': 'mango'
};

function normalizeFood(input) {
  const normalized = input.toLowerCase().trim();
  return NORMALIZATION_PATTERNS[normalized] || normalized;
}

function parseNutritionInput(input) {
  const results = [];
  
  // Enhanced parsing patterns
  const patterns = [
    /(\d+(?:\.\d+)?)\s*([a-zA-Z\s]+)/g, // "2 roti", "1.5 cup rice"
    /([a-zA-Z\s]+)\s*(\d+(?:\.\d+)?)/g,  // "roti 2", "rice 1.5"
    /([a-zA-Z\s]+)/g // Just food names without quantities
  ];
  
  let matches = [];
  
  // Try different patterns
  for (const pattern of patterns) {
    const patternMatches = [...input.matchAll(pattern)];
    if (patternMatches.length > 0) {
      matches = patternMatches;
      break;
    }
  }
  
  // If no structured matches, try to extract food names
  if (matches.length === 0) {
    const words = input.toLowerCase().split(/[,&\s]+/).filter(word => word.length > 2);
    matches = words.map(word => [null, 1, word]);
  }
  
  matches.forEach(match => {
    let quantity, foodName;
    
    if (match.length === 3 && match[1] && match[2]) {
      // Pattern: quantity food
      quantity = parseFloat(match[1]) || 1;
      foodName = normalizeFood(match[2]);
    } else if (match.length === 3 && match[1] && match[2]) {
      // Pattern: food quantity
      quantity = parseFloat(match[2]) || 1;
      foodName = normalizeFood(match[1]);
    } else {
      // Just food name
      quantity = 1;
      foodName = normalizeFood(match[0] || match[1] || match[2]);
    }
    
    const foodData = FOOD_DATABASE[foodName];
    
    if (foodData) {
      results.push({
        food: `${quantity} ${foodName}`,
        calories: Math.round(foodData.calories * quantity),
        protein: Math.round(foodData.protein * quantity * 10) / 10,
        fat: Math.round(foodData.fat * quantity * 10) / 10,
        carbs: Math.round(foodData.carbs * quantity * 10) / 10,
        fiber: Math.round((foodData.fiber || 0) * quantity * 10) / 10,
        confidence: 0.95,
        suggestions: [],
        unit: foodData.unit,
        quantity: quantity
      });
    } else {
      // Enhanced fallback with better estimates based on food type
      const estimatedNutrition = estimateNutrition(foodName, quantity);
      results.push({
        food: `${quantity} ${foodName}`,
        ...estimatedNutrition,
        confidence: 0.3,
        suggestions: [`Food "${foodName}" not found in database. Using estimated values.`],
        unit: 'serving',
        quantity: quantity
      });
    }
  });
  
  return results;
}

function estimateNutrition(foodName, quantity) {
  // Better estimation based on food categories
  const foodCategories = {
    grains: { calories: 130, protein: 3, fat: 1, carbs: 27, fiber: 2 },
    vegetables: { calories: 25, protein: 2, fat: 0.2, carbs: 5, fiber: 3 },
    fruits: { calories: 50, protein: 0.5, fat: 0.2, carbs: 13, fiber: 2 },
    meat: { calories: 200, protein: 25, fat: 10, carbs: 0, fiber: 0 },
    dairy: { calories: 60, protein: 6, fat: 3, carbs: 5, fiber: 0 },
    nuts: { calories: 550, protein: 20, fat: 45, carbs: 15, fiber: 8 }
  };
  
  // Simple categorization based on common food names
  let category = 'vegetables'; // default
  
  if (foodName.includes('rice') || foodName.includes('wheat') || foodName.includes('bread')) {
    category = 'grains';
  } else if (foodName.includes('chicken') || foodName.includes('meat') || foodName.includes('fish')) {
    category = 'meat';
  } else if (foodName.includes('milk') || foodName.includes('cheese') || foodName.includes('yogurt')) {
    category = 'dairy';
  } else if (foodName.includes('almond') || foodName.includes('nut') || foodName.includes('seed')) {
    category = 'nuts';
  } else if (foodName.includes('apple') || foodName.includes('banana') || foodName.includes('fruit')) {
    category = 'fruits';
  }
  
  const base = foodCategories[category];
  
  return {
    calories: Math.round(base.calories * quantity),
    protein: Math.round(base.protein * quantity * 10) / 10,
    fat: Math.round(base.fat * quantity * 10) / 10,
    carbs: Math.round(base.carbs * quantity * 10) / 10,
    fiber: Math.round(base.fiber * quantity * 10) / 10
  };
}

module.exports = {
  parseNutritionInput,
  FOOD_DATABASE,
  normalizeFood
};