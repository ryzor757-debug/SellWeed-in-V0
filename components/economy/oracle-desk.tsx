"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Upload,
  FileImage,
  CheckCircle2,
  XCircle,
  Clock,
  Wallet,
  ShieldCheck,
  AlertTriangle,
  Send,
  Eye,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface Submission {
  id: string
  fileName: string
  fileSize: string
  timestamp: string
  status: "pending" | "verified" | "rejected"
  biomassKg?: number
  creditValue?: number
  verifier?: string
  txHash?: string
}

const mockSubmissions: Submission[] = [
  {
    id: "1",
    fileName: "kelp_harvest_batch_042.jpg",
    fileSize: "2.4 MB",
    timestamp: "2 hours ago",
    status: "verified",
    biomassKg: 450,
    creditValue: 842.5,
    verifier: "Dr. Rahman, DU Marine Sciences",
    txHash: "0x7f3a...8c2d",
  },
  {
    id: "2",
    fileName: "gracilaria_sample_019.png",
    fileSize: "3.1 MB",
    timestamp: "5 hours ago",
    status: "pending",
    biomassKg: 280,
  },
  {
    id: "3",
    fileName: "biomass_measurement_033.jpg",
    fileSize: "1.8 MB",
    timestamp: "1 day ago",
    status: "rejected",
    verifier: "Prof. Chen, CU Biology",
  },
]

