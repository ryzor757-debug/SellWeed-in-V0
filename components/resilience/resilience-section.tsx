"use client"

import { motion } from "framer-motion"
import { Shield, GraduationCap, Target, FileText } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Academy } from "./academy"
import { SDGTracker } from "./sdg-tracker"
import { Governance } from "./governance"

export function ResilienceSection() {
  return (
    <section id="resilience-detail" className="relative py-24 sm:py-32">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--bio-green-dim)_0%,_transparent_50%)] opacity-15" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--teal-deep)_0%,_transparent_50%)] opacity-20" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-sm font-medium text-bio-green mb-4">
            <Shield className="h-4 w-4" />
            Resilience Module
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Impact & Resilience
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground text-lg">
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
            <TabsList className="w-full justify-start glass border-0 p-1 mb-6 overflow-x-auto">
              <TabsTrigger
                value="academy"
                className="data-[state=active]:bg-bio-green/20 data-[state=active]:text-bio-green gap-2"
              >
                <GraduationCap className="h-4 w-4" />
                <span className="hidden sm:inline">Academy</span>
                <span className="sm:hidden">Learn</span>
              </TabsTrigger>
              <TabsTrigger
                value="sdg-tracker"
                className="data-[state=active]:bg-bio-green/20 data-[state=active]:text-bio-green gap-2"
              >
                <Target className="h-4 w-4" />
                <span className="hidden sm:inline">SDG Tracker</span>
                <span className="sm:hidden">SDGs</span>
              </TabsTrigger>
              <TabsTrigger
                value="governance"
                className="data-[state=active]:bg-bio-green/20 data-[state=active]:text-bio-green gap-2"
              >
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">Governance</span>
                <span className="sm:hidden">Docs</span>
              </TabsTrigger>
            </TabsList>

            <div className="glass rounded-2xl p-4 sm:p-6 lg:p-8 min-h-[600px]">
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
