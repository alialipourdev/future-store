"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, ShoppingBag, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-muted/40" />

      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse-slow delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-3xl animate-float" />

        {/* Additional decorative elements */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-purple-500/15 rounded-full blur-2xl animate-pulse-slow delay-500" />
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-blue-500/15 rounded-full blur-2xl animate-pulse-slow delay-2000" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-6 py-3 mb-6 border border-border/50">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-foreground/90 text-sm font-medium">تجربه خرید هوشمند</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold text-gradient mb-6 leading-tight">فروشگاه مدرن</h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            بهترین محصولات با کیفیت عالی، قیمت مناسب و ارسال سریع. تجربه خریدی متفاوت با فناوری روز دنیا
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link href="/products">
            <Button
              size="lg"
              className="btn-gradient px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 group btn-ripple"
            >
              <ShoppingBag className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
              شروع خرید
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>

          <Link href="/about">
            <Button
              variant="outline"
              size="lg"
              className="btn-outline-gradient px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 bg-transparent"
            >
              <TrendingUp className="w-5 h-5 mr-2" />
              درباره ما
            </Button>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto"
        >
          {[
            { label: "مشتری راضی", value: "50K+" },
            { label: "محصول متنوع", value: "10K+" },
            { label: "سفارش موفق", value: "100K+" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
