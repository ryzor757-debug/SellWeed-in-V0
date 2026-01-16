"use client"

import { motion } from "framer-motion"
import { Banknote, Briefcase, Scale, Landmark } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GiggerHub } from "./gigger-hub"
import { Exchange } from "./exchange"
import { OracleDesk } from "./oracle-desk"

export function EconomySection() {
  return (
    <section id="economy-detail" className="relative py-24 sm:py-32">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--teal-deep)_0%,_transparent_50%)] opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--bio-green-dim)_0%,_transparent_50%)] opacity-10" />

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
            <Banknote className="h-4 w-4" />
            Economy Module
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Blue Economy Dashboard
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground text-lg">
            A circular economy powering coastal livelihoods through gig work, carbon credits, and transparent
            verification.
          </p>
        </motion.div>

        {/* Tabbed Interface */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs defaultValue="gigger-hub" className="w-full">
            <TabsList className="w-full justify-start glass border-0 p-1 mb-6 overflow-x-auto">
              <TabsTrigger
                value="gigger-hub"
                className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary gap-2"
              >
                <Briefcase className="h-4 w-4" />
                <span className="hidden sm:inline">Gigger Hub</span>
                <span className="sm:hidden">Gigs</span>
              </TabsTrigger>
              <TabsTrigger
                value="exchange"
                className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary gap-2"
              >
                <Scale className="h-4 w-4" />
                <span className="hidden sm:inline">Exchange</span>
                <span className="sm:hidden">Trade</span>
              </TabsTrigger>
              <TabsTrigger
                value="oracle-desk"
                className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary gap-2"
              >
                <Landmark className="h-4 w-4" />
                <span className="hidden sm:inline">Oracle Desk</span>
                <span className="sm:hidden">Oracle</span>
              </TabsTrigger>
            </TabsList>

            <div className="glass rounded-2xl p-4 sm:p-6 lg:p-8 min-h-[600px]">
              <TabsContent value="gigger-hub" className="mt-0">
                <GiggerHub />
              </TabsContent>

              <TabsContent value="exchange" className="mt-0">
                <Exchange />
              </TabsContent>

              <TabsContent value="oracle-desk" className="mt-0">
                <OracleDesk />
              </TabsContent>
            </div>
          </Tabs>
        </motion.div>
      </div>
    </section>
  )
}
