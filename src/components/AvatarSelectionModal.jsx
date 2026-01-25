import { X, Camera } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const AvatarSelectionModal = ({ onClose, onSelectAvatar }) => {
  const { currentTheme } = useTheme();
  
  // Available avatar images from public folder
  const avatarOptions = [
    '/IMG_6076.JPG',
    '/IMG_6107.JPG',
    '/IMG_6287.JPG',
    '/IMG_6401.JPG',
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
      <div className={`${currentTheme.cardBg} backdrop-blur-xl rounded-3xl p-8 max-w-2xl w-full border ${currentTheme.cardBorder} shadow-2xl`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-2xl font-black ${currentTheme.textPrimary} flex items-center gap-2`}>
            <Camera className="w-6 h-6" style={{ color: currentTheme.accent }} />
            Choose Profile Picture
          </h2>
          <button
            onClick={onClose}
            className={`${currentTheme.textSecondary} hover:${currentTheme.textPrimary} transition-colors p-2 hover:bg-white/10 rounded-lg`}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <p className={`${currentTheme.textSecondary} mb-6 text-center`}>
          Select an avatar to customize and set as your profile picture
        </p>

        {/* Avatar Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {avatarOptions.map((avatar, index) => (
            <button
              key={index}
              onClick={() => onSelectAvatar(avatar)}
              className={`relative aspect-square rounded-2xl overflow-hidden border-2 ${currentTheme.inputBorder} hover:border-4 transition-all duration-300 transform hover:scale-105 group`}
              style={{ borderColor: currentTheme.accent }}
            >
              <img
                src={avatar}
                alt={`Avatar option ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
            </button>
          ))}
        </div>

        <button
          onClick={onClose}
          className={`w-full ${currentTheme.inputBg} ${currentTheme.inputText} font-bold py-3 px-6 rounded-xl border ${currentTheme.inputBorder} hover:border-white/30 transition-all`}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AvatarSelectionModal;
