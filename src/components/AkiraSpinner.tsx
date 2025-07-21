'use client'

import { motion } from 'framer-motion'

export default function AkiraSpinner() {
  return (
    <div className="w-24 h-24 mx-auto mb-6 relative">
      {/* 外側のサークル */}
      <div className="w-full h-full border-4 border-white rounded-full"></div>
      
      {/* 中間のサークル */}
      <div className="absolute inset-4 border-2 border-gray-400 rounded-full"></div>
      
      {/* 内側のサークル */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 border border-gray-600 rounded-full"></div>
      
      {/* スキャンライン */}
      <motion.div
        className="absolute inset-0 border-t-4 border-white rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
    </div>
  )
}