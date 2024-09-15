import Stripe from 'stripe'
import { NextRequest, NextResponse } from 'next/server'
import db from '@/utils/db'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export const POST = async (req: NextRequest, res: NextResponse) => {
  const requestHeaders = new Headers(req.headers)
  const origin = requestHeaders.get('origin')

  const { orderId } = await req.json()

  const order = await db.order.findUnique({
    where: { id: orderId },
    include: {
      profile: {
        select: {
          profileImage: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  })

  //
  if (!order) {
    return Response.json(null, {
      status: 404,
      statusText: 'Not Found',
    })
  }

  const { orderTotal, items } = order
  const parsedItems = JSON.parse(items as unknown as string)
  console.log(parsedItems)
  const { profileImage, firstName, lastName } = order.profile

  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      metadata: { orderId: orderId },
      line_items: parsedItems.map((item: any) => ({
        quantity: 1,
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.name,
            images: [item.image],
          },
          unit_amount: parseFloat(item.price) * 100, // cena v centoch
        },
      })),

      mode: 'payment',
      // success_url: `${origin}/?success=true`,
      // cancel_url: `${origin}/?canceled=true`,
      return_url: `${origin}/api/confirm?session_id={CHECKOUT_SESSION_ID}`,
    })
    return Response.json({ clientSecret: session.client_secret })
  } catch (error) {
    console.log(error)
    return Response.json(null, {
      status: 500,
      statusText: 'Internal Server Error',
    })
  }
}
