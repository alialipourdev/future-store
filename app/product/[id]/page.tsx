"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useParams } from "next/navigation"
import { useAppDispatch } from "@/lib/hooks"
import { addToCart } from "@/lib/features/cart/cartSlice"
import {
  Star,
  Heart,
  ShoppingCart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  Award,
  Plus,
  Minus,
  Check,
  MessageCircle,
} from "lucide-react"

// Mock product data
const product = {
  id: 1,
  name: "آیفون 15 پرو مکس",
  price: 52000000,
  originalPrice: 58000000,
  images: [
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
  ],
  rating: 4.8,
  reviews: 234,
  inStock: true,
  brand: "Apple",
  category: "موبایل",
  description: "آیفون 15 پرو مکس با چیپ A17 Pro، دوربین 48 مگاپیکسل و طراحی تیتانیوم",
  features: [
    "چیپ A17 Pro با فناوری 3 نانومتر",
    "دوربین اصلی 48 مگاپیکسل",
    "نمایشگر Super Retina XDR 6.7 اینچ",
    "بدنه تیتانیوم مقاوم",
    "باتری تمام روز",
    "مقاوم در برابر آب IP68",
  ],
  specifications: {
    نمایشگر: "6.7 اینچ Super Retina XDR",
    پردازنده: "A17 Pro",
    "حافظه داخلی": "256GB",
    دوربین: "48MP + 12MP + 12MP",
    باتری: "4441 mAh",
    "سیستم عامل": "iOS 17",
  },
  colors: ["طلایی", "نقره‌ای", "مشکی", "آبی"],
  storages: ["128GB", "256GB", "512GB", "1TB"],
}

const reviews = [
  {
    id: 1,
    user: "علی احمدی",
    rating: 5,
    comment: "محصول فوق‌العاده‌ای است. کیفیت ساخت و عملکرد بی‌نظیر",
    date: "1403/01/15",
    verified: true,
  },
  {
    id: 2,
    user: "مریم کریمی",
    rating: 4,
    comment: "دوربین عالی و باتری قوی. قیمت کمی بالاست",
    date: "1403/01/10",
    verified: true,
  },
]

export default function ProductPage() {
  const params = useParams()
  const dispatch = useAppDispatch()
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedStorage, setSelectedStorage] = useState(product.storages[1])
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fa-IR").format(price) + " تومان"
  }

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.images[0],
        color: selectedColor,
        storage: selectedStorage,
      }),
    )
  }

  const discountPercentage = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="aspect-square bg-muted rounded-3xl overflow-hidden">
              <img
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-muted rounded-2xl overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? "border-primary" : "border-transparent"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{product.brand}</Badge>
                <Badge variant="outline">{product.category}</Badge>
                {product.inStock && <Badge className="bg-success text-success-foreground">موجود</Badge>}
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-4">{product.name}</h1>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted"}`}
                  />
                ))}
                <span className="text-foreground font-medium mr-2">{product.rating}</span>
              </div>
              <span className="text-muted-foreground">({product.reviews} نظر)</span>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <span className="text-4xl font-bold text-foreground">{formatPrice(product.price)}</span>
                <span className="text-xl text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
                <Badge className="bg-destructive text-destructive-foreground">{discountPercentage}% تخفیف</Badge>
              </div>
              <p className="text-success text-sm font-medium">
                شما {formatPrice(product.originalPrice - product.price)} صرفه‌جویی می‌کنید
              </p>
            </div>

            {/* Color Selection */}
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">رنگ:</h3>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-xl border transition-colors ${
                      selectedColor === color
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Storage Selection */}
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">ظرفیت:</h3>
              <div className="grid grid-cols-4 gap-3">
                {product.storages.map((storage) => (
                  <button
                    key={storage}
                    onClick={() => setSelectedStorage(storage)}
                    className={`py-3 rounded-xl border transition-colors ${
                      selectedStorage === storage
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    {storage}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">تعداد:</h3>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-border rounded-xl">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="rounded-r-xl"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="px-4 py-2 font-medium min-w-[3rem] text-center">{quantity}</span>
                  <Button variant="ghost" size="sm" onClick={() => setQuantity(quantity + 1)} className="rounded-l-xl">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <Button onClick={handleAddToCart} className="flex-1 gradient-primary text-white py-3 rounded-2xl group">
                <ShoppingCart className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                افزودن به سبد خرید
              </Button>
              <Button variant="outline" onClick={() => setIsFavorite(!isFavorite)} className="p-3 rounded-2xl">
                <Heart className={`w-5 h-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
              <Button variant="outline" className="p-3 rounded-2xl bg-transparent">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            {/* Features */}
            <Card className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-primary" />
                  <span className="text-sm">ارسال رایگان</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-primary" />
                  <span className="text-sm">گارانتی اصالت</span>
                </div>
                <div className="flex items-center gap-3">
                  <RotateCcw className="w-5 h-5 text-primary" />
                  <span className="text-sm">7 روز ضمانت بازگشت</span>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-primary" />
                  <span className="text-sm">کیفیت تضمینی</span>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Product Details Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Tabs defaultValue="features" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="features">ویژگی‌ها</TabsTrigger>
              <TabsTrigger value="specifications">مشخصات</TabsTrigger>
              <TabsTrigger value="reviews">نظرات</TabsTrigger>
            </TabsList>

            <TabsContent value="features" className="mt-6">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">ویژگی‌های محصول</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-success" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="specifications" className="mt-6">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">مشخصات فنی</h3>
                <div className="space-y-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between items-center py-2 border-b border-border last:border-0"
                    >
                      <span className="font-medium">{key}</span>
                      <span className="text-muted-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">نظرات کاربران</h3>
                  <Button variant="outline">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    ثبت نظر
                  </Button>
                </div>

                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-border pb-6 last:border-0">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="font-medium">{review.user}</span>
                          {review.verified && (
                            <Badge variant="secondary" className="text-xs">
                              خرید تایید شده
                            </Badge>
                          )}
                        </div>
                        <span className="text-sm text-muted-foreground">{review.date}</span>
                      </div>
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted"}`}
                          />
                        ))}
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
