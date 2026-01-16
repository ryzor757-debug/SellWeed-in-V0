"use client"

import { motion } from "framer-motion"
import { Waves, Github, Twitter, Linkedin, Mail } from "lucide-react"

const footerLinks = {
  product: [
    { name: "Strategy", href: "#strategy" },
    { name: "Network", href: "#network" },
    { name: "Economy", href: "#economy" },
    { name: "Resilience", href: "#resilience" },
  ],
  company: [
    { name: "About", href: "#about" },
    { name: "Careers", href: "#" },
    { name: "Press", href: "#" },
    { name: "Partners", href: "#" },
  ],
  resources: [
    { name: "Documentation", href: "#" },
    { name: "Research", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Support", href: "#" },
  ],
  legal: [
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
    { name: "Cookies", href: "#" },
  ],
}

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Mail, href: "#", label: "Email" },
]

export function Footer() {
  return (
    <footer className="relative border-t border-[#ffffff10] bg-[#0B1120]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_#0D4F54_0%,_transparent_60%)] opacity-10" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#26DE81]/20 glow-teal">
                <Waves className="h-5 w-5 text-[#26DE81]" />
              </div>
              <span className="text-lg font-semibold tracking-tight text-[#F1FAEE]">SellWeed</span>
            </a>
            <p className="text-sm text-[#8B9CB6] mb-6 max-w-xs">
              Pioneering sustainable ocean farming for a climate-positive future.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="flex h-9 w-9 items-center justify-center bg-[#162035] border border-[#ffffff10] rounded-lg text-[#8B9CB6] hover:text-[#F1FAEE] transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-[#F1FAEE] mb-4">Product</h4>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm text-[#8B9CB6] hover:text-[#F1FAEE] transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#F1FAEE] mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm text-[#8B9CB6] hover:text-[#F1FAEE] transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#F1FAEE] mb-4">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm text-[#8B9CB6] hover:text-[#F1FAEE] transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#F1FAEE] mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm text-[#8B9CB6] hover:text-[#F1FAEE] transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-[#ffffff10] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#8B9CB6]">© 2026 Project SellWeed. All rights reserved.</p>
          <div className="flex items-center gap-2 bg-[#162035] border border-[#ffffff10] rounded-full px-3 py-1.5">
            <span className="h-2 w-2 rounded-full bg-[#26DE81] pulse-live" />
            <span className="text-xs text-[#8B9CB6]">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
