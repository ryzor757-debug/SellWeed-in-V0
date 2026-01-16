"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  FileText,
  Download,
  ExternalLink,
  Filter,
  Calendar,
  Building2,
  Shield,
  Scale,
  Handshake,
  ChevronDown,
  Eye,
  Bookmark,
  BookmarkCheck,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Document {
  id: string
  title: string
  description: string
  category: "legal" | "policy" | "alliance" | "compliance"
  type: "PDF" | "DOC" | "HTML"
  size: string
  date: string
  author: string
  version: string
  downloads: number
  tags: string[]
}

const documents: Document[] = [
  {
    id: "1",
    title: "Blue Economy Partnership Framework",
    description:
      "Comprehensive legal framework governing partnerships between SellWeed, local governments, and coastal communities.",
    category: "legal",
    type: "PDF",
    size: "2.4 MB",
    date: "2024-11-15",
    author: "Legal Affairs",
    version: "2.1",
    downloads: 342,
    tags: ["partnership", "governance", "legal"],
  },
  {
    id: "2",
    title: "Carbon Credit Verification Protocol",
    description:
      "Standardized methodology for measuring, reporting, and verifying blue carbon credits from seaweed cultivation.",
    category: "compliance",
    type: "PDF",
    size: "1.8 MB",
    date: "2024-10-28",
    author: "Compliance Team",
    version: "3.0",
    downloads: 567,
    tags: ["carbon", "verification", "MRV"],
  },
  {
    id: "3",
    title: "Worker Safety & Rights Policy",
    description:
      "Policies ensuring fair wages, safe working conditions, and labor rights for all coastal workers in the network.",
    category: "policy",
    type: "PDF",
    size: "890 KB",
    date: "2024-12-01",
    author: "HR & Policy",
    version: "1.5",
    downloads: 891,
    tags: ["safety", "workers", "rights"],
  },
  {
    id: "4",
    title: "University of Dhaka Research Alliance",
    description:
      "Memorandum of understanding with University of Dhaka for marine biology research and worker training programs.",
    category: "alliance",
    type: "PDF",
    size: "1.2 MB",
    date: "2024-09-20",
    author: "Partnerships",
    version: "1.0",
    downloads: 234,
    tags: ["university", "research", "training"],
  },
  {
    id: "5",
    title: "Environmental Impact Assessment Guidelines",
    description:
      "Guidelines for conducting environmental impact assessments before establishing new seaweed farming sites.",
    category: "compliance",
    type: "PDF",
    size: "3.1 MB",
    date: "2024-08-15",
    author: "Environmental Team",
    version: "2.0",
    downloads: 445,
    tags: ["environment", "assessment", "biodiversity"],
  },
  {
    id: "6",
    title: "Smart Contract Governance Rules",
    description: "Technical and legal specifications for blockchain-based payment and verification smart contracts.",
    category: "legal",
    type: "HTML",
    size: "420 KB",
    date: "2024-11-30",
    author: "Tech & Legal",
    version: "4.2",
    downloads: 678,
    tags: ["blockchain", "smart-contract", "payments"],
  },
  {
    id: "7",
    title: "FAO Blue Growth Partnership",
    description:
      "Strategic alliance with the Food and Agriculture Organization for sustainable aquaculture development.",
    category: "alliance",
    type: "PDF",
    size: "2.0 MB",
    date: "2024-07-10",
    author: "Global Partnerships",
    version: "1.0",
    downloads: 312,
    tags: ["FAO", "UN", "aquaculture"],
  },
  {
    id: "8",
    title: "Data Privacy & Protection Policy",
    description:
      "Comprehensive data protection policy ensuring worker and partner data privacy in compliance with local regulations.",
    category: "policy",
    type: "PDF",
    size: "650 KB",
    date: "2024-10-05",
    author: "Legal Affairs",
    version: "2.3",
    downloads: 198,
    tags: ["privacy", "data", "GDPR"],
  },
]

const categoryConfig = {
  legal: { icon: Scale, label: "Legal Framework", color: "text-teal-glow", bg: "bg-teal-glow/20" },
  policy: { icon: Shield, label: "Policy", color: "text-bio-green", bg: "bg-bio-green/20" },
  alliance: { icon: Handshake, label: "Partner Alliance", color: "text-accent", bg: "bg-accent/20" },
  compliance: { icon: FileText, label: "Compliance", color: "text-chart-4", bg: "bg-chart-4/20" },
}

