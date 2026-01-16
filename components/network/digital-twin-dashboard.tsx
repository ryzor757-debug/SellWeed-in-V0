"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Thermometer, Droplets, Activity, Waves, Wind, TrendingUp, TrendingDown } from "lucide-react"
import { XAxis, YAxis, ResponsiveContainer, Area, AreaChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line } from "recharts"

// Simulated real-time data generator
function generateDataPoint(base: number, variance: number) {
  return base + (Math.random() - 0.5) * variance
}

function generateHistoricalData(base: number, variance: number, points: number) {
  return Array.from({ length: points }, (_, i) => ({
    time: `${i}:00`,
    value: generateDataPoint(base, variance),
  }))
}

const metrics = [
  {
    id: "temperature",
    label: "Water Temperature",
    unit: "°C",
    icon: Thermometer,
    base: 26.5,
    variance: 2,
    optimal: { min: 24, max: 28 },
    color: "#635BFF", // Electric Blue
  },
  {
    id: "ph",
    label: "pH Level",
    unit: "pH",
    icon: Droplets,
    base: 8.1,
    variance: 0.3,
    optimal: { min: 7.8, max: 8.4 },
    color: "#635BFF",
  },
  {
    id: "salinity",
    label: "Salinity",
    unit: "ppt",
    icon: Waves,
    base: 35,
    variance: 2,
    optimal: { min: 33, max: 37 },
    color: "#635BFF",
  },
  {
    id: "dissolved_o2",
    label: "Dissolved O₂",
    unit: "mg/L",
    icon: Wind,
    base: 7.5,
    variance: 1,
    optimal: { min: 6, max: 9 },
    color: "#635BFF",
  },
]

function MetricCard({
  metric,
  value,
  trend,
  data,
}: {
  metric: (typeof metrics)[0]
  value: number
  trend: "up" | "down" | "stable"
  data: { time: string; value: number }[]
}) {
  const Icon = metric.icon
  const isOptimal = value >= metric.optimal.min && value <= metric.optimal.max
  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Activity

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#162035] border border-[#ffffff10] rounded-xl p-4 flex flex-col"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#635BFF]/20">
            <Icon className="h-4 w-4 text-[#635BFF]" />
          </div>
          <div>
            <div className="text-xs text-[#8B9CB6]">{metric.label}</div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-[#F1FAEE]">{value.toFixed(1)}</span>
              <span className="text-xs text-[#8B9CB6]">{metric.unit}</span>
            </div>
          </div>
        </div>
        <div className={`flex items-center gap-1 text-xs ${isOptimal ? "text-[#635BFF]" : "text-orange-400"}`}>
          <TrendIcon className="h-3 w-3" />
          {isOptimal ? "Optimal" : "Monitor"}
        </div>
      </div>

      {/* Sparkline */}
      <div className="h-12 mt-auto">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id={`gradient-${metric.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={metric.color} stopOpacity={0.3} />
                <stop offset="100%" stopColor={metric.color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke={metric.color}
              strokeWidth={1.5}
              fill={`url(#gradient-${metric.id})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}

export function DigitalTwinDashboard() {
  const [currentValues, setCurrentValues] = useState(
    metrics.map((m) => ({
      ...m,
      value: generateDataPoint(m.base, m.variance),
      trend: "stable" as "up" | "down" | "stable",
      data: generateHistoricalData(m.base, m.variance, 24),
    })),
  )

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentValues((prev) =>
        prev.map((item) => {
          const newValue = generateDataPoint(item.base, item.variance)
          const trend = newValue > item.value ? "up" : newValue < item.value ? "down" : "stable"
          return {
            ...item,
            value: newValue,
            trend,
            data: [...item.data.slice(1), { time: "now", value: newValue }],
          }
        }),
      )
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-[#F1FAEE]">Digital Twin Dashboard</h3>
          <p className="text-sm text-[#8B9CB6]">Real-time environmental monitoring</p>
        </div>
        <div className="flex items-center gap-2 bg-[#162035] border border-[#ffffff10] rounded-full px-3 py-1.5">
          <span className="h-2 w-2 rounded-full bg-[#635BFF] pulse-live" />
          <span className="text-xs text-[#8B9CB6]">Live Data</span>
        </div>
      </div>

      {/* Location selector - Electric Blue active state */}
      <div className="flex gap-2">
        {["St. Martin's Island", "Cox's Bazar"].map((loc, i) => (
          <button
            key={loc}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              i === 0
                ? "bg-[#635BFF]/20 text-[#635BFF] border border-[#635BFF]/30"
                : "bg-[#162035] border border-[#ffffff10] text-[#8B9CB6] hover:text-[#F1FAEE]"
            }`}
          >
            {loc}
          </button>
        ))}
      </div>

      {/* Metrics grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {currentValues.map((item) => (
          <MetricCard key={item.id} metric={item} value={item.value} trend={item.trend} data={item.data} />
        ))}
      </div>

      {/* Combined chart */}
      <div className="bg-[#162035] border border-[#ffffff10] rounded-xl p-4">
        <div className="text-sm font-medium text-[#F1FAEE] mb-4">24-Hour Trend Analysis</div>
        <ChartContainer
          config={{
            temperature: { label: "Temperature", color: "#635BFF" },
            ph: { label: "pH Level", color: "#635BFF" },
          }}
          className="h-[200px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={currentValues[0].data}>
              <XAxis dataKey="time" stroke="#8B9CB6" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#8B9CB6" fontSize={10} tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="value" stroke="#635BFF" strokeWidth={2} dot={false} name="Temperature" />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  )
}
