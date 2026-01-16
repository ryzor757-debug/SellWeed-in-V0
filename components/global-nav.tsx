"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Menu, X, Waves } from "lucide-react"
import { LiveStatusIndicator } from "./live-status-indicator"

const navLinks = [
  { name: "Strategy", href: "#strategy" },
  { name: "Network", href: "#network" },
  { name: "Economy", href: "#economy" },
  { name: "Resilience", href: "#resilience" },
  { name: "About", href: "#about" },
]

export function GlobalNav() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
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
          <div className="hidden md:flex md:items-center md:gap-8">
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
          <div className="hidden md:flex md:items-center md:gap-4">
            <LiveStatusIndicator />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-full bg-[#26DE81] px-4 py-2 text-sm font-medium text-[#0B1120] transition-all hover:bg-[#26DE81]/90 glow-teal"
            >
              Get Started
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 text-[#F1FAEE]">
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu - Updated with backdrop-blur-md */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#162035]/90 backdrop-blur-md rounded-b-xl mt-2 pb-4 border border-[#ffffff10]"
          >
            <div className="flex flex-col gap-2 px-4 pt-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="py-2 text-sm font-medium text-[#8B9CB6] transition-colors hover:text-[#F1FAEE]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="flex items-center justify-between pt-4 border-t border-[#ffffff10] mt-2">
                <LiveStatusIndicator />
                <button className="rounded-full bg-[#26DE81] px-4 py-2 text-sm font-medium text-[#0B1120]">
                  Get Started
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  )
}
