"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"

const manifestoSections = [
  {
    year: "2024",
    title: "The Beginning",
    text: "We plant the first seeds in the Bay of Bengal.",
    emphasis: ["first seeds", "Bay of Bengal"],
  },
  {
    year: "2028",
    title: "Expansion",
    text: "A network of 100 farms spans the delta, employing 10,000 coastal communities.",
    emphasis: ["100 farms", "10,000 coastal communities"],
  },
  {
    year: "2033",
    title: "Transformation",
    text: "Seaweed becomes the cornerstone of a regenerative blue economy.",
    emphasis: ["regenerative blue economy"],
  },
  {
    year: "2041",
    title: "The Vision Realized",
    text: "A restored delta. A thriving ocean. A model for the world.",
    emphasis: ["restored delta", "thriving ocean", "model for the world"],
  },
]

function ManifestoBlock({
  section,
  index,
}: {
  section: (typeof manifestoSections)[0]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, margin: "-30%" })

  // Highlight emphasized words
  const renderText = (text: string, emphasisWords: string[]) => {
    let result = text
    emphasisWords.forEach((word) => {
      result = result.replace(word, `<span class="text-primary text-glow-green font-bold">${word}</span>`)
    })
    return <span dangerouslySetInnerHTML={{ __html: result }} />
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0.1 }}
      transition={{ duration: 0.8 }}
      className="relative py-16 md:py-24"
    >
      {/* Year badge */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: isInView ? 1 : 0.8, opacity: isInView ? 1 : 0.3 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6"
      >
        <span className="h-2 w-2 rounded-full bg-primary" />
        <span className="text-sm font-mono text-primary">{section.year}</span>
      </motion.div>

      {/* Title */}
      <motion.h3
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: isInView ? 0 : 30, opacity: isInView ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-2xl md:text-3xl font-bold text-foreground mb-4"
      >
        {section.title}
      </motion.h3>

      {/* Main text with kinetic typography */}
      <motion.p
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: isInView ? 0 : 40, opacity: isInView ? 1 : 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="text-xl md:text-2xl lg:text-3xl text-muted-foreground leading-relaxed max-w-3xl"
      >
        {renderText(section.text, section.emphasis)}
      </motion.p>

      {/* Decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isInView ? 1 : 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="mt-8 h-px w-24 bg-gradient-to-r from-primary to-transparent origin-left"
      />
    </motion.div>
  )
}

export function Manifesto2041() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])

  return (
    <div ref={containerRef} className="relative">
      {/* Cinematic gradient overlay */}
      <motion.div
        style={{ opacity }}
        className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--teal-deep)_0%,_transparent_60%)] opacity-20 z-0"
      />

      <div className="relative z-10 space-y-4">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-sm font-medium text-primary mb-4"
          >
            The 2041 Manifesto
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance"
          >
            A Vision for a <span className="text-primary text-glow-green">Restored Delta</span>
          </motion.h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent hidden md:block" />

          {manifestoSections.map((section, index) => (
            <ManifestoBlock key={section.year} section={section} index={index} />
          ))}
        </div>

        {/* Closing statement */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center py-16 md:py-24"
        >
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            This is not a prediction. This is a commitment.
          </p>
          <div className="inline-flex items-center gap-3 glass-strong rounded-full px-6 py-3 glow-green">
            <span className="h-3 w-3 rounded-full bg-primary pulse-live" />
            <span className="text-sm font-semibold text-foreground">Join the Movement</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
