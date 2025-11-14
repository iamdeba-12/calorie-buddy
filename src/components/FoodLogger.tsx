import React, { useState } from 'react';
import { Search, Plus, Trash2, Undo, CheckCircle, Camera, Mic, Sparkles } from 'lucide-react';
import { FoodItem, NutritionAnalysis } from '../types/nutrition';
import apiClient from '../utils/api';
import { saveFoodItem, removeFoodItem } from '../utils/storage';

interface FoodLoggerProps {
  onFoodAdded: () => void;
  todaysFood: FoodItem[];
}

export default function FoodLogger({ onFoodAdded, todaysFood }: FoodLoggerProps) {
  const [input, setInput] = useState('');
  const [analysis, setAnalysis] = useState<NutritionAnalysis[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [lastAction, setLastAction] = useState<{ type: 'add' | 'remove'; food: FoodItem } | null>(null);

  const handleAnalyze = () => {
    if (!input.trim()) return;
    
    setIsAnalyzing(true);
    
    // Use API for food analysis
    apiClient.analyzeFood(input)
      .then((response: any) => {
        if (response.success) {
          setAnalysis(response.data.analysis);
        } else {
          throw new Error(response.message);
        }
      })
      .catch((error) => {
        console.error('Food analysis error:', error);
        setAnalysis([]);
      })
      .finally(() => {
      setIsAnalyzing(false);
      });
  };

  const handleAddFood = async (analysisItem: NutritionAnalysis) => {
    const foodItem: FoodItem = {
      id: Date.now().toString(),
      name: analysisItem.food,
      calories: analysisItem.calories,
      protein: analysisItem.protein,
      fat: analysisItem.fat,
      carbs: analysisItem.carbs,
      quantity: 1,
      unit: 'serving',
      timestamp: new Date()
    };
    
    try {
      await saveFoodItem(foodItem);
      setLastAction({ type: 'add', food: foodItem });
      onFoodAdded();
      setInput('');
      setAnalysis([]);
    } catch (error) {
      console.error('Error adding food:', error);
      alert('Failed to add food item. Please try again.');
    }
  };

  const handleRemoveFood = async (foodId: string) => {
    const food = todaysFood.find(f => f.id === foodId);
    if (food) {
      try {
        await removeFoodItem(foodId);
        setLastAction({ type: 'remove', food });
        onFoodAdded();
      } catch (error) {
        console.error('Error removing food:', error);
        alert('Failed to remove food item. Please try again.');
      }
    }
  };

  const handleUndo = async () => {
    if (!lastAction) return;
    
    try {
      if (lastAction.type === 'add') {
        await removeFoodItem(lastAction.food.id);
      } else {
        await saveFoodItem(lastAction.food);
      }
      
      setLastAction(null);
      onFoodAdded();
    } catch (error) {
      console.error('Error undoing action:', error);
      alert('Failed to undo action. Please try again.');
    }
  };

  const totalCalories = todaysFood.reduce((sum, food) => sum + food.calories, 0);
  const totalProtein = todaysFood.reduce((sum, food) => sum + food.protein, 0);
  const totalFat = todaysFood.reduce((sum, food) => sum + food.fat, 0);
  const totalCarbs = todaysFood.reduce((sum, food) => sum + food.carbs, 0);

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-3 rounded-xl">
            <img 
              src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop" 
              alt="Food Logger" 
              className="w-6 h-6 object-cover rounded-lg"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Log Your Food</h2>
            <p className="text-gray-600">AI-powered food analysis and calorie tracking</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g., 2 roti, 1 omelette, 1 cup rice"
              className="w-full px-4 py-3 pl-12 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
              onKeyPress={(e) => e.key === 'Enter' && handleAnalyze()}
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={handleAnalyze}
              disabled={!input.trim() || isAnalyzing}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isAnalyzing ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  <span>Analyze Food</span>
                </>
              )}
            </button>
            
            <button
              className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
              title="Take Photo (Coming Soon)"
            >
              <Camera className="h-5 w-5" />
              <span>Photo</span>
            </button>
            
            <button
              className="bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
              title="Voice Input (Coming Soon)"
            >
              <Mic className="h-5 w-5" />
              <span>Voice</span>
            </button>
          </div>
        </div>
      </div>

      {/* Analysis Results */}
      {analysis.length > 0 && (
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Nutrition Analysis</h3>
          
          <div className="space-y-3">
            {analysis.map((item, index) => (
              <div key={index} className="bg-gray-50/80 rounded-xl p-4 flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-semibold text-gray-900 capitalize">{item.food}</h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      item.confidence > 0.8 ? 'bg-green-100 text-green-800' :
                      item.confidence > 0.5 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {Math.round(item.confidence * 100)}% confidence
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Calories</span>
                      <p className="font-semibold text-orange-600">{item.calories}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Protein</span>
                      <p className="font-semibold text-green-600">{item.protein}g</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Fat</span>
                      <p className="font-semibold text-blue-600">{item.fat}g</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Carbs</span>
                      <p className="font-semibold text-purple-600">{item.carbs}g</p>
                    </div>
                  </div>
                  
                  {item.suggestions.length > 0 && (
                    <div className="mt-2">
                      {item.suggestions.map((suggestion, idx) => (
                        <p key={idx} className="text-xs text-yellow-700 bg-yellow-50 px-2 py-1 rounded">
                          {suggestion}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
                
                <button
                  onClick={() => handleAddFood(item)}
                  className="ml-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white p-2 rounded-lg hover:shadow-lg transition-all duration-200"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Undo Action */}
      {lastAction && (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-5 w-5 text-blue-600" />
            <span className="text-blue-800">
              {lastAction.type === 'add' ? 'Added' : 'Removed'} "{lastAction.food.name}"
            </span>
          </div>
          <button
            onClick={handleUndo}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium"
          >
            <Undo className="h-4 w-4" />
            <span>Undo</span>
          </button>
        </div>
      )}

      {/* Today's Food Log */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Today's Food Log</h3>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">{totalCalories} cal</p>
            <p className="text-sm text-gray-500">
              P: {Math.round(totalProtein)}g | F: {Math.round(totalFat)}g | C: {Math.round(totalCarbs)}g
            </p>
          </div>
        </div>
        
        {todaysFood.length === 0 ? (
          <div className="text-center py-8">
            <div className="bg-gray-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
              <Plus className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-gray-500">No food logged today</p>
            <p className="text-sm text-gray-400 mt-1">Start by entering what you ate above</p>
          </div>
        ) : (
          <div className="space-y-3">
            {todaysFood.map((food) => (
              <div key={food.id} className="flex items-center justify-between py-3 px-4 bg-gray-50/80 rounded-xl hover:bg-gray-100/80 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-900">{food.name}</h4>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-bold text-orange-600">{food.calories} cal</p>
                        <p className="text-xs text-gray-500">
                          P: {Math.round(food.protein)}g | F: {Math.round(food.fat)}g | C: {Math.round(food.carbs)}g
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemoveFood(food.id)}
                        className="text-red-500 hover:text-red-700 transition-colors p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}