import React from 'react';
import { TrendingUp, TrendingDown, Target, Calendar, Award } from 'lucide-react';
import { DailySummary } from '../types/nutrition';

interface SummaryProps {
  todaysSummary: DailySummary;
}

export default function Summary({ todaysSummary }: SummaryProps) {
  const calorieProgress = todaysSummary.targetCalories > 0 
    ? (todaysSummary.totalCalories / todaysSummary.targetCalories) * 100 
    : 0;

  const proteinProgress = todaysSummary.targetProtein > 0 
    ? (todaysSummary.totalProtein / todaysSummary.targetProtein) * 100 
    : 0;

  const fatProgress = todaysSummary.targetFat > 0 
    ? (todaysSummary.totalFat / todaysSummary.targetFat) * 100 
    : 0;

  const carbProgress = todaysSummary.targetCarbs > 0 
    ? (todaysSummary.totalCarbs / todaysSummary.targetCarbs) * 100 
    : 0;

  const macros = [
    {
      name: 'Protein',
      current: Math.round(todaysSummary.totalProtein),
      target: todaysSummary.targetProtein,
      unit: 'g',
      progress: proteinProgress,
      color: 'from-green-400 to-emerald-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      icon: TrendingUp
    },
    {
      name: 'Fat',
      current: Math.round(todaysSummary.totalFat),
      target: todaysSummary.targetFat,
      unit: 'g',
      progress: fatProgress,
      color: 'from-blue-400 to-cyan-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      icon: Target
    },
    {
      name: 'Carbs',
      current: Math.round(todaysSummary.totalCarbs),
      target: todaysSummary.targetCarbs,
      unit: 'g',
      progress: carbProgress,
      color: 'from-purple-400 to-pink-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      icon: Award
    }
  ];

  const getProgressStatus = (progress: number) => {
    if (progress < 80) return { status: 'Under Target', color: 'text-yellow-600', icon: TrendingDown };
    if (progress <= 120) return { status: 'On Target', color: 'text-green-600', icon: Target };
    return { status: 'Over Target', color: 'text-red-600', icon: TrendingUp };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
        <div className="flex items-center space-x-3 mb-4">
          <Calendar className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Daily Nutrition Summary</h2>
        </div>
        <p className="text-gray-600">
          {new Date(todaysSummary.date).toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      {/* Calorie Overview */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Calorie Overview</h3>
        
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-3xl font-bold text-gray-900">
                {todaysSummary.totalCalories}
                <span className="text-lg font-normal text-gray-500 ml-2">
                  / {todaysSummary.targetCalories} cal
                </span>
              </p>
              <p className={`text-sm font-medium ${getProgressStatus(calorieProgress).color}`}>
                {getProgressStatus(calorieProgress).status} ({Math.round(calorieProgress)}%)
              </p>
            </div>
            
            <div className="text-right">
              <p className="text-lg font-semibold text-gray-600">
                {todaysSummary.targetCalories - todaysSummary.totalCalories > 0 
                  ? `${todaysSummary.targetCalories - todaysSummary.totalCalories} remaining`
                  : `${todaysSummary.totalCalories - todaysSummary.targetCalories} over`
                }
              </p>
              <p className="text-sm text-gray-500">{todaysSummary.foods.length} foods logged</p>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
            <div 
              className="bg-gradient-to-r from-orange-400 to-red-500 h-4 rounded-full transition-all duration-1000"
              style={{ width: `${Math.min(calorieProgress, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Macronutrients Breakdown */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Macronutrients Breakdown</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {macros.map((macro) => {
            const Icon = macro.icon;
            const status = getProgressStatus(macro.progress);
            
            return (
              <div key={macro.name} className={`${macro.bgColor} rounded-xl p-4`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Icon className={`h-5 w-5 ${macro.textColor}`} />
                    <h4 className="font-semibold text-gray-900">{macro.name}</h4>
                  </div>
                  <span className={`text-sm font-medium ${status.color}`}>
                    {Math.round(macro.progress)}%
                  </span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-baseline space-x-1">
                    <span className="text-2xl font-bold text-gray-900">{macro.current}</span>
                    <span className="text-sm text-gray-500">/ {macro.target}{macro.unit}</span>
                  </div>
                  
                  <div className="w-full bg-white/70 rounded-full h-2">
                    <div 
                      className={`bg-gradient-to-r ${macro.color} h-2 rounded-full transition-all duration-1000`}
                      style={{ width: `${Math.min(macro.progress, 100)}%` }}
                    />
                  </div>
                  
                  <p className={`text-xs font-medium ${status.color}`}>
                    {status.status}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Meal Breakdown */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Food Items ({todaysSummary.foods.length})</h3>
        
        {todaysSummary.foods.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No food logged today</p>
            <p className="text-sm text-gray-400 mt-1">Start tracking to see detailed breakdown</p>
          </div>
        ) : (
          <div className="space-y-3">
            {todaysSummary.foods.map((food, index) => (
              <div key={food.id} className="bg-gray-50/80 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{food.name}</h4>
                      <p className="text-sm text-gray-500">
                        {new Date(food.timestamp).toLocaleTimeString('en-US', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-bold text-orange-600">{food.calories} cal</p>
                    <div className="flex space-x-3 text-xs text-gray-500">
                      <span>P: {Math.round(food.protein)}g</span>
                      <span>F: {Math.round(food.fat)}g</span>
                      <span>C: {Math.round(food.carbs)}g</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Insights */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Insights & Tips</h3>
        
        <div className="space-y-3">
          {calorieProgress < 80 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <TrendingDown className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="font-medium text-yellow-800">Calories Below Target</p>
                  <p className="text-sm text-yellow-700 mt-1">
                    You're {Math.round(todaysSummary.targetCalories - todaysSummary.totalCalories)} calories below your daily goal. 
                    Consider adding a healthy snack or increasing portion sizes.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {proteinProgress < 80 && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium text-green-800">Protein Intake Low</p>
                  <p className="text-sm text-green-700 mt-1">
                    Try adding lean meats, eggs, paneer, or dal to boost your protein intake.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {todaysSummary.foods.length >= 5 && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <Award className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-800">Great Tracking!</p>
                  <p className="text-sm text-blue-700 mt-1">
                    You've logged {todaysSummary.foods.length} food items today. Consistent tracking helps achieve better results!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}