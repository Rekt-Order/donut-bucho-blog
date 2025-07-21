'use client'

import { motion } from 'framer-motion'

interface StatusItem {
  label: string
  value: string | number
  color: string
}

interface AkiraStatusDisplayProps {
  stats: StatusItem[]
}

export default function AkiraStatusDisplay({ stats }: AkiraStatusDisplayProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-12">
      {stats.map((stat, index) => (
        <div key={stat.label} className="border border-gray-700 bg-black/50 p-4 relative group">
          <div className="text-xs text-gray-500 font-mono mb-1">{stat.label}</div>
          <div className={`text-xl font-bold font-mono ${stat.color}`}>{stat.value}</div>
          <motion.div
            className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white to-transparent"
            animate={{ x: [-100, 300] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.5
            }}
          />
        </div>
      ))}
    </div>
  )
}