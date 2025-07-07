"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, ShoppingCart, User, Menu, Heart, Wallet } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useAppSelector } from "@/lib/hooks"
import { ThemeSwitcher } from "@/components/theme-switcher"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const cartItemCount = useAppSelector((state) => state.cart.itemCount)
  const wishlistItemCount = useAppSelector((state) => state.wishlist.items.length)
  const { isAuthenticated, user } = useAppSelector((state) => state.auth)

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-foreground font-bold text-xl">فروشگاه مدرن</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
              خانه
            </Link>
            <Link href="/products" className="text-muted-foreground hover:text-foreground transition-colors">
              محصولات
            </Link>
            <div className="relative group">
              <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                دسته‌بندی
              </span>
              <div className="absolute top-full left-0 mt-2 w-48 bg-card/90 backdrop-blur-md rounded-2xl border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <div className="p-2">
                  <Link
                    href="/category/mobile"
                    className="block px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-colors"
                  >
                    موبایل و تبلت
                  </Link>
                  <Link
                    href="/category/laptop"
                    className="block px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-colors"
                  >
                    لپ تاپ و کامپیوتر
                  </Link>
                  <Link
                    href="/category/headphone"
                    className="block px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-colors"
                  >
                    هدفون و اسپیکر
                  </Link>
                </div>
              </div>
            </div>
            <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
              درباره ما
            </Link>
            <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
              تماس
            </Link>
          </div>

          {/* Search Bar */}
          {/* <div className="hidden lg:flex items-center bg-muted/50 rounded-2xl px-4 py-2 border border-border min-w-[300px]">
            <Search className="w-5 h-5 text-muted-foreground mr-3" />
            <input
              type="text"
              placeholder="جستجو در محصولات..."
              className="bg-transparent text-foreground placeholder:text-muted-foreground outline-none flex-1"
            />
          </div> */}

          {/* Actions */}
          <div className="flex items-center gap-3">
            <ThemeSwitcher />

            {isAuthenticated && (
              <Link href="/wallet">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  <Wallet className="w-5 h-5" />
                </Button>
              </Link>
            )}

            <Link href="/wishlist">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground relative">
                <Heart className="w-5 h-5" />
                {wishlistItemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground text-xs min-w-[20px] h-5 flex items-center justify-center">
                    {wishlistItemCount}
                  </Badge>
                )}
              </Button>
            </Link>

            <Link href="/cart">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground relative">
                <ShoppingCart className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs min-w-[20px] h-5 flex items-center justify-center">
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {isAuthenticated ? (
              <div className="relative group">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  <User className="w-5 h-5" />
                </Button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-card/90 backdrop-blur-md rounded-2xl border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <div className="p-2">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-colors"
                    >
                      پروفایل
                    </Link>
                    <Link
                      href="/orders"
                      className="block px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-colors"
                    >
                      سفارشات
                    </Link>
                    <Link
                      href="/wallet"
                      className="block px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-colors"
                    >
                      کیف پول
                    </Link>
                    <button className="block w-full text-right px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-colors">
                      خروج
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link href="/auth/login">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  <User className="w-5 h-5" />
                </Button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-muted-foreground hover:text-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pt-4 border-t border-border"
          >
            <div className="flex flex-col gap-4">
              <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                خانه
              </Link>
              <Link href="/products" className="text-muted-foreground hover:text-foreground transition-colors">
                محصولات
              </Link>
              <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                درباره ما
              </Link>
              <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                تماس
              </Link>

              <div className="flex items-center bg-muted/50 rounded-2xl px-4 py-2 border border-border mt-2">
                <Search className="w-5 h-5 text-muted-foreground mr-3" />
                <input
                  type="text"
                  placeholder="جستجو..."
                  className="bg-transparent text-foreground placeholder:text-muted-foreground outline-none flex-1"
                />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}
