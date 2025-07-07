"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Award, Truck, Shield, Heart, Star, Target, Zap } from "lucide-react"

const stats = [
  { icon: Users, label: "مشتریان راضی", value: "50,000+" },
  { icon: Award, label: "سال تجربه", value: "10+" },
  { icon: Truck, label: "سفارش تحویل شده", value: "100,000+" },
  { icon: Shield, label: "محصول اصل", value: "100%" },
]

const values = [
  {
    icon: Heart,
    title: "مشتری مداری",
    description: "رضایت شما اولویت اصلی ماست",
  },
  {
    icon: Star,
    title: "کیفیت برتر",
    description: "فقط بهترین محصولات را ارائه می‌دهیم",
  },
  {
    icon: Target,
    title: "دقت در انتخاب",
    description: "محصولات با دقت انتخاب شده",
  },
  {
    icon: Zap,
    title: "نوآوری",
    description: "همیشه در مقدمه فناوری",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">درباره ما</Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            داستان{" "}
            <span className="bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">
              فروشگاه آینده
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            ما با هدف ایجاد تجربه‌ای منحصر به فرد در خرید آنلاین، فروشگاه آینده را راه‌اندازی کردیم. ترکیب فناوری هوش
            مصنوعی با طراحی مدرن، آینده خرید اینترنتی را شکل می‌دهد.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <Card key={index} className="bg-card/90 backdrop-blur-md border border-border p-6 text-center">
              <stat.icon className="w-8 h-8 text-primary mx-auto mb-4" />
              <div className="text-2xl font-bold text-foreground mb-2">{stat.value}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </Card>
          ))}
        </motion.div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <Card className="bg-card/90 backdrop-blur-md border border-border p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">ماموریت ما</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-primary to-emerald-500 mx-auto rounded-full" />
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed text-center max-w-4xl mx-auto">
              ماموریت ما ایجاد پلتفرمی است که نه تنها خرید آنلاین را آسان‌تر می‌کند، بلکه تجربه‌ای لذت‌بخش و هوشمند ارائه
              می‌دهد. با استفاده از فناوری‌های نوین و طراحی کاربرپسند، می‌خواهیم استانداردهای جدیدی در صنعت تجارت الکترونیک
              ایجاد کنیم.
            </p>
          </Card>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">ارزش‌های ما</h2>
            <p className="text-muted-foreground">اصولی که ما را راهنمایی می‌کند</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Card className="bg-card/90 backdrop-blur-md border border-border p-6 h-full text-center hover:border-primary/40 transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <Card className="bg-card/90 backdrop-blur-md border border-border p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">تیم ما</h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              تیم فروشگاه آینده متشکل از متخصصان با تجربه در حوزه‌های مختلف فناوری، طراحی و تجارت الکترونیک است. ما با
              اشتیاق و تعهد، روزانه برای بهبود تجربه شما تلاش می‌کنیم.
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
