"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sprout, Scissors, MapPin, Clock, Users, ChevronRight, Filter, CheckCircle2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type GigType = "seeding" | "harvesting"

interface Gig {
  id: string
  title: string
  type: GigType
  location: string
  date: string
  duration: string
  pay: string
  slots: number
  slotsAvailable: number
  skills: string[]
  urgent?: boolean
}

const gigs: Gig[] = [
  {
    id: "1",
    title: "Kelp Line Seeding",
    type: "seeding",
    location: "St. Martin's Island, Zone A",
    date: "Jan 20, 2026",
    duration: "6 hours",
    pay: "৳2,500",
    slots: 8,
    slotsAvailable: 3,
    skills: ["Line handling", "Basic diving"],
    urgent: true,
  },
  {
    id: "2",
    title: "Gracilaria Harvest Cycle",
    type: "harvesting",
    location: "Cox's Bazar, Sector 3",
    date: "Jan 22, 2026",
    duration: "8 hours",
    pay: "৳3,200",
    slots: 12,
    slotsAvailable: 5,
    skills: ["Boat operation", "Net handling"],
  },
  {
    id: "3",
    title: "Nursery Rope Preparation",
    type: "seeding",
    location: "St. Martin's Island, Zone B",
    date: "Jan 24, 2026",
    duration: "4 hours",
    pay: "৳1,800",
    slots: 6,
    slotsAvailable: 6,
    skills: ["Rope work", "Knot tying"],
  },
  {
    id: "4",
    title: "Bulk Biomass Collection",
    type: "harvesting",
    location: "Cox's Bazar, Sector 1",
    date: "Jan 25, 2026",
    duration: "10 hours",
    pay: "৳4,000",
    slots: 15,
    slotsAvailable: 8,
    skills: ["Heavy lifting", "Team coordination"],
    urgent: true,
  },
  {
    id: "5",
    title: "Spore Inoculation",
    type: "seeding",
    location: "Cox's Bazar, Sector 2",
    date: "Jan 27, 2026",
    duration: "5 hours",
    pay: "৳2,800",
    slots: 4,
    slotsAvailable: 2,
    skills: ["Precision work", "Lab basics"],
  },
]

export function GiggerHub() {
  const [filter, setFilter] = useState<"all" | "seeding" | "harvesting">("all")
  const [appliedGigs, setAppliedGigs] = useState<string[]>([])

  const filteredGigs = gigs.filter((gig) => (filter === "all" ? true : gig.type === filter))

  const handleApply = (gigId: string) => {
    setAppliedGigs((prev) => [...prev, gigId])
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-[#F1FAEE]">Available Gigs</h3>
          <p className="text-xs sm:text-sm text-[#8B9CB6] mt-1">
            {filteredGigs.length} opportunities for coastal workers
          </p>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-[#8B9CB6]" />
          <div className="flex gap-1 bg-[#162035] border border-[#ffffff10] rounded-lg p-1 overflow-x-auto">
            {(["all", "seeding", "harvesting"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-3 py-2 min-h-[44px] rounded-md text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                  filter === type ? "bg-[#26DE81]/20 text-[#26DE81]" : "text-[#8B9CB6] hover:text-[#F1FAEE]"
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gig Cards */}
      <div className="grid gap-3 sm:gap-4">
        <AnimatePresence mode="popLayout">
          {filteredGigs.map((gig, index) => (
            <motion.div
              key={gig.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-slate-900/40 backdrop-blur-md border border-[#ffffff10] rounded-xl p-3 sm:p-4 lg:p-5 hover:bg-[#1A2538] transition-colors group"
            >
              <div className="flex flex-col gap-3 sm:gap-4">
                {/* Icon and Title */}
                <div className="flex items-start gap-3 sm:gap-4">
                  <div
                    className={`flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl ${
                      gig.type === "seeding" ? "bg-[#26DE81]/20 text-[#26DE81]" : "bg-[#635BFF]/20 text-[#635BFF]"
                    }`}
                  >
                    {gig.type === "seeding" ? (
                      <Sprout className="h-5 w-5 sm:h-6 sm:w-6" />
                    ) : (
                      <Scissors className="h-5 w-5 sm:h-6 sm:w-6" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-semibold text-sm sm:text-base text-[#F1FAEE]">{gig.title}</h4>
                      {gig.urgent && (
                        <Badge className="bg-[#FF6B6B]/20 text-[#FF6B6B] border-[#FF6B6B]/30 text-[10px] sm:text-xs">
                          Urgent
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-2 sm:gap-4 mt-1.5 sm:mt-2 text-xs sm:text-sm text-[#8B9CB6] flex-wrap">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        <span className="truncate max-w-[150px] sm:max-w-none">{gig.location}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        {gig.date}
                      </span>
                    </div>

                    {/* Skills */}
                    <div className="flex items-center gap-1.5 sm:gap-2 mt-2 sm:mt-3 flex-wrap">
                      {gig.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full bg-[#1A2538] border border-[#ffffff10] text-[#8B9CB6]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Stats and Action */}
                <div className="flex items-center justify-between gap-4 pt-3 border-t border-[#ffffff10]">
                  <div className="flex items-center gap-4 sm:gap-6">
                    <div className="flex flex-col items-center">
                      <span className="text-base sm:text-lg font-bold text-[#26DE81]">{gig.pay}</span>
                      <span className="text-[10px] sm:text-xs text-[#8B9CB6]">{gig.duration}</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#8B9CB6]" />
                        <span className="font-semibold text-sm sm:text-base text-[#F1FAEE]">
                          {gig.slotsAvailable}/{gig.slots}
                        </span>
                      </div>
                      <span className="text-[10px] sm:text-xs text-[#8B9CB6]">slots</span>
                    </div>
                  </div>

                  {appliedGigs.includes(gig.id) ? (
                    <Button
                      variant="outline"
                      size="sm"
                      disabled
                      className="border-[#26DE81]/30 text-[#26DE81] gap-1 bg-transparent min-h-[44px] text-xs sm:text-sm"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      Applied
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => handleApply(gig.id)}
                      className="bg-[#26DE81] hover:bg-[#26DE81]/90 text-[#0B1120] border-0 gap-1 font-medium min-h-[44px] text-xs sm:text-sm"
                    >
                      Apply
                      <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4 border-t border-[#ffffff10]"
      >
        <div className="text-center">
          <div className="text-lg sm:text-2xl font-bold text-[#26DE81]">৳14.3K</div>
          <div className="text-[10px] sm:text-xs text-[#8B9CB6]">Total Earnings Available</div>
        </div>
        <div className="text-center">
          <div className="text-lg sm:text-2xl font-bold text-[#635BFF]">24</div>
          <div className="text-[10px] sm:text-xs text-[#8B9CB6]">Open Slots</div>
        </div>
        <div className="text-center">
          <div className="text-lg sm:text-2xl font-bold text-[#F1FAEE]">5</div>
          <div className="text-[10px] sm:text-xs text-[#8B9CB6]">Active Gigs</div>
        </div>
        <div className="text-center">
          <div className="text-lg sm:text-2xl font-bold text-[#F1FAEE]">2</div>
          <div className="text-[10px] sm:text-xs text-[#8B9CB6]">Urgent Needs</div>
        </div>
      </motion.div>
    </div>
  )
}
