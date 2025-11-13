import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { LoginCredentials, SignupCredentials } from '../../types/auth';

interface AuthPageProps {
  onLogin: (credentials: LoginCredentials) => Promise<void>;
  onSignup: (credentials: SignupCredentials) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export default function AuthPage({ onLogin, onSignup, isLoading, error }: AuthPageProps) {
  const [isLoginMode, setIsLoginMode] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      {/* Background Food Images */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 rounded-full opacity-10">
          <img 
            src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop" 
            alt="Food" 
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="absolute top-32 right-20 w-16 h-16 rounded-full opacity-10">
          <img 
            src="https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop" 
            alt="Food" 
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="absolute bottom-20 left-20 w-24 h-24 rounded-full opacity-10">
          <img 
            src="https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop" 
            alt="Food" 
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="absolute bottom-32 right-10 w-18 h-18 rounded-full opacity-10">
          <img 
            src="https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop" 
            alt="Food" 
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
          {isLoginMode ? (
            <LoginForm
              onLogin={onLogin}
              onSwitchToSignup={() => setIsLoginMode(false)}
              isLoading={isLoading}
              error={error}
            />
          ) : (
            <SignupForm
              onSignup={onSignup}
              onSwitchToLogin={() => setIsLoginMode(true)}
              isLoading={isLoading}
              error={error}
            />
          )}
        </div>

        {/* Features Preview */}
        <div className="mt-8 text-center">
          <div className="grid grid-cols-3 gap-4 text-white/80">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
              <div className="w-8 h-8 mx-auto mb-2 rounded-lg overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop" 
                  alt="Track Food" 
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs font-medium">Track Food</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
              <div className="w-8 h-8 mx-auto mb-2 rounded-lg overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop" 
                  alt="Get Recommendations" 
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs font-medium">Get Recommendations</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
              <div className="w-8 h-8 mx-auto mb-2 rounded-lg overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop" 
                  alt="Achieve Goals" 
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs font-medium">Achieve Goals</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}