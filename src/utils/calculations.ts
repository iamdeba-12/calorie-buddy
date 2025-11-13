import { UserProfile } from '../types/nutrition';

export function calculateBMR(profile: UserProfile): number {
  const { weight, height, age, gender } = profile;
  
  // Mifflin-St Jeor Equation
  let bmr = (10 * weight) + (6.25 * height) - (5 * age);
  
  if (gender === 'male') {
    bmr += 5;
  } else if (gender === 'female') {
    bmr -= 161;
  }
  
  return Math.round(bmr);
}

export function calculateTDEE(profile: UserProfile): number {
  const bmr = calculateBMR(profile);
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9
  };
  
  return Math.round(bmr * activityMultipliers[profile.activityLevel]);
}

export function calculateDailyTargets(profile: UserProfile): {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
} {
  const tdee = calculateTDEE(profile);
  let calories = tdee;
  
  // Adjust based on fitness goal
  switch (profile.fitnessGoal) {
    case 'weight_loss':
      calories = Math.round(tdee * 0.8); // 20% deficit
      break;
    case 'muscle_gain':
      calories = Math.round(tdee * 1.15); // 15% surplus
      break;
    case 'athlete':
      calories = Math.round(tdee * 1.2); // 20% surplus
      break;
    case 'maintain':
    default:
      calories = tdee;
      break;
  }
  
  // Calculate macros (protein: 25%, fat: 30%, carbs: 45%)
  const protein = Math.round((calories * 0.25) / 4); // 4 cal per gram
  const fat = Math.round((calories * 0.30) / 9); // 9 cal per gram
  const carbs = Math.round((calories * 0.45) / 4); // 4 cal per gram
  
  return { calories, protein, fat, carbs };
}

export function calculateBMI(weight: number, height: number): {
  value: number;
  category: string;
  color: string;
} {
  const bmi = weight / Math.pow(height / 100, 2);
  
  let category = '';
  let color = '';
  
  if (bmi < 18.5) {
    category = 'Underweight';
    color = 'text-blue-600';
  } else if (bmi < 25) {
    category = 'Normal';
    color = 'text-green-600';
  } else if (bmi < 30) {
    category = 'Overweight';
    color = 'text-yellow-600';
  } else {
    category = 'Obese';
    color = 'text-red-600';
  }
  
  return {
    value: Math.round(bmi * 10) / 10,
    category,
    color
  };
}