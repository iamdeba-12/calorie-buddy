const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  calories: {
    type: Number,
    required: true,
    min: 0
  },
  protein: {
    type: Number,
    required: true,
    min: 0
  },
  fat: {
    type: Number,
    required: true,
    min: 0
  },
  carbs: {
    type: Number,
    required: true,
    min: 0
  },
  fiber: {
    type: Number,
    default: 0,
    min: 0
  },
  sugar: {
    type: Number,
    default: 0,
    min: 0
  },
  quantity: {
    type: Number,
    required: true,
    min: 0.1
  },
  unit: {
    type: String,
    required: true,
    default: 'serving'
  },
  mealType: {
    type: String,
    enum: ['breakfast', 'lunch', 'dinner', 'snack'],
    default: 'snack'
  },
  date: {
    type: Date,
    default: Date.now
  },
  confidence: {
    type: Number,
    default: 1.0,
    min: 0,
    max: 1
  }
}, {
  timestamps: true
});

// Index for efficient queries
foodItemSchema.index({ userId: 1, date: 1 });
foodItemSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('FoodItem', foodItemSchema);