export function OracleDesk() {
  const [submissions, setSubmissions] = useState(mockSubmissions)
  const [dragActive, setDragActive] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = e.dataTransfer.files
    if (files && files[0]) {
      handleFileUpload(files[0])
    }
  }

  const handleFileUpload = (file: File) => {
    setUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setUploading(false)

          // Add new submission
          const newSubmission: Submission = {
            id: Date.now().toString(),
            fileName: file.name,
            fileSize: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
            timestamp: "Just now",
            status: "pending",
            biomassKg: Math.floor(Math.random() * 500) + 100,
          }
          setSubmissions((prev) => [newSubmission, ...prev])

          return 0
        }
        return prev + 10
      })
    }, 200)
  }

  const handleTriggerPayout = (id: string) => {
    setSubmissions((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              status: "verified" as const,
              creditValue: (s.biomassKg || 0) * 1.87,
              verifier: "Auto-verified via Oracle",
              txHash: `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`,
            }
          : s,
      ),
    )
  }

  const getStatusConfig = (status: Submission["status"]) => {
    switch (status) {
      case "verified":
        return {
          icon: CheckCircle2,
          color: "text-accent",
          bg: "bg-accent/20",
          label: "Verified & Paid",
        }
      case "rejected":
        return {
          icon: XCircle,
          color: "text-destructive",
          bg: "bg-destructive/20",
          label: "Rejected",
        }
      default:
        return {
          icon: Clock,
          color: "text-yellow-500",
          bg: "bg-yellow-500/20",
          label: "Pending Review",
        }
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-foreground">Oracle Desk</h3>
          <p className="text-sm text-muted-foreground mt-1">Scientific verification portal for biomass auditing</p>
        </div>

        <div className="flex items-center gap-2">
          <Badge className="bg-primary/20 text-primary border-primary/30 gap-1">
            <ShieldCheck className="h-3 w-3" />
            University Verifier Access
          </Badge>
        </div>
      </div>

      {/* Upload Zone */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative glass rounded-xl p-8 border-2 border-dashed transition-all ${
          dragActive ? "border-primary bg-primary/10" : "border-border/50 hover:border-primary/50"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
          className="hidden"
        />

        <div className="flex flex-col items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 mb-4">
            <Upload className={`h-8 w-8 text-primary ${dragActive ? "animate-bounce" : ""}`} />
          </div>

          <h4 className="font-semibold text-foreground mb-1">Upload Biomass Photo</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Drag and drop or click to select a photo for verification
          </p>

          {uploading ? (
            <div className="w-full max-w-xs">
              <Progress value={uploadProgress} className="h-2 mb-2" />
              <p className="text-xs text-muted-foreground">Uploading... {uploadProgress}%</p>
            </div>
          ) : (
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30"
            >
              <FileImage className="h-4 w-4 mr-2" />
              Select Photo
            </Button>
          )}
        </div>
      </motion.div>

      {/* Verification Guide */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass rounded-xl p-4 flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/20">
            <FileImage className="h-4 w-4 text-primary" />
          </div>
          <div>
            <div className="font-medium text-foreground text-sm">Clear Photo</div>
            <div className="text-xs text-muted-foreground">Include scale reference and batch ID</div>
          </div>
        </div>
        <div className="glass rounded-xl p-4 flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/20">
            <ShieldCheck className="h-4 w-4 text-accent" />
          </div>
          <div>
            <div className="font-medium text-foreground text-sm">AI + Expert Review</div>
            <div className="text-xs text-muted-foreground">Dual verification process</div>
          </div>
        </div>
        <div className="glass rounded-xl p-4 flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/20">
            <Wallet className="h-4 w-4 text-primary" />
          </div>
          <div>
            <div className="font-medium text-foreground text-sm">Auto Payout</div>
            <div className="text-xs text-muted-foreground">Smart contract triggers on verify</div>
          </div>
        </div>
      </div>

      {/* Submissions List */}
      <div className="space-y-3">
        <h4 className="font-semibold text-foreground flex items-center gap-2">
          Recent Submissions
          <Badge variant="secondary" className="text-xs">
            {submissions.length}
          </Badge>
        </h4>

        <AnimatePresence mode="popLayout">
          {submissions.map((submission, index) => {
            const statusConfig = getStatusConfig(submission.status)
            const StatusIcon = statusConfig.icon

            return (
              <motion.div
                key={submission.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: index * 0.05 }}
                className="glass rounded-xl p-4"
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* File Info */}
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${statusConfig.bg}`}
                    >
                      <FileImage className={`h-5 w-5 ${statusConfig.color}`} />
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-foreground truncate">{submission.fileName}</div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{submission.fileSize}</span>
                        <span>•</span>
                        <span>{submission.timestamp}</span>
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex items-center gap-2">
                    <Badge className={`${statusConfig.bg} ${statusConfig.color} border-0 gap-1`}>
                      <StatusIcon className="h-3 w-3" />
                      {statusConfig.label}
                    </Badge>
                  </div>

                  {/* Biomass & Value */}
                  {submission.biomassKg && (
                    <div className="flex items-center gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground text-xs">Biomass</div>
                        <div className="font-semibold text-foreground">{submission.biomassKg} kg</div>
                      </div>
                      {submission.creditValue && (
                        <div>
                          <div className="text-muted-foreground text-xs">Credit Value</div>
                          <div className="font-semibold text-accent">${submission.creditValue.toFixed(2)}</div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {submission.status === "pending" && (
                      <Button
                        size="sm"
                        onClick={() => handleTriggerPayout(submission.id)}
                        className="bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 gap-1"
                      >
                        <Send className="h-3 w-3" />
                        Verify & Pay
                      </Button>
                    )}
                    {submission.status === "verified" && submission.txHash && (
                      <Button size="sm" variant="outline" className="border-accent/30 text-accent gap-1 bg-transparent">
                        <Eye className="h-3 w-3" />
                        View TX
                      </Button>
                    )}
                    {submission.status === "rejected" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-destructive/30 text-destructive gap-1 bg-transparent"
                      >
                        <AlertTriangle className="h-3 w-3" />
                        Details
                      </Button>
                    )}
                  </div>
                </div>

                {/* Verifier Info */}
                {submission.verifier && (
                  <div className="mt-3 pt-3 border-t border-border/30 text-xs text-muted-foreground">
                    Verified by: <span className="text-foreground">{submission.verifier}</span>
                    {submission.txHash && (
                      <span className="ml-4">
                        TX: <code className="text-primary">{submission.txHash}</code>
                      </span>
                    )}
                  </div>
                )}
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Stats Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-border/30"
      >
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">$12.4K</div>
          <div className="text-xs text-muted-foreground">Total Paid Out</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-accent">847</div>
          <div className="text-xs text-muted-foreground">Verified Batches</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">12</div>
          <div className="text-xs text-muted-foreground">Active Verifiers</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">98.2%</div>
          <div className="text-xs text-muted-foreground">Approval Rate</div>
        </div>
      </motion.div>
    </div>
  )
}
