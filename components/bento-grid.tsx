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
    accent: "gold",
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
    accent: "blue",
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
    accent: "teal",
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
    accent: "teal",
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

function getAccentColors(accent: string) {
  switch (accent) {
    case "gold":
      return {
        bg: "bg-[#E9C46A]/20",
        text: "text-[#E9C46A]",
        glow: "glow-gold",
        gradient: "bg-[radial-gradient(ellipse_at_top_right,_#E9C46A_0%,_transparent_50%)]",
      }
    case "blue":
      return {
        bg: "bg-[#635BFF]/20",
        text: "text-[#635BFF]",
        glow: "glow-blue",
        gradient: "bg-[radial-gradient(ellipse_at_top_right,_#635BFF_0%,_transparent_50%)]",
      }
    case "teal":
    default:
      return {
        bg: "bg-[#26DE81]/20",
        text: "text-[#26DE81]",
        glow: "glow-teal",
        gradient: "bg-[radial-gradient(ellipse_at_top_right,_#26DE81_0%,_transparent_50%)]",
      }
  }
}

function ModuleCard({ module }: { module: (typeof modules)[0] }) {
  const Icon = module.icon
  const colors = getAccentColors(module.accent)

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-slate-900/40 backdrop-blur-md border border-[#ffffff10] rounded-2xl p-4 sm:p-6 lg:p-8 overflow-hidden"
      id={module.id}
    >
      {/* Glow effect on hover */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${colors.gradient} opacity-10`}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4 sm:mb-6">
          <div
            className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl ${colors.bg} ${colors.glow}`}
          >
            <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${colors.text}`} />
          </div>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 45 }}
            className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center bg-slate-900/40 backdrop-blur-md border border-[#ffffff10] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ArrowUpRight className="h-4 w-4 text-slate-50" />
          </motion.button>
        </div>

        {/* Title & Description */}
        <div className="mb-4 sm:mb-6">
          <p className={`text-xs sm:text-sm font-medium mb-1 ${colors.text}`}>{module.subtitle}</p>
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-50 mb-2 sm:mb-3">{module.title}</h3>
          <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 sm:line-clamp-none">{module.description}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-4 sm:mb-6">
          {module.stats.map((stat, i) => (
            <div key={i} className="bg-slate-900/40 backdrop-blur-md border border-[#ffffff10] rounded-lg p-2 sm:p-3">
              <div className={`text-lg sm:text-xl lg:text-2xl font-bold ${colors.text}`}>{stat.value}</div>
              <div className="text-[10px] sm:text-xs text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {module.features.map((feature, i) => (
            <span
              key={i}
              className="px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium bg-slate-900/40 backdrop-blur-md border border-[#ffffff10] rounded-full text-slate-400"
            >
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
    <section className="relative py-16 sm:py-24 lg:py-32">
      {/* Background effects - more subtle */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#0D4F54_0%,_transparent_70%)] opacity-5" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="inline-flex items-center gap-2 bg-slate-900/40 backdrop-blur-md border border-[#ffffff10] rounded-full px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-medium text-[#26DE81] mb-3 sm:mb-4">
            <Leaf className="h-3 w-3 sm:h-4 sm:w-4" />
            Core Modules
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-50 mb-3 sm:mb-4 text-balance">
            Four Pillars of Innovation
          </h2>
          <p className="mx-auto max-w-2xl text-slate-400 text-sm sm:text-base lg:text-lg px-2">
            Integrated systems working in harmony to transform ocean agriculture into a sustainable, scalable solution
            for our planet.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6"
        >
          {/* Strategy - Large on lg */}
          <div className="lg:col-span-2">
            <ModuleCard module={modules[0]} />
          </div>

          {/* Network */}
          <div className="lg:col-span-2">
            <ModuleCard module={modules[1]} />
          </div>

          {/* Economy */}
          <div className="lg:col-span-2">
            <ModuleCard module={modules[2]} />
          </div>

          {/* Resilience - Large on lg */}
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
          className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4"
        >
          {[
            { icon: Globe, label: "Global Reach", value: "12 Regions" },
            { icon: BarChart3, label: "Data Points", value: "2.4M Daily" },
            { icon: Zap, label: "Response Time", value: "<100ms" },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -2 }}
              className="bg-slate-900/40 backdrop-blur-md border border-[#ffffff10] rounded-xl p-3 sm:p-4 flex items-center gap-3 sm:gap-4"
            >
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-[#26DE81]/20">
                <item.icon className="h-4 w-4 sm:h-5 sm:w-5 text-[#26DE81]" />
              </div>
              <div>
                <div className="text-xs sm:text-sm text-slate-400">{item.label}</div>
                <div className="text-base sm:text-lg font-semibold text-slate-50">{item.value}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
