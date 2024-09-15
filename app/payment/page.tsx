'use client'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import React, { useCallback } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string)
console.log(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
function PaymentCheckout() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')

  const fetchClientSecret = useCallback(async () => {
    const response = await axios.post('/api/payment', {
      orderId: orderId,
    })
    return response.data.clientSecret
  }, [])

  const options = { fetchClientSecret }

  return (
    <div id='checkout'>
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}
export default PaymentCheckout
