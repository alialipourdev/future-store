"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { addTransaction } from "@/lib/features/wallet/walletSlice"
import {
  Wallet,
  Plus,
  CreditCard,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  CheckCircle,
  XCircle,
  TrendingUp,
} from "lucide-react"

export default function WalletPage() {
  const dispatch = useAppDispatch()
  const { balance, transactions } = useAppSelector((state) => state.wallet)
  const [amount, setAmount] = useState("")
  const [isDepositing, setIsDepositing] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fa-IR").format(price) + " تومان"
  }

  const handleDeposit = async () => {
    if (!amount || Number(amount) <= 0) return

    setIsDepositing(true)

    // Simulate payment process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const transaction = {
      id: Date.now().toString(),
      type: "deposit" as const,
      amount: Number(amount),
      description: "شارژ کیف پول",
      date: new Date().toISOString(),
      status: "completed" as const,
    }

    dispatch(addTransaction(transaction))
    setAmount("")
    setIsDepositing(false)
  }

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "deposit":
      case "refund":
        return <ArrowDownLeft className="w-4 h-4 text-green-400" />
      case "withdraw":
      case "purchase":
        return <ArrowUpRight className="w-4 h-4 text-red-400" />
      default:
        return <CreditCard className="w-4 h-4 text-blue-400" />
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-400" />
      case "failed":
        return <XCircle className="w-4 h-4 text-red-400" />
      default:
        return <Clock className="w-4 h-4 text-gray-400" />
    }
  }

  const getTransactionColor = (type: string) => {
    switch (type) {
      case "deposit":
      case "refund":
        return "text-green-400"
      case "withdraw":
      case "purchase":
        return "text-red-400"
      default:
        return "text-foreground"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Wallet className="w-12 h-12 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">کیف پول</h1>
          </div>
          <p className="text-muted-foreground text-lg">مدیریت موجودی و تراکنش‌های خود</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Balance & Actions */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Balance Card */}
            <Card className="bg-gradient-to-r from-primary/20 to-emerald-500/20 backdrop-blur-md border border-border p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-primary to-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Wallet className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-lg font-medium text-muted-foreground mb-2">موجودی کیف پول</h2>
              <div className="text-4xl font-bold text-foreground mb-6">{formatPrice(balance)}</div>
              <div className="flex items-center justify-center gap-2 text-green-400 text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>+12% نسبت به ماه گذشته</span>
              </div>
            </Card>

            {/* Deposit Card */}
            <Card className="bg-card/90 backdrop-blur-md border border-border p-6">
              <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Plus className="w-5 h-5 text-green-400" />
                شارژ کیف پول
              </h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-foreground/80 text-sm font-medium">مبلغ (تومان)</label>
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="مبلغ مورد نظر را وارد کنید"
                    className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground rounded-2xl"
                  />
                </div>

                {/* Quick amounts */}
                <div className="grid grid-cols-2 gap-2">
                  {[100000, 500000, 1000000, 2000000].map((quickAmount) => (
                    <Button
                      key={quickAmount}
                      variant="outline"
                      size="sm"
                      onClick={() => setAmount(quickAmount.toString())}
                      className="border-border text-foreground hover:bg-muted rounded-xl bg-transparent"
                    >
                      {formatPrice(quickAmount)}
                    </Button>
                  ))}
                </div>

                <Button
                  onClick={handleDeposit}
                  disabled={!amount || Number(amount) <= 0 || isDepositing}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 rounded-2xl font-semibold"
                >
                  {isDepositing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      در حال پردازش...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      شارژ کیف پول
                    </div>
                  )}
                </Button>
              </div>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-card/90 backdrop-blur-md border border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">آمار سریع</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">تراکنش‌های امروز</span>
                  <span className="text-foreground font-medium">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">مجموع خرید</span>
                  <span className="text-foreground font-medium">{formatPrice(1250000)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">آخرین شارژ</span>
                  <span className="text-foreground font-medium">2 روز پیش</span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Transactions */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="bg-card/90 backdrop-blur-md border border-border p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-foreground">تاریخچه تراکنش‌ها</h3>
                <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">{transactions.length} تراکنش</Badge>
              </div>

              {transactions.length === 0 ? (
                <div className="text-center py-12">
                  <CreditCard className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-muted-foreground mb-2">هنوز تراکنشی انجام نشده</h4>
                  <p className="text-muted-foreground">اولین تراکنش خود را انجام دهید</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {transactions.map((transaction) => (
                    <motion.div
                      key={transaction.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-between p-4 bg-muted/20 rounded-2xl border border-border hover:border-primary/20 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-muted/50 rounded-2xl flex items-center justify-center">
                          {getTransactionIcon(transaction.type)}
                        </div>
                        <div>
                          <h4 className="text-foreground font-medium">{transaction.description}</h4>
                          <p className="text-muted-foreground text-sm">
                            {new Date(transaction.date).toLocaleDateString("fa-IR")}
                          </p>
                        </div>
                      </div>

                      <div className="text-left">
                        <div className={`text-lg font-bold ${getTransactionColor(transaction.type)}`}>
                          {transaction.type === "deposit" || transaction.type === "refund" ? "+" : "-"}
                          {formatPrice(transaction.amount)}
                        </div>
                        <div className="flex items-center gap-1 justify-end">
                          {getStatusIcon(transaction.status)}
                          <span className="text-muted-foreground text-sm">
                            {transaction.status === "completed"
                              ? "تکمیل شده"
                              : transaction.status === "pending"
                                ? "در انتظار"
                                : "ناموفق"}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
