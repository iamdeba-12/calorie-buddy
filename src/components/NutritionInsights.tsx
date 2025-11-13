import React from 'react';
import { TrendingUp, TrendingDown, AlertCircle, CheckCircle, Target, Zap } from 'lucide-react';
import { UserProfile, DailySummary } from '../types/nutrition';

interface NutritionInsightsProps {
  profile: UserProfile | null;
  todaysSummary: DailySummary;
  weeklyData?: DailySummary[];
}

export default function NutritionInsights({ profile, todaysSummary, weeklyData = [] }: NutritionInsightsProps) {
  if (!profile) {
    return (
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 text-center">
        <AlertCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Complete Your Profile</h2>
        <p className="text-gray-600">Set up your profile to get personalized nutrition insights</p>
      </div>
    );
  }

  const calorieProgress = (todaysSummary.totalCalories / todaysSummary.targetCalories) * 100;
  const proteinProgress = (todaysSummary.totalProtein / todaysSummary.targetProtein) * 100;

  const insights = [
    {
      type: 'success',
      icon: CheckCircle,
      title: 'Great Protein Intake!',
      description: `You've consumed ${Math.round(todaysSummary.totalProtein)}g of protein today, which is ${Math.round(proteinProgress)}% of your target.`,
      visible: proteinProgress >= 80
    },
    {
      type: 'warning',
      icon: AlertCircle,
      title: 'Low Protein Intake',
      description: `You need ${Math.round(todaysSummary.targetProtein - todaysSummary.totalProtein)}g more protein to reach your daily goal.`,
      visible: proteinProgress < 80
    },
    {
      type: 'info',
      icon: TrendingUp,
      title: 'Calorie Balance',
      description: calorieProgress > 100 
        ? `You're ${Math.round(todaysSummary.totalCalories - todaysSummary.targetCalories)} calories over your target.`
        : `You have ${Math.round(todaysSummary.targetCalories - todaysSummary.totalCalories)} calories remaining for today.`,
      visible: true
    },
    {
      type: 'success',
      icon: Target,
      title: 'On Track!',
      description: 'Your nutrition is well-balanced for your fitness goals.',
      visible: calorieProgress >= 90 && calorieProgress <= 110 && proteinProgress >= 80
    }
  ].filter(insight => insight.visible);

  const weeklyAverage = weeklyData.length > 0 
    ? weeklyData.reduce((sum, day) => sum + day.totalCalories, 0) / weeklyData.length
    : todaysSummary.totalCalories;

  const trends = [
    {
      label: 'Weekly Average Calories',
      value: Math.round(weeklyAverage),
      target: profile.dailyCalorieTarget,
      trend: weeklyAverage > profile.dailyCalorieTarget ? 'up' : 'down',
      color: 'text-orange-600'
    },
    {
      label: 'Protein Consistency',
      value: `${Math.round(proteinProgress)}%`,
      target: '100%',
      trend: proteinProgress >= 80 ? 'up' : 'down',
      color: 'text-green-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-3 rounded-xl">
            <Zap className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Nutrition Insights</h2>
            <p className="text-gray-600">AI-powered analysis of your nutrition patterns</p>
          </div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Today's Insights</h3>
        
        <div className="space-y-4">
          {insights.map((insight, index) => {
            const Icon = insight.icon;
            const colors = {
              success: 'bg-green-50 border-green-200 text-green-800',
              warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
              info: 'bg-blue-50 border-blue-200 text-blue-800',
              error: 'bg-red-50 border-red-200 text-red-800'
            };

            return (
              <div key={index} className={`border rounded-xl p-4 ${colors[insight.type as keyof typeof colors]}`}>
                <div className="flex items-start space-x-3">
                  <Icon className="h-5 w-5 mt-0.5" />
                  <div>
                    <h4 className="font-semibold mb-1">{insight.title}</h4>
                    <p className="text-sm opacity-90">{insight.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Trends */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Nutrition Trends</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trends.map((trend, index) => (
            <div key={index} className="bg-gray-50/80 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900">{trend.label}</h4>
                {trend.trend === 'up' ? (
                  <TrendingUp className="h-5 w-5 text-green-600" />
                ) : (
                  <TrendingDown className="h-5 w-5 text-red-600" />
                )}
              </div>
              <div className="flex items-baseline space-x-2">
                <span className={`text-2xl font-bold ${trend.color}`}>{trend.value}</span>
                <span className="text-sm text-gray-500">/ {trend.target}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Personalized Recommendations</h3>
        
        <div className="space-y-4">
          {profile.fitnessGoal === 'weight_loss' && calorieProgress > 100 && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <h4 className="font-semibold text-red-800 mb-2">Calorie Management</h4>
              <p className="text-sm text-red-700">
                Consider reducing portion sizes or choosing lower-calorie alternatives for your next meal.
              </p>
            </div>
          )}
          
          {proteinProgress < 80 && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <h4 className="font-semibold text-green-800 mb-2">Boost Your Protein</h4>
              <p className="text-sm text-green-700">
                Add lean meats, eggs, Greek yogurt, or protein powder to reach your daily protein goal.
              </p>
            </div>
          )}
          
          {todaysSummary.foods.length < 3 && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <h4 className="font-semibold text-blue-800 mb-2">Meal Frequency</h4>
              <p className="text-sm text-blue-700">
                Consider eating more frequent, smaller meals to maintain steady energy levels throughout the day.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Food Quality Score */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Food Quality Score</h3>
        
        <div className="text-center">
          <div className="relative w-32 h-32 mx-auto mb-4">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#10b981"
                strokeWidth="3"
                strokeDasharray="75, 100"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-900">75</span>
            </div>
          </div>
          <p className="text-lg font-semibold text-gray-900 mb-2">Good Quality</p>
          <p className="text-sm text-gray-600">
            Your food choices today include a good balance of nutrients. Keep it up!
          </p>
        </div>
      </div>
    </div>
  );
}