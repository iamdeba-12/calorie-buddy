import React, { useState } from 'react';
import { Target, Clock, ChefHat, Zap, Star, Coffee, Sun, Moon } from 'lucide-react';
import { UserProfile, DailySummary, MealRecommendation } from '../types/nutrition';
import { getMealRecommendations } from '../data/recommendations';

interface RecommendationsProps {
  profile: UserProfile | null;
  todaysSummary: DailySummary;
}

export default function Recommendations({ profile, todaysSummary }: RecommendationsProps) {
  const [selectedMealType, setSelectedMealType] = useState<'breakfast' | 'lunch' | 'dinner'>('lunch');
  
  if (!profile) {
    return (
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 text-center">
        <Target className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Set Up Your Profile</h2>
        <p className="text-gray-600 mb-6">
          To get personalized meal recommendations, please complete your profile with your fitness goals and preferences.
        </p>
        <button className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200">
          Complete Profile
        </button>
      </div>
    );
  }

  const recommendations = getMealRecommendations(profile, selectedMealType, todaysSummary.totalCalories);
  
  const mealTypes = [
    { id: 'breakfast', label: 'Breakfast', icon: Coffee },
    { id: 'lunch', label: 'Lunch', icon: Sun },
    { id: 'dinner', label: 'Dinner', icon: Moon }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getGoalAdvice = () => {
    const remaining = profile.dailyCalorieTarget - todaysSummary.totalCalories;
    
    switch (profile.fitnessGoal) {
      case 'weight_loss':
        return {
          title: 'Weight Loss Focus',
          advice: remaining > 0 
            ? `You have ${remaining} calories remaining. Choose lean proteins and vegetables.`
            : 'You\'ve reached your calorie limit. Focus on hydration and light activities.',
          color: 'from-red-400 to-pink-500'
        };
      case 'muscle_gain':
        return {
          title: 'Muscle Building Focus',
          advice: remaining > 0 
            ? `You need ${remaining} more calories. Focus on protein-rich meals and complex carbs.`
            : 'Great! You\'ve met your calorie goal. Focus on post-workout nutrition.',
          color: 'from-green-400 to-emerald-500'
        };
      case 'athlete':
        return {
          title: 'Athletic Performance',
          advice: remaining > 0 
            ? `${remaining} calories remaining. Time for high-energy, nutrient-dense foods.`
            : 'Excellent fueling! Focus on recovery nutrition and hydration.',
          color: 'from-blue-400 to-cyan-500'
        };
      default:
        return {
          title: 'Maintenance Focus',
          advice: remaining > 0 
            ? `${remaining} calories left for balanced nutrition.`
            : 'You\'ve reached your maintenance goal. Great work!',
          color: 'from-purple-400 to-pink-500'
        };
    }
  };

  const goalAdvice = getGoalAdvice();

  return (
    <div className="space-y-6">
      {/* Header with Goal Status */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
        <div className="flex items-center space-x-4 mb-4">
          <div className={`bg-gradient-to-r ${goalAdvice.color} p-3 rounded-xl`}>
            <Target className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Meal Recommendations</h2>
            <p className="text-gray-600">{goalAdvice.title}</p>
          </div>
        </div>
        
        <div className="bg-gray-50/80 rounded-xl p-4">
          <p className="text-gray-700 font-medium">{goalAdvice.advice}</p>
          <div className="flex items-center space-x-6 mt-3 text-sm text-gray-600">
            <span>Target: {profile.dailyCalorieTarget} cal</span>
            <span>Consumed: {todaysSummary.totalCalories} cal</span>
            <span>Goal: {profile.fitnessGoal.replace('_', ' ').toUpperCase()}</span>
          </div>
        </div>
      </div>

      {/* Meal Type Selection */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Choose Meal Type</h3>
        
        <div className="flex space-x-2">
          {mealTypes.map(meal => {
            const Icon = meal.icon;
            return (
              <button
                key={meal.id}
                onClick={() => setSelectedMealType(meal.id as any)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                  selectedMealType === meal.id
                    ? 'bg-gradient-to-r from-green-500 to-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{meal.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          Recommended {selectedMealType.charAt(0).toUpperCase() + selectedMealType.slice(1)} Options
        </h3>
        
        {recommendations.length === 0 ? (
          <div className="text-center py-8">
            <ChefHat className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No recommendations available</p>
            <p className="text-sm text-gray-400 mt-1">
              Try adjusting your daily intake or check back later for personalized suggestions
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendations.map((meal) => (
              <div key={meal.id} className="bg-gray-50/80 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">{meal.name}</h4>
                    <p className="text-gray-600 text-sm">{meal.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="bg-orange-100 text-orange-800 px-2 py-1 rounded-lg text-sm font-semibold">
                      {meal.calories} cal
                    </div>
                  </div>
                </div>
                
                {/* Macros */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Protein</p>
                    <p className="font-semibold text-green-600">{meal.protein}g</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Fat</p>
                    <p className="font-semibold text-blue-600">{meal.fat}g</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Carbs</p>
                    <p className="font-semibold text-purple-600">{meal.carbs}g</p>
                  </div>
                </div>
                
                {/* Details */}
                <div className="space-y-3 mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Ingredients:</p>
                    <p className="text-sm text-gray-600">{meal.ingredients.join(', ')}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Cooking Method:</p>
                    <p className="text-sm text-gray-600">{meal.cookingMethod}</p>
                  </div>
                </div>
                
                {/* Meta Info */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{meal.prepTime} min</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(meal.difficulty)}`}>
                      {meal.difficulty}
                    </span>
                  </div>
                  
                  <button className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-200">
                    <Star className="h-4 w-4" />
                    <span>Save Recipe</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* General Tips */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Nutrition Tips for Your Goal</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {profile.fitnessGoal === 'weight_loss' && (
            <>
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Zap className="h-4 w-4 text-red-600" />
                  <p className="font-medium text-red-800">Cooking Methods</p>
                </div>
                <p className="text-sm text-red-700">
                  Choose grilling, steaming, or air frying over deep frying to reduce calories while maintaining taste.
                </p>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Target className="h-4 w-4 text-green-600" />
                  <p className="font-medium text-green-800">Portion Control</p>
                </div>
                <p className="text-sm text-green-700">
                  Fill half your plate with vegetables, quarter with lean protein, and quarter with complex carbs.
                </p>
              </div>
            </>
          )}
          
          {profile.fitnessGoal === 'muscle_gain' && (
            <>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Zap className="h-4 w-4 text-blue-600" />
                  <p className="font-medium text-blue-800">Post-Workout Nutrition</p>
                </div>
                <p className="text-sm text-blue-700">
                  Consume protein within 30 minutes of your workout for optimal muscle recovery and growth.
                </p>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Target className="h-4 w-4 text-green-600" />
                  <p className="font-medium text-green-800">Protein Distribution</p>
                </div>
                <p className="text-sm text-green-700">
                  Spread protein intake throughout the day. Aim for 20-30g of protein per meal for better absorption.
                </p>
              </div>
            </>
          )}
          
          {profile.fitnessGoal === 'maintain' && (
            <>
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Zap className="h-4 w-4 text-purple-600" />
                  <p className="font-medium text-purple-800">Balanced Approach</p>
                </div>
                <p className="text-sm text-purple-700">
                  Focus on balanced meals with a variety of nutrients to maintain your current health status.
                </p>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Target className="h-4 w-4 text-yellow-600" />
                  <p className="font-medium text-yellow-800">Consistency is Key</p>
                </div>
                <p className="text-sm text-yellow-700">
                  Maintain regular meal times and portion sizes to keep your metabolism steady.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}