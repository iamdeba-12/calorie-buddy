const mongoose = require('mongoose');

const mealPlanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  meals: {
    breakfast: [{
      name: String,
      calories: Number,
      protein: Number,
      fat: Number,
      carbs: Number,
      ingredients: [String],
      cookingMethod: String,
      prepTime: Number,
      difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard']
      }
    }],
    lunch: [{
      name: String,
      calories: Number,
      protein: Number,
      fat: Number,
      carbs: Number,
      ingredients: [String],
      cookingMethod: String,
      prepTime: Number,
      difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard']
      }
    }],
    dinner: [{
      name: String,
      calories: Number,
      protein: Number,
      fat: Number,
      carbs: Number,
      ingredients: [String],
      cookingMethod: String,
      prepTime: Number,
      difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard']
      }
    }],
    snacks: [{
      name: String,
      calories: Number,
      protein: Number,
      fat: Number,
      carbs: Number,
      ingredients: [String],
      cookingMethod: String,
      prepTime: Number,
      difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard']
      }
    }]
  },
  totalCalories: {
    type: Number,
    default: 0
  },
  totalProtein: {
    type: Number,
    default: 0
  },
  totalFat: {
    type: Number,
    default: 0
  },
  totalCarbs: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for efficient queries
mealPlanSchema.index({ userId: 1, date: 1 });

module.exports = mongoose.model('MealPlan', mealPlanSchema);