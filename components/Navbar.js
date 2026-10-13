import { ShieldCheck, Sparkles } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="w-full border-b border-white/10 backdrop-blur-md fixed top-0 z-50 bg-black/30">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-lg tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/60">
            MetaPure Pro
          </span>
        </div>
        <div className="flex items-center space-x-2 text-xs font-medium bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="text-gray-300">100% Lossless Engine</span>
        </div>
      </div>
    </nav>
  );
}
