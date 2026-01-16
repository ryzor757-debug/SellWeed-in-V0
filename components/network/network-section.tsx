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
    <section id="network-detail" className="relative py-24 sm:py-32">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--teal-deep)_0%,_transparent_50%)] opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--bio-green-dim)_0%,_transparent_50%)] opacity-10" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-sm font-medium text-accent mb-4">
            <Globe className="h-4 w-4" />
            Network Module
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Global Ocean Farm Network
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground text-lg">
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
          className="glass rounded-2xl p-4 sm:p-6 mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/20">
              <Globe className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Pilot Site Locations</h3>
              <p className="text-sm text-muted-foreground">Interactive 3D visualization of ocean farms</p>
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
            <TabsList className="w-full justify-start glass border-0 p-1 mb-6 overflow-x-auto">
              <TabsTrigger
                value="digital-twin"
                className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary gap-2"
              >
                <Database className="h-4 w-4" />
                <span className="hidden sm:inline">Digital Twin</span>
                <span className="sm:hidden">Twin</span>
              </TabsTrigger>
              <TabsTrigger
                value="3d-trace"
                className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary gap-2"
              >
                <Sparkles className="h-4 w-4" />
                <span className="hidden sm:inline">3D Trace</span>
                <span className="sm:hidden">Trace</span>
              </TabsTrigger>
              <TabsTrigger
                value="manifesto"
                className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary gap-2"
              >
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">The 2041 Manifesto</span>
                <span className="sm:hidden">2041</span>
              </TabsTrigger>
            </TabsList>

            <div className="glass rounded-2xl p-4 sm:p-6 lg:p-8 min-h-[500px]">
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
