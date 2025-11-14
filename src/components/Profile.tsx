import React, { useState } from 'react';
import { User, Save, Calculator, Target, Activity } from 'lucide-react';
import { UserProfile } from '../types/nutrition';
import { calculateBMI, calculateDailyTargets } from '../utils/calculations';
import { saveUserProfile } from '../utils/storage';

interface ProfileProps {
  profile: UserProfile | null;
  onProfileUpdate: () => void;
}

export default function Profile({ profile, onProfileUpdate }: ProfileProps) {
  const [formData, setFormData] = useState<Partial<UserProfile>>(profile || {
    name: '',
    email: '',
    age: 25,
    weight: 70,
    height: 170,
    gender: 'male',
    activityLevel: 'moderate',
    fitnessGoal: 'maintain'
  });

  const [isEditing, setIsEditing] = useState(!profile);

  const handleInputChange = (field: keyof UserProfile, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!formData.name || !formData.email || !formData.age || !formData.weight || !formData.height) {
      alert('Please fill in all required fields');
      return;
    }

    const targets = calculateDailyTargets(formData as UserProfile);
    
    const updatedProfile: UserProfile = {
      id: profile?.id || Date.now().toString(),
      name: formData.name!,
      email: formData.email!,
      age: formData.age!,
      weight: formData.weight!,
      height: formData.height!,
      gender: formData.gender!,
      activityLevel: formData.activityLevel!,
      fitnessGoal: formData.fitnessGoal!,
      dailyCalorieTarget: targets.calories,
      proteinTarget: targets.protein,
      fatTarget: targets.fat,
      carbTarget: targets.carbs,
      createdAt: profile?.createdAt || new Date()
    };

    try {
      await saveUserProfile(updatedProfile);
      setIsEditing(false);
      onProfileUpdate();
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Failed to save profile. Please try again.');
    }
  };

  const bmi = formData.weight && formData.height 
    ? calculateBMI(formData.weight, formData.height) 
    : null;

  const targets = formData.age && formData.weight && formData.height 
    ? calculateDailyTargets(formData as UserProfile)
    : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-green-500 to-blue-600 p-3 rounded-xl">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Your Profile</h2>
              <p className="text-gray-600">Manage your personal information and fitness goals</p>
            </div>
          </div>
          
          {profile && !isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Personal Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
            <input
              type="text"
              value={formData.name || ''}
              onChange={(e) => handleInputChange('name', e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
              placeholder="Enter your name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
            <input
              type="email"
              value={formData.email || ''}
              onChange={(e) => handleInputChange('email', e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
              placeholder="Enter your email"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Age *</label>
            <input
              type="number"
              value={formData.age || ''}
              onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
              disabled={!isEditing}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
              placeholder="Enter your age"
              min="15"
              max="100"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
            <select
              value={formData.gender || ''}
              onChange={(e) => handleInputChange('gender', e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </div>

      {/* Physical Information */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Physical Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg) *</label>
            <input
              type="number"
              value={formData.weight || ''}
              onChange={(e) => handleInputChange('weight', parseFloat(e.target.value))}
              disabled={!isEditing}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
              placeholder="Enter your weight"
              min="30"
              max="200"
              step="0.1"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm) *</label>
            <input
              type="number"
              value={formData.height || ''}
              onChange={(e) => handleInputChange('height', parseFloat(e.target.value))}
              disabled={!isEditing}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
              placeholder="Enter your height"
              min="100"
              max="250"
            />
          </div>
        </div>

        {/* BMI Display */}
        {bmi && (
          <div className="mt-6 bg-gray-50/80 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <Calculator className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium text-gray-900">Body Mass Index (BMI)</p>
                <p className={`text-lg font-bold ${bmi.color}`}>
                  {bmi.value} - {bmi.category}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Activity & Goals */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Activity & Goals</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Activity Level</label>
            <select
              value={formData.activityLevel || ''}
              onChange={(e) => handleInputChange('activityLevel', e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
            >
              <option value="sedentary">Sedentary (Office job, minimal exercise)</option>
              <option value="light">Light (Light exercise 1-3 days/week)</option>
              <option value="moderate">Moderate (Exercise 3-5 days/week)</option>
              <option value="active">Active (Exercise 6-7 days/week)</option>
              <option value="very_active">Very Active (2x/day or intense exercise)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Fitness Goal</label>
            <select
              value={formData.fitnessGoal || ''}
              onChange={(e) => handleInputChange('fitnessGoal', e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
            >
              <option value="weight_loss">Weight Loss</option>
              <option value="muscle_gain">Muscle Gain</option>
              <option value="maintain">Maintain Weight</option>
              <option value="athlete">Athletic Performance</option>
            </select>
          </div>
        </div>
      </div>

      {/* Calculated Targets */}
      {targets && (
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Your Daily Targets</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-orange-50 rounded-xl p-4 text-center">
              <Target className="h-6 w-6 text-orange-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Calories</p>
              <p className="text-2xl font-bold text-orange-600">{targets.calories}</p>
            </div>
            
            <div className="bg-green-50 rounded-xl p-4 text-center">
              <Activity className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Protein</p>
              <p className="text-2xl font-bold text-green-600">{targets.protein}g</p>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <Target className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Fat</p>
              <p className="text-2xl font-bold text-blue-600">{targets.fat}g</p>
            </div>
            
            <div className="bg-purple-50 rounded-xl p-4 text-center">
              <Activity className="h-6 w-6 text-purple-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Carbs</p>
              <p className="text-2xl font-bold text-purple-600">{targets.carbs}g</p>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {isEditing && (
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
          <div className="flex space-x-4">
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
            >
              <Save className="h-5 w-5" />
              <span>Save Profile</span>
            </button>
            
            {profile && (
              <button
                onClick={() => {
                  setFormData(profile);
                  setIsEditing(false);
                }}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}