const express = require('express');
const FoodItem = require('../models/FoodItem');
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');
const { parseNutritionInput } = require('../utils/foodParser');

const router = express.Router();

// @route   POST /api/food/analyze
// @desc    Analyze food input and return nutrition data
// @access  Private
router.post('/analyze', auth, [
  body('input').trim().isLength({ min: 1 }).withMessage('Food input is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { input } = req.body;
    const analysis = parseNutritionInput(input);

    res.json({
      success: true,
      data: {
        analysis
      }
    });
  } catch (error) {
    console.error('Food analysis error:', error);
    res.status(500).json({
      success: false,
      message: 'Error analyzing food input'
    });
  }
});

// @route   POST /api/food/log
// @desc    Log food item
// @access  Private
router.post('/log', auth, [
  body('name').trim().isLength({ min: 1 }).withMessage('Food name is required'),
  body('calories').isFloat({ min: 0 }).withMessage('Calories must be a positive number'),
  body('protein').isFloat({ min: 0 }).withMessage('Protein must be a positive number'),
  body('fat').isFloat({ min: 0 }).withMessage('Fat must be a positive number'),
  body('carbs').isFloat({ min: 0 }).withMessage('Carbs must be a positive number'),
  body('quantity').isFloat({ min: 0.1 }).withMessage('Quantity must be at least 0.1')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const foodData = {
      ...req.body,
      userId: req.user._id
    };

    const foodItem = new FoodItem(foodData);
    await foodItem.save();

    res.status(201).json({
      success: true,
      message: 'Food logged successfully',
      data: {
        foodItem
      }
    });
  } catch (error) {
    console.error('Food logging error:', error);
    res.status(500).json({
      success: false,
      message: 'Error logging food item'
    });
  }
});

// @route   GET /api/food/today
// @desc    Get today's food items
// @access  Private
router.get('/today', auth, async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const foodItems = await FoodItem.find({
      userId: req.user._id,
      createdAt: {
        $gte: today,
        $lt: tomorrow
      }
    }).sort({ createdAt: -1 });

    // Calculate totals
    const totals = foodItems.reduce((acc, item) => ({
      totalCalories: acc.totalCalories + item.calories,
      totalProtein: acc.totalProtein + item.protein,
      totalFat: acc.totalFat + item.fat,
      totalCarbs: acc.totalCarbs + item.carbs
    }), {
      totalCalories: 0,
      totalProtein: 0,
      totalFat: 0,
      totalCarbs: 0
    });

    res.json({
      success: true,
      data: {
        foodItems,
        summary: {
          ...totals,
          date: today.toDateString(),
          targetCalories: req.user.profile?.dailyCalorieTarget || 2000,
          targetProtein: req.user.profile?.proteinTarget || 150,
          targetFat: req.user.profile?.fatTarget || 67,
          targetCarbs: req.user.profile?.carbTarget || 250
        }
      }
    });
  } catch (error) {
    console.error('Get today food error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching today\'s food items'
    });
  }
});

// @route   GET /api/food/history
// @desc    Get food history with pagination
// @access  Private
router.get('/history', auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const foodItems = await FoodItem.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await FoodItem.countDocuments({ userId: req.user._id });

    res.json({
      success: true,
      data: {
        foodItems,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get food history error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching food history'
    });
  }
});

// @route   DELETE /api/food/:id
// @desc    Delete food item
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const foodItem = await FoodItem.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!foodItem) {
      return res.status(404).json({
        success: false,
        message: 'Food item not found'
      });
    }

    await FoodItem.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Food item deleted successfully',
      data: {
        deletedItem: foodItem
      }
    });
  } catch (error) {
    console.error('Delete food error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting food item'
    });
  }
});

// @route   GET /api/food/weekly-summary
// @desc    Get weekly nutrition summary
// @access  Private
router.get('/weekly-summary', auth, async (req, res) => {
  try {
    const today = new Date();
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);

    const foodItems = await FoodItem.find({
      userId: req.user._id,
      createdAt: {
        $gte: weekAgo,
        $lte: today
      }
    }).sort({ createdAt: 1 });

    // Group by date
    const dailySummaries = {};
    
    foodItems.forEach(item => {
      const date = item.createdAt.toDateString();
      if (!dailySummaries[date]) {
        dailySummaries[date] = {
          date,
          totalCalories: 0,
          totalProtein: 0,
          totalFat: 0,
          totalCarbs: 0,
          foods: []
        };
      }
      
      dailySummaries[date].totalCalories += item.calories;
      dailySummaries[date].totalProtein += item.protein;
      dailySummaries[date].totalFat += item.fat;
      dailySummaries[date].totalCarbs += item.carbs;
      dailySummaries[date].foods.push(item);
    });

    const weeklyData = Object.values(dailySummaries);

    res.json({
      success: true,
      data: {
        weeklyData,
        averages: weeklyData.length > 0 ? {
          avgCalories: weeklyData.reduce((sum, day) => sum + day.totalCalories, 0) / weeklyData.length,
          avgProtein: weeklyData.reduce((sum, day) => sum + day.totalProtein, 0) / weeklyData.length,
          avgFat: weeklyData.reduce((sum, day) => sum + day.totalFat, 0) / weeklyData.length,
          avgCarbs: weeklyData.reduce((sum, day) => sum + day.totalCarbs, 0) / weeklyData.length
        } : null
      }
    });
  } catch (error) {
    console.error('Weekly summary error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching weekly summary'
    });
  }
});

module.exports = router;