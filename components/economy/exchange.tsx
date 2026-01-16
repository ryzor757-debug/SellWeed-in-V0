"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { TrendingUp, TrendingDown, ArrowUpDown, Leaf, Coins, RefreshCw, ExternalLink } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Asset {
  id: string
  name: string
  symbol: string
  type: "credit" | "biomass"
  price: number
  priceUnit: string
  change24h: number
  volume: string
  available: string
  verified: boolean
}

const initialAssets: Asset[] = [
  {
    id: "1",
    name: "Blue Carbon Credit",
    symbol: "BCC",
    type: "credit",
    price: 42.5,
    priceUnit: "USD",
    change24h: 3.2,
    volume: "12.4K",
    available: "8,200",
    verified: true,
  },
  {
    id: "2",
    name: "Kelp Biomass (Dry)",
    symbol: "KLP-D",
    type: "biomass",
    price: 1.85,
    priceUnit: "USD/kg",
    change24h: -0.8,
    volume: "45.2T",
    available: "120T",
    verified: true,
  },
  {
    id: "3",
    name: "Gracilaria Extract",
    symbol: "GRC-X",
    type: "biomass",
    price: 28.4,
    priceUnit: "USD/kg",
    change24h: 5.6,
    volume: "2.1T",
    available: "8.5T",
    verified: true,
  },
  {
    id: "4",
    name: "Ocean Restoration Credit",
    symbol: "ORC",
    type: "credit",
    price: 38.75,
    priceUnit: "USD",
    change24h: 1.4,
    volume: "8.7K",
    available: "5,100",
    verified: true,
  },
  {
    id: "5",
    name: "Seaweed Fertilizer",
    symbol: "SWF",
    type: "biomass",
    price: 0.95,
    priceUnit: "USD/kg",
    change24h: -2.1,
    volume: "89.3T",
    available: "340T",
    verified: false,
  },
  {
    id: "6",
    name: "Biodiversity Unit",
    symbol: "BDU",
    type: "credit",
    price: 15.2,
    priceUnit: "USD",
    change24h: 0.0,
    volume: "3.2K",
    available: "2,800",
    verified: true,
  },
]

export function Exchange() {
  const [assets, setAssets] = useState(initialAssets)
  const [sortBy, setSortBy] = useState<"price" | "change" | "volume">("price")
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Simulated live price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAssets((prev) =>
        prev.map((asset) => ({
          ...asset,
          price: asset.price * (1 + (Math.random() - 0.5) * 0.002),
          change24h: asset.change24h + (Math.random() - 0.5) * 0.1,
        })),
      )
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 1000)
  }

  const sortedAssets = [...assets].sort((a, b) => {
    switch (sortBy) {
      case "price":
        return b.price - a.price
      case "change":
        return b.change24h - a.change24h
      case "volume":
        return Number.parseFloat(b.volume) - Number.parseFloat(a.volume)
      default:
        return 0
    }
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-[#F1FAEE]">B2B Exchange</h3>
          <p className="text-sm text-[#8B9CB6] mt-1">Trade Blue Credits and seaweed biomass assets</p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            className="gap-2 border-[#ffffff10] bg-transparent text-[#8B9CB6] hover:text-[#F1FAEE]"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <div className="flex gap-1 bg-[#162035] border border-[#ffffff10] rounded-lg p-1">
            {(["price", "change", "volume"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setSortBy(type)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-1 ${
                  sortBy === type ? "bg-[#26DE81]/20 text-[#26DE81]" : "text-[#8B9CB6] hover:text-[#F1FAEE]"
                }`}
              >
                <ArrowUpDown className="h-3 w-3" />
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Market Summary - Updated card colors */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <motion.div
          className="bg-[#162035] border border-[#ffffff10] rounded-xl p-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-2 text-[#8B9CB6] text-sm mb-1">
            <Coins className="h-4 w-4" />
            Credit Index
          </div>
          <div className="text-2xl font-bold text-[#26DE81]">$32.15</div>
          <div className="text-xs text-[#26DE81] flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            +2.4%
          </div>
        </motion.div>

        <motion.div
          className="bg-[#162035] border border-[#ffffff10] rounded-xl p-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <div className="flex items-center gap-2 text-[#8B9CB6] text-sm mb-1">
            <Leaf className="h-4 w-4" />
            Biomass Index
          </div>
          <div className="text-2xl font-bold text-[#635BFF]">$10.40</div>
          <div className="text-xs text-[#FF6B6B] flex items-center gap-1">
            <TrendingDown className="h-3 w-3" />
            -0.6%
          </div>
        </motion.div>

        <motion.div
          className="bg-[#162035] border border-[#ffffff10] rounded-xl p-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="text-[#8B9CB6] text-sm mb-1">24h Volume</div>
          <div className="text-2xl font-bold text-[#F1FAEE]">$2.4M</div>
          <div className="text-xs text-[#8B9CB6]">+18% from yesterday</div>
        </motion.div>

        <motion.div
          className="bg-[#162035] border border-[#ffffff10] rounded-xl p-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <div className="text-[#8B9CB6] text-sm mb-1">Active Trades</div>
          <div className="text-2xl font-bold text-[#F1FAEE]">847</div>
          <div className="text-xs text-[#8B9CB6]">Across 12 partners</div>
        </motion.div>
      </div>

      {/* Asset Table - Updated colors */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-[#162035] border border-[#ffffff10] rounded-xl overflow-hidden"
      >
        <Table>
          <TableHeader>
            <TableRow className="border-[#ffffff10] hover:bg-transparent">
              <TableHead className="text-[#8B9CB6]">Asset</TableHead>
              <TableHead className="text-[#8B9CB6] text-right">Price</TableHead>
              <TableHead className="text-[#8B9CB6] text-right hidden sm:table-cell">24h Change</TableHead>
              <TableHead className="text-[#8B9CB6] text-right hidden md:table-cell">Volume</TableHead>
              <TableHead className="text-[#8B9CB6] text-right hidden lg:table-cell">Available</TableHead>
              <TableHead className="text-[#8B9CB6] text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedAssets.map((asset, index) => (
              <motion.tr
                key={asset.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-[#ffffff10] hover:bg-[#1A2538] transition-colors"
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                        asset.type === "credit" ? "bg-[#26DE81]/20" : "bg-[#635BFF]/20"
                      }`}
                    >
                      {asset.type === "credit" ? (
                        <Coins className="h-5 w-5 text-[#26DE81]" />
                      ) : (
                        <Leaf className="h-5 w-5 text-[#635BFF]" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-[#F1FAEE]">{asset.name}</span>
                        {asset.verified && (
                          <Badge className="bg-[#26DE81]/20 text-[#26DE81] border-[#26DE81]/30 text-[10px] px-1.5">
                            Verified
                          </Badge>
                        )}
                      </div>
                      <span className="text-xs text-[#8B9CB6]">{asset.symbol}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="font-semibold text-[#F1FAEE]">${asset.price.toFixed(2)}</div>
                  <div className="text-xs text-[#8B9CB6]">{asset.priceUnit}</div>
                </TableCell>
                <TableCell className="text-right hidden sm:table-cell">
                  <div
                    className={`flex items-center justify-end gap-1 font-medium ${
                      asset.change24h > 0 ? "text-[#26DE81]" : asset.change24h < 0 ? "text-[#FF6B6B]" : "text-[#8B9CB6]"
                    }`}
                  >
                    {asset.change24h > 0 ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : asset.change24h < 0 ? (
                      <TrendingDown className="h-4 w-4" />
                    ) : null}
                    {asset.change24h > 0 ? "+" : ""}
                    {asset.change24h.toFixed(1)}%
                  </div>
                </TableCell>
                <TableCell className="text-right hidden md:table-cell text-[#8B9CB6]">{asset.volume}</TableCell>
                <TableCell className="text-right hidden lg:table-cell text-[#8B9CB6]">{asset.available}</TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    className="bg-[#26DE81] hover:bg-[#26DE81]/90 text-[#0B1120] border-0 gap-1 font-medium"
                  >
                    Trade
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </motion.div>

      {/* Disclaimer */}
      <p className="text-xs text-[#8B9CB6] text-center">
        Prices update every 5 seconds. All trades are settled on-chain via SellWeed smart contracts.
      </p>
    </div>
  )
}
