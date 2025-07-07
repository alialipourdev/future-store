"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Star, Heart, ShoppingCart, Filter, Grid, List, SlidersHorizontal } from "lucide-react"
import { useParams } from "next/navigation"

const categoryData = {
  mobile: {
    title: "موبایل و تبلت",
    description: "جدیدترین گوشی‌های هوشمند و تبلت‌ها",
    icon: "📱",
    products: [
      {
        id: 1,
        name: "آیفون 15 پرو مکس",
        price: 52000000,
        originalPrice: 58000000,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.8,
        reviews: 234,
        brand: "Apple",
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
        brand: "Samsung",
        inStock: true,
        isNew: true,
        isSale: false,
      },
    ],
  },
  laptop: {
    title: "لپ تاپ و کامپیوتر",
    description: "قدرتمندترین لپ تاپ‌ها و کامپیوترها",
    icon: "💻",
    products: [
      {
        id: 3,
        name: "مک بوک پرو M3 14 اینچ",
        price: 89000000,
        originalPrice: 95000000,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.9,
        reviews: 156,
        brand: "Apple",
        inStock: true,
        isNew: true,
        isSale: true,
      },
    ],
  },
  headphone: {
    title: "هدفون و اسپیکر",
    description: "بهترین کیفیت صدا برای شما",
    icon: "🎧",
    products: [
      {
        id: 5,
        name: "ایرپاد پرو 3",
        price: 8500000,
        originalPrice: 9200000,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.7,
        reviews: 89,
        brand: "Apple",
        inStock: true,
        isNew: false,
        isSale: true,
      },
    ],
  },
}

export default function CategoryPage() {
  const params = useParams()
  const slug = params.slug as string
  const category = categoryData[slug as keyof typeof categoryData]

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("popular")
  const [priceRange, setPriceRange] = useState([0, 100000000])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [favorites, setFavorites] = useState<number[]>([])

  if (!category) {
    return <div>Category not found</div>
  }

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fa-IR").format(price) + " تومان"
  }

  const brands = Array.from(new Set(category.products.map((p) => p.brand)))

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Category Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="text-6xl mb-4">{category.icon}</div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{category.title}</h1>
          <p className="text-muted-foreground text-lg">{category.description}</p>
        </motion.div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className={`${showFilters ? "block" : "hidden"} lg:block w-80 space-y-6`}
          >
            <Card className="bg-card/90 backdrop-blur-md border border-border p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                <Filter className="w-5 h-5" />
                فیلترها
              </h3>

              {/* Price Range */}
              <div className="space-y-4 mb-6">
                <h4 className="text-foreground/80 font-medium">محدوده قیمت</h4>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={100000000}
                  step={1000000}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{formatPrice(priceRange[0])}</span>
                  <span>{formatPrice(priceRange[1])}</span>
                </div>
              </div>

              {/* Brands */}
              <div className="space-y-4 mb-6">
                <h4 className="text-foreground/80 font-medium">برند</h4>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <label key={brand} className="flex items-center gap-2 text-muted-foreground cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedBrands([...selectedBrands, brand])
                          } else {
                            setSelectedBrands(selectedBrands.filter((b) => b !== brand))
                          }
                        }}
                        className="rounded border-border bg-background text-primary focus:ring-primary/20"
                      />
                      {brand}
                    </label>
                  ))}
                </div>
              </div>

              {/* Stock Status */}
              <div className="space-y-4">
                <h4 className="text-foreground/80 font-medium">وضعیت موجودی</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-muted-foreground cursor-pointer">
                    <input
                      type="checkbox"
                      className="rounded border-border bg-background text-primary focus:ring-primary/20"
                    />
                    فقط کالاهای موجود
                  </label>
                  <label className="flex items-center gap-2 text-muted-foreground cursor-pointer">
                    <input
                      type="checkbox"
                      className="rounded border-border bg-background text-primary focus:ring-primary/20"
                    />
                    فقط کالاهای تخفیف‌دار
                  </label>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Products Section */}
          <div className="flex-1">
            {/* Toolbar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <Card className="bg-card/90 backdrop-blur-md border border-border p-4">
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button
                      onClick={() => setShowFilters(!showFilters)}
                      className="lg:hidden bg-muted text-foreground border-border rounded-2xl"
                    >
                      <SlidersHorizontal className="w-4 h-4 mr-2" />
                      فیلترها
                    </Button>
                    <span className="text-muted-foreground">{category.products.length} محصول یافت شد</span>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Sort */}
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-48 bg-background/50 border-border text-foreground rounded-2xl">
                        <SelectValue placeholder="مرتب‌سازی بر اساس" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        <SelectItem value="popular">محبوب‌ترین</SelectItem>
                        <SelectItem value="newest">جدیدترین</SelectItem>
                        <SelectItem value="price-low">ارزان‌ترین</SelectItem>
                        <SelectItem value="price-high">گران‌ترین</SelectItem>
                        <SelectItem value="rating">بالاترین امتیاز</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* View Mode */}
                    <div className="flex gap-2">
                      <Button
                        variant={viewMode === "grid" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setViewMode("grid")}
                        className={
                          viewMode === "grid"
                            ? "bg-primary text-primary-foreground rounded-xl"
                            : "border-border text-foreground hover:bg-muted rounded-xl bg-transparent"
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
                            ? "bg-primary text-primary-foreground rounded-xl"
                            : "border-border text-foreground hover:bg-muted rounded-xl bg-transparent"
                        }
                      >
                        <List className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Products Grid */}
            <div
              className={`grid gap-6 ${
                viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
              }`}
            >
              {category.products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group"
                >
                  <Card
                    className={`bg-card/90 backdrop-blur-md border border-border hover:border-primary/40 transition-all duration-300 hover:shadow-2xl ${
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
                        className="absolute top-2 left-2 z-10 p-2 rounded-full bg-background/20 hover:bg-background/30 transition-colors"
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            favorites.includes(product.id) ? "fill-red-500 text-red-500" : "text-foreground"
                          }`}
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
                      <div>
                        <h3 className="text-foreground font-bold text-xl mb-2">{product.name}</h3>
                        <p className="text-muted-foreground text-sm">{product.brand}</p>
                      </div>

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
                        className="w-full bg-gradient-to-r from-primary to-emerald-500 hover:from-primary/90 hover:to-emerald-500/90 text-white rounded-2xl py-3 font-semibold group disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ShoppingCart className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                        {product.inStock ? "افزودن به سبد خرید" : "ناموجود"}
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
