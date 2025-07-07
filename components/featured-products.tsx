"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, ShoppingCart } from "lucide-react"
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { addToCart } from "@/lib/features/cart/cartSlice"
import { addToWishlist, removeFromWishlist } from "@/lib/features/wishlist/wishlistSlice"

const products = [
  {
    id: 1,
    name: "آیفون 15 پرو مکس",
    price: 52000000,
    originalPrice: 58000000,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 234,
    badge: "پرفروش",
    badgeColor: "bg-destructive",
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
    badge: "جدید",
    badgeColor: "badge-success",
    inStock: true,
    isNew: true,
    isSale: true,
  },
  {
    id: 3,
    name: "ایرپاد پرو 3",
    price: 8500000,
    originalPrice: 9200000,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    reviews: 89,
    badge: "تخفیف ویژه",
    badgeColor: "bg-primary",
    inStock: true,
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
    badge: "محبوب",
    badgeColor: "badge-info",
    inStock: true,
    isNew: false,
    isSale: true,
  },
]

export function FeaturedProducts() {
  const dispatch = useAppDispatch()
  const wishlistItems = useAppSelector((state) => state.wishlist.items)

  const toggleFavorite = (product: (typeof products)[0]) => {
    const isInWishlist = wishlistItems.some((item) => item.id === product.id)

    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id))
    } else {
      dispatch(
        addToWishlist({
          id: product.id,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.image,
          rating: product.rating,
          reviews: product.reviews,
          inStock: product.inStock,
          isNew: product.isNew,
          isSale: product.isSale,
        }),
      )
    }
  }

  const handleAddToCart = (product: (typeof products)[0]) => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
      }),
    )
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fa-IR").format(price) + " تومان"
  }

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">محصولات ویژه</h2>
          <p className="text-muted-foreground text-lg">بهترین و جدیدترین محصولات با تخفیف‌های استثنایی</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="relative glass rounded-3xl p-6 border border-border/50 hover:border-primary/40 transition-all duration-300 hover:shadow-2xl card-hover">
                <Badge className={`absolute top-4 right-4 ${product.badgeColor} text-white border-0`}>
                  {product.badge}
                </Badge>

                <button
                  onClick={() => toggleFavorite(product)}
                  className="absolute top-4 left-4 p-2 rounded-full bg-background/20 hover:bg-background/30 transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      wishlistItems.some((item) => item.id === product.id)
                        ? "fill-red-500 text-red-500"
                        : "text-foreground"
                    }`}
                  />
                </button>

                <div className="aspect-square bg-muted/50 rounded-2xl mb-6 overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-foreground font-bold text-xl">{product.name}</h3>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-foreground/80 text-sm">{product.rating}</span>
                    </div>
                    <span className="text-muted-foreground text-sm">({product.reviews} نظر)</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-foreground">{formatPrice(product.price)}</span>
                      <span className="text-muted-foreground line-through text-sm">
                        {formatPrice(product.originalPrice)}
                      </span>
                    </div>
                    <div className="text-success text-sm font-medium">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% تخفیف
                    </div>
                  </div>

                  <Button
                    onClick={() => handleAddToCart(product)}
                    className="w-full btn-gradient rounded-2xl py-3 font-semibold group btn-ripple"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    افزودن به سبد خرید
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
