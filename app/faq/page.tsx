"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ChevronDown, Search, HelpCircle, MessageCircle, Phone, Mail } from "lucide-react"

const faqs = [
  {
    category: "سفارش و خرید",
    questions: [
      {
        question: "چگونه سفارش دهم؟",
        answer: "برای ثبت سفارش، محصول مورد نظر را انتخاب کنید، به سبد خرید اضافه کنید و مراحل پرداخت را تکمیل کنید.",
      },
      {
        question: "آیا می‌توانم سفارش خود را لغو کنم؟",
        answer: "تا قبل از ارسال محصول، می‌توانید سفارش خود را لغو کنید. برای این کار با پشتیبانی تماس بگیرید.",
      },
      {
        question: "روش‌های پرداخت چیست؟",
        answer: "شما می‌توانید از طریق کارت بانکی، کیف پول یا پرداخت در محل سفارش خود را پرداخت کنید.",
      },
    ],
  },
  {
    category: "ارسال و تحویل",
    questions: [
      {
        question: "مدت زمان ارسال چقدر است؟",
        answer: "ارسال عادی 3-5 روز کاری و ارسال فوری 1-2 روز کاری طول می‌کشد.",
      },
      {
        question: "هزینه ارسال چقدر است؟",
        answer:
          "برای خریدهای بالای 5 میلیون تومان ارسال رایگان است. در غیر این صورت 150 هزار تومان هزینه ارسال دریافت می‌شود.",
      },
      {
        question: "چگونه سفارش خود را پیگیری کنم؟",
        answer: "با وارد کردن کد پیگیری در بخش پیگیری سفارش می‌توانید وضعیت سفارش خود را مشاهده کنید.",
      },
    ],
  },
  {
    category: "بازگشت و تعویض",
    questions: [
      {
        question: "آیا می‌توانم محصول را برگردانم؟",
        answer: "تا 7 روز پس از دریافت محصول، در صورت عدم رضایت می‌توانید آن را برگردانید.",
      },
      {
        question: "شرایط بازگشت کالا چیست؟",
        answer: "کالا باید در بسته‌بندی اصلی، سالم و بدون استفاده باشد. برچسب‌ها و لوازم جانبی نیز باید موجود باشد.",
      },
    ],
  },
  {
    category: "حساب کاربری",
    questions: [
      {
        question: "چگونه حساب کاربری ایجاد کنم؟",
        answer: "روی گزینه ثبت نام کلیک کنید و اطلاعات مورد نیاز را وارد کنید.",
      },
      {
        question: "رمز عبور خود را فراموش کرده‌ام",
        answer: "در صفحه ورود روی 'فراموشی رمز عبور' کلیک کنید و دستورالعمل‌ها را دنبال کنید.",
      },
    ],
  },
]

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (id: string) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const filteredFAQs = faqs
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    }))
    .filter((category) => category.questions.length > 0)

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">سوالات متداول</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            چگونه می‌توانیم <span className="text-gradient">کمکتان</span> کنیم؟
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            پاسخ سوالات رایج را در اینجا پیدا کنید یا با تیم پشتیبانی ما در ارتباط باشید
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="جستجو در سوالات..."
              className="pr-12 py-4 text-lg rounded-2xl"
            />
          </div>
        </motion.div>

        {/* FAQ Categories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-8"
        >
          {filteredFAQs.map((category, categoryIndex) => (
            <Card key={category.category} className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <HelpCircle className="w-6 h-6 text-primary" />
                {category.category}
              </h2>

              <div className="space-y-4">
                {category.questions.map((faq, questionIndex) => {
                  const itemId = `${categoryIndex}-${questionIndex}`
                  const isOpen = openItems.includes(itemId)

                  return (
                    <div key={questionIndex} className="border border-border rounded-2xl overflow-hidden">
                      <button
                        onClick={() => toggleItem(itemId)}
                        className="w-full p-6 text-right hover:bg-muted/50 transition-colors flex items-center justify-between"
                      >
                        <span className="font-semibold text-lg">{faq.question}</span>
                        <ChevronDown
                          className={`w-5 h-5 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}
                        />
                      </button>

                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-t border-border"
                        >
                          <div className="p-6 text-muted-foreground leading-relaxed">{faq.answer}</div>
                        </motion.div>
                      )}
                    </div>
                  )
                })}
              </div>
            </Card>
          ))}
        </motion.div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16"
        >
          <Card className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">پاسخ سوال خود را پیدا نکردید؟</h3>
            <p className="text-muted-foreground mb-8">تیم پشتیبانی ما آماده کمک به شماست</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <MessageCircle className="w-8 h-8 text-primary" />
                </div>
                <h4 className="font-semibold">چت آنلاین</h4>
                <p className="text-muted-foreground text-sm">پاسخ فوری</p>
              </div>

              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <Phone className="w-8 h-8 text-primary" />
                </div>
                <h4 className="font-semibold">تماس تلفنی</h4>
                <p className="text-muted-foreground text-sm">021-12345678</p>
              </div>

              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
                <h4 className="font-semibold">ایمیل</h4>
                <p className="text-muted-foreground text-sm">support@store.com</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
