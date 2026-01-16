"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Waves, Home, Globe, Banknote, Shield, Info } from "lucide-react"
import { LiveStatusIndicator } from "./live-status-indicator"

const navLinks = [
  { name: "Strategy", href: "#strategy", icon: Home },
  { name: "Network", href: "#network", icon: Globe },
  { name: "Economy", href: "#economy", icon: Banknote },
  { name: "Resilience", href: "#resilience", icon: Shield },
  { name: "About", href: "#about", icon: Info },
]

export function GlobalNav() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("strategy")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Desktop & Tablet Navigation - Top sticky bar */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 hidden md:block ${
          isScrolled ? "bg-[#162035]/85 backdrop-blur-md border-b border-[#ffffff10]" : "bg-transparent"
        }`}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <motion.a
              href="#"
              className="flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#26DE81]/20 glow-teal">
                <Waves className="h-5 w-5 text-[#26DE81]" />
              </div>
              <span className="text-lg font-semibold tracking-tight text-[#F1FAEE]">SellWeed</span>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="flex items-center gap-6 lg:gap-8">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-[#8B9CB6] transition-colors hover:text-[#F1FAEE]"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            {/* Live Status + CTA */}
            <div className="flex items-center gap-4">
              <LiveStatusIndicator />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="rounded-full bg-[#26DE81] px-4 py-2 min-h-[44px] text-sm font-medium text-[#0B1120] transition-all hover:bg-[#26DE81]/90 glow-teal"
              >
                Get Started
              </motion.button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Top Bar - Logo and hamburger only */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 md:hidden ${
          isScrolled ? "bg-[#162035]/85 backdrop-blur-md border-b border-[#ffffff10]" : "bg-transparent"
        }`}
      >
        <nav className="px-4">
          <div className="flex h-14 items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#26DE81]/20 glow-teal">
                <Waves className="h-4 w-4 text-[#26DE81]" />
              </div>
              <span className="text-base font-semibold tracking-tight text-[#F1FAEE]">SellWeed</span>
            </a>

            <div className="flex items-center gap-3">
              <LiveStatusIndicator />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-[#F1FAEE]"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Sidebar Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                onClick={() => setIsMobileMenuOpen(false)}
              />

              {/* Sidebar */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 h-full w-72 bg-[#162035]/95 backdrop-blur-md border-l border-[#ffffff10] z-50 flex flex-col"
              >
                {/* Sidebar Header */}
                <div className="flex items-center justify-between p-4 border-b border-[#ffffff10]">
                  <span className="text-lg font-semibold text-[#F1FAEE]">Menu</span>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-[#F1FAEE]"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {/* Nav Links */}
                <div className="flex-1 overflow-y-auto py-4">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="flex items-center gap-3 px-4 py-3 min-h-[48px] text-base font-medium text-[#8B9CB6] transition-colors hover:text-[#F1FAEE] hover:bg-[#ffffff10]"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <link.icon className="h-5 w-5" />
                      {link.name}
                    </a>
                  ))}
                </div>

                {/* CTA */}
                <div className="p-4 border-t border-[#ffffff10]">
                  <button className="w-full rounded-full bg-[#26DE81] px-4 py-3 min-h-[48px] text-base font-medium text-[#0B1120]">
                    Get Started
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile Bottom Navigation - Docked */}
      <motion.nav
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#162035]/95 backdrop-blur-md border-t border-[#ffffff10] safe-area-pb"
      >
        <div className="flex items-center justify-around px-2 py-1">
          {navLinks.slice(0, 4).map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`flex flex-col items-center justify-center gap-1 min-h-[56px] min-w-[56px] px-3 py-2 rounded-lg transition-colors ${
                activeSection === link.name.toLowerCase() ? "text-[#26DE81]" : "text-[#8B9CB6]"
              }`}
              onClick={() => setActiveSection(link.name.toLowerCase())}
            >
              <link.icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{link.name}</span>
            </a>
          ))}
        </div>
      </motion.nav>
    </>
  )
}
