"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Target, TrendingUp, Waves, Briefcase, Users, Leaf, Globe2, Info } from "lucide-react"
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const sdg14Data = {
  name: "SDG 14: Life Below Water",
  color: "#0891b2",
  targets: [
    { id: "14.1", name: "Reduce marine pollution", progress: 67, target: 100 },
    { id: "14.2", name: "Protect marine ecosystems", progress: 54, target: 100 },
    { id: "14.4", name: "Sustainable fishing", progress: 72, target: 100 },
    { id: "14.7", name: "Blue economy benefits", progress: 48, target: 100 },
  ],
  overallProgress: 60,
}

const sdg8Data = {
  name: "SDG 8: Decent Work",
  color: "#a21caf",
  targets: [
    { id: "8.3", name: "Job creation", progress: 78, target: 100 },
    { id: "8.5", name: "Full employment", progress: 62, target: 100 },
    { id: "8.8", name: "Safe working conditions", progress: 85, target: 100 },
    { id: "8.9", name: "Sustainable tourism", progress: 41, target: 100 },
  ],
  overallProgress: 67,
}

const timelineData = [
  { month: "Jan", sdg14: 45, sdg8: 52 },
  { month: "Feb", sdg14: 48, sdg8: 55 },
  { month: "Mar", sdg14: 52, sdg8: 58 },
  { month: "Apr", sdg14: 55, sdg8: 60 },
  { month: "May", sdg14: 58, sdg8: 63 },
  { month: "Jun", sdg14: 60, sdg8: 67 },
]

const impactMetrics = [
  { label: "Hectares Restored", value: 2340, unit: "ha", trend: "+18%", icon: Leaf },
  { label: "Jobs Created", value: 847, unit: "jobs", trend: "+24%", icon: Briefcase },
  { label: "Workers Trained", value: 1297, unit: "people", trend: "+31%", icon: Users },
  { label: "CO2 Sequestered", value: 4.2, unit: "kt", trend: "+22%", icon: Globe2 },
]

const radialData = [
  { name: "SDG 14", progress: 60, fill: "var(--teal-glow)" },
  { name: "SDG 8", progress: 67, fill: "var(--bio-green)" },
]

export function SDGTracker() {
  const [activeSDG, setActiveSDG] = useState<"sdg14" | "sdg8">("sdg14")
  const currentSDG = activeSDG === "sdg14" ? sdg14Data : sdg8Data

  return (
    <div className="space-y-6">
      {/* Impact Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {impactMetrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass rounded-xl p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <metric.icon className="h-5 w-5 text-primary" />
              <span className="text-xs font-medium text-bio-green">{metric.trend}</span>
            </div>
            <div className="text-2xl font-bold text-foreground">
              {metric.value.toLocaleString()}
              <span className="text-sm font-normal text-muted-foreground ml-1">{metric.unit}</span>
            </div>
            <div className="text-xs text-muted-foreground">{metric.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Radial Progress Chart */}
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Target className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-foreground">Overall SDG Progress</h3>
          </div>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="40%"
                outerRadius="90%"
                data={radialData}
                startAngle={180}
                endAngle={-180}
              >
                <RadialBar dataKey="progress" cornerRadius={10} background={{ fill: "var(--muted)" }} />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-teal-glow" />
              <span className="text-sm text-muted-foreground">SDG 14: {sdg14Data.overallProgress}%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-bio-green" />
              <span className="text-sm text-muted-foreground">SDG 8: {sdg8Data.overallProgress}%</span>
            </div>
          </div>
        </div>

        {/* Timeline Chart */}
        <div className="lg:col-span-2 glass rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-foreground">Progress Timeline</h3>
          </div>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timelineData}>
                <defs>
                  <linearGradient id="sdg14Gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0d9488" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#0d9488" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="sdg8Gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="sdg14"
                  name="SDG 14"
                  stroke="#0d9488"
                  strokeWidth={2}
                  fill="url(#sdg14Gradient)"
                />
                <Area
                  type="monotone"
                  dataKey="sdg8"
                  name="SDG 8"
                  stroke="#22c55e"
                  strokeWidth={2}
                  fill="url(#sdg8Gradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Detailed Target Breakdown */}
      <div className="glass rounded-2xl p-6">
        <Tabs value={activeSDG} onValueChange={(v) => setActiveSDG(v as "sdg14" | "sdg8")}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              {activeSDG === "sdg14" ? (
                <Waves className="h-5 w-5 text-teal-glow" />
              ) : (
                <Briefcase className="h-5 w-5 text-bio-green" />
              )}
              <h3 className="font-semibold text-foreground">{currentSDG.name}</h3>
            </div>
            <TabsList className="glass border-0">
              <TabsTrigger
                value="sdg14"
                className="data-[state=active]:bg-teal-glow/20 data-[state=active]:text-teal-glow gap-2"
              >
                <Waves className="h-4 w-4" />
                SDG 14
              </TabsTrigger>
              <TabsTrigger
                value="sdg8"
                className="data-[state=active]:bg-bio-green/20 data-[state=active]:text-bio-green gap-2"
              >
                <Briefcase className="h-4 w-4" />
                SDG 8
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="sdg14" className="mt-0">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sdg14Data.targets} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis type="number" domain={[0, 100]} stroke="var(--muted-foreground)" fontSize={12} />
                  <YAxis dataKey="name" type="category" width={150} stroke="var(--muted-foreground)" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--popover)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`${value}%`, "Progress"]}
                  />
                  <Bar
                    dataKey="progress"
                    fill="#0d9488"
                    radius={[0, 4, 4, 0]}
                    background={{ fill: "var(--muted)", radius: [0, 4, 4, 0] }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="sdg8" className="mt-0">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sdg8Data.targets} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis type="number" domain={[0, 100]} stroke="var(--muted-foreground)" fontSize={12} />
                  <YAxis dataKey="name" type="category" width={150} stroke="var(--muted-foreground)" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--popover)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`${value}%`, "Progress"]}
                  />
                  <Bar
                    dataKey="progress"
                    fill="#22c55e"
                    radius={[0, 4, 4, 0]}
                    background={{ fill: "var(--muted)", radius: [0, 4, 4, 0] }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>

        {/* Info Banner */}
        <div className="mt-6 flex items-start gap-3 p-4 rounded-xl bg-primary/10 border border-primary/20">
          <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="text-foreground font-medium mb-1">How we measure impact</p>
            <p className="text-muted-foreground">
              Progress is tracked through verified on-chain data from our Oracle network, combining satellite imagery,
              IoT sensor readings, and third-party audits from partner universities.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
