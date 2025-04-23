import React from 'react'
import { motion } from 'framer-motion'

const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <motion.h1
        className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Hey, I'm Kumar Nishant
      </motion.h1>
      <motion.p
        className="mt-4 text-lg text-gray-400 max-w-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Full-Stack Developer | Java & React.js Enthusiast | Passionate about building aesthetic web experiences
      </motion.p>
      <motion.a
        href="#about"
        className="mt-8 inline-block px-6 py-3 border border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white rounded-full transition"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Know More
      </motion.a>
    </section>
  )
}

export default Hero
