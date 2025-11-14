const MEAL_RECOMMENDATIONS = {
  weight_loss: {
    breakfast: [
      {
        id: 'wl-b1',
        name: 'Protein Omelette with Vegetables',
        description: 'Low-calorie, high-protein breakfast with mixed vegetables',
        calories: 220,
        protein: 18,
        fat: 14,
        carbs: 8,
        ingredients: ['2 eggs', 'spinach', 'tomatoes', 'onions', 'bell peppers'],
        cookingMethod: 'Pan-fried with minimal oil',
        prepTime: 10,
        difficulty: 'easy'
      },
      {
        id: 'wl-b2',
        name: 'Greek Yogurt with Berries',
        description: 'High-protein, low-calorie breakfast with antioxidants',
        calories: 150,
        protein: 15,
        fat: 0,
        carbs: 18,
        ingredients: ['200g greek yogurt', 'mixed berries', 'stevia'],
        cookingMethod: 'No cooking required',
        prepTime: 2,
        difficulty: 'easy'
      }
    ],
    lunch: [
      {
        id: 'wl-l1',
        name: 'Grilled Chicken Salad',
        description: 'Lean protein with fresh vegetables and minimal dressing',
        calories: 320,
        protein: 35,
        fat: 12,
        carbs: 15,
        ingredients: ['150g chicken breast', 'mixed greens', 'cucumber', 'tomatoes', 'olive oil'],
        cookingMethod: 'Grilled chicken, fresh salad',
        prepTime: 15,
        difficulty: 'easy'
      },
      {
        id: 'wl-l2',
        name: 'Vegetable Daliya Bowl',
        description: 'High-fiber, low-calorie meal with vegetables',
        calories: 280,
        protein: 12,
        fat: 6,
        carbs: 45,
        ingredients: ['1 cup daliya', 'mixed vegetables', 'minimal oil'],
        cookingMethod: 'Steamed with vegetables',
        prepTime: 20,
        difficulty: 'medium'
      }
    ],
    dinner: [
      {
        id: 'wl-d1',
        name: 'Steamed Fish with Vegetables',
        description: 'Light, protein-rich dinner with minimal calories',
        calories: 250,
        protein: 30,
        fat: 8,
        carbs: 12,
        ingredients: ['150g fish fillet', 'broccoli', 'carrots', 'herbs'],
        cookingMethod: 'Steamed with herbs and spices',
        prepTime: 20,
        difficulty: 'medium'
      }
    ]
  },
  muscle_gain: {
    breakfast: [
      {
        id: 'mg-b1',
        name: 'Protein Pancakes with Nuts',
        description: 'High-protein, calorie-dense breakfast for muscle building',
        calories: 420,
        protein: 30,
        fat: 18,
        carbs: 35,
        ingredients: ['3 eggs', 'oats', 'protein powder', 'almonds', 'honey'],
        cookingMethod: 'Pan-fried with ghee',
        prepTime: 15,
        difficulty: 'medium'
      }
    ],
    lunch: [
      {
        id: 'mg-l1',
        name: 'Chicken Biryani with Raita',
        description: 'High-protein, high-carb meal for muscle building',
        calories: 650,
        protein: 40,
        fat: 25,
        carbs: 65,
        ingredients: ['200g chicken', '1.5 cups basmati rice', 'yogurt', 'spices'],
        cookingMethod: 'Slow-cooked biryani',
        prepTime: 45,
        difficulty: 'hard'
      }
    ],
    dinner: [
      {
        id: 'mg-d1',
        name: 'Grilled Chicken with Sweet Potato',
        description: 'Lean protein with complex carbs for recovery',
        calories: 520,
        protein: 45,
        fat: 15,
        carbs: 45,
        ingredients: ['200g chicken breast', '150g sweet potato', 'vegetables'],
        cookingMethod: 'Grilled chicken, roasted sweet potato',
        prepTime: 30,
        difficulty: 'medium'
      }
    ]
  },
  maintain: {
    breakfast: [
      {
        id: 'm-b1',
        name: 'Poha with Peanuts',
        description: 'Balanced breakfast with moderate calories',
        calories: 280,
        protein: 8,
        fat: 12,
        carbs: 38,
        ingredients: ['1 cup poha', 'peanuts', 'onions', 'curry leaves', 'oil'],
        cookingMethod: 'Sautéed with minimal oil',
        prepTime: 15,
        difficulty: 'easy'
      }
    ],
    lunch: [
      {
        id: 'm-l1',
        name: 'Mixed Vegetable Curry with Roti',
        description: 'Balanced meal with vegetables and whole grains',
        calories: 420,
        protein: 15,
        fat: 14,
        carbs: 58,
        ingredients: ['mixed vegetables', '2 rotis', 'dal', 'oil'],
        cookingMethod: 'Sautéed vegetables with rotis',
        prepTime: 25,
        difficulty: 'medium'
      }
    ],
    dinner: [
      {
        id: 'm-d1',
        name: 'Chapati with Dal and Sabzi',
        description: 'Traditional balanced dinner',
        calories: 380,
        protein: 16,
        fat: 12,
        carbs: 55,
        ingredients: ['2 chapatis', '1 cup dal', 'seasonal vegetables'],
        cookingMethod: 'Home-cooked dal and vegetables',
        prepTime: 30,
        difficulty: 'medium'
      }
    ]
  },
  athlete: {
    breakfast: [
      {
        id: 'a-b1',
        name: 'High-Energy Smoothie Bowl',
        description: 'Nutrient-dense breakfast for athletic performance',
        calories: 450,
        protein: 25,
        fat: 15,
        carbs: 55,
        ingredients: ['protein powder', 'banana', 'oats', 'berries', 'nuts'],
        cookingMethod: 'Blended smoothie with toppings',
        prepTime: 8,
        difficulty: 'easy'
      }
    ],
    lunch: [
      {
        id: 'a-l1',
        name: 'Power Bowl with Quinoa',
        description: 'Complete nutrition for sustained energy',
        calories: 580,
        protein: 35,
        fat: 20,
        carbs: 65,
        ingredients: ['quinoa', 'grilled chicken', 'avocado', 'vegetables', 'nuts'],
        cookingMethod: 'Grilled and assembled',
        prepTime: 20,
        difficulty: 'medium'
      }
    ],
    dinner: [
      {
        id: 'a-d1',
        name: 'Salmon with Brown Rice',
        description: 'Omega-3 rich meal for recovery',
        calories: 520,
        protein: 40,
        fat: 18,
        carbs: 45,
        ingredients: ['salmon fillet', 'brown rice', 'asparagus', 'olive oil'],
        cookingMethod: 'Baked salmon with steamed rice',
        prepTime: 25,
        difficulty: 'medium'
      }
    ]
  }
};

