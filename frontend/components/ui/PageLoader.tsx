'use client'

import { motion } from 'framer-motion'

export default function PageLoader() {
  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050505]"
      data-testid="page-loader"
    >
      <div className="flex flex-col items-center gap-6">
        {/* LEXA Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-3xl font-bold tracking-[0.3em] text-white"
        >
          LEXA
        </motion.div>
        
        {/* Animated loading bar */}
        <div className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#C9A962]"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              repeat: Infinity,
              duration: 1,
              ease: 'easeInOut'
            }}
          />
        </div>
        
        {/* Loading text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xs uppercase tracking-[0.2em] text-white/40"
        >
          Loading
        </motion.p>
      </div>
    </div>
  )
}
