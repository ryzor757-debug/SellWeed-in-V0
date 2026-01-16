"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"
import { Anchor, Sprout, Sun, Waves, Scissors, Package, ArrowRight } from "lucide-react"

const lifecycleStages = [
  {
    id: "seeding",
    title: "Seeding",
    subtitle: "Benthic Phase",
    description: "Spores are carefully cultivated and attached to substrate ropes at optimal depths.",
    icon: Anchor,
    depth: "5-10m",
    duration: "Week 1-2",
    color: "#1a5a5a",
  },
  {
    id: "germination",
    title: "Germination",
    subtitle: "Early Growth",
    description: "Microscopic sporophytes emerge and begin photosynthesis in nutrient-rich waters.",
    icon: Sprout,
    depth: "3-8m",
    duration: "Week 3-4",
    color: "#1a8a5a",
  },
  {
    id: "growth",
    title: "Rapid Growth",
    subtitle: "Vegetative Phase",
    description: "Fronds expand rapidly, absorbing carbon dioxide and releasing oxygen into the ocean.",
    icon: Sun,
    depth: "2-6m",
    duration: "Week 5-10",
    color: "#22aa66",
  },
  {
    id: "maturation",
    title: "Maturation",
    subtitle: "Peak Biomass",
    description: "Seaweed reaches maximum biomass with highest nutrient density and carbon sequestration.",
    icon: Waves,
    depth: "1-4m",
    duration: "Week 11-14",
    color: "#22cc77",
  },
  {
    id: "harvest",
    title: "Harvest",
    subtitle: "Selective Collection",
    description: "Mature fronds are sustainably harvested, leaving regenerative tissue for regrowth.",
    icon: Scissors,
    depth: "Surface",
    duration: "Week 15-16",
    color: "#22ff88",
  },
  {
    id: "processing",
    title: "Processing",
    subtitle: "Value Creation",
    description: "Harvested seaweed is processed into food, fertilizer, bioplastics, and carbon credits.",
    icon: Package,
    depth: "Shore",
    duration: "Post-harvest",
    color: "#44ffaa",
  },
]

function LifecycleStage({
  stage,
  index,
  progress,
}: {
  stage: (typeof lifecycleStages)[0]
  index: number
  progress: number
}) {
  const Icon = stage.icon
  const isActive = progress >= index / lifecycleStages.length
  const stageProgress = Math.max(0, Math.min(1, (progress - index / lifecycleStages.length) * lifecycleStages.length))

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: isActive ? 1 : 0.3, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative flex gap-6 pb-12 last:pb-0"
    >
      {/* Timeline line */}
      <div className="absolute left-[23px] top-12 bottom-0 w-0.5 bg-gradient-to-b from-border to-transparent">
        <motion.div className="absolute inset-0 bg-primary origin-top" style={{ scaleY: stageProgress }} />
      </div>

      {/* Icon */}
      <motion.div
        className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-all duration-500 ${
          isActive ? "bg-primary/30 glow-green" : "bg-muted"
        }`}
        animate={{ scale: isActive ? 1 : 0.9 }}
      >
        <Icon className={`h-5 w-5 transition-colors ${isActive ? "text-primary" : "text-muted-foreground"}`} />
      </motion.div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <h4 className={`font-semibold transition-colors ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
            {stage.title}
          </h4>
          <span className="px-2 py-0.5 text-xs rounded-full glass text-muted-foreground">{stage.subtitle}</span>
        </div>
        <p
          className={`text-sm mb-3 transition-colors ${isActive ? "text-muted-foreground" : "text-muted-foreground/50"}`}
        >
          {stage.description}
        </p>
        <div className="flex flex-wrap gap-3 text-xs">
          <span className="flex items-center gap-1 text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: stage.color }} />
            Depth: {stage.depth}
          </span>
          <span className="flex items-center gap-1 text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: stage.color }} />
            {stage.duration}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export function SeaweedLifecycle() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, margin: "-20%" })
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const progress = useTransform(scrollYProgress, [0.2, 0.8], [0, 1])
  const smoothProgress = useSpring(progress, { stiffness: 100, damping: 30 })
  const [currentProgress, setCurrentProgress] = useState(0)

  useEffect(() => {
    return smoothProgress.on("change", (v) => setCurrentProgress(v))
  }, [smoothProgress])

  return (
    <div ref={containerRef} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">3D Trace: Seaweed Lifecycle</h3>
          <p className="text-sm text-muted-foreground">From benthic seeding to sustainable harvest</p>
        </div>
        <div className="glass rounded-full px-3 py-1.5 text-xs text-muted-foreground">
          {Math.round(currentProgress * 100)}% Complete
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 rounded-full bg-muted overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-teal-deep to-primary rounded-full"
          style={{ width: `${currentProgress * 100}%` }}
        />
      </div>

      {/* Lifecycle stages */}
      <div className="relative pl-2">
        {lifecycleStages.map((stage, index) => (
          <LifecycleStage key={stage.id} stage={stage} index={index} progress={currentProgress} />
        ))}
      </div>

      {/* Carbon impact summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: currentProgress > 0.8 ? 1 : 0.3 }}
        className="glass rounded-xl p-4 mt-6"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
            <ArrowRight className="h-5 w-5 text-primary" />
          </div>
          <div>
            <div className="text-sm font-medium text-foreground">Carbon Sequestration Impact</div>
            <div className="text-xs text-muted-foreground">
              Each cycle captures approximately <span className="text-primary font-semibold">2.5 tonnes CO₂</span> per
              hectare
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
