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
        isScrolled ? "glass-strong" : "bg-transparent"
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
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/20 glow-green">
              <Waves className="h-5 w-5 text-primary" />
            </div>
            <span className="text-lg font-semibold tracking-tight text-foreground">SellWeed</span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
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
              className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 glow-green"
            >
              Get Started
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 text-foreground">
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-strong rounded-b-xl mt-2 pb-4"
          >
            <div className="flex flex-col gap-2 px-4 pt-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="flex items-center justify-between pt-4 border-t border-border mt-2">
                <LiveStatusIndicator />
                <button className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
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
