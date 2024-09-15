'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useCart } from '@/utils/context/cart'

function OrderComplete() {
  const router = useRouter()
  const cart = useCart()
  const [secondsRemaining, setSecondsRemaining] = useState(5)

  useEffect(() => {
    cart.clearCart()
  }, [cart])

  useEffect(() => {
    const countdown = () => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearTimeout(timer)
          router.push('/orders')
          return 0
        }
        return prev - 1
      })
    }
    const timer = setInterval(countdown, 1000)
    return () => clearInterval(timer)
  }, [router])

  return (
    <div>
      <h1>Ďakujeme za váš nákup!</h1>
      <p> {`Budete presmerovaní na stránku objednávok za ${secondsRemaining} sekúnd...`} </p>
    </div>
  )
}
export default OrderComplete
