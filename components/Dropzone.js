import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Image as ImageIcon, CheckCircle2 } from 'lucide-react';

export default function Dropzone({ onFileSelected, selectedFile }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsHovered(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelected(e.dataTransfer.files[0]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <div
        onDragOver={(e) => { e.preventDefault(); setIsHovered(true); }}
        onDragLeave={() => setIsHovered(false)}
        onDrop={handleDrop}
        className={`relative glass-panel rounded-3xl p-10 text-center cursor-pointer transition-all duration-300 border-2 border-dashed ${
          isHovered ? 'border-blue-500 bg-blue-500/10 scale-[1.01]' : 'border-white/15 hover:border-white/30'
        }`}
      >
        <input
          type="file"
          accept=".jpg,.jpeg,.png,.heic"
          onChange={(e) => e.target.files[0] && onFileSelected(e.target.files[0])}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        <div className="flex flex-col items-center justify-center space-y-4">
          {selectedFile ? (
            <>
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <p className="text-lg font-medium text-white">{selectedFile.name}</p>
                <p className="text-sm text-gray-400 font-mono mt-1">
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • {selectedFile.type || 'HEIC/Image'}
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 shadow-inner">
                <Upload className="w-8 h-8" />
              </div>
              <div>
                <p className="text-lg font-medium text-white">Drop your high-res image here</p>
                <p className="text-sm text-gray-400 mt-1">Supports JPG, PNG, HEIC (Bit-Exact Lossless)</p>
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
