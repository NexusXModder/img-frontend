import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, Calendar, MapPin, Cpu, ShieldAlert, 
  CheckCircle, Layers, FileText, SlidersHorizontal 
} from 'lucide-react';
import GlassCard from './GlassCard';

export default function MetadataInspector({ metadata }) {
  const [activeTab, setActiveTab] = useState('overview');

  if (!metadata) return null;

  // AI & Metadata Analysis Logic
  const softwareTag = (metadata.Software || metadata['XMP:Software'] || '').toLowerCase();
  const isAiDetected = 
    Boolean(metadata.C2PA) || 
    Boolean(metadata['XMP-c2pa']) || 
    softwareTag.includes('midjourney') || 
    softwareTag.includes('stable') || 
    softwareTag.includes('dall-e') ||
    softwareTag.includes('firefly');

  const gpsLat = metadata.GPSLatitude || metadata.GPSLatitudeRef;
  const gpsLon = metadata.GPSLongitude || metadata.GPSLongitudeRef;
  const hasGps = Boolean(gpsLat && gpsLon);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-5"
    >
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-blue-400" />
            Deep EXIF & Forensics Analysis
          </h3>
          <p className="text-xs text-gray-400">Inspecting embedded tags without modifying pixel stream</p>
        </div>

        {/* AI Detection Pill */}
        {isAiDetected ? (
          <div className="px-3 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-medium flex items-center gap-1.5 shadow-lg shadow-amber-500/10">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span>AI Watermark / C2PA Signature Found</span>
          </div>
        ) : (
          <div className="px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-medium flex items-center gap-1.5 shadow-lg shadow-emerald-500/10">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>Authentic / No C2PA AI Tag</span>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-white/5 pb-2">
        {['overview', 'camera', 'location', 'raw'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-xl text-xs font-medium capitalize transition-all ${
              activeTab === tab 
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 shadow-md' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.div 
            key="overview"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            <GlassCard>
              <div className="flex items-start space-x-3">
                <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <Camera className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Device Hardware</p>
                  <p className="text-sm font-semibold text-white mt-0.5">
                    {metadata.Model || metadata.Make || 'Generic / Rendered'}
                  </p>
                  <p className="text-[11px] text-gray-500 mt-1">Lens: {metadata.LensModel || 'N/A'}</p>
                </div>
              </div>
            </GlassCard>

            <GlassCard>
              <div className="flex items-start space-x-3">
                <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Creation Timestamp</p>
                  <p className="text-sm font-semibold text-white mt-0.5 font-mono">
                    {metadata.DateTimeOriginal || metadata.CreateDate || 'Not Embedded'}
                  </p>
                  <p className="text-[11px] text-gray-500 mt-1">TZ: {metadata.OffsetTime || 'UTC'}</p>
                </div>
              </div>
            </GlassCard>

            <GlassCard>
              <div className="flex items-start space-x-3">
                <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Software & Processing</p>
                  <p className="text-sm font-semibold text-white mt-0.5 truncate max-w-[140px]">
                    {metadata.Software || 'Untampered Binary'}
                  </p>
                  <p className="text-[11px] text-gray-500 mt-1">Encoder: {metadata.FileType || 'Unknown'}</p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}

        {activeTab === 'camera' && (
          <motion.div 
            key="camera"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3"
          >
            <GlassCard className="text-center py-4">
              <p className="text-xs text-gray-400">Aperture</p>
              <p className="text-base font-bold text-white mt-1">
                {metadata.FNumber ? `f/${metadata.FNumber}` : 'N/A'}
              </p>
            </GlassCard>
            <GlassCard className="text-center py-4">
              <p className="text-xs text-gray-400">ISO Speed</p>
              <p className="text-base font-bold text-white mt-1">
                {metadata.ISO || 'N/A'}
              </p>
            </GlassCard>
            <GlassCard className="text-center py-4">
              <p className="text-xs text-gray-400">Exposure Time</p>
              <p className="text-base font-bold text-white mt-1">
                {metadata.ExposureTime ? `${metadata.ExposureTime}s` : 'N/A'}
              </p>
            </GlassCard>
            <GlassCard className="text-center py-4">
              <p className="text-xs text-gray-400">Focal Length</p>
              <p className="text-base font-bold text-white mt-1">
                {metadata.FocalLength || 'N/A'}
              </p>
            </GlassCard>
          </motion.div>
        )}

        {activeTab === 'location' && (
          <motion.div 
            key="location"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
          >
            <GlassCard className="p-5">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-2xl bg-red-500/10 text-red-400 border border-red-500/20">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Geolocation Data</h4>
                  {hasGps ? (
                    <p className="text-xs text-gray-300 font-mono mt-1">
                      Lat: {gpsLat} | Lon: {gpsLon}
                    </p>
                  ) : (
                    <p className="text-xs text-gray-400 mt-1">
                      No GPS tags embedded in this file. Your privacy is safe.
                    </p>
                  )}
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}

        {activeTab === 'raw' && (
          <motion.div 
            key="raw"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
          >
            <div className="p-4 rounded-2xl bg-black/60 border border-white/10 font-mono text-xs text-emerald-400 max-h-60 overflow-y-auto scrollbar-thin">
              <pre>{JSON.stringify(metadata, null, 2)}</pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
