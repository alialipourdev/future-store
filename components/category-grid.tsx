"use client"

import { motion } from "framer-motion"
import { Smartphone, Laptop, Headphones, Watch, Camera, Gamepad2 } from "lucide-react"
import Link from "next/link"

const categories = [
  { name: "موبایل", icon: Smartphone, color: "from-emerald-500 to-teal-500", count: 156, href: "/category/mobile" },
  { name: "لپ تاپ", icon: Laptop, color: "from-blue-500 to-cyan-500", count: 89, href: "/category/laptop" },
  { name: "هدفون", icon: Headphones, color: "from-purple-500 to-violet-500", count: 234, href: "/category/headphone" },
  { name: "ساعت هوشمند", icon: Watch, color: "from-green-500 to-emerald-500", count: 67, href: "/category/watch" },
  { name: "دوربین", icon: Camera, color: "from-orange-500 to-amber-500", count: 123, href: "/category/camera" },
  { name: "گیمینگ", icon: Gamepad2, color: "from-red-500 to-pink-500", count: 198, href: "/category/gaming" },
]

export function CategoryGrid() {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">دسته‌بندی محصولات</h2>
          <p className="text-muted-foreground text-lg">بهترین محصولات در هر دسته‌بندی</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="group cursor-pointer"
            >
              <Link href={category.href}>
                <div className="relative glass rounded-3xl p-6 border border-border/50 hover:border-primary/40 transition-all duration-300 hover:shadow-2xl card-hover">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <category.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-foreground font-semibold text-lg mb-2">{category.name}</h3>
                  <p className="text-muted-foreground text-sm">{category.count} محصول</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
