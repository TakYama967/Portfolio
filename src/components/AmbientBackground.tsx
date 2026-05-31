import React from 'react'
import { motion } from 'framer-motion'

const orbs = [
  {
    className: 'top-[-10%] left-[-5%] w-[500px] h-[500px] bg-ocean-600/20',
    animate: {
      x: [0, 40, -20, 0],
      y: [0, -30, 20, 0],
      scale: [1, 1.1, 0.95, 1],
    },
    duration: 20,
  },
  {
    className: 'top-[30%] right-[-10%] w-[400px] h-[400px] bg-purple-600/15',
    animate: {
      x: [0, -30, 20, 0],
      y: [0, 40, -20, 0],
      scale: [1, 0.9, 1.05, 1],
    },
    duration: 25,
  },
  {
    className: 'bottom-[10%] left-[20%] w-[350px] h-[350px] bg-blue-500/10',
    animate: {
      x: [0, 25, -35, 0],
      y: [0, -25, 15, 0],
      scale: [1, 1.05, 0.9, 1],
    },
    duration: 18,
  },
]

const AmbientBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {orbs.map((orb, index) => (
        <motion.div
          key={index}
          className={`absolute rounded-full blur-3xl ${orb.className}`}
          animate={orb.animate}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
      <div className="absolute inset-0 bg-mesh-dark" />
    </div>
  )
}

export default AmbientBackground
