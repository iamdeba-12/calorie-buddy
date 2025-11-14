const express = require('express');
const auth = require('../middleware/auth');
const FoodItem = require('../models/FoodItem');
const { getMealRecommendations } = require('../utils/recommendationEngine');

const router = express.Router();

// @route   GET /api/recommendations/:mealType
// @desc    Get meal recommendations
// @access  Private
router.get('/:mealType', auth, async (req, res) => {
  try {
    const { mealType } = req.params;
    
    if (!['breakfast', 'lunch', 'dinner', 'snack'].includes(mealType)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid meal type'
      });
    }

    // Get today's consumed calories
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todaysFoods = await FoodItem.find({
      userId: req.user._id,
      createdAt: {
        $gte: today,
        $lt: tomorrow
      }
    });

    const consumedCalories = todaysFoods.reduce((sum, food) => sum + food.calories, 0);

    // Get recommendations based on user profile and consumed calories
    const recommendations = getMealRecommendations(
      req.user.profile || {},
      mealType,
      consumedCalories
    );

    res.json({
      success: true,
      data: {
        recommendations,
        context: {
          mealType,
          consumedCalories,
          remainingCalories: (req.user.profile?.dailyCalorieTarget || 2000) - consumedCalories,
          fitnessGoal: req.user.profile?.fitnessGoal || 'maintain'
        }
      }
    });
  } catch (error) {
    console.error('Recommendations error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching recommendations'
    });
  }
});

// @route   POST /api/recommendations/personalized
// @desc    Get personalized recommendations based on preferences
// @access  Private
router.post('/personalized', auth, async (req, res) => {
  try {
    const { preferences = {}, excludeIngredients = [] } = req.body;

    // Get today's nutrition data
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todaysFoods = await FoodItem.find({
      userId: req.user._id,
      createdAt: {
        $gte: today,
        $lt: tomorrow
      }
    });

    const consumedNutrition = todaysFoods.reduce((acc, food) => ({
      calories: acc.calories + food.calories,
      protein: acc.protein + food.protein,
      fat: acc.fat + food.fat,
      carbs: acc.carbs + food.carbs
    }), { calories: 0, protein: 0, fat: 0, carbs: 0 });

    // Generate personalized recommendations
    const recommendations = await generatePersonalizedRecommendations(
      req.user,
      consumedNutrition,
      preferences,
      excludeIngredients
    );

    res.json({
      success: true,
      data: {
        recommendations,
        nutritionStatus: {
          consumed: consumedNutrition,
          targets: {
            calories: req.user.profile?.dailyCalorieTarget || 2000,
            protein: req.user.profile?.proteinTarget || 150,
            fat: req.user.profile?.fatTarget || 67,
            carbs: req.user.profile?.carbTarget || 250
          }
        }
      }
    });
  } catch (error) {
    console.error('Personalized recommendations error:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating personalized recommendations'
    });
  }
});

// Helper function for personalized recommendations
async function generatePersonalizedRecommendations(user, consumed, preferences, excludeIngredients) {
  const profile = user.profile || {};
  const remaining = {
    calories: (profile.dailyCalorieTarget || 2000) - consumed.calories,
    protein: (profile.proteinTarget || 150) - consumed.protein,
    fat: (profile.fatTarget || 67) - consumed.fat,
    carbs: (profile.carbTarget || 250) - consumed.carbs
  };

  // Base recommendations on fitness goal and remaining macros
  let recommendations = [];

  if (profile.fitnessGoal === 'weight_loss' && remaining.calories > 0) {
    recommendations.push({
      type: 'meal',
      title: 'Low-Calorie High-Protein Option',
      description: `You have ${Math.round(remaining.calories)} calories remaining. Focus on lean proteins and vegetables.`,
      suggestions: [
        'Grilled chicken salad with mixed greens',
        'Steamed fish with broccoli',
        'Greek yogurt with berries'
      ]
    });
  }

  if (remaining.protein > 20) {
    recommendations.push({
      type: 'macro',
      title: 'Boost Your Protein',
      description: `You need ${Math.round(remaining.protein)}g more protein today.`,
      suggestions: [
        'Add a protein shake',
        'Include eggs or paneer in your next meal',
        'Snack on Greek yogurt or nuts'
      ]
    });
  }

  if (profile.fitnessGoal === 'muscle_gain' && remaining.calories > 300) {
    recommendations.push({
      type: 'meal',
      title: 'Muscle Building Meal',
      description: 'High-protein, high-calorie options for muscle growth.',
      suggestions: [
        'Chicken biryani with raita',
        'Dal rice with ghee and paneer',
        'Protein smoothie with banana and oats'
      ]
    });
  }

  return recommendations;
}

module.exports = router;