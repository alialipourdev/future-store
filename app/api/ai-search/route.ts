import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { type NextRequest, NextResponse } from "next/server"

const products = [
  {
    name: "آیفون 15 پرو مکس",
    category: "موبایل",
    price: 52000000,
    features: ["دوربین 48 مگاپیکسل", "چیپ A17 Pro", "256GB حافظه"],
  },
  { name: "مک بوک پرو M3", category: "لپ تاپ", price: 89000000, features: ["چیپ M3", "16GB RAM", "512GB SSD"] },
  {
    name: "ایرپاد پرو 3",
    category: "هدفون",
    price: 8500000,
    features: ["حذف نویز فعال", "صدای فضایی", "مقاوم در برابر آب"],
  },
  {
    name: "اپل واچ سری 9",
    category: "ساعت هوشمند",
    price: 15000000,
    features: ["GPS", "مقاوم در برابر آب", "سنسور اکسیژن خون"],
  },
]

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json()

    const { text } = await generateText({
      model: openai("gpt-4o"),
      system: `You are a helpful shopping assistant for a Persian e-commerce store. 
      Based on the user's query, recommend products from this list: ${JSON.stringify(products, null, 2)}
      
      Respond in Persian and be helpful and friendly. Format your response as a recommendation with reasons why the products match the user's needs.`,
      prompt: `User query: ${query}
      
      Please recommend suitable products and explain why they match the user's needs. Respond in Persian.`,
    })

    return NextResponse.json({ response: text })
  } catch (error) {
    console.error("AI Search Error:", error)
    return NextResponse.json({ error: "خطا در پردازش درخواست" }, { status: 500 })
  }
}
