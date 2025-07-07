"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Minus, Plus, Trash2, ShoppingBag, CreditCard, Truck, Shield, ArrowRight, Gift } from "lucide-react"

const initialCartItems = [
  {
    id: 1,
    name: "آیفون 15 پرو مکس",
    price: 52000000,
    originalPrice: 58000000,
    image: "/placeholder.svg?height=150&width=150",
    quantity: 1,
    color: "طلایی",
    storage: "256GB",
  },
  {
    id: 2,
    name: "ایرپاد پرو 3",
    price: 8500000,
    originalPrice: 9200000,
    image: "/placeholder.svg?height=150&width=150",
    quantity: 2,
    color: "سفید",
    storage: null,
  },
  {
    id: 3,
    name: "اپل واچ سری 9",
    price: 15000000,
    originalPrice: 17000000,
    image: "/placeholder.svg?height=150&width=150",
    quantity: 1,
    color: "مشکی",
    storage: "45mm",
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems)
  const [couponCode, setCouponCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null)

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id)
      return
    }
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const applyCoupon = () => {
    if (couponCode.toLowerCase() === "save20") {
      setAppliedCoupon("SAVE20")
      setCouponCode("")
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fa-IR").format(price) + " تومان"
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = appliedCoupon ? subtotal * 0.2 : 0
  const shipping = subtotal > 50000000 ? 0 : 500000
  const total = subtotal - discount + shipping

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">سبد خرید</h1>
          <p className="text-muted-foreground text-lg">محصولات انتخابی شما</p>
        </motion.div>

        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <Card className="glass border-border p-12 max-w-md mx-auto">
              <ShoppingBag className="w-24 h-24 text-muted-foreground mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-foreground mb-4">سبد خرید خالی است</h2>
              <p className="text-muted-foreground mb-8">هنوز محصولی به سبد خرید اضافه نکرده‌اید</p>
              <Button className="btn-gradient text-white px-8 py-3 rounded-2xl">شروع خرید</Button>
            </Card>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              <AnimatePresence>
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100, scale: 0.8 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    layout
                  >
                    <Card className="glass border-border p-6 hover:border-primary/40 transition-all duration-300">
                      <div className="flex gap-6">
                        {/* Product Image */}
                        <div className="relative">
                          <div className="w-32 h-32 bg-muted/50 rounded-2xl overflow-hidden">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          {item.originalPrice > item.price && (
                            <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs">
                              {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
                            </Badge>
                          )}
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 space-y-4">
                          <div>
                            <h3 className="text-xl font-bold text-foreground mb-2">{item.name}</h3>
                            <div className="flex gap-4 text-sm text-muted-foreground">
                              <span>رنگ: {item.color}</span>
                              {item.storage && <span>ظرفیت: {item.storage}</span>}
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            {/* Price */}
                            <div className="space-y-1">
                              <div className="text-2xl font-bold text-foreground">{formatPrice(item.price)}</div>
                              {item.originalPrice > item.price && (
                                <div className="text-muted-foreground line-through text-sm">
                                  {formatPrice(item.originalPrice)}
                                </div>
                              )}
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center gap-3">
                              <div className="flex items-center glass rounded-2xl border border-border">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="text-foreground hover:bg-muted rounded-r-2xl"
                                >
                                  <Minus className="w-4 h-4" />
                                </Button>
                                <span className="px-4 py-2 text-foreground font-medium min-w-[3rem] text-center">
                                  {item.quantity}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="text-foreground hover:bg-muted rounded-l-2xl"
                                >
                                  <Plus className="w-4 h-4" />
                                </Button>
                              </div>

                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeItem(item.id)}
                                className="text-red-400 hover:text-red-300 hover:bg-red-500/10 p-2 rounded-xl"
                              >
                                <Trash2 className="w-5 h-5" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Coupon Section */}
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <Card className="glass border-border p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Gift className="w-6 h-6 text-primary" />
                    <h3 className="text-lg font-semibold text-foreground">کد تخفیف</h3>
                  </div>
                  <div className="flex gap-3">
                    <Input
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="کد تخفیف خود را وارد کنید"
                      className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground rounded-2xl"
                    />
                    <Button onClick={applyCoupon} className="btn-gradient text-white px-6 rounded-2xl">
                      اعمال
                    </Button>
                  </div>
                  {appliedCoupon && (
                    <div className="mt-3 text-green-400 text-sm">✓ کد تخفیف {appliedCoupon} اعمال شد</div>
                  )}
                </Card>
              </motion.div>
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-6"
            >
              <Card className="glass border-border p-6 sticky top-24">
                <h3 className="text-xl font-bold text-foreground mb-6">خلاصه سفارش</h3>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-foreground/80">
                    <span>جمع کل</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-400">
                      <span>تخفیف</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-foreground/80">
                    <span>هزینه ارسال</span>
                    <span>{shipping === 0 ? "رایگان" : formatPrice(shipping)}</span>
                  </div>
                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between text-xl font-bold text-foreground">
                      <span>مجموع نهایی</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-muted-foreground text-sm">
                    <Truck className="w-4 h-4 text-green-400" />
                    <span>ارسال رایگان برای خریدهای بالای 50 میلیون تومان</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground text-sm">
                    <Shield className="w-4 h-4 text-blue-400" />
                    <span>گارانتی اصالت کالا</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground text-sm">
                    <CreditCard className="w-4 h-4 text-primary" />
                    <span>پرداخت امن</span>
                  </div>
                </div>

                <Button className="w-full btn-gradient text-white py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-primary/25 transition-all duration-300 group">
                  <CreditCard className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  ادامه خرید
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Card>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}
