'use client'

import { FaCartArrowDown } from 'react-icons/fa'
import { Button } from '../ui/button'
import TextHeading from './TextHeading'
import { useCart } from '../../utils/context/cart'
import { BookCardProps } from '@/utils/types'
import { useEffect, useState } from 'react'
import { SignInButton, useUser } from '@clerk/nextjs'

function BuyButton({ book }: { book: BookCardProps }) {
  const { user } = useUser()
  const cart = useCart()

  useEffect(() => {
    cart.isItemAddedToCart(book)
  }, [])

  return (
    <>
      <TextHeading text={'Buy'} />
      <div className='flex gap-x-4'>
        <FaCartArrowDown size={'39'} className='text-center' />
        {user ? (
          <Button
            variant={`${cart.isItemAdded ? 'destructive' : 'default'}`}
            className={` font-bold flex items-center justify-center text-center shadow-sm hover:ring-2 ring-primary shadow-primary`}
            onClick={() => {
              if (cart.isItemAdded) {
                cart.removeFromCart(book)
              } else {
                cart.addToCart(book)
              }
            }}
          >
            {cart.isItemAdded ? 'Remove From Cart' : 'Add To Cart'}
          </Button>
        ) : (
          <SignInButton mode='modal'>
            <Button
              variant={'outline'}
              className={` font-bold flex items-center justify-center text-center shadow-sm hover:ring-2 ring-primary shadow-primary`}
            >
              Add to Cart
            </Button>
          </SignInButton>
        )}
      </div>
    </>
  )
}
export default BuyButton
