"use client"

import { motion } from "framer-motion"
import { ArrowDown, Play } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient effects - more transparent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#0D4F54_0%,_transparent_50%)] opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_#1A9D5C_0%,_transparent_40%)] opacity-15" />

      {/* Animated particles/waves effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px w-full bg-gradient-to-r from-transparent via-[#26DE81]/20 to-transparent"
            style={{ top: `${20 + i * 15}%` }}
            animate={{
              x: ["-100%", "100%"],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              delay: i * 1.5,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 md:pt-20 pb-24 md:pb-0">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 sm:mb-6"
          >
            <span className="inline-flex items-center gap-2 bg-slate-900/40 backdrop-blur-md border border-[#ffffff10] rounded-full px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-medium text-[#26DE81]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#26DE81] pulse-live" />
              Innovation Hub
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-[#F1FAEE] mb-4 sm:mb-6 text-balance"
          >
            Cultivating the <span className="text-[#26DE81] text-glow-green">Ocean{"'"}s Future</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto max-w-2xl text-base sm:text-lg lg:text-xl text-[#8B9CB6] mb-8 sm:mb-10 text-pretty px-2"
          >
            Project SellWeed pioneers sustainable seaweed farming at scale, transforming ocean agriculture into a
            cornerstone of the climate-positive economy.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 rounded-full bg-[#26DE81] px-6 py-3 min-h-[48px] w-full sm:w-auto text-base font-medium text-[#0B1120] transition-all hover:bg-[#26DE81]/90 glow-teal"
            >
              Explore Modules
              <ArrowDown className="h-4 w-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 bg-slate-900/40 backdrop-blur-md border border-[#ffffff10] rounded-full px-6 py-3 min-h-[48px] w-full sm:w-auto text-base font-medium text-[#F1FAEE] transition-all hover:bg-[#1A2538]"
            >
              <Play className="h-4 w-4" />
              Watch Overview
            </motion.button>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 sm:mt-20 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4"
        >
          {[
            { value: "12+", label: "Ocean Farms" },
            { value: "850K", label: "Tons CO₂ Captured" },
            { value: "24/7", label: "Live Monitoring" },
            { value: "98%", label: "Uptime" },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-slate-900/40 backdrop-blur-md border border-[#ffffff10] rounded-xl p-3 sm:p-4 text-center"
            >
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#26DE81] text-glow-green">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-[#8B9CB6] mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator - hidden on mobile */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        <ArrowDown className="h-6 w-6 text-[#8B9CB6]" />
      </motion.div>
    </section>
  )
}
