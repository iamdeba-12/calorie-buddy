import React, { useState, useEffect } from 'react';
import AuthPage from './components/auth/AuthPage';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import FoodLogger from './components/FoodLogger';
import Summary from './components/Summary';
import Recommendations from './components/Recommendations';
import Profile from './components/Profile';
import MealPlanner from './components/MealPlanner';
import NutritionInsights from './components/NutritionInsights';
import { UserProfile, DailySummary } from './types/nutrition';
import { User, LoginCredentials, SignupCredentials } from './types/auth';
import { getUserProfile, getTodaysSummary, getTodaysFoodItems } from './utils/storage';
import { getCurrentUser, login, signup, logout } from './utils/auth';
import apiClient from './utils/api';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [todaysSummary, setTodaysSummary] = useState<DailySummary>({
    date: new Date().toDateString(),
    totalCalories: 0,
    totalProtein: 0,
    totalFat: 0,
    totalCarbs: 0,
    foods: [],
    targetCalories: 2000,
    targetProtein: 150,
    targetFat: 67,
    targetCarbs: 250
  });

  // Load data on component mount
  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      loadUserData();
    }
  }, []);

  const loadUserData = async () => {
    try {
      const userProfile = await getUserProfile();
      setProfile(userProfile);
      
      const summary = await getTodaysSummary(userProfile);
      setTodaysSummary(summary);
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleDataUpdate = () => {
    loadUserData();
  };

  const handleLogin = async (credentials: LoginCredentials) => {
    setIsAuthLoading(true);
    setAuthError(null);
    
    try {
      const loggedInUser = await login(credentials);
      setUser(loggedInUser);
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : 'Login failed');
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleSignup = async (credentials: SignupCredentials) => {
    setIsAuthLoading(true);
    setAuthError(null);
    
    try {
      const newUser = await signup(credentials);
      setUser(newUser);
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : 'Signup failed');
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    setProfile(null);
    setActiveTab('dashboard');
  };

  // Show auth page if user is not logged in
  if (!user) {
    return (
      <AuthPage
        onLogin={handleLogin}
        onSignup={handleSignup}
        isLoading={isAuthLoading}
        error={authError}
      />
    );
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard profile={profile} todaysSummary={todaysSummary} />;
      case 'food':
        return (
          <FoodLogger 
            onFoodAdded={handleDataUpdate} 
            todaysFood={todaysSummary.foods}
          />
        );
      case 'summary':
        return <Summary todaysSummary={todaysSummary} />;
      case 'recommendations':
        return <Recommendations profile={profile} todaysSummary={todaysSummary} />;
      case 'profile':
        return <Profile profile={profile} onProfileUpdate={handleDataUpdate} />;
      case 'meal-planner':
        return <MealPlanner profile={profile} todaysSummary={todaysSummary} />;
      case 'insights':
        return <NutritionInsights profile={profile} todaysSummary={todaysSummary} />;
      default:
        return <Dashboard profile={profile} todaysSummary={todaysSummary} />;
    }
  };

  return (
    <Layout 
      activeTab={activeTab} 
      onTabChange={handleTabChange}
      user={user}
      onLogout={handleLogout}
    >
      {renderActiveTab()}
    </Layout>
  );
}

export default App;