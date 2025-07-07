"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Phone, MapPin, Instagram, Twitter, Linkedin, Youtube, Heart, Send, Sparkles } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative bg-muted/50 border-t border-border">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 gradient-primary rounded-2xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-foreground">فروشگاه مدرن</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              تجربه خریدی منحصر به فرد با بهترین محصولات، قیمت مناسب و ارسال سریع. آینده خرید اینترنتی را با ما تجربه
              کنید.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Linkedin, Youtube].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 glass hover:bg-primary/20 rounded-xl flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-bold text-foreground">دسترسی سریع</h3>
            <div className="space-y-3">
              {[
                { name: "درباره ما", href: "/about" },
                { name: "تماس با ما", href: "/contact" },
                { name: "سوالات متداول", href: "/faq" },
                { name: "راهنمای خرید", href: "/guide" },
                { name: "شرایط و قوانین", href: "/terms" },
                { name: "حریم خصوصی", href: "/privacy" },
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block nav-link hover:translate-x-1 transition-transform duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-bold text-foreground">دسته‌بندی‌ها</h3>
            <div className="space-y-3">
              {[
                { name: "موبایل و تبلت", href: "/category/mobile" },
                { name: "لپ تاپ و کامپیوتر", href: "/category/laptop" },
                { name: "هدفون و اسپیکر", href: "/category/headphone" },
                { name: "ساعت هوشمند", href: "/category/watch" },
                { name: "دوربین", href: "/category/camera" },
                { name: "گیمینگ", href: "/category/gaming" },
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block nav-link hover:translate-x-1 transition-transform duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Contact & Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-bold text-foreground">تماس با ما</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="w-5 h-5 text-primary" />
                <span>021-12345678</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="w-5 h-5 text-primary" />
                <span>info@modern-store.com</span>
              </div>
              <div className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary mt-1" />
                <span>تهران، خیابان ولیعصر، پلاک 123</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">خبرنامه</h4>
              <p className="text-muted-foreground text-sm">از جدیدترین محصولات و تخفیف‌ها باخبر شوید</p>
              <div className="flex gap-2">
                <Input
                  placeholder="ایمیل شما"
                  className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground rounded-2xl focus-ring"
                />
                <Button className="btn-gradient rounded-2xl px-4">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-border pt-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-muted-foreground text-sm">© 2024 فروشگاه مدرن. تمامی حقوق محفوظ است.</div>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <span>ساخته شده با</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>در ایران</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
