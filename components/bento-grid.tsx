"use client"

import { motion } from "framer-motion"
import { Target, Network, TrendingUp, Shield, ArrowUpRight, Leaf, Globe, BarChart3, Zap } from "lucide-react"

const modules = [
  {
    id: "strategy",
    title: "Strategy",
    subtitle: "Intelligent Planning",
    description:
      "AI-driven cultivation strategies optimized for maximum yield and environmental benefit. Real-time adaptive systems that respond to ocean conditions.",
    icon: Target,
    accent: "primary",
    stats: [
      { label: "Yield Increase", value: "+47%" },
      { label: "Planning Accuracy", value: "94%" },
    ],
    features: ["Predictive Analytics", "Resource Optimization", "Growth Modeling"],
    size: "large",
  },
  {
    id: "network",
    title: "Network",
    subtitle: "Global Infrastructure",
    description:
      "Interconnected farm network spanning 12 ocean regions with seamless data synchronization and collaborative research capabilities.",
    icon: Network,
    accent: "accent",
    stats: [
      { label: "Active Nodes", value: "847" },
      { label: "Data Points/Day", value: "2.4M" },
    ],
    features: ["Real-time Sync", "Distributed Computing", "Global Coverage"],
    size: "medium",
  },
  {
    id: "economy",
    title: "Economy",
    subtitle: "Sustainable Value",
    description:
      "Carbon credit marketplace and sustainable supply chain integration driving economic growth while regenerating marine ecosystems.",
    icon: TrendingUp,
    accent: "primary",
    stats: [
      { label: "Carbon Credits", value: "$2.8M" },
      { label: "Supply Partners", value: "156" },
    ],
    features: ["Carbon Trading", "Supply Chain", "Market Analysis"],
    size: "medium",
  },
  {
    id: "resilience",
    title: "Resilience",
    subtitle: "Adaptive Systems",
    description:
      "Climate-resilient infrastructure with redundant systems ensuring continuous operation through environmental variability and extreme conditions.",
    icon: Shield,
    accent: "accent",
    stats: [
      { label: "System Uptime", value: "99.7%" },
      { label: "Recovery Time", value: "<30s" },
    ],
    features: ["Fault Tolerance", "Auto-Recovery", "Climate Adaptation"],
    size: "large",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

function ModuleCard({ module }: { module: (typeof modules)[0] }) {
  const Icon = module.icon
  const isLarge = module.size === "large"

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.3 }}
      className={`group relative glass rounded-2xl p-6 sm:p-8 overflow-hidden ${isLarge ? "md:col-span-2" : ""}`}
      id={module.id}
    >
      {/* Glow effect on hover */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
          module.accent === "primary"
            ? "bg-[radial-gradient(ellipse_at_top_right,_var(--primary)_0%,_transparent_50%)]"
            : "bg-[radial-gradient(ellipse_at_top_right,_var(--accent)_0%,_transparent_50%)]"
        } opacity-10`}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-xl ${
              module.accent === "primary" ? "bg-primary/20 glow-green" : "bg-accent/20 glow-teal"
            }`}
          >
            <Icon className={`h-6 w-6 ${module.accent === "primary" ? "text-primary" : "text-accent"}`} />
          </div>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 45 }}
            className="p-2 glass rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ArrowUpRight className="h-4 w-4 text-foreground" />
          </motion.button>
        </div>

        {/* Title & Description */}
        <div className="mb-6">
          <p className={`text-sm font-medium mb-1 ${module.accent === "primary" ? "text-primary" : "text-accent"}`}>
            {module.subtitle}
          </p>
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">{module.title}</h3>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{module.description}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {module.stats.map((stat, i) => (
            <div key={i} className="glass rounded-lg p-3">
              <div
                className={`text-xl sm:text-2xl font-bold ${
                  module.accent === "primary" ? "text-primary text-glow-green" : "text-accent"
                }`}
              >
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-2">
          {module.features.map((feature, i) => (
            <span key={i} className="px-3 py-1 text-xs font-medium glass rounded-full text-muted-foreground">
              {feature}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export function BentoGrid() {
  return (
    <section className="relative py-24 sm:py-32">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--teal-deep)_0%,_transparent_70%)] opacity-10" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-sm font-medium text-primary mb-4">
            <Leaf className="h-4 w-4" />
            Core Modules
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Four Pillars of Innovation
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground text-lg">
            Integrated systems working in harmony to transform ocean agriculture into a sustainable, scalable solution
            for our planet.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {/* Strategy - Large */}
          <div className="lg:col-span-2">
            <ModuleCard module={modules[0]} />
          </div>

          {/* Network - Medium */}
          <div className="lg:col-span-2">
            <ModuleCard module={modules[1]} />
          </div>

          {/* Economy - Medium */}
          <div className="lg:col-span-2">
            <ModuleCard module={modules[2]} />
          </div>

          {/* Resilience - Large */}
          <div className="lg:col-span-2">
            <ModuleCard module={modules[3]} />
          </div>
        </motion.div>

        {/* Bottom accent cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {[
            { icon: Globe, label: "Global Reach", value: "12 Regions" },
            { icon: BarChart3, label: "Data Points", value: "2.4M Daily" },
            { icon: Zap, label: "Response Time", value: "<100ms" },
          ].map((item, i) => (
            <motion.div key={i} whileHover={{ y: -2 }} className="glass rounded-xl p-4 flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">{item.label}</div>
                <div className="text-lg font-semibold text-foreground">{item.value}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
