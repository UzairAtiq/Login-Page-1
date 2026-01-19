import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, User, Mail, Lock, LogOut, Edit, Moon, Sun, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import { WelcomePageSkeleton } from './LoadingSkeleton';
import backgroundImage from '../assets/New Message Image.jpg';

const WelcomePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userData = location.state?.userData;
  const { toggleTheme, currentTheme } = useTheme();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  const [showPassword, setShowPassword] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  
  const [editedData, setEditedData] = useState({
    firstName: userData?.firstName || '',
    lastName: userData?.lastName || '',
    email: userData?.email || '',
  });

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Redirect if no user data
  if (!userData) {
    navigate('/');
    return null;
  }

  // Show loading skeleton
  if (isLoading) {
    return <WelcomePageSkeleton />;
  }

  const maskPassword = (password) => {
    return '•'.repeat(password.length);
  };

  const handleLogout = () => {
    showToast('Logged out successfully. See you soon!', 'info');
    setTimeout(() => {
      navigate('/');
    }, 500);
  };

  const handleSaveProfile = () => {
    // Update the userData with edited values
    Object.assign(userData, editedData);
    showToast('Profile updated successfully!', 'success');
    setShowEditModal(false);
  };



  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen relative flex flex-col items-center justify-center p-4 md:p-8"
    >
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="absolute inset-0 bg-black/70" />
      
      {/* Logout Button - Centered at top */}
      <div className="w-full max-w-2xl mb-6 flex justify-center relative z-10">
        <button
          onClick={handleLogout}
          className={`flex items-center gap-2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl font-bold border border-white/20 shadow-lg`}
        >
          <LogOut className="w-5 h-5" />
          Log Out
        </button>
      </div>

      {/* Animated Background Circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 left-20 w-72 h-72 bg-${currentTheme.shadow} rounded-full blur-3xl animate-pulse`} style={{ backgroundColor: `${currentTheme.accent}33` }} />
        <div className={`absolute bottom-20 right-20 w-96 h-96 bg-${currentTheme.shadow} rounded-full blur-3xl animate-pulse delay-1000`} style={{ backgroundColor: `${currentTheme.accent}26` }} />
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-${currentTheme.shadow} rounded-full blur-3xl animate-pulse delay-500`} style={{ backgroundColor: `${currentTheme.accent}1A` }} />
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        {/* Main Card */}
        <div className="card-tilt bg-dark/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border border-white/10">
          {/* Welcome Header */}
          <div className="text-center mb-12">
            <div className={`inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br ${currentTheme.primary} rounded-full mb-6 shadow-lg transform hover:scale-110 transition-transform duration-300`}>
              <User className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-3 tracking-tight">
              Hello, {userData.firstName}! 👋
            </h1>
            <p className="text-gray-400 text-lg font-medium">
              Welcome to your personalized dashboard
            </p>
          </div>

          {/* User Details Cards */}
          <div className="space-y-4">
            {/* Full Name Card */}
            <div className="welcome-card-tilt bg-dark-lighter/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-white/20 transition-all duration-300 group">
              <div className="flex items-center gap-4">
                <div className={`flex items-center justify-center w-12 h-12 rounded-xl group-hover:opacity-80 transition-colors`} style={{ backgroundColor: `${currentTheme.accent}33` }}>
                  <User className="w-6 h-6" style={{ color: currentTheme.accent }} />
                </div>
                <div className="flex-1">
                  <p className="text-gray-400 text-sm font-semibold mb-1">Full Name</p>
                  <p className="text-white text-xl font-bold">
                    {userData.firstName} {userData.lastName}
                  </p>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="welcome-card-tilt bg-dark-lighter/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-white/20 transition-all duration-300 group">
              <div className="flex items-center gap-4">
                <div className={`flex items-center justify-center w-12 h-12 rounded-xl group-hover:opacity-80 transition-colors`} style={{ backgroundColor: `${currentTheme.accent}33` }}>
                  <Mail className="w-6 h-6" style={{ color: currentTheme.accent }} />
                </div>
                <div className="flex-1">
                  <p className="text-gray-400 text-sm font-semibold mb-1">Email Address</p>
                  <p className="text-white text-xl font-bold break-all">
                    {userData.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Password Card */}
            <div className="welcome-card-tilt bg-dark-lighter/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-white/20 transition-all duration-300 group">
              <div className="flex items-center gap-4">
                <div className={`flex items-center justify-center w-12 h-12 rounded-xl group-hover:opacity-80 transition-colors`} style={{ backgroundColor: `${currentTheme.accent}33` }}>
                  <Lock className="w-6 h-6" style={{ color: currentTheme.accent }} />
                </div>
                <div className="flex-1">
                  <p className="text-gray-400 text-sm font-semibold mb-1">Password</p>
                  <div className="flex items-center gap-3">
                    <p className="text-white text-xl font-bold tracking-wider">
                      {showPassword ? userData.password : maskPassword(userData.password)}
                    </p>
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-all duration-300 text-gray-400 transform hover:scale-110"
                      style={{ color: showPassword ? currentTheme.accent : undefined }}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <button 
              onClick={() => setShowEditModal(true)}
              className={`bg-gradient-to-r ${currentTheme.primary} text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2`}
              style={{ boxShadow: `0 10px 25px ${currentTheme.accent}33` }}
            >
              <Edit className="w-5 h-5" />
              Edit Profile
            </button>
            <button 
              onClick={toggleTheme}
              className="bg-dark-lighter hover:bg-dark-lighter/80 text-white font-bold py-4 px-6 rounded-xl border border-gray-700 hover:border-white/30 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              {currentTheme.isDark ? (
                <>
                  <Sun className="w-5 h-5" />
                  Switch to Light
                </>
              ) : (
                <>
                  <Moon className="w-5 h-5" />
                  Switch to Dark
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
          <div className="bg-dark/95 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full border border-white/20 shadow-2xl transform animate-in zoom-in duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-white flex items-center gap-2">
                <Edit className="w-6 h-6" style={{ color: currentTheme.accent }} />
                Edit Profile
              </h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm font-semibold mb-2 block">First Name</label>
                <input
                  type="text"
                  value={editedData.firstName}
                  onChange={(e) => setEditedData({...editedData, firstName: e.target.value})}
                  className="w-full bg-dark-lighter text-white px-4 py-3 rounded-xl border border-gray-700 focus:border-white/30 focus:outline-none font-semibold transition-all"
                />
              </div>
              
              <div>
                <label className="text-gray-400 text-sm font-semibold mb-2 block">Last Name</label>
                <input
                  type="text"
                  value={editedData.lastName}
                  onChange={(e) => setEditedData({...editedData, lastName: e.target.value})}
                  className="w-full bg-dark-lighter text-white px-4 py-3 rounded-xl border border-gray-700 focus:border-white/30 focus:outline-none font-semibold transition-all"
                />
              </div>
              
              <div>
                <label className="text-gray-400 text-sm font-semibold mb-2 block">Email</label>
                <input
                  type="email"
                  value={editedData.email}
                  onChange={(e) => setEditedData({...editedData, email: e.target.value})}
                  className="w-full bg-dark-lighter text-white px-4 py-3 rounded-xl border border-gray-700 focus:border-white/30 focus:outline-none font-semibold transition-all"
                />
              </div>
            </div>
            
            <div className="mt-6 flex gap-3">
              <button
                onClick={handleSaveProfile}
                className={`flex-1 bg-gradient-to-r ${currentTheme.primary} text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105`}
              >
                Save Changes
              </button>
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 bg-dark-lighter text-white font-bold py-3 px-6 rounded-xl border border-gray-700 hover:border-white/30 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default WelcomePage;