export function Governance() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [bookmarked, setBookmarked] = useState<Set<string>>(new Set())
  const [previewDoc, setPreviewDoc] = useState<Document | null>(null)

  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      const matchesSearch =
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory = !selectedCategory || doc.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  const toggleBookmark = (id: string) => {
    setBookmarked((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const stats = useMemo(
    () => ({
      total: documents.length,
      legal: documents.filter((d) => d.category === "legal").length,
      policy: documents.filter((d) => d.category === "policy").length,
      alliance: documents.filter((d) => d.category === "alliance").length,
      compliance: documents.filter((d) => d.category === "compliance").length,
    }),
    [],
  )

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`glass rounded-xl p-4 text-center transition-all hover:glow-teal ${
            !selectedCategory ? "ring-2 ring-primary" : ""
          }`}
        >
          <FileText className="h-5 w-5 text-primary mx-auto mb-2" />
          <div className="text-xl font-bold text-foreground">{stats.total}</div>
          <div className="text-xs text-muted-foreground">All Documents</div>
        </button>
        {Object.entries(categoryConfig).map(([key, config]) => (
          <button
            key={key}
            onClick={() => setSelectedCategory(selectedCategory === key ? null : key)}
            className={`glass rounded-xl p-4 text-center transition-all hover:glow-teal ${
              selectedCategory === key ? "ring-2 ring-primary" : ""
            }`}
          >
            <config.icon className={`h-5 w-5 ${config.color} mx-auto mb-2`} />
            <div className="text-xl font-bold text-foreground">{stats[key as keyof typeof stats]}</div>
            <div className="text-xs text-muted-foreground">{config.label}</div>
          </button>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search documents, tags, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 glass border-glass-border"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="glass border-glass-border bg-transparent">
              <Filter className="h-4 w-4 mr-2" />
              Filter
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="glass border-glass-border">
            <DropdownMenuItem onClick={() => setSelectedCategory(null)}>All Categories</DropdownMenuItem>
            {Object.entries(categoryConfig).map(([key, config]) => (
              <DropdownMenuItem key={key} onClick={() => setSelectedCategory(key)}>
                <config.icon className={`h-4 w-4 mr-2 ${config.color}`} />
                {config.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Document List */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {filteredDocuments.map((doc, index) => {
            const CategoryIcon = categoryConfig[doc.category].icon
            const isBookmarked = bookmarked.has(doc.id)

            return (
              <motion.div
                key={doc.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                className="glass rounded-xl p-4 sm:p-5 hover:glow-teal transition-all group"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  {/* Icon */}
                  <div className={`${categoryConfig[doc.category].bg} rounded-xl p-3 shrink-0 self-start`}>
                    <CategoryIcon className={`h-6 w-6 ${categoryConfig[doc.category].color}`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                        {doc.title}
                      </h3>
                      <div className="flex items-center gap-1 shrink-0">
                        <Badge variant="outline" className="text-xs">
                          v{doc.version}
                        </Badge>
                        <Badge
                          className={
                            categoryConfig[doc.category].bg + " " + categoryConfig[doc.category].color + " border-0"
                          }
                        >
                          {doc.type}
                        </Badge>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{doc.description}</p>

                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(doc.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Building2 className="h-3 w-3" />
                        {doc.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Download className="h-3 w-3" />
                        {doc.downloads} downloads
                      </span>
                      <span>{doc.size}</span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {doc.tags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => setSearchQuery(tag)}
                          className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs hover:bg-primary/20 hover:text-primary transition-colors"
                        >
                          #{tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex sm:flex-col gap-2 shrink-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleBookmark(doc.id)}
                      className={isBookmarked ? "text-accent" : "text-muted-foreground"}
                    >
                      {isBookmarked ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setPreviewDoc(doc)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>

        {filteredDocuments.length === 0 && (
          <div className="glass rounded-xl p-12 text-center">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No documents found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {previewDoc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setPreviewDoc(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={`${categoryConfig[previewDoc.category].bg} rounded-xl p-3`}>
                    {(() => {
                      const Icon = categoryConfig[previewDoc.category].icon
                      return <Icon className={`h-6 w-6 ${categoryConfig[previewDoc.category].color}`} />
                    })()}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{previewDoc.title}</h3>
                    <p className="text-sm text-muted-foreground">Version {previewDoc.version}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setPreviewDoc(null)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Description</h4>
                  <p className="text-foreground">{previewDoc.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Author</h4>
                    <p className="text-foreground">{previewDoc.author}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Last Updated</h4>
                    <p className="text-foreground">
                      {new Date(previewDoc.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">File Size</h4>
                    <p className="text-foreground">{previewDoc.size}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Downloads</h4>
                    <p className="text-foreground">{previewDoc.downloads}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {previewDoc.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button className="flex-1 bg-primary hover:bg-primary/90">
                    <Download className="h-4 w-4 mr-2" />
                    Download {previewDoc.type}
                  </Button>
                  <Button variant="outline" className="flex-1 glass border-glass-border bg-transparent">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open in Browser
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
