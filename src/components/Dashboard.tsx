import React from 'react';
import { TrendingUp, Target, Zap, Award, Camera, Utensils, Clock, Star } from 'lucide-react';
import { UserProfile, DailySummary } from '../types/nutrition';

interface DashboardProps {
  profile: UserProfile | null;
  todaysSummary: DailySummary;
}

export default function Dashboard({ profile, todaysSummary }: DashboardProps) {
  const calorieProgress = todaysSummary.targetCalories > 0 
    ? (todaysSummary.totalCalories / todaysSummary.targetCalories) * 100 
    : 0;
  
  const proteinProgress = todaysSummary.targetProtein > 0 
    ? (todaysSummary.totalProtein / todaysSummary.targetProtein) * 100 
    : 0;

  const stats = [
    {
      label: 'Calories Today',
      value: `${todaysSummary.totalCalories}`,
      target: `/ ${todaysSummary.targetCalories}`,
      progress: Math.min(calorieProgress, 100),
      icon: Zap,
      color: 'from-orange-400 to-red-500'
    },
    {
      label: 'Protein',
      value: `${Math.round(todaysSummary.totalProtein)}g`,
      target: `/ ${todaysSummary.targetProtein}g`,
      progress: Math.min(proteinProgress, 100),
      icon: TrendingUp,
      color: 'from-green-400 to-emerald-500'
    },
    {
      label: 'Fat',
      value: `${Math.round(todaysSummary.totalFat)}g`,
      target: `/ ${todaysSummary.targetFat}g`,
      progress: Math.min((todaysSummary.totalFat / todaysSummary.targetFat) * 100, 100),
      icon: Target,
      color: 'from-blue-400 to-cyan-500'
    },
    {
      label: 'Carbs',
      value: `${Math.round(todaysSummary.totalCarbs)}g`,
      target: `/ ${todaysSummary.targetCarbs}g`,
      progress: Math.min((todaysSummary.totalCarbs / todaysSummary.targetCarbs) * 100, 100),
      icon: Award,
      color: 'from-purple-400 to-pink-500'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back{profile ? `, ${profile.name}` : ''}! 👋
            </h2>
            <p className="text-gray-600">
              {profile 
                ? `Your goal: ${profile.fitnessGoal.replace('_', ' ').toUpperCase()}`
                : 'Set up your profile to get personalized recommendations'
              }
            </p>
          </div>
          {profile && (
            <div className="bg-gradient-to-r from-green-500 to-blue-600 p-4 rounded-2xl text-white">
              <div className="text-center">
                <p className="text-sm opacity-90">Daily Goal</p>
                <p className="text-2xl font-bold">{profile.dailyCalorieTarget}</p>
                <p className="text-sm opacity-90">calories</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Food Images Gallery */}
        <div className="grid grid-cols-4 gap-3 mt-6">
          {[
            'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
            'https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
            'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
            'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop'
          ].map((src, index) => (
            <div key={index} className="relative group cursor-pointer">
              <img 
                src={src} 
                alt={`Food ${index + 1}`} 
                className="w-full h-16 object-cover rounded-xl group-hover:scale-105 transition-transform duration-200"
              />
              <div className="absolute inset-0 bg-black/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <Camera className="h-4 w-4 text-white" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className={`bg-gradient-to-r ${stat.color} p-3 rounded-xl`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <span className="text-sm text-gray-500">{Math.round(stat.progress)}%</span>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900">{stat.label}</h3>
                <div className="flex items-baseline space-x-1">
                  <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                  <span className="text-sm text-gray-500">{stat.target}</span>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`bg-gradient-to-r ${stat.color} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${stat.progress}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Food Items */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Today's Food Log</h3>
        
        {todaysSummary.foods.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-gray-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
              <Zap className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-gray-500 text-lg font-medium">No food logged today</p>
            <p className="text-gray-400 mt-1">Start tracking your meals to see insights</p>
          </div>
        ) : (
          <div className="space-y-3">
            {todaysSummary.foods.slice(-5).map((food, index) => (
              <div key={food.id} className="flex items-center justify-between py-3 px-4 bg-gray-50/80 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"></div>
                  <div>
                    <p className="font-medium text-gray-900">{food.name}</p>
                    <p className="text-sm text-gray-500">
                      {food.quantity} {food.unit}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{food.calories} cal</p>
                  <p className="text-xs text-gray-500">
                    P: {Math.round(food.protein)}g | F: {Math.round(food.fat)}g | C: {Math.round(food.carbs)}g
                  </p>
                </div>
              </div>
            ))}
            
            {todaysSummary.foods.length > 5 && (
              <p className="text-center text-sm text-gray-500 pt-2">
                + {todaysSummary.foods.length - 5} more items
              </p>
            )}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button 
            onClick={() => {/* Navigate to food logger */}}
            className="flex items-center space-x-3 p-4 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-xl hover:shadow-lg transition-all duration-200 group"
          >
            <Utensils className="h-5 w-5 group-hover:scale-110 transition-transform" />
            <span>Log Food</span>
          </button>
          <button 
            onClick={() => {/* Navigate to recommendations */}}
            className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-400 to-cyan-500 text-white rounded-xl hover:shadow-lg transition-all duration-200 group"
          >
            <Target className="h-5 w-5 group-hover:scale-110 transition-transform" />
            <span>Get Recommendations</span>
          </button>
          <button 
            onClick={() => {/* Navigate to summary */}}
            className="flex items-center space-x-3 p-4 bg-gradient-to-r from-purple-400 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all duration-200 group"
          >
            <Award className="h-5 w-5 group-hover:scale-110 transition-transform" />
            <span>View Summary</span>
          </button>
          <button 
            onClick={() => {/* Navigate to meal planner */}}
            className="flex items-center space-x-3 p-4 bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-xl hover:shadow-lg transition-all duration-200 group"
          >
            <Clock className="h-5 w-5 group-hover:scale-110 transition-transform" />
            <span>Meal Planner</span>
          </button>
        </div>
      </div>
      
      {/* Featured Recipes */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Featured Healthy Recipes</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              name: 'Quinoa Buddha Bowl',
              calories: 420,
              time: '15 min',
              image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
            },
            {
              name: 'Grilled Salmon Salad',
              calories: 350,
              time: '20 min',
              image: 'https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
            },
            {
              name: 'Protein Smoothie Bowl',
              calories: 280,
              time: '5 min',
              image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
            }
          ].map((recipe, index) => (
            <div key={index} className="bg-gray-50/80 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer">
              <div className="relative">
                <img 
                  src={recipe.image} 
                  alt={recipe.name} 
                  className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 text-yellow-500" />
                    <span className="text-xs font-medium">4.8</span>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-gray-900 mb-2">{recipe.name}</h4>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span className="flex items-center space-x-1">
                    <Zap className="h-3 w-3" />
                    <span>{recipe.calories} cal</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{recipe.time}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}