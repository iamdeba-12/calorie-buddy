import { UserProfile, FoodItem, DailySummary } from '../types/nutrition';
import apiClient from './api';

// User Profile Storage - now uses API
export async function saveUserProfile(profile: UserProfile): Promise<void> {
  try {
    await apiClient.updateProfile(profile);
  } catch (error) {
    console.error('Error saving profile:', error);
    throw error;
  }
}

export async function getUserProfile(): Promise<UserProfile | null> {
  try {
    const response: any = await apiClient.getCurrentUser();
    if (response.success && response.data.user.profile) {
      return response.data.user.profile;
    }
    return null;
  } catch (error) {
    console.error('Error getting profile:', error);
    return null;
  }
}

// Food Log Storage - now uses API
export async function saveFoodItem(foodItem: Omit<FoodItem, 'id' | 'timestamp'>): Promise<void> {
  try {
    await apiClient.logFood({
      ...foodItem,
      date: new Date()
    });
  } catch (error) {
    console.error('Error saving food item:', error);
    throw error;
  }
}

export async function getFoodLog(): Promise<FoodItem[]> {
  try {
    const response: any = await apiClient.getFoodHistory();
    if (response.success) {
      return response.data.foodItems.map((item: any) => ({
        ...item,
        timestamp: new Date(item.createdAt)
      }));
    }
    return [];
  } catch (error) {
    console.error('Error getting food log:', error);
    return [];
  }
}

export async function removeFoodItem(foodId: string): Promise<void> {
  try {
    await apiClient.deleteFood(foodId);
  } catch (error) {
    console.error('Error removing food item:', error);
    throw error;
  }
}

export async function getTodaysFoodItems(): Promise<FoodItem[]> {
  try {
    const response: any = await apiClient.getTodaysFood();
    if (response.success) {
      return response.data.foodItems.map((item: any) => ({
        ...item,
        timestamp: new Date(item.createdAt)
      }));
    }
    return [];
  } catch (error) {
    console.error('Error getting today\'s food items:', error);
    return [];
  }
}

// Daily Summary Storage - now uses API
export async function getTodaysSummary(profile: UserProfile | null): Promise<DailySummary> {
  try {
    const response: any = await apiClient.getTodaysFood();
    if (response.success) {
      const { foodItems, summary } = response.data;
      
      return {
        date: summary.date,
        foods: foodItems.map((item: any) => ({
          ...item,
          timestamp: new Date(item.createdAt)
        })),
        totalCalories: summary.totalCalories,
        totalProtein: summary.totalProtein,
        totalFat: summary.totalFat,
        totalCarbs: summary.totalCarbs,
        targetCalories: summary.targetCalories,
        targetProtein: summary.targetProtein,
        targetFat: summary.targetFat,
        targetCarbs: summary.targetCarbs
      };
    }
    
    // Fallback to empty summary
    return {
      date: new Date().toDateString(),
      foods: [],
      totalCalories: 0,
      totalProtein: 0,
      totalFat: 0,
      totalCarbs: 0,
      targetCalories: profile?.dailyCalorieTarget || 2000,
      targetProtein: profile?.proteinTarget || 150,
      targetFat: profile?.fatTarget || 67,
      targetCarbs: profile?.carbTarget || 250
    };
  } catch (error) {
    console.error('Error getting today\'s summary:', error);
    // Return fallback summary
    return {
      date: new Date().toDateString(),
      foods: [],
      totalCalories: 0,
      totalProtein: 0,
      totalFat: 0,
      totalCarbs: 0,
      targetCalories: profile?.dailyCalorieTarget || 2000,
      targetProtein: profile?.proteinTarget || 150,
      targetFat: profile?.fatTarget || 67,
      targetCarbs: profile?.carbTarget || 250
    };
  }
}

// Get weekly summary
export async function getWeeklySummary(): Promise<DailySummary[]> {
  try {
    const response: any = await apiClient.getWeeklySummary();
    if (response.success) {
      return response.data.weeklyData;
    }
    return [];
  } catch (error) {
    console.error('Error getting weekly summary:', error);
    return [];
  }
}