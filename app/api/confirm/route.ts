import Stripe from 'stripe'
import { redirect } from 'next/navigation'
import db from '@/utils/db'
import { NextRequest } from 'next/server'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url)
  const session_id = searchParams.get('session_id') as string

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id)
    // console.log(session)

    const orderId = session.metadata?.orderId
    if (session.status === 'complete' && orderId) {
      await db.order.update({
        where: { id: orderId },
        data: { paymentStatus: true },
      })
    }
  } catch (error) {
    console.log(error)
    return Response.json(null, {
      status: 500,
      statusText: 'Internal Server Errorrrr',
    })
  }
  redirect('/orders/orderComplete')
}
