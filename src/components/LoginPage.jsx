import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ArrowRight, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import PasswordStrengthIndicator from './PasswordStrengthIndicator';

const LoginPage = () => {
  const navigate = useNavigate();
  const { toggleTheme, currentTheme } = useTheme();
  const { showToast } = useToast();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Validation functions
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!agreeToTerms) {
      newErrors.terms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      showToast('Please fix the errors in the form', 'error');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      showToast('Account created successfully! Welcome aboard! 🎉', 'success');
      // Navigate to welcome page with user data
      setTimeout(() => {
        navigate('/welcome', { state: { userData: formData } });
      }, 500);
    } catch (error) {
      console.error('Submission error:', error);
      showToast('Something went wrong. Please try again.', 'error');
      setIsLoading(false);
    }
  };

  const slides = [
    "Every Picture Tells a Story",
    "Moments That Matter",
    "Capturing Moments, Creating Memories"
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen bg-gradient-to-br ${currentTheme.bg} flex items-center justify-center p-4 md:p-8`}
    >
      {/* Theme Toggle in top right */}
      <div className="absolute top-6 right-6 md:top-8 md:right-8 z-50">
        <button
          onClick={toggleTheme}
          className="bg-white/10 backdrop-blur-md p-3 rounded-xl shadow-lg hover:bg-white/20 transition-all duration-300 transform hover:scale-105 border border-white/20"
          aria-label="Toggle theme"
        >
          {currentTheme.isDark ? (
            <Sun className="w-6 h-6 text-white" />
          ) : (
            <Moon className="w-6 h-6 text-gray-800" />
          )}
        </button>
      </div>

      {/* Main Container */}
      <div className="card-tilt w-full max-w-6xl bg-dark/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
          
          {/* Left Panel - Image Section */}
          <div className="relative p-8 lg:p-12 flex flex-col justify-between overflow-hidden" style={{ background: `linear-gradient(to bottom right, ${currentTheme.primarySolid}, ${currentTheme.primaryDark})` }}>
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-80"
              style={{ backgroundImage: 'url(/mountain-bg.png)' }}
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom right, ${currentTheme.primarySolid}99, ${currentTheme.primarySolid}66, ${currentTheme.primaryDark}99)` }} />

            {/* Content */}
            <div className="relative z-10">


              {/* Back to website link */}
              <button 
                className="absolute top-0 right-0 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm flex items-center gap-2 hover:bg-white/20 transition-all duration-300"
                aria-label="Back to website"
              >
                Back to website
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Tagline */}
            <div className="relative z-10 text-center mt-20">
              <h2 className="text-white text-3xl md:text-4xl font-light mb-8 transition-all duration-500">
                {slides[currentSlide]}
              </h2>

            </div>
          </div>

          {/* Right Panel - Form Section */}
          <div className={`p-8 lg:p-12 flex flex-col justify-center transition-all duration-500 ${!currentTheme.isDark ? 'bg-white' : ''}`} style={{ backgroundColor: currentTheme.isDark ? `${currentTheme.primarySolid}15` : undefined }}>
            <div className="max-w-md mx-auto w-full">
              {/* Header */}
              <div className="mb-8">
                <h1 className={`${currentTheme.textPrimary} text-3xl md:text-4xl font-black mb-2`}>
                  {isLogin ? 'Welcome back' : 'Create an account'}
                </h1>
                <p className={`${currentTheme.textSecondary} text-sm font-medium`}>
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <button 
                    type="button"
                    onClick={() => {
                      setIsLogin(!isLogin);
                      setErrors({});
                    }}
                    className="text-primary hover:text-primary-light transition-colors underline ml-1"
                    style={{ color: currentTheme.accent }}
                  >
                    {isLogin ? 'Sign up' : 'Log in'}
                  </button>
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Fields - Only for Sign Up */}
                {!isLogin && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="First name"
                        className={`input-glow w-full ${currentTheme.inputBg} ${currentTheme.inputText} placeholder-gray-500 px-4 py-3 rounded-lg border ${
                          errors.firstName 
                            ? 'border-red-500' 
                            : currentTheme.inputBorder
                        } focus:border-primary focus:outline-none transition-all duration-300 font-semibold`}
                        aria-label="First name"
                        aria-invalid={errors.firstName ? 'true' : 'false'}
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                      )}
                    </div>
                    <div>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Last name"
                        className={`input-glow w-full ${currentTheme.inputBg} ${currentTheme.inputText} placeholder-gray-500 px-4 py-3 rounded-lg border ${
                          errors.lastName 
                            ? 'border-red-500' 
                            : currentTheme.inputBorder
                        } focus:border-primary focus:outline-none transition-all duration-300 font-semibold`}
                        aria-label="Last name"
                        aria-invalid={errors.lastName ? 'true' : 'false'}
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Email Field */}
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    className={`input-glow w-full ${currentTheme.inputBg} ${currentTheme.inputText} placeholder-gray-500 px-4 py-3 rounded-lg border ${
                      errors.email 
                        ? 'border-red-500' 
                        : currentTheme.inputBorder
                    } focus:border-primary focus:outline-none transition-all duration-300 font-semibold`}
                    aria-label="Email address"
                    aria-invalid={errors.email ? 'true' : 'false'}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Password Field */}
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    className={`input-glow w-full ${currentTheme.inputBg} ${currentTheme.inputText} placeholder-gray-500 px-4 py-3 rounded-lg border ${
                      errors.password 
                        ? 'border-red-500' 
                        : currentTheme.inputBorder
                    } focus:border-primary focus:outline-none transition-all duration-300 pr-12 font-semibold`}
                    aria-label="Password"
                    aria-invalid={errors.password ? 'true' : 'false'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-all duration-300 transform hover:scale-110"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                  )}
                </div>
                
                {/* Password Strength Indicator */}
                <PasswordStrengthIndicator password={formData.password} />

                {/* Terms Checkbox */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreeToTerms}
                    onChange={(e) => {
                      setAgreeToTerms(e.target.checked);
                      if (errors.terms) {
                        setErrors(prev => ({ ...prev, terms: '' }));
                      }
                    }}
                    className={`mt-1 w-4 h-4 rounded ${currentTheme.inputBorder} ${currentTheme.inputBg} text-primary focus:ring-2 focus:ring-primary/50 focus:ring-offset-0 cursor-pointer`}
                    aria-label="Agree to terms and conditions"
                  />
                  <label htmlFor="terms" className={`${currentTheme.textSecondary} text-sm cursor-pointer font-medium`}>
                    I agree to the{' '}
                    <a 
                      href="#" 
                      className="transition-colors underline"
                      style={{ color: currentTheme.accent }}
                    >
                      Terms & Conditions
                    </a>
                  </label>
                </div>
                {errors.terms && (
                  <p className="text-red-500 text-xs">{errors.terms}</p>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full text-white font-black py-4 px-4 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                  style={{ 
                    background: `linear-gradient(to right, ${currentTheme.primarySolid}, ${currentTheme.primaryDark})`,
                    boxShadow: `0 10px 25px ${currentTheme.accent}33`
                  }}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle 
                          className="opacity-25" 
                          cx="12" 
                          cy="12" 
                          r="10" 
                          stroke="currentColor" 
                          strokeWidth="4"
                          fill="none"
                        />
                        <path 
                          className="opacity-75" 
                          fill="currentColor" 
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Creating account...
                    </span>
                  ) : (
                    'Create account'
                  )}
                </button>

                {/* Divider */}
                <div className="relative py-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-700" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className={`px-4 ${!currentTheme.isDark ? 'bg-white' : 'bg-dark-light'} ${currentTheme.textSecondary}`}>Or register with</span>
                  </div>
                </div>

                {/* Social Sign In Buttons */}
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    className={`flex items-center justify-center gap-2 ${currentTheme.inputBg} hover:${currentTheme.inputBg}/80 ${currentTheme.inputText} py-3 px-4 rounded-lg border ${currentTheme.inputBorder} hover:border-primary transition-all duration-300 transform hover:scale-105 font-bold`}
                    aria-label="Sign in with Google"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google
                  </button>

                  <button
                    type="button"
                    className={`flex items-center justify-center gap-2 ${currentTheme.inputBg} hover:${currentTheme.inputBg}/80 ${currentTheme.inputText} py-3 px-4 rounded-lg border ${currentTheme.inputBorder} hover:border-primary transition-all duration-300 transform hover:scale-105 font-bold`}
                    aria-label="Sign in with Apple"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                    </svg>
                    Apple
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginPage;