function getMealRecommendations(profile, mealType, consumedCalories) {
  const fitnessGoal = profile.fitnessGoal || 'maintain';
  const dailyTarget = profile.dailyCalorieTarget || 2000;
  const remainingCalories = dailyTarget - consumedCalories;
  
  // Get base recommendations for the fitness goal
  const goalRecommendations = MEAL_RECOMMENDATIONS[fitnessGoal] || MEAL_RECOMMENDATIONS.maintain;
  const mealRecommendations = goalRecommendations[mealType] || [];
  
  // Filter based on remaining calories
  const mealCalorieTarget = remainingCalories / (mealType === 'lunch' ? 2 : 3);
  
  const filteredRecommendations = mealRecommendations.filter(meal => 
    meal.calories <= mealCalorieTarget * 1.3 && meal.calories >= mealCalorieTarget * 0.5
  );
  
  // If no suitable recommendations, provide general ones
  if (filteredRecommendations.length === 0) {
    return getGeneralRecommendations(mealType, remainingCalories, fitnessGoal);
  }
  
  return filteredRecommendations.slice(0, 2);
}

function getGeneralRecommendations(mealType, remainingCalories, fitnessGoal) {
  const generalRecommendations = {
    breakfast: [
      {
        id: 'gen-b1',
        name: 'Balanced Breakfast',
        description: 'A nutritious start to your day',
        calories: Math.min(remainingCalories * 0.25, 350),
        protein: 15,
        fat: 10,
        carbs: 30,
        ingredients: ['whole grains', 'protein source', 'fruits'],
        cookingMethod: 'Various options available',
        prepTime: 10,
        difficulty: 'easy'
      }
    ],
    lunch: [
      {
        id: 'gen-l1',
        name: 'Balanced Lunch',
        description: 'A satisfying midday meal',
        calories: Math.min(remainingCalories * 0.4, 500),
        protein: 25,
        fat: 15,
        carbs: 45,
        ingredients: ['lean protein', 'vegetables', 'complex carbs'],
        cookingMethod: 'Grilled, steamed, or sautéed',
        prepTime: 20,
        difficulty: 'medium'
      }
    ],
    dinner: [
      {
        id: 'gen-d1',
        name: 'Light Dinner',
        description: 'A nutritious end to your day',
        calories: Math.min(remainingCalories * 0.35, 400),
        protein: 20,
        fat: 12,
        carbs: 35,
        ingredients: ['lean protein', 'vegetables', 'minimal carbs'],
        cookingMethod: 'Light cooking methods',
        prepTime: 25,
        difficulty: 'medium'
      }
    ]
  };
  
  return generalRecommendations[mealType] || [];
}

module.exports = {
  getMealRecommendations,
  MEAL_RECOMMENDATIONS
};