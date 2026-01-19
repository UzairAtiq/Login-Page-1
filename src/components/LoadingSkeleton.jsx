import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const LoadingSkeleton = ({ className = '' }) => {
  return (
    <div className={`animate-pulse ${className}`}>
      <motion.div
        className="bg-gradient-to-r from-gray-700/50 via-gray-600/50 to-gray-700/50 rounded-lg h-full"
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          backgroundSize: '200% 100%',
        }}
      />
    </div>
  );
};

export const WelcomePageSkeleton = () => {
  const { currentTheme } = useTheme();
  
  return (
    <div className={`min-h-screen relative flex flex-col items-center justify-center p-4 md:p-8 ${currentTheme.isDark ? 'bg-dark' : 'bg-gray-100'}`}>
      {/* Logout Button Skeleton */}
      <div className="w-full max-w-2xl mb-6 flex justify-center relative z-10">
        <LoadingSkeleton className="w-32 h-12 rounded-full" />
      </div>

      {/* Main Card Skeleton */}
      <div className="relative z-10 w-full max-w-2xl">
        <div className={`${currentTheme.cardBg} backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border ${currentTheme.cardBorder}`}>
          {/* Avatar Skeleton */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center mb-6">
              <LoadingSkeleton className="w-24 h-24 rounded-full" />
            </div>
            <LoadingSkeleton className="h-12 w-64 mx-auto mb-3 rounded-xl" />
            <LoadingSkeleton className="h-6 w-48 mx-auto rounded-lg" />
          </div>

          {/* Cards Skeleton */}
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`${currentTheme.isDark ? 'bg-dark-lighter/50' : 'bg-gray-50'} rounded-2xl p-6 border ${currentTheme.isDark ? 'border-gray-700/50' : 'border-gray-200'}`}>
                <div className="flex items-center gap-4">
                  <LoadingSkeleton className="w-12 h-12 rounded-xl" />
                  <div className="flex-1">
                    <LoadingSkeleton className="h-4 w-24 mb-2 rounded" />
                    <LoadingSkeleton className="h-6 w-full rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Buttons Skeleton */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <LoadingSkeleton className="h-14 rounded-xl" />
            <LoadingSkeleton className="h-14 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
