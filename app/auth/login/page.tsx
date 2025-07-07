"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles, Github, ChromeIcon as Google } from "lucide-react"
import Link from "next/link"
import { ParticleBackground } from "@/components/particle-background"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
    // Redirect to dashboard or home
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <ParticleBackground />

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl animate-float" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="w-full max-w-md"
        >
          <Card className="bg-card/90 backdrop-blur-2xl border border-border shadow-2xl rounded-3xl overflow-hidden">
            {/* Header with Gradient */}
            <div className="bg-gradient-to-r from-primary/20 to-emerald-500/20 p-8 text-center border-b border-border">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", bounce: 0.6 }}
                className="w-20 h-20 bg-gradient-to-r from-primary to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
              >
                <Sparkles className="w-10 h-10 text-white" />
              </motion.div>
              <h1 className="text-3xl font-bold text-foreground mb-2">خوش آمدید</h1>
              <p className="text-muted-foreground">به فروشگاه آینده وارد شوید</p>
            </div>

            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-2"
                >
                  <label className="text-foreground/80 text-sm font-medium">ایمیل</label>
                  <div className="relative">
                    <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground pr-12 py-3 rounded-2xl focus:border-primary focus:ring-primary/20"
                      placeholder="example@email.com"
                      required
                    />
                  </div>
                </motion.div>

                {/* Password Field */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-2"
                >
                  <label className="text-foreground/80 text-sm font-medium">رمز عبور</label>
                  <div className="relative">
                    <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground pr-12 pl-12 py-3 rounded-2xl focus:border-primary focus:ring-primary/20"
                      placeholder="رمز عبور خود را وارد کنید"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </motion.div>

                {/* Remember & Forgot */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-center justify-between"
                >
                  <label className="flex items-center gap-2 text-muted-foreground text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      className="rounded border-border bg-background text-primary focus:ring-primary/20"
                    />
                    مرا به خاطر بسپار
                  </label>
                  <Link
                    href="/auth/forgot-password"
                    className="text-primary hover:text-primary/80 text-sm transition-colors"
                  >
                    فراموشی رمز عبور؟
                  </Link>
                </motion.div>

                {/* Login Button */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-primary to-emerald-500 hover:from-primary/90 hover:to-emerald-500/90 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-primary/25 transition-all duration-300 group"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        در حال ورود...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        ورود
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    )}
                  </Button>
                </motion.div>

                {/* Divider */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="relative"
                >
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-card text-muted-foreground">یا ورود با</span>
                  </div>
                </motion.div>

                {/* Social Login */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="grid grid-cols-2 gap-4"
                >
                  <Button
                    type="button"
                    variant="outline"
                    className="border-border text-foreground hover:bg-muted py-3 rounded-2xl bg-transparent"
                  >
                    <Google className="w-5 h-5 mr-2" />
                    Google
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="border-border text-foreground hover:bg-muted py-3 rounded-2xl bg-transparent"
                  >
                    <Github className="w-5 h-5 mr-2" />
                    GitHub
                  </Button>
                </motion.div>
              </form>

              {/* Register Link */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-center mt-8 pt-6 border-t border-border"
              >
                <p className="text-muted-foreground">
                  حساب کاربری ندارید؟{" "}
                  <Link
                    href="/auth/register"
                    className="text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    ثبت نام کنید
                  </Link>
                </p>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
