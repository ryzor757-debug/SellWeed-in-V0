"use client"

import { motion } from "framer-motion"
import { Banknote, Briefcase, Scale, Landmark } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GiggerHub } from "./gigger-hub"
import { Exchange } from "./exchange"
import { OracleDesk } from "./oracle-desk"

export function EconomySection() {
  return (
    <section id="economy-detail" className="relative py-16 sm:py-24 lg:py-32">
      {/* Background effects - more transparent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_#0D4F54_0%,_transparent_50%)] opacity-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#1A9D5C_0%,_transparent_50%)] opacity-5" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <span className="inline-flex items-center gap-2 bg-slate-900/40 backdrop-blur-md border border-[#ffffff10] rounded-full px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-medium text-[#26DE81] mb-3 sm:mb-4">
            <Banknote className="h-3 w-3 sm:h-4 sm:w-4" />
            Economy Module
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#F1FAEE] mb-3 sm:mb-4 text-balance">
            Blue Economy Dashboard
          </h2>
          <p className="mx-auto max-w-2xl text-[#8B9CB6] text-sm sm:text-base lg:text-lg px-2">
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
            <TabsList className="w-full justify-start bg-slate-900/40 backdrop-blur-md border border-[#ffffff10] p-1 mb-4 sm:mb-6 overflow-x-auto flex-nowrap">
              <TabsTrigger
                value="gigger-hub"
                className="data-[state=active]:bg-[#26DE81]/20 data-[state=active]:text-[#26DE81] gap-1.5 sm:gap-2 text-[#8B9CB6] min-h-[44px] text-xs sm:text-sm whitespace-nowrap"
              >
                <Briefcase className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Gigger Hub</span>
                <span className="sm:hidden">Gigs</span>
              </TabsTrigger>
              <TabsTrigger
                value="exchange"
                className="data-[state=active]:bg-[#26DE81]/20 data-[state=active]:text-[#26DE81] gap-1.5 sm:gap-2 text-[#8B9CB6] min-h-[44px] text-xs sm:text-sm whitespace-nowrap"
              >
                <Scale className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Exchange</span>
                <span className="sm:hidden">Trade</span>
              </TabsTrigger>
              <TabsTrigger
                value="oracle-desk"
                className="data-[state=active]:bg-[#26DE81]/20 data-[state=active]:text-[#26DE81] gap-1.5 sm:gap-2 text-[#8B9CB6] min-h-[44px] text-xs sm:text-sm whitespace-nowrap"
              >
                <Landmark className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Oracle Desk</span>
                <span className="sm:hidden">Oracle</span>
              </TabsTrigger>
            </TabsList>

            <div className="bg-slate-900/40 backdrop-blur-md border border-[#ffffff10] rounded-2xl p-3 sm:p-4 lg:p-6 xl:p-8 min-h-[500px] sm:min-h-[600px]">
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
