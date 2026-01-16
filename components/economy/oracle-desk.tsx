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

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setUploading(false)

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
          color: "text-[#26DE81]",
          bg: "bg-[#26DE81]/20",
          label: "Verified & Paid",
        }
      case "rejected":
        return {
          icon: XCircle,
          color: "text-[#FF6B6B]",
          bg: "bg-[#FF6B6B]/20",
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
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-[#F1FAEE]">Oracle Desk</h3>
          <p className="text-xs sm:text-sm text-[#8B9CB6] mt-1">Scientific verification portal for biomass auditing</p>
        </div>

        <div className="flex items-center gap-2">
          <Badge className="bg-[#26DE81]/20 text-[#26DE81] border-[#26DE81]/30 gap-1 text-[10px] sm:text-xs">
            <ShieldCheck className="h-3 w-3" />
            University Verifier Access
          </Badge>
        </div>
      </div>

      {/* Upload Zone */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative bg-slate-900/40 backdrop-blur-md rounded-xl p-4 sm:p-6 lg:p-8 border-2 border-dashed transition-all ${
          dragActive ? "border-[#26DE81] bg-[#26DE81]/10" : "border-[#ffffff10] hover:border-[#26DE81]/50"
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
          <div className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-[#26DE81]/20 mb-3 sm:mb-4">
            <Upload className={`h-6 w-6 sm:h-8 sm:w-8 text-[#26DE81] ${dragActive ? "animate-bounce" : ""}`} />
          </div>

          <h4 className="font-semibold text-sm sm:text-base text-[#F1FAEE] mb-1">Upload Biomass Photo</h4>
          <p className="text-xs sm:text-sm text-[#8B9CB6] mb-3 sm:mb-4">
            Drag and drop or click to select a photo for verification
          </p>

          {uploading ? (
            <div className="w-full max-w-xs">
              <Progress value={uploadProgress} className="h-2 mb-2" />
              <p className="text-xs text-[#8B9CB6]">Uploading... {uploadProgress}%</p>
            </div>
          ) : (
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="bg-[#26DE81]/20 hover:bg-[#26DE81]/30 text-[#26DE81] border border-[#26DE81]/30 min-h-[44px]"
            >
              <FileImage className="h-4 w-4 mr-2" />
              Select Photo
            </Button>
          )}
        </div>
      </motion.div>

      {/* Verification Guide */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-slate-900/40 backdrop-blur-md border border-[#ffffff10] rounded-xl p-3 sm:p-4 flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#26DE81]/20">
            <FileImage className="h-4 w-4 text-[#26DE81]" />
          </div>
          <div>
            <div className="font-medium text-[#F1FAEE] text-xs sm:text-sm">Clear Photo</div>
            <div className="text-[10px] sm:text-xs text-[#8B9CB6]">Include scale reference and batch ID</div>
          </div>
        </div>
        <div className="bg-slate-900/40 backdrop-blur-md border border-[#ffffff10] rounded-xl p-3 sm:p-4 flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#635BFF]/20">
            <ShieldCheck className="h-4 w-4 text-[#635BFF]" />
          </div>
          <div>
            <div className="font-medium text-[#F1FAEE] text-xs sm:text-sm">AI + Expert Review</div>
            <div className="text-[10px] sm:text-xs text-[#8B9CB6]">Dual verification process</div>
          </div>
        </div>
        <div className="bg-slate-900/40 backdrop-blur-md border border-[#ffffff10] rounded-xl p-3 sm:p-4 flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#26DE81]/20">
            <Wallet className="h-4 w-4 text-[#26DE81]" />
          </div>
          <div>
            <div className="font-medium text-[#F1FAEE] text-xs sm:text-sm">Auto Payout</div>
            <div className="text-[10px] sm:text-xs text-[#8B9CB6]">Smart contract triggers on verify</div>
          </div>
        </div>
      </div>

      {/* Submissions List */}
      <div className="space-y-3">
        <h4 className="font-semibold text-sm sm:text-base text-[#F1FAEE] flex items-center gap-2">
          Recent Submissions
          <Badge variant="secondary" className="text-[10px] sm:text-xs">
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
                className="bg-slate-900/40 backdrop-blur-md border border-[#ffffff10] rounded-xl p-3 sm:p-4"
              >
                <div className="flex flex-col gap-3 sm:gap-4">
                  {/* File Info */}
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div
                      className={`flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg ${statusConfig.bg}`}
                    >
                      <FileImage className={`h-4 w-4 sm:h-5 sm:w-5 ${statusConfig.color}`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-xs sm:text-sm text-[#F1FAEE] truncate">
                        {submission.fileName}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] sm:text-xs text-[#8B9CB6]">
                        <span>{submission.fileSize}</span>
                        <span>•</span>
                        <span>{submission.timestamp}</span>
                      </div>
                    </div>
                    {/* Status badge - shown inline on mobile */}
                    <Badge
                      className={`${statusConfig.bg} ${statusConfig.color} border-0 gap-1 text-[10px] sm:text-xs shrink-0`}
                    >
                      <StatusIcon className="h-3 w-3" />
                      <span className="hidden sm:inline">{statusConfig.label}</span>
                    </Badge>
                  </div>

                  {/* Biomass, Value & Actions row */}
                  <div className="flex items-center justify-between gap-3 pt-2 border-t border-[#ffffff10]">
                    {/* Biomass & Value */}
                    {submission.biomassKg && (
                      <div className="flex items-center gap-4 text-xs sm:text-sm">
                        <div>
                          <div className="text-[10px] sm:text-xs text-[#8B9CB6]">Biomass</div>
                          <div className="font-semibold text-[#F1FAEE]">{submission.biomassKg} kg</div>
                        </div>
                        {submission.creditValue && (
                          <div>
                            <div className="text-[10px] sm:text-xs text-[#8B9CB6]">Value</div>
                            <div className="font-semibold text-[#26DE81]">${submission.creditValue.toFixed(2)}</div>
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
                          className="bg-[#26DE81] hover:bg-[#26DE81]/90 text-[#0B1120] border-0 gap-1 min-h-[44px] text-xs sm:text-sm"
                        >
                          <Send className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                          <span className="hidden sm:inline">Verify & Pay</span>
                          <span className="sm:hidden">Verify</span>
                        </Button>
                      )}
                      {submission.status === "verified" && submission.txHash && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-[#26DE81]/30 text-[#26DE81] gap-1 bg-transparent min-h-[44px] text-xs sm:text-sm"
                        >
                          <Eye className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                          View TX
                        </Button>
                      )}
                      {submission.status === "rejected" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-[#FF6B6B]/30 text-[#FF6B6B] gap-1 bg-transparent min-h-[44px] text-xs sm:text-sm"
                        >
                          <AlertTriangle className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                          Details
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Verifier Info */}
                {submission.verifier && (
                  <div className="mt-3 pt-3 border-t border-[#ffffff10] text-[10px] sm:text-xs text-[#8B9CB6]">
                    Verified by: <span className="text-[#F1FAEE]">{submission.verifier}</span>
                    {submission.txHash && (
                      <span className="block sm:inline sm:ml-4">
                        TX: <code className="text-[#26DE81]">{submission.txHash}</code>
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
        className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4 border-t border-[#ffffff10]"
      >
        <div className="text-center">
          <div className="text-lg sm:text-2xl font-bold text-[#26DE81]">$12.4K</div>
          <div className="text-[10px] sm:text-xs text-[#8B9CB6]">Total Paid Out</div>
        </div>
        <div className="text-center">
          <div className="text-lg sm:text-2xl font-bold text-[#635BFF]">847</div>
          <div className="text-[10px] sm:text-xs text-[#8B9CB6]">Verified Batches</div>
        </div>
        <div className="text-center">
          <div className="text-lg sm:text-2xl font-bold text-[#F1FAEE]">12</div>
          <div className="text-[10px] sm:text-xs text-[#8B9CB6]">Active Verifiers</div>
        </div>
        <div className="text-center">
          <div className="text-lg sm:text-2xl font-bold text-[#F1FAEE]">98.2%</div>
          <div className="text-[10px] sm:text-xs text-[#8B9CB6]">Approval Rate</div>
        </div>
      </motion.div>
    </div>
  )
}
