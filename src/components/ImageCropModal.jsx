import { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { X, ZoomIn, ZoomOut, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ImageCropModal = ({ image, onClose, onCropComplete }) => {
  const { currentTheme } = useTheme();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropCompleteCallback = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleApply = () => {
    onCropComplete(image, croppedAreaPixels);
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
      <div className={`${currentTheme.cardBg} backdrop-blur-xl rounded-3xl p-6 max-w-2xl w-full border ${currentTheme.cardBorder} shadow-2xl`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-2xl font-black ${currentTheme.textPrimary}`}>
            Crop Profile Picture
          </h2>
          <button
            onClick={onClose}
            className={`${currentTheme.textSecondary} hover:${currentTheme.textPrimary} transition-colors p-2 hover:bg-white/10 rounded-lg`}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Cropper Area */}
        <div className="relative w-full h-96 bg-black/50 rounded-2xl overflow-hidden mb-6">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropChange={setCrop}
            onCropComplete={onCropCompleteCallback}
            onZoomChange={setZoom}
          />
        </div>

        {/* Zoom Controls */}
        <div className="mb-6">
          <div className="flex items-center gap-4">
            <ZoomOut className="w-5 h-5" style={{ color: currentTheme.accent }} />
            <input
              type="range"
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="flex-1 accent-current"
              style={{ accentColor: currentTheme.accent }}
            />
            <ZoomIn className="w-5 h-5" style={{ color: currentTheme.accent }} />
          </div>
          <p className={`${currentTheme.textSecondary} text-sm text-center mt-2`}>
            Drag to reposition • Scroll or use slider to zoom
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleApply}
            className={`flex-1 bg-gradient-to-r ${currentTheme.primary} text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2`}
          >
            <Check className="w-5 h-5" />
            Apply
          </button>
          <button
            onClick={onClose}
            className={`flex-1 ${currentTheme.inputBg} ${currentTheme.inputText} font-bold py-3 px-6 rounded-xl border ${currentTheme.inputBorder} hover:border-white/30 transition-all`}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropModal;
