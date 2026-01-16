"use client"

import { motion } from "framer-motion"
import { Shield, GraduationCap, Target, FileText } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Academy } from "./academy"
import { SDGTracker } from "./sdg-tracker"
import { Governance } from "./governance"

export function ResilienceSection() {
  return (
    <section id="resilience-detail" className="relative py-16 sm:py-24 lg:py-32">
      {/* Background effects - more transparent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--bio-green-dim)_0%,_transparent_50%)] opacity-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--teal-deep)_0%,_transparent_50%)] opacity-10" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <span className="inline-flex items-center gap-2 bg-slate-900/40 backdrop-blur-md border border-[#ffffff10] rounded-full px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-medium text-bio-green mb-3 sm:mb-4">
            <Shield className="h-3 w-3 sm:h-4 sm:w-4" />
            Resilience Module
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4 text-balance">
            Impact & Resilience
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground text-sm sm:text-base lg:text-lg px-2">
            Building capacity, measuring progress, and establishing governance for a sustainable blue economy that lasts
            generations.
          </p>
        </motion.div>

        {/* Tabbed Interface */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs defaultValue="academy" className="w-full">
            <TabsList className="w-full justify-start bg-slate-900/40 backdrop-blur-md border border-[#ffffff10] p-1 mb-4 sm:mb-6 overflow-x-auto flex-nowrap">
              <TabsTrigger
                value="academy"
                className="data-[state=active]:bg-bio-green/20 data-[state=active]:text-bio-green gap-1.5 sm:gap-2 min-h-[44px] text-xs sm:text-sm whitespace-nowrap"
              >
                <GraduationCap className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Academy</span>
                <span className="sm:hidden">Learn</span>
              </TabsTrigger>
              <TabsTrigger
                value="sdg-tracker"
                className="data-[state=active]:bg-bio-green/20 data-[state=active]:text-bio-green gap-1.5 sm:gap-2 min-h-[44px] text-xs sm:text-sm whitespace-nowrap"
              >
                <Target className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">SDG Tracker</span>
                <span className="sm:hidden">SDGs</span>
              </TabsTrigger>
              <TabsTrigger
                value="governance"
                className="data-[state=active]:bg-bio-green/20 data-[state=active]:text-bio-green gap-1.5 sm:gap-2 min-h-[44px] text-xs sm:text-sm whitespace-nowrap"
              >
                <FileText className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Governance</span>
                <span className="sm:hidden">Docs</span>
              </TabsTrigger>
            </TabsList>

            <div className="bg-slate-900/40 backdrop-blur-md border border-[#ffffff10] rounded-2xl p-3 sm:p-4 lg:p-6 xl:p-8 min-h-[500px] sm:min-h-[600px]">
              <TabsContent value="academy" className="mt-0">
                <Academy />
              </TabsContent>

              <TabsContent value="sdg-tracker" className="mt-0">
                <SDGTracker />
              </TabsContent>

              <TabsContent value="governance" className="mt-0">
                <Governance />
              </TabsContent>
            </div>
          </Tabs>
        </motion.div>
      </div>
    </section>
  )
}
