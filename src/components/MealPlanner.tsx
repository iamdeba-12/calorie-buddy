import React, { useState } from 'react';
import { Calendar, Clock, Plus, ChefHat, Target, Utensils } from 'lucide-react';
import { UserProfile, DailySummary } from '../types/nutrition';

interface MealPlannerProps {
  profile: UserProfile | null;
  todaysSummary: DailySummary;
}

export default function MealPlanner({ profile, todaysSummary }: MealPlannerProps) {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedMeal, setSelectedMeal] = useState<'breakfast' | 'lunch' | 'dinner' | 'snacks'>('breakfast');

  const mealPlans = {
    breakfast: [
      {
        name: 'Protein Oats Bowl',
        calories: 320,
        protein: 18,
        time: '10 min',
        image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        ingredients: ['Oats', 'Protein powder', 'Banana', 'Almonds', 'Honey']
      },
      {
        name: 'Avocado Toast',
        calories: 280,
        protein: 12,
        time: '5 min',
        image: 'https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        ingredients: ['Whole grain bread', 'Avocado', 'Eggs', 'Tomato', 'Seasoning']
      }
    ],
    lunch: [
      {
        name: 'Quinoa Power Bowl',
        calories: 450,
        protein: 22,
        time: '15 min',
        image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        ingredients: ['Quinoa', 'Grilled chicken', 'Mixed vegetables', 'Tahini dressing']
      },
      {
        name: 'Mediterranean Salad',
        calories: 380,
        protein: 18,
        time: '10 min',
        image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        ingredients: ['Mixed greens', 'Feta cheese', 'Olives', 'Cucumber', 'Olive oil']
      }
    ],
    dinner: [
      {
        name: 'Grilled Salmon',
        calories: 420,
        protein: 35,
        time: '25 min',
        image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        ingredients: ['Salmon fillet', 'Asparagus', 'Sweet potato', 'Lemon', 'Herbs']
      },
      {
        name: 'Chicken Stir Fry',
        calories: 380,
        protein: 28,
        time: '20 min',
        image: 'https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        ingredients: ['Chicken breast', 'Mixed vegetables', 'Brown rice', 'Soy sauce', 'Ginger']
      }
    ],
    snacks: [
      {
        name: 'Greek Yogurt Parfait',
        calories: 180,
        protein: 15,
        time: '3 min',
        image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        ingredients: ['Greek yogurt', 'Berries', 'Granola', 'Honey']
      },
      {
        name: 'Protein Smoothie',
        calories: 220,
        protein: 20,
        time: '5 min',
        image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        ingredients: ['Protein powder', 'Banana', 'Spinach', 'Almond milk', 'Peanut butter']
      }
    ]
  };

  const mealTypes = [
    { id: 'breakfast', label: 'Breakfast', icon: '🌅' },
    { id: 'lunch', label: 'Lunch', icon: '☀️' },
    { id: 'dinner', label: 'Dinner', icon: '🌙' },
    { id: 'snacks', label: 'Snacks', icon: '🍎' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-gradient-to-r from-orange-500 to-red-600 p-3 rounded-xl">
            <Calendar className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Meal Planner</h2>
            <p className="text-gray-600">Plan your meals for optimal nutrition</p>
          </div>
        </div>

        {/* Date Selector */}
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700">Plan for:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
      </div>

      {/* Meal Type Selector */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Select Meal Type</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {mealTypes.map(meal => (
            <button
              key={meal.id}
              onClick={() => setSelectedMeal(meal.id as any)}
              className={`flex items-center space-x-3 p-4 rounded-xl font-medium transition-all duration-200 ${
                selectedMeal === meal.id
                  ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="text-2xl">{meal.icon}</span>
              <span>{meal.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Meal Options */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          {selectedMeal.charAt(0).toUpperCase() + selectedMeal.slice(1)} Options
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mealPlans[selectedMeal].map((meal, index) => (
            <div key={index} className="bg-gray-50/80 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group">
              <div className="relative">
                <img 
                  src={meal.image} 
                  alt={meal.name} 
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3 text-gray-600" />
                    <span className="text-sm font-medium text-gray-800">{meal.time}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h4 className="text-lg font-bold text-gray-900 mb-3">{meal.name}</h4>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-500">Calories</p>
                      <p className="font-semibold text-orange-600">{meal.calories}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-500">Protein</p>
                      <p className="font-semibold text-green-600">{meal.protein}g</p>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Ingredients:</p>
                  <div className="flex flex-wrap gap-2">
                    {meal.ingredients.map((ingredient, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-lg">
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 text-white py-2 px-4 rounded-lg font-medium hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2">
                    <Plus className="h-4 w-4" />
                    <span>Add to Plan</span>
                  </button>
                  <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors flex items-center justify-center">
                    <ChefHat className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Overview */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Weekly Meal Plan</h3>
        
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
            <div key={day} className="text-center">
              <p className="text-sm font-medium text-gray-700 mb-2">{day}</p>
              <div className="space-y-1">
                {['B', 'L', 'D'].map(meal => (
                  <div key={meal} className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-xs font-medium text-gray-500 hover:bg-orange-100 hover:text-orange-600 cursor-pointer transition-colors">
                    {meal}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button className="bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center space-x-2 mx-auto">
            <Target className="h-5 w-5" />
            <span>Generate Weekly Plan</span>
          </button>
        </div>
      </div>
    </div>
  );
}