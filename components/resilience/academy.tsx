"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Play,
  Clock,
  Users,
  Award,
  CheckCircle2,
  Lock,
  ChevronRight,
  BookOpen,
  Microscope,
  Anchor,
  Leaf,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface Tutorial {
  id: string
  title: string
  description: string
  category: "seeding" | "harvesting" | "quality" | "safety"
  duration: string
  enrolled: number
  modules: number
  completedModules: number
  thumbnail: string
  difficulty: "beginner" | "intermediate" | "advanced"
  unlocks: string[]
  quizQuestions: number
  passingScore: number
}

const tutorials: Tutorial[] = [
  {
    id: "seeding-101",
    title: "Seeding Fundamentals",
    description: "Learn the basics of seaweed seeding, from spore selection to rope attachment techniques.",
    category: "seeding",
    duration: "45 min",
    enrolled: 342,
    modules: 5,
    completedModules: 0,
    thumbnail: "/seaweed-seeding-underwater-farming.jpg",
    difficulty: "beginner",
    unlocks: ["Seeding Gigs", "Nursery Assistant"],
    quizQuestions: 10,
    passingScore: 80,
  },
  {
    id: "quality-control",
    title: "Quality Control & Grading",
    description: "Master the art of biomass inspection, grading standards, and contamination detection.",
    category: "quality",
    duration: "1h 15min",
    enrolled: 187,
    modules: 7,
    completedModules: 0,
    thumbnail: "/laboratory-quality-control-inspection.jpg",
    difficulty: "intermediate",
    unlocks: ["QC Inspector", "Verification Lead"],
    quizQuestions: 15,
    passingScore: 85,
  },
  {
    id: "harvesting-pro",
    title: "Sustainable Harvesting",
    description: "Advanced techniques for maximizing yield while maintaining ecological balance.",
    category: "harvesting",
    duration: "1h 30min",
    enrolled: 256,
    modules: 8,
    completedModules: 0,
    thumbnail: "/seaweed-harvesting-boat-ocean.jpg",
    difficulty: "advanced",
    unlocks: ["Harvest Lead", "Senior Harvester"],
    quizQuestions: 20,
    passingScore: 80,
  },
  {
    id: "safety-protocols",
    title: "Ocean Safety & First Aid",
    description: "Essential safety protocols, emergency procedures, and first aid for coastal workers.",
    category: "safety",
    duration: "2h",
    enrolled: 512,
    modules: 10,
    completedModules: 0,
    thumbnail: "/ocean-safety-training-lifeboat.jpg",
    difficulty: "beginner",
    unlocks: ["All Field Gigs"],
    quizQuestions: 25,
    passingScore: 90,
  },
]

const categoryConfig = {
  seeding: { icon: Leaf, color: "text-bio-green", bg: "bg-bio-green/20" },
  harvesting: { icon: Anchor, color: "text-teal-glow", bg: "bg-teal-glow/20" },
  quality: { icon: Microscope, color: "text-accent", bg: "bg-accent/20" },
  safety: { icon: Award, color: "text-chart-4", bg: "bg-chart-4/20" },
}

const difficultyColors = {
  beginner: "bg-bio-green/20 text-bio-green",
  intermediate: "bg-teal-glow/20 text-teal-glow",
  advanced: "bg-accent/20 text-accent",
}

