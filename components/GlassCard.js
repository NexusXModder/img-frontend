import { motion } from 'framer-motion';

export default function GlassCard({ children, className = '', hoverEffect = true, onClick, ...props }) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={hoverEffect ? { y: -3, scale: 1.01 } : {}}
      whileTap={hoverEffect ? { scale: 0.98 } : {}}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`relative overflow-hidden rounded-2xl p-5 border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] backdrop-blur-2xl shadow-2xl transition-all ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
      {...props}
    >
      {/* Top Subtle Light Reflection */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      {children}
    </motion.div>
  );
}
