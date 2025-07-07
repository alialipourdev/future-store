"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { clearCart } from "@/lib/features/cart/cartSlice"
import { addTransaction } from "@/lib/features/wallet/walletSlice"
import { CreditCard, Wallet, MapPin, User, Package, Truck, Clock, CheckCircle, ArrowRight } from "lucide-react"

export default function CheckoutPage() {
  const dispatch = useAppDispatch()
  const { items, total } = useAppSelector((state) => state.cart)
  const { balance } = useAppSelector((state) => state.wallet)
  const [step, setStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState("wallet")
  const [shippingMethod, setShippingMethod] = useState("standard")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    notes: "",
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fa-IR").format(price) + " تومان"
  }

  const shippingCost = shippingMethod === "express" ? 200000 : total > 5000000 ? 0 : 150000
  const finalTotal = total + shippingCost

  const handleSubmit = async () => {
    if (paymentMethod === "wallet" && balance < finalTotal) {
      alert("موجودی کیف پول کافی نیست")
      return
    }

    // Process payment
    if (paymentMethod === "wallet") {
      dispatch(
        addTransaction({
          id: Date.now().toString(),
          type: "purchase",
          amount: finalTotal,
          description: `خرید ${items.length} محصول`,
          date: new Date().toISOString(),
          status: "completed",
        }),
      )
    }

    // Clear cart
    dispatch(clearCart())

    // Go to success step
    setStep(4)
  }

  const steps = [
    { id: 1, title: "اطلاعات ارسال", icon: MapPin },
    { id: 2, title: "روش ارسال", icon: Truck },
    { id: 3, title: "پرداخت", icon: CreditCard },
    { id: 4, title: "تکمیل", icon: CheckCircle },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center justify-center">
            {steps.map((stepItem, index) => (
              <div key={stepItem.id} className="flex items-center">
                <div
                  className={`flex items-center gap-3 px-6 py-3 rounded-2xl transition-colors ${
                    step >= stepItem.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  <stepItem.icon className="w-5 h-5" />
                  <span className="font-medium">{stepItem.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-1 mx-4 ${step > stepItem.id ? "bg-primary" : "bg-muted"}`} />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Shipping Information */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="p-8">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <User className="w-6 h-6 text-primary" />
                    اطلاعات ارسال
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">نام</label>
                      <Input
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        placeholder="نام خود را وارد کنید"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">نام خانوادگی</label>
                      <Input
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        placeholder="نام خانوادگی خود را وارد کنید"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">ایمیل</label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="example@email.com"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">شماره تلفن</label>
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="09123456789"
                        required
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium">آدرس کامل</label>
                      <Textarea
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="آدرس کامل خود را وارد کنید"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">شهر</label>
                      <Input
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="شهر"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">کد پستی</label>
                      <Input
                        value={formData.postalCode}
                        onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                        placeholder="کد پستی 10 رقمی"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    onClick={() => setStep(2)}
                    className="w-full mt-8 gradient-primary text-white py-3 rounded-2xl"
                  >
                    ادامه
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Card>
              </motion.div>
            )}

            {/* Step 2: Shipping Method */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="p-8">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <Truck className="w-6 h-6 text-primary" />
                    روش ارسال
                  </h2>

                  <div className="space-y-4">
                    <div
                      onClick={() => setShippingMethod("standard")}
                      className={`p-6 border rounded-2xl cursor-pointer transition-colors ${
                        shippingMethod === "standard" ? "border-primary bg-primary/5" : "border-border"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Package className="w-6 h-6 text-primary" />
                          <div>
                            <h3 className="font-semibold">ارسال عادی</h3>
                            <p className="text-muted-foreground text-sm">3-5 روز کاری</p>
                          </div>
                        </div>
                        <span className="font-bold">{total > 5000000 ? "رایگان" : formatPrice(150000)}</span>
                      </div>
                    </div>

                    <div
                      onClick={() => setShippingMethod("express")}
                      className={`p-6 border rounded-2xl cursor-pointer transition-colors ${
                        shippingMethod === "express" ? "border-primary bg-primary/5" : "border-border"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Clock className="w-6 h-6 text-primary" />
                          <div>
                            <h3 className="font-semibold">ارسال فوری</h3>
                            <p className="text-muted-foreground text-sm">1-2 روز کاری</p>
                          </div>
                        </div>
                        <span className="font-bold">{formatPrice(200000)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-8">
                    <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                      بازگشت
                    </Button>
                    <Button onClick={() => setStep(3)} className="flex-1 gradient-primary text-white">
                      ادامه
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="p-8">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <CreditCard className="w-6 h-6 text-primary" />
                    روش پرداخت
                  </h2>

                  <div className="space-y-4">
                    <div
                      onClick={() => setPaymentMethod("wallet")}
                      className={`p-6 border rounded-2xl cursor-pointer transition-colors ${
                        paymentMethod === "wallet" ? "border-primary bg-primary/5" : "border-border"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Wallet className="w-6 h-6 text-primary" />
                          <div>
                            <h3 className="font-semibold">کیف پول</h3>
                            <p className="text-muted-foreground text-sm">موجودی: {formatPrice(balance)}</p>
                          </div>
                        </div>
                        {balance >= finalTotal ? (
                          <Badge className="bg-success text-success-foreground">کافی</Badge>
                        ) : (
                          <Badge variant="destructive">ناکافی</Badge>
                        )}
                      </div>
                    </div>

                    <div
                      onClick={() => setPaymentMethod("card")}
                      className={`p-6 border rounded-2xl cursor-pointer transition-colors ${
                        paymentMethod === "card" ? "border-primary bg-primary/5" : "border-border"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <CreditCard className="w-6 h-6 text-primary" />
                        <div>
                          <h3 className="font-semibold">کارت بانکی</h3>
                          <p className="text-muted-foreground text-sm">پرداخت آنلاین</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-8">
                    <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                      بازگشت
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      disabled={paymentMethod === "wallet" && balance < finalTotal}
                      className="flex-1 gradient-primary text-white"
                    >
                      تکمیل خرید
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Step 4: Success */}
            {step === 4 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="p-8 text-center">
                  <CheckCircle className="w-24 h-24 text-success mx-auto mb-6" />
                  <h2 className="text-3xl font-bold text-success mb-4">سفارش با موفقیت ثبت شد!</h2>
                  <p className="text-muted-foreground mb-8">
                    سفارش شما با شماره #12345 ثبت شد و به زودی ارسال خواهد شد
                  </p>
                  <div className="flex gap-4 justify-center">
                    <Button variant="outline">مشاهده سفارش</Button>
                    <Button className="gradient-primary text-white">ادامه خرید</Button>
                  </div>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-6 sticky top-24">
              <h3 className="text-xl font-bold mb-6">خلاصه سفارش</h3>

              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-xl"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <p className="text-muted-foreground text-xs">تعداد: {item.quantity}</p>
                    </div>
                    <span className="font-bold text-sm">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-border pt-4">
                <div className="flex justify-between">
                  <span>جمع کل</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span>هزینه ارسال</span>
                  <span>{shippingCost === 0 ? "رایگان" : formatPrice(shippingCost)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold border-t border-border pt-3">
                  <span>مجموع نهایی</span>
                  <span>{formatPrice(finalTotal)}</span>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
