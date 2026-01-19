import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

const calculatePasswordStrength = (password) => {
  let strength = 0;
  const checks = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  // Calculate strength score
  if (checks.length) strength += 20;
  if (checks.lowercase) strength += 20;
  if (checks.uppercase) strength += 20;
  if (checks.number) strength += 20;
  if (checks.special) strength += 20;

  let level = 'weak';
  let color = 'from-red-500 to-red-600';
  let textColor = 'text-red-500';

  if (strength >= 80) {
    level = 'strong';
    color = 'from-green-500 to-emerald-600';
    textColor = 'text-green-500';
  } else if (strength >= 60) {
    level = 'good';
    color = 'from-blue-500 to-indigo-600';
    textColor = 'text-blue-500';
  } else if (strength >= 40) {
    level = 'medium';
    color = 'from-yellow-500 to-amber-600';
    textColor = 'text-yellow-500';
  }

  return { strength, level, color, textColor, checks };
};

const PasswordStrengthIndicator = ({ password }) => {
  if (!password) return null;

  const { strength, level, color, textColor, checks } = calculatePasswordStrength(password);

  const requirements = [
    { label: 'At least 8 characters', met: checks.length },
    { label: 'Lowercase letter (a-z)', met: checks.lowercase },
    { label: 'Uppercase letter (A-Z)', met: checks.uppercase },
    { label: 'Number (0-9)', met: checks.number },
    { label: 'Special character (!@#$)', met: checks.special },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="mt-3"
    >
      {/* Strength Bar */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-400 font-semibold">Password Strength</span>
          <span className={`text-xs font-bold ${textColor} capitalize`}>{level}</span>
        </div>
        <div className="h-2 bg-dark-lighter rounded-full overflow-hidden">
          <motion.div
            className={`h-full bg-gradient-to-r ${color} rounded-full`}
            initial={{ width: 0 }}
            animate={{ width: `${strength}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Requirements Checklist */}
      <div className="space-y-1.5 bg-dark-lighter/50 rounded-lg p-3 border border-gray-700/50">
        {requirements.map((req, index) => (
          <motion.div
            key={req.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center gap-2"
          >
            {req.met ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <X className="w-4 h-4 text-gray-600" />
            )}
            <span className={`text-xs ${req.met ? 'text-gray-300' : 'text-gray-500'}`}>
              {req.label}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default PasswordStrengthIndicator;
