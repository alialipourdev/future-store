"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { updateProfile } from "@/lib/features/auth/authSlice"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Save,
  Camera,
  Shield,
  Bell,
  CreditCard,
  Package,
  Heart,
} from "lucide-react"

export default function ProfilePage() {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)
  const { items: wishlistItems } = useAppSelector((state) => state.wishlist)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: "",
    birthDate: "",
  })

  const handleSave = () => {
    if (user) {
      dispatch(
        updateProfile({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        }),
      )
    }
    setIsEditing(false)
  }

  const stats = [
    { label: "سفارشات", value: "12", icon: Package },
    { label: "علاقه‌مندی‌ها", value: wishlistItems.length.toString(), icon: Heart },
    { label: "نظرات", value: "8", icon: User },
    { label: "امتیاز", value: "4.8", icon: Shield },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Card className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Avatar */}
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-primary to-emerald-500 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                  {user?.name?.charAt(0) || "U"}
                </div>
                <Button size="sm" className="absolute bottom-0 right-0 rounded-full w-10 h-10 p-0">
                  <Camera className="w-4 h-4" />
                </Button>
              </div>

              {/* User Info */}
              <div className="flex-1 text-center md:text-right">
                <h1 className="text-3xl font-bold mb-2">{user?.name || "کاربر"}</h1>
                <p className="text-muted-foreground mb-4">{user?.email}</p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <Badge className="bg-success text-success-foreground">کاربر تایید شده</Badge>
                  <Badge variant="outline">عضو از 1402</Badge>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-muted-foreground text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile">اطلاعات شخصی</TabsTrigger>
              <TabsTrigger value="orders">سفارشات</TabsTrigger>
              <TabsTrigger value="addresses">آدرس‌ها</TabsTrigger>
              <TabsTrigger value="settings">تنظیمات</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="mt-6">
              <Card className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">اطلاعات شخصی</h2>
                  <Button
                    onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                    variant={isEditing ? "default" : "outline"}
                  >
                    {isEditing ? (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        ذخیره
                      </>
                    ) : (
                      <>
                        <Edit className="w-4 h-4 mr-2" />
                        ویرایش
                      </>
                    )}
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <User className="w-4 h-4" />
                      نام و نام خانوادگی
                    </label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      disabled={!isEditing}
                      placeholder="نام کامل خود را وارد کنید"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      ایمیل
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={!isEditing}
                      placeholder="example@email.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      شماره تلفن
                    </label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      disabled={!isEditing}
                      placeholder="09123456789"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      تاریخ تولد
                    </label>
                    <Input
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      آدرس
                    </label>
                    <Input
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      disabled={!isEditing}
                      placeholder="آدرس کامل خود را وارد کنید"
                    />
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders" className="mt-6">
              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-6">سفارشات من</h2>
                <div className="text-center py-12">
                  <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-muted-foreground mb-2">هنوز سفارشی ندارید</h3>
                  <p className="text-muted-foreground mb-6">اولین سفارش خود را ثبت کنید</p>
                  <Button className="gradient-primary text-white">شروع خرید</Button>
                </div>
              </Card>
            </TabsContent>

            {/* Addresses Tab */}
            <TabsContent value="addresses" className="mt-6">
              <Card className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">آدرس‌های من</h2>
                  <Button className="gradient-primary text-white">
                    <MapPin className="w-4 h-4 mr-2" />
                    افزودن آدرس جدید
                  </Button>
                </div>
                <div className="text-center py-12">
                  <MapPin className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-muted-foreground mb-2">آدرسی ثبت نشده</h3>
                  <p className="text-muted-foreground">آدرس خود را برای ارسال سریع‌تر اضافه کنید</p>
                </div>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="mt-6">
              <div className="space-y-6">
                {/* Notifications */}
                <Card className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    اعلان‌ها
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>اعلان‌های ایمیل</span>
                      <Button variant="outline" size="sm">
                        فعال
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>اعلان‌های SMS</span>
                      <Button variant="outline" size="sm">
                        غیرفعال
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>اعلان‌های تخفیف</span>
                      <Button variant="outline" size="sm">
                        فعال
                      </Button>
                    </div>
                  </div>
                </Card>

                {/* Security */}
                <Card className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    امنیت
                  </h3>
                  <div className="space-y-4">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      تغییر رمز عبور
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      احراز هویت دو مرحله‌ای
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      مشاهده دستگاه‌های متصل
                    </Button>
                  </div>
                </Card>

                {/* Payment Methods */}
                <Card className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    روش‌های پرداخت
                  </h3>
                  <div className="text-center py-8">
                    <CreditCard className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">هیچ کارتی ثبت نشده</p>
                    <Button variant="outline">افزودن کارت جدید</Button>
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
