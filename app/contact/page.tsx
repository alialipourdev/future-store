"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    // Reset form
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
  }

  const contactInfo = [
    {
      icon: Phone,
      title: "تلفن تماس",
      value: "021-12345678",
      description: "شنبه تا پنج‌شنبه، 9 تا 18",
    },
    {
      icon: Mail,
      title: "ایمیل",
      value: "info@future-store.com",
      description: "پاسخ در کمتر از 24 ساعت",
    },
    {
      icon: MapPin,
      title: "آدرس",
      value: "تهران، خیابان ولیعصر",
      description: "پلاک 123، طبقه 5",
    },
    {
      icon: Clock,
      title: "ساعات کاری",
      value: "9:00 - 18:00",
      description: "شنبه تا پنج‌شنبه",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 mb-4">تماس با ما</Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            در{" "}
            <span className="bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">ارتباط</span>{" "}
            باشیم
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            سوال، پیشنهاد یا نظری دارید؟ ما اینجا هستیم تا به شما کمک کنیم
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {contactInfo.map((info, index) => (
              <Card
                key={index}
                className="bg-card/90 backdrop-blur-md border border-border p-6 hover:border-primary/40 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-emerald-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <info.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">{info.title}</h3>
                    <p className="text-foreground/90 font-medium mb-1">{info.value}</p>
                    <p className="text-muted-foreground text-sm">{info.description}</p>
                  </div>
                </div>
              </Card>
            ))}

            {/* Quick Contact */}
            <Card className="bg-gradient-to-r from-primary/20 to-emerald-500/20 backdrop-blur-md border border-border p-6">
              <div className="text-center">
                <MessageCircle className="w-12 h-12 text-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">پشتیبانی آنلاین</h3>
                <p className="text-muted-foreground text-sm mb-4">برای دریافت پاسخ سریع</p>
                <Button className="w-full bg-gradient-to-r from-primary to-emerald-500 hover:from-primary/90 hover:to-emerald-500/90 text-white rounded-2xl">
                  شروع گفتگو
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="bg-card/90 backdrop-blur-md border border-border p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">پیام خود را ارسال کنید</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-foreground/80 text-sm font-medium">نام و نام خانوادگی</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground rounded-2xl"
                      placeholder="نام کامل خود را وارد کنید"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-foreground/80 text-sm font-medium">ایمیل</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground rounded-2xl"
                      placeholder="example@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-foreground/80 text-sm font-medium">شماره تلفن</label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground rounded-2xl"
                      placeholder="09123456789"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-foreground/80 text-sm font-medium">موضوع</label>
                    <Input
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground rounded-2xl"
                      placeholder="موضوع پیام شما"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-foreground/80 text-sm font-medium">پیام</label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground rounded-2xl min-h-[120px] resize-none"
                    placeholder="پیام خود را اینجا بنویسید..."
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-primary to-emerald-500 hover:from-primary/90 hover:to-emerald-500/90 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-primary/25 transition-all duration-300 group"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      در حال ارسال...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      ارسال پیام
                    </div>
                  )}
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
