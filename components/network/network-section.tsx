"use client"

import { motion } from "framer-motion"
import { Globe, Database, Sparkles, BookOpen } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InteractiveGlobe } from "./interactive-globe"
import { DigitalTwinDashboard } from "./digital-twin-dashboard"
import { SeaweedLifecycle } from "./seaweed-lifecycle"
import { Manifesto2041 } from "./manifesto-2041"

export function NetworkSection() {
  return (
    <section id="network-detail" className="relative py-16 sm:py-24 lg:py-32">
      {/* Background effects - more transparent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#0D4F54_0%,_transparent_50%)] opacity-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_#1A9D5C_0%,_transparent_50%)] opacity-5" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <span className="inline-flex items-center gap-2 bg-slate-900/40 backdrop-blur-md border border-[#ffffff10] rounded-full px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-medium text-[#635BFF] mb-3 sm:mb-4">
            <Globe className="h-3 w-3 sm:h-4 sm:w-4" />
            Network Module
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#F1FAEE] mb-3 sm:mb-4 text-balance">
            Global Ocean Farm Network
          </h2>
          <p className="mx-auto max-w-2xl text-[#8B9CB6] text-sm sm:text-base lg:text-lg px-2">
            Explore our interconnected network of pilot sites, real-time environmental data, and the journey from seabed
            to sustainable future.
          </p>
        </motion.div>

        {/* Interactive Globe */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-slate-900/40 backdrop-blur-md border border-[#ffffff10] rounded-2xl p-3 sm:p-4 lg:p-6 mb-6 sm:mb-8"
        >
          <div className="flex items-center gap-3 mb-3 sm:mb-4">
            <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-[#635BFF]/20">
              <Globe className="h-4 w-4 sm:h-5 sm:w-5 text-[#635BFF]" />
            </div>
            <div>
              <h3 className="font-semibold text-sm sm:text-base text-[#F1FAEE]">Pilot Site Locations</h3>
              <p className="text-xs sm:text-sm text-[#8B9CB6]">Interactive 3D visualization of ocean farms</p>
            </div>
          </div>
          <InteractiveGlobe />
        </motion.div>

        {/* Tabbed Interface */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs defaultValue="digital-twin" className="w-full">
            <TabsList className="w-full justify-start bg-slate-900/40 backdrop-blur-md border border-[#ffffff10] p-1 mb-4 sm:mb-6 overflow-x-auto flex-nowrap">
              <TabsTrigger
                value="digital-twin"
                className="data-[state=active]:bg-[#635BFF]/20 data-[state=active]:text-[#635BFF] gap-1.5 sm:gap-2 text-[#8B9CB6] min-h-[44px] text-xs sm:text-sm whitespace-nowrap"
              >
                <Database className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Digital Twin</span>
                <span className="sm:hidden">Twin</span>
              </TabsTrigger>
              <TabsTrigger
                value="3d-trace"
                className="data-[state=active]:bg-[#635BFF]/20 data-[state=active]:text-[#635BFF] gap-1.5 sm:gap-2 text-[#8B9CB6] min-h-[44px] text-xs sm:text-sm whitespace-nowrap"
              >
                <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">3D Trace</span>
                <span className="sm:hidden">Trace</span>
              </TabsTrigger>
              <TabsTrigger
                value="manifesto"
                className="data-[state=active]:bg-[#635BFF]/20 data-[state=active]:text-[#635BFF] gap-1.5 sm:gap-2 text-[#8B9CB6] min-h-[44px] text-xs sm:text-sm whitespace-nowrap"
              >
                <BookOpen className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">The 2041 Manifesto</span>
                <span className="sm:hidden">2041</span>
              </TabsTrigger>
            </TabsList>

            <div className="bg-slate-900/40 backdrop-blur-md border border-[#ffffff10] rounded-2xl p-3 sm:p-4 lg:p-6 xl:p-8 min-h-[400px] sm:min-h-[500px]">
              <TabsContent value="digital-twin" className="mt-0">
                <DigitalTwinDashboard />
              </TabsContent>

              <TabsContent value="3d-trace" className="mt-0">
                <SeaweedLifecycle />
              </TabsContent>

              <TabsContent value="manifesto" className="mt-0">
                <Manifesto2041 />
              </TabsContent>
            </div>
          </Tabs>
        </motion.div>
      </div>
    </section>
  )
}
