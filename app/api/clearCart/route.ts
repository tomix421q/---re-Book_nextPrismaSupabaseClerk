// /app/api/cart/clear/route.ts
import { NextResponse } from 'next/server'

export const POST = async () => {
  // Toto by mal byť trigger na vymazanie košíka na klientovi
  // Na serveri nevieme spravovať košík cez useCart
  return NextResponse.json({ message: 'Cart cleared' })
}