export function Academy() {
  const [selectedTutorial, setSelectedTutorial] = useState<Tutorial | null>(null)
  const [quizState, setQuizState] = useState<"idle" | "taking" | "passed" | "failed">("idle")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [tutorialProgress, setTutorialProgress] = useState<Record<string, number>>({})

  const startQuiz = (tutorial: Tutorial) => {
    setSelectedTutorial(tutorial)
    setQuizState("taking")
    setCurrentQuestion(0)
    setScore(0)
  }

  const answerQuestion = (correct: boolean) => {
    if (correct) setScore((prev) => prev + 1)

    if (selectedTutorial && currentQuestion < selectedTutorial.quizQuestions - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else if (selectedTutorial) {
      const finalScore = correct ? score + 1 : score
      const percentage = (finalScore / selectedTutorial.quizQuestions) * 100
      if (percentage >= selectedTutorial.passingScore) {
        setQuizState("passed")
        setTutorialProgress((prev) => ({
          ...prev,
          [selectedTutorial.id]: 100,
        }))
      } else {
        setQuizState("failed")
      }
    }
  }

  const closeQuiz = () => {
    setSelectedTutorial(null)
    setQuizState("idle")
  }

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Courses", value: tutorials.length, icon: BookOpen },
          { label: "Enrolled Workers", value: "1,297", icon: Users },
          { label: "Certifications", value: "847", icon: Award },
          { label: "Gigs Unlocked", value: "2,340", icon: CheckCircle2 },
        ].map((stat) => (
          <div key={stat.label} className="glass rounded-xl p-4 text-center">
            <stat.icon className="h-5 w-5 text-primary mx-auto mb-2" />
            <div className="text-xl sm:text-2xl font-bold text-foreground">{stat.value}</div>
            <div className="text-xs text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Tutorial Grid */}
      <div className="grid gap-6 sm:grid-cols-2">
        {tutorials.map((tutorial, index) => {
          const CategoryIcon = categoryConfig[tutorial.category].icon
          const isCompleted = tutorialProgress[tutorial.id] === 100

          return (
            <motion.div
              key={tutorial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-2xl overflow-hidden group hover:glow-teal transition-all duration-300"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={tutorial.thumbnail || "/placeholder.svg"}
                  alt={tutorial.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

                {/* Play overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center">
                    <Play className="h-8 w-8 text-primary-foreground ml-1" />
                  </div>
                </div>

                {/* Duration badge */}
                <div className="absolute top-3 right-3 glass rounded-full px-3 py-1 text-xs font-medium text-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {tutorial.duration}
                </div>

                {/* Category badge */}
                <div
                  className={`absolute top-3 left-3 ${categoryConfig[tutorial.category].bg} rounded-full px-3 py-1 text-xs font-medium ${categoryConfig[tutorial.category].color} flex items-center gap-1`}
                >
                  <CategoryIcon className="h-3 w-3" />
                  {tutorial.category.charAt(0).toUpperCase() + tutorial.category.slice(1)}
                </div>

                {isCompleted && (
                  <div className="absolute bottom-3 left-3 bg-bio-green/90 text-bio-green-foreground rounded-full px-3 py-1 text-xs font-bold flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    Certified
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {tutorial.title}
                  </h3>
                  <Badge className={difficultyColors[tutorial.difficulty]}>{tutorial.difficulty}</Badge>
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{tutorial.description}</p>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>{tutorialProgress[tutorial.id] || 0}% complete</span>
                    <span>{tutorial.modules} modules</span>
                  </div>
                  <Progress value={tutorialProgress[tutorial.id] || 0} className="h-1.5" />
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {tutorial.enrolled} enrolled
                  </span>
                  <span className="flex items-center gap-1">
                    <Award className="h-3 w-3" />
                    {tutorial.passingScore}% to pass
                  </span>
                </div>

                {/* Unlocks */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {tutorial.unlocks.map((unlock) => (
                    <span
                      key={unlock}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs"
                    >
                      {isCompleted ? <CheckCircle2 className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
                      {unlock}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 glass border-glass-border hover:bg-primary/20 bg-transparent"
                    onClick={() =>
                      setTutorialProgress((prev) => ({
                        ...prev,
                        [tutorial.id]: Math.min((prev[tutorial.id] || 0) + 20, 100),
                      }))
                    }
                  >
                    <Play className="h-4 w-4 mr-2" />
                    {tutorialProgress[tutorial.id] ? "Continue" : "Start"}
                  </Button>
                  <Button
                    className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                    onClick={() => startQuiz(tutorial)}
                    disabled={isCompleted}
                  >
                    {isCompleted ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Passed
                      </>
                    ) : (
                      <>
                        <Award className="h-4 w-4 mr-2" />
                        Start Quiz
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Quiz Modal */}
      <AnimatePresence>
        {selectedTutorial && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={closeQuiz}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass rounded-2xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-foreground">
                  {quizState === "taking"
                    ? "Certification Quiz"
                    : quizState === "passed"
                      ? "Congratulations!"
                      : "Try Again"}
                </h3>
                <Button variant="ghost" size="icon" onClick={closeQuiz}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {quizState === "taking" && (
                <>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-muted-foreground mb-2">
                      <span>
                        Question {currentQuestion + 1} of {selectedTutorial.quizQuestions}
                      </span>
                      <span>Score: {score}</span>
                    </div>
                    <Progress value={((currentQuestion + 1) / selectedTutorial.quizQuestions) * 100} className="h-2" />
                  </div>

                  <div className="glass rounded-xl p-4 mb-6">
                    <p className="text-foreground font-medium mb-4">
                      Sample question about {selectedTutorial.title.toLowerCase()}?
                    </p>
                    <div className="space-y-2">
                      {["Correct Answer", "Wrong Answer A", "Wrong Answer B", "Wrong Answer C"].map((answer, i) => (
                        <Button
                          key={answer}
                          variant="outline"
                          className="w-full justify-start glass border-glass-border hover:bg-primary/20 bg-transparent"
                          onClick={() => answerQuestion(i === 0)}
                        >
                          <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs mr-3">
                            {String.fromCharCode(65 + i)}
                          </span>
                          {answer}
                        </Button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {quizState === "passed" && (
                <div className="text-center py-6">
                  <div className="w-20 h-20 rounded-full bg-bio-green/20 flex items-center justify-center mx-auto mb-4">
                    <Award className="h-10 w-10 text-bio-green" />
                  </div>
                  <h4 className="text-2xl font-bold text-foreground mb-2">You Passed!</h4>
                  <p className="text-muted-foreground mb-4">
                    Score: {score}/{selectedTutorial.quizQuestions} (
                    {Math.round((score / selectedTutorial.quizQuestions) * 100)}%)
                  </p>
                  <p className="text-sm text-accent mb-6">
                    You&apos;ve unlocked: {selectedTutorial.unlocks.join(", ")}
                  </p>
                  <Button className="bg-primary hover:bg-primary/90" onClick={closeQuiz}>
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Claim Certificate
                  </Button>
                </div>
              )}

              {quizState === "failed" && (
                <div className="text-center py-6">
                  <div className="w-20 h-20 rounded-full bg-destructive/20 flex items-center justify-center mx-auto mb-4">
                    <X className="h-10 w-10 text-destructive" />
                  </div>
                  <h4 className="text-2xl font-bold text-foreground mb-2">Not Quite</h4>
                  <p className="text-muted-foreground mb-4">
                    Score: {score}/{selectedTutorial.quizQuestions} (
                    {Math.round((score / selectedTutorial.quizQuestions) * 100)}%)
                  </p>
                  <p className="text-sm text-muted-foreground mb-6">
                    You need {selectedTutorial.passingScore}% to pass. Review the material and try again.
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 bg-transparent" onClick={closeQuiz}>
                      Review Course
                    </Button>
                    <Button className="flex-1" onClick={() => startQuiz(selectedTutorial)}>
                      <ChevronRight className="h-4 w-4 mr-2" />
                      Retry Quiz
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
