'use client'
import TextHeading from '@/components/book-info/TextHeading'
import BookItem from '@/components/cart/BookItem'
import { SubmitButton } from '@/components/form/Buttons'
import FormContainer from '@/components/form/FormContainer'
import FormInput from '@/components/form/FormInput'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { createOrderAction } from '@/utils/actions'
import { useCart } from '@/utils/context/cart'
import { formatCurrency } from '@/utils/format'
import useIsLoading from '@/utils/hooks/useIsLoading'
import { BookCardProps } from '@/utils/types'
import { SignInButton, useAuth } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-react'

function CheckoutPage() {
  const { userId } = useAuth()
  const { user } = useUser()
  const cart = useCart()

  const email = user?.emailAddresses[0].emailAddress
  const items = cart.getCart().map((item: BookCardProps) => ({
    id: item.id,
    name: item.name,
    price: item.price,
    image: item.image
  }))
  const formItems = JSON.stringify(items)

  useEffect(() => {
    useIsLoading(true)
    cart.getCart()
    cart.cartTotal()
    useIsLoading(false)
  }, [cart])

  if (!userId || !email)
    return (
      <SignInButton mode='modal'>
        <Button type='button' className='w-full'>
          Sign in to complete order.
        </Button>
      </SignInButton>
    )

  return (
    <section>
      <TextHeading text={'Checkout'} />
      <Separator />

      <div className='lg:flex justify-between'>
        {/* Summary */}
        <div className='w-[18.75rem] italic font-mono'>
          <TextHeading text={'Summary'} />
          <div className='border my-4 p-4 rounded-lg space-y-2'>
            <div className='flex justify-between '>
              <span>Items :</span> {cart.getCart().length}
            </div>
            <div className='flex justify-between '>
              <span>Total :</span> {formatCurrency(cart.cartTotal())}
            </div>
            <div className='flex justify-between '>
              <span>Shipping :</span> €3
            </div>
            <Separator />
            <div className='flex justify-between'>
              <span>Subtotal :</span> {formatCurrency(cart.cartTotal() + 3)}
            </div>
          </div>
        </div>
        {/*  Items */}
        <div className='w-fit mb-8'>
          <TextHeading text={'Items'} />
          {cart.getCart().map((item: BookCardProps) => {
            return <BookItem book={item} key={item.id} />
          })}
        </div>
      </div>
      {/* FORM */}
      <Separator className='mb-8' />
      <div>
        <FormContainer action={createOrderAction}>
          <div className='mb-8 lg:w-[50%] border p-6 rounded-lg'>
            <input type='hidden' value={cart.cartTotal()} name='total' />
            <input type='hidden' value={JSON.stringify(formItems)} name={'items'} />
            <FormInput type='text' name='firstName' label='Name *' />
            <FormInput type='email' name='email' label='email *' defaultValue={email} />
            <FormInput type='adress' name='adress' label='Full Adress (Country,zip,adress) *' />
            <span className='text-xs italic text-muted-foreground'>* - Mandatory fields </span>
            <SubmitButton className='w-full my-8' />
          </div>
        </FormContainer>
      </div>
    </section>
  )
}
export default CheckoutPage
