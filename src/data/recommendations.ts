import { MealRecommendation, UserProfile } from '../types/nutrition';

export const MEAL_RECOMMENDATIONS: Record<string, MealRecommendation[]> = {
  weight_loss: {
    breakfast: [
      {
        id: 'wl-b1',
        mealType: 'breakfast',
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
        mealType: 'breakfast',
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
        mealType: 'lunch',
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
        mealType: 'lunch',
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
        mealType: 'dinner',
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
      },
      {
        id: 'wl-d2',
        mealType: 'dinner',
        name: 'Paneer Tikka with Salad',
        description: 'Grilled paneer with fresh vegetables',
        calories: 300,
        protein: 20,
        fat: 18,
        carbs: 15,
        ingredients: ['100g paneer', 'bell peppers', 'onions', 'salad'],
        cookingMethod: 'Grilled without oil',
        prepTime: 25,
        difficulty: 'medium'
      }
    ]
  },
  muscle_gain: {
    breakfast: [
      {
        id: 'mg-b1',
        mealType: 'breakfast',
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
      },
      {
        id: 'mg-b2',
        mealType: 'breakfast',
        name: 'Masala Scrambled Eggs with Paratha',
        description: 'Protein and carb-rich breakfast for energy',
        calories: 480,
        protein: 22,
        fat: 24,
        carbs: 42,
        ingredients: ['3 eggs', '2 parathas', 'onions', 'tomatoes', 'ghee'],
        cookingMethod: 'Scrambled with spices, paratha with ghee',
        prepTime: 12,
        difficulty: 'easy'
      }
    ],
    lunch: [
      {
        id: 'mg-l1',
        mealType: 'lunch',
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
      },
      {
        id: 'mg-l2',
        mealType: 'lunch',
        name: 'Dal Rice with Ghee and Paneer',
        description: 'Complete protein with healthy fats and carbs',
        calories: 580,
        protein: 28,
        fat: 22,
        carbs: 68,
        ingredients: ['1 cup rice', '1 cup dal', '100g paneer', '2 tsp ghee'],
        cookingMethod: 'Cooked dal and rice with ghee',
        prepTime: 30,
        difficulty: 'medium'
      }
    ],
    dinner: [
      {
        id: 'mg-d1',
        mealType: 'dinner',
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
      },
      {
        id: 'mg-d2',
        mealType: 'dinner',
        name: 'Fish Curry with Brown Rice',
        description: 'Omega-3 rich fish with complex carbs',
        calories: 480,
        protein: 35,
        fat: 18,
        carbs: 42,
        ingredients: ['150g fish', '1 cup brown rice', 'coconut', 'spices'],
        cookingMethod: 'Fish curry with coconut milk',
        prepTime: 35,
        difficulty: 'medium'
      }
    ]
  },
  maintain: {
    breakfast: [
      {
        id: 'm-b1',
        mealType: 'breakfast',
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
      },
      {
        id: 'm-b2',
        mealType: 'breakfast',
        name: 'Idli Sambar with Chutney',
        description: 'Traditional balanced breakfast',
        calories: 320,
        protein: 12,
        fat: 8,
        carbs: 55,
        ingredients: ['3 idlis', '1 cup sambar', 'coconut chutney'],
        cookingMethod: 'Steamed idlis with sambar',
        prepTime: 5,
        difficulty: 'easy'
      }
    ],
    lunch: [
      {
        id: 'm-l1',
        mealType: 'lunch',
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
      },
      {
        id: 'm-l2',
        mealType: 'lunch',
        name: 'Rajma Rice Bowl',
        description: 'Complete protein with balanced macros',
        calories: 450,
        protein: 18,
        fat: 12,
        carbs: 68,
        ingredients: ['1 cup rajma', '1 cup rice', 'onions', 'tomatoes'],
        cookingMethod: 'Pressure-cooked rajma with rice',
        prepTime: 40,
        difficulty: 'medium'
      }
    ],
    dinner: [
      {
        id: 'm-d1',
        mealType: 'dinner',
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
      },
      {
        id: 'm-d2',
        mealType: 'dinner',
        name: 'Khichdi with Yogurt',
        description: 'Light, easily digestible dinner',
        calories: 320,
        protein: 14,
        fat: 8,
        carbs: 52,
        ingredients: ['rice', 'moong dal', 'vegetables', 'yogurt'],
        cookingMethod: 'One-pot khichdi',
        prepTime: 25,
        difficulty: 'easy'
      }
    ]
  }
};

export function getMealRecommendations(
  profile: UserProfile,
  mealType: 'breakfast' | 'lunch' | 'dinner',
  consumedCalories: number
): MealRecommendation[] {
  const goalRecommendations = MEAL_RECOMMENDATIONS[profile.fitnessGoal];
  const mealRecommendations = goalRecommendations[mealType] || [];
  
  // Filter based on remaining calories
  const remainingCalories = profile.dailyCalorieTarget - consumedCalories;
  const mealCalorieTarget = remainingCalories / (mealType === 'lunch' ? 2 : 3);
  
  return mealRecommendations.filter(meal => 
    meal.calories <= mealCalorieTarget * 1.2 && meal.calories >= mealCalorieTarget * 0.7
  ).slice(0, 2);
}