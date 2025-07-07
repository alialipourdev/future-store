"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, Star, Trash2, Share2, Eye } from "lucide-react"

const initialWishlistItems = [
  {
    id: 1,
    name: "آیفون 15 پرو مکس",
    price: 52000000,
    originalPrice: 58000000,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 234,
    inStock: true,
    isNew: false,
    isSale: true,
  },
  {
    id: 2,
    name: "مک بوک پرو M3",
    price: 89000000,
    originalPrice: 95000000,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    reviews: 156,
    inStock: true,
    isNew: true,
    isSale: true,
  },
  {
    id: 3,
    name: "سونی WH-1000XM5",
    price: 12000000,
    originalPrice: 13500000,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 167,
    inStock: false,
    isNew: false,
    isSale: true,
  },
  {
    id: 4,
    name: "اپل واچ سری 9",
    price: 15000000,
    originalPrice: 17000000,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
    reviews: 123,
    inStock: true,
    isNew: false,
    isSale: true,
  },
]

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems)

  const removeFromWishlist = (id: number) => {
    setWishlistItems((items) => items.filter((item) => item.id !== id))
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fa-IR").format(price) + " تومان"
  }

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
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="w-12 h-12 text-red-500 fill-red-500" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">علاقه‌مندی‌ها</h1>
          </div>
          <p className="text-muted-foreground text-lg">محصولات مورد علاقه شما ({wishlistItems.length} محصول)</p>
        </motion.div>

        {wishlistItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <Card className="glass border-border p-12 max-w-md mx-auto">
              <Heart className="w-24 h-24 text-muted-foreground mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-foreground mb-4">لیست علاقه‌مندی‌ها خالی است</h2>
              <p className="text-muted-foreground mb-8">هنوز محصولی به لیست علاقه‌مندی‌های خود اضافه نکرده‌اید</p>
              <Button className="btn-gradient text-white px-8 py-3 rounded-2xl">کشف محصولات</Button>
            </Card>
          </motion.div>
        ) : (
          <>
            {/* Action Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <Card className="glass border-border p-4">
                <div className="flex items-center justify-between">
                  <div className="text-foreground/80">{wishlistItems.length} محصول در لیست علاقه‌مندی‌ها</div>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="border-border text-foreground hover:bg-muted rounded-2xl bg-transparent"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      اشتراک‌گذاری
                    </Button>
                    <Button className="btn-gradient text-white rounded-2xl">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      افزودن همه به سبد
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Wishlist Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence>
                {wishlistItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -50 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    layout
                    whileHover={{ y: -10 }}
                    className="group"
                  >
                    <Card className="glass border-border hover:border-primary/40 transition-all duration-300 hover:shadow-2xl p-6 relative overflow-hidden">
                      {/* Background Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Badges */}
                      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                        {item.isNew && <Badge className="bg-green-500 text-white border-0">جدید</Badge>}
                        {item.isSale && <Badge className="bg-red-500 text-white border-0">تخفیف</Badge>}
                        {!item.inStock && <Badge className="bg-gray-500 text-white border-0">ناموجود</Badge>}
                      </div>

                      {/* Action Buttons */}
                      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="bg-background/20 hover:bg-background/30 text-foreground p-2 rounded-xl backdrop-blur-sm"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeFromWishlist(item.id)}
                          className="bg-red-500/20 hover:bg-red-500/30 text-red-400 p-2 rounded-xl backdrop-blur-sm"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Product Image */}
                      <div className="aspect-square bg-muted/50 rounded-2xl mb-6 overflow-hidden relative">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      <div className="space-y-4 relative z-10">
                        <h3 className="text-foreground font-bold text-xl group-hover:text-primary transition-colors">
                          {item.name}
                        </h3>

                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-foreground/80 text-sm">{item.rating}</span>
                          </div>
                          <span className="text-muted-foreground text-sm">({item.reviews} نظر)</span>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl font-bold text-foreground">{formatPrice(item.price)}</span>
                            {item.isSale && (
                              <span className="text-muted-foreground line-through text-sm">
                                {formatPrice(item.originalPrice)}
                              </span>
                            )}
                          </div>
                          {item.isSale && (
                            <div className="text-green-400 text-sm font-medium">
                              {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% تخفیف
                            </div>
                          )}
                        </div>

                        <div className="flex gap-2">
                          <Button
                            disabled={!item.inStock}
                            className="flex-1 btn-gradient text-white rounded-2xl py-3 font-semibold group/btn disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <ShoppingCart className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                            {item.inStock ? "افزودن به سبد" : "ناموجود"}
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => removeFromWishlist(item.id)}
                            className="bg-red-500/20 hover:bg-red-500/30 text-red-400 p-3 rounded-2xl"
                          >
                            <Heart className="w-4 h-4 fill-current" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Recommendations */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-16"
            >
              <Card className="glass border-border p-8 text-center">
                <h3 className="text-2xl font-bold text-foreground mb-4">پیشنهادات ویژه</h3>
                <p className="text-muted-foreground mb-6">بر اساس علاقه‌مندی‌های شما، این محصولات را پیشنهاد می‌دهیم</p>
                <Button className="btn-gradient text-white px-8 py-3 rounded-2xl">مشاهده پیشنهادات</Button>
              </Card>
            </motion.div>
          </>
        )}
      </div>
    </div>
  )
}
