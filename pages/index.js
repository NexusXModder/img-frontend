import { useState } from 'react';
import Navbar from '../components/Navbar';
import Dropzone from '../components/Dropzone';
import { motion } from 'framer-motion';
import { Sparkles, Sliders, ShieldAlert, Download, RefreshCw, Calendar, Camera } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Home() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [stripAi, setStripAi] = useState(true);
  const [stripAll, setStripAll] = useState(false);
  const [customDate, setCustomDate] = useState('');
  const [cameraModel, setCameraModel] = useState('');

  // UPDATE THIS WITH YOUR RENDER BACKEND URL LATER
  const BACKEND_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || "https://img-backend-u7k4.onrender.com").replace(/\/+$/, "");

  const handleProcess = async () => {
    if (!file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("strip_ai", stripAi);
    formData.append("strip_all", stripAll);
    if (customDate) formData.append("custom_date", customDate);
    if (cameraModel) formData.append("camera_model", cameraModel);

    try {
      const response = await fetch(`${BACKEND_URL}/api/process`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        let message = `Request failed (${response.status})`;
        try {
          const payload = await response.json();
          if (payload?.detail) message = typeof payload.detail === "string" ? payload.detail : JSON.stringify(payload.detail);
        } catch (_) {
          // Keep the HTTP status message if the backend did not return JSON.
        }
        throw new Error(message);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `cleaned_${file.name}`;
      document.body.appendChild(a);
      a.click();
      a.remove();

      confetti({ particleCount: 80, spread: 60, origin: { y: 0.8 } });
    } catch (err) {
      alert("Error processing image: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <Navbar />
      
      <main className="max-w-4xl mx-auto space-y-8">
        {/* Header Title */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-white/90 to-white/40">
            Precision Metadata & AI Cleaner
          </h1>
          <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto">
            Zero compression. Zero re-encoding. Modify metadata & strip AI signatures while preserving 100% original quality.
          </p>
        </div>

        {/* Dropzone */}
        <Dropzone onFileSelected={setFile} selectedFile={file} />

        {/* Control Controls Panel */}
        {file && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center space-x-2">
                <Sliders className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-semibold text-white">Metadata Actions</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* AI Signature Toggle */}
              <div 
                onClick={() => setStripAi(!stripAi)}
                className={`glass-card p-4 rounded-2xl cursor-pointer flex items-center justify-between transition-all ${
                  stripAi ? 'border-blue-500/50 bg-blue-500/10' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <ShieldAlert className="w-5 h-5 text-amber-400" />
                  <div>
                    <p className="text-sm font-medium">Strip AI & C2PA Markers</p>
                    <p className="text-xs text-gray-400">Remove Midjourney/DALL-E tags</p>
                  </div>
                </div>
                <input type="checkbox" checked={stripAi} readOnly className="accent-blue-500 w-4 h-4" />
              </div>

              {/* Strip All Toggle */}
              <div 
                onClick={() => setStripAll(!stripAll)}
                className={`glass-card p-4 rounded-2xl cursor-pointer flex items-center justify-between transition-all ${
                  stripAll ? 'border-red-500/50 bg-red-500/10' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Sparkles className="w-5 h-5 text-red-400" />
                  <div>
                    <p className="text-sm font-medium">Nuke All EXIF Data</p>
                    <p className="text-xs text-gray-400">Complete metadata wipe</p>
                  </div>
                </div>
                <input type="checkbox" checked={stripAll} readOnly className="accent-red-500 w-4 h-4" />
              </div>
            </div>

            {/* Custom Inputs */}
            <div className="space-y-4 pt-2">
              <div>
                <label className="text-xs text-gray-400 mb-1 flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Custom Creation Date (Format: YYYY:MM:DD HH:MM:SS)</span>
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. 2024:01:01 12:00:00"
                  value={customDate}
                  onChange={(e) => setCustomDate(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-xs text-gray-400 mb-1 flex items-center space-x-1">
                  <Camera className="w-3.5 h-3.5" />
                  <span>Custom Camera Model Tag</span>
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. Canon EOS R5 / iPhone 15 Pro"
                  value={cameraModel}
                  onChange={(e) => setCameraModel(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Submit Action */}
            <button
              onClick={handleProcess}
              disabled={loading}
              className="w-full apple-button py-4 rounded-2xl text-white font-semibold flex items-center justify-center space-x-2 text-base disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Processing Lossless Metadata...</span>
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  <span>Process & Export Original File</span>
                </>
              )}
            </button>
          </motion.div>
        )}
      </main>
    </div>
  );
}
