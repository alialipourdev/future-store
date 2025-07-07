"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Search, Star, Heart, ShoppingCart, Grid, List } from "lucide-react"
import { motion } from "framer-motion"

const allProducts = [
  {
    id: 1,
    name: "آیفون 15 پرو مکس",
    price: 52000000,
    originalPrice: 58000000,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 234,
    category: "موبایل",
    inStock: true,
    isNew: false,
    isSale: true,
  },
  {
    id: 2,
    name: "سامسونگ گلکسی S24 اولترا",
    price: 48000000,
    originalPrice: 52000000,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    reviews: 189,
    category: "موبایل",
    inStock: true,
    isNew: true,
    isSale: false,
  },
  {
    id: 3,
    name: "مک بوک پرو M3 14 اینچ",
    price: 89000000,
    originalPrice: 95000000,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    reviews: 156,
    category: "لپ تاپ",
    inStock: true,
    isNew: true,
    isSale: true,
  },
  {
    id: 4,
    name: "لنوو ThinkPad X1 Carbon",
    price: 65000000,
    originalPrice: 70000000,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
    reviews: 98,
    category: "لپ تاپ",
    inStock: false,
    isNew: false,
    isSale: true,
  },
  {
    id: 5,
    name: "ایرپاد پرو 3",
    price: 8500000,
    originalPrice: 9200000,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    reviews: 89,
    category: "هدفون",
    inStock: true,
    isNew: false,
    isSale: true,
  },
  {
    id: 6,
    name: "سونی WH-1000XM5",
    price: 12000000,
    originalPrice: 13500000,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 167,
    category: "هدفون",
    inStock: true,
    isNew: false,
    isSale: true,
  },
]

const categories = ["همه", "موبایل", "لپ تاپ", "هدفون", "ساعت هوشمند", "دوربین"]

export default function ProductsPage() {
  const [products, setProducts] = useState(allProducts)
  const [selectedCategory, setSelectedCategory] = useState("همه")
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [favorites, setFavorites] = useState<number[]>([])

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fa-IR").format(price) + " تومان"
  }

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "همه" || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">همه محصولات</h1>
          <p className="text-muted-foreground text-lg">بهترین محصولات با کیفیت بالا و قیمت مناسب</p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <Card className="glass border-border p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="flex items-center glass rounded-2xl px-4 py-2 border border-border min-w-[300px]">
                <Search className="w-5 h-5 text-muted-foreground mr-3" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="جستجو در محصولات..."
                  className="bg-transparent border-0 text-foreground placeholder:text-muted-foreground outline-none"
                />
              </div>

              {/* Categories */}
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={
                      selectedCategory === category
                        ? "btn-gradient text-white"
                        : "border-border text-foreground hover:bg-muted"
                    }
                  >
                    {category}
                  </Button>
                ))}
              </div>

              {/* View Mode */}
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={
                    viewMode === "grid"
                      ? "bg-primary text-primary-foreground"
                      : "border-border text-foreground hover:bg-muted"
                  }
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={
                    viewMode === "list"
                      ? "bg-primary text-primary-foreground"
                      : "border-border text-foreground hover:bg-muted"
                  }
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Products Grid */}
        <div
          className={`grid gap-6 ${
            viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
          }`}
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Card
                className={`glass border-border hover:border-primary/40 transition-all duration-300 hover:shadow-2xl ${
                  viewMode === "list" ? "flex flex-row p-4" : "p-6"
                }`}
              >
                <div className="relative">
                  {/* Badges */}
                  <div className="absolute top-2 right-2 z-10 flex flex-col gap-2">
                    {product.isNew && <Badge className="bg-green-500 text-white border-0">جدید</Badge>}
                    {product.isSale && <Badge className="bg-red-500 text-white border-0">تخفیف</Badge>}
                    {!product.inStock && <Badge className="bg-gray-500 text-white border-0">ناموجود</Badge>}
                  </div>

                  {/* Favorite Button */}
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute top-2 left-2 z-10 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                  >
                    <Heart
                      className={`w-5 h-5 ${favorites.includes(product.id) ? "fill-red-500 text-red-500" : "text-white"}`}
                    />
                  </button>

                  {/* Product Image */}
                  <div
                    className={`bg-muted/50 rounded-2xl overflow-hidden ${
                      viewMode === "list" ? "w-32 h-32 mr-4" : "aspect-square mb-6"
                    }`}
                  >
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>

                <div className={`space-y-4 ${viewMode === "list" ? "flex-1" : ""}`}>
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
                      {product.isSale && (
                        <span className="text-muted-foreground line-through text-sm">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                    {product.isSale && (
                      <div className="text-green-400 text-sm font-medium">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% تخفیف
                      </div>
                    )}
                  </div>

                  <Button
                    disabled={!product.inStock}
                    className="w-full btn-gradient text-white rounded-2xl py-3 font-semibold group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    {product.inStock ? "افزودن به سبد خرید" : "ناموجود"}
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <div className="text-muted-foreground text-xl mb-4">محصولی یافت نشد</div>
            <p className="text-muted-foreground/60">لطفاً فیلترها را تغییر دهید یا عبارت جستجوی دیگری امتحان کنید</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
