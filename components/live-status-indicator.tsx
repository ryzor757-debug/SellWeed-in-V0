"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const farmStatuses = [
  { name: "North Atlantic", status: "operational", yield: 94 },
  { name: "Pacific Northwest", status: "operational", yield: 87 },
  { name: "Nordic Seas", status: "maintenance", yield: 72 },
]

export function LiveStatusIndicator() {
  const [currentFarm, setCurrentFarm] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFarm((prev) => (prev + 1) % farmStatuses.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const farm = farmStatuses[currentFarm]
  const isOperational = farm.status === "operational"

  return (
    <div className="flex items-center gap-3 bg-[#162035]/80 backdrop-blur-md border border-[#ffffff10] rounded-full px-3 py-1.5">
      <div className="flex items-center gap-2">
        <motion.div
          className={`h-2 w-2 rounded-full ${isOperational ? "bg-[#26DE81] pulse-live" : "bg-amber-500"}`}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        />
        <span className="text-xs font-medium text-[#8B9CB6]">Live Status</span>
      </div>
      <div className="h-4 w-px bg-[#ffffff10]" />
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-[#F1FAEE]">{farm.name}</span>
        <span className={`text-xs ${isOperational ? "text-[#26DE81]" : "text-amber-500"}`}>{farm.yield}%</span>
      </div>
    </div>
  )
}
