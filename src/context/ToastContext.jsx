import { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

const toastIcons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
};

const toastStyles = {
  success: {
    bg: 'from-green-500 to-emerald-600',
    border: 'border-green-400',
    icon: 'text-green-100',
  },
  error: {
    bg: 'from-red-500 to-rose-600',
    border: 'border-red-400',
    icon: 'text-red-100',
  },
  warning: {
    bg: 'from-yellow-500 to-amber-600',
    border: 'border-yellow-400',
    icon: 'text-yellow-100',
  },
  info: {
    bg: 'from-blue-500 to-indigo-600',
    border: 'border-blue-400',
    icon: 'text-blue-100',
  },
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type, duration }]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      
      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-3 max-w-md">
        <AnimatePresence>
          {toasts.map((toast) => {
            const Icon = toastIcons[toast.type];
            const styles = toastStyles[toast.type];
            
            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: -50, scale: 0.3 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                className={`bg-gradient-to-r ${styles.bg} backdrop-blur-xl rounded-2xl shadow-2xl border ${styles.border} p-4 min-w-[300px] max-w-md`}
              >
                <div className="flex items-start gap-3">
                  <Icon className={`w-6 h-6 ${styles.icon} flex-shrink-0 mt-0.5`} />
                  <p className="text-white font-semibold flex-1 text-sm leading-relaxed">
                    {toast.message}
                  </p>
                  <button
                    onClick={() => removeToast(toast.id)}
                    className="text-white/80 hover:text-white transition-colors flex-shrink-0"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};
