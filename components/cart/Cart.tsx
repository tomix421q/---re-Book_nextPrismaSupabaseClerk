'use client'
import { useCart } from '@/utils/context/cart'
import setLoading from '@/utils/hooks/useIsLoading'
import { useEffect } from 'react'
import TextHeading from '../book-info/TextHeading'
import { BookCardProps } from '@/utils/types'
import BookItem from './BookItem'
import { Button } from '../ui/button'
import { formatCurrency } from '@/utils/format'
import { Separator } from '../ui/separator'
import EmptyList from '../books/EmptyList'
import { TfiFaceSad } from 'react-icons/tfi'
import Link from 'next/link'

function Cart() {
  // const router = useRouter()
  const cart = useCart()

  useEffect(() => {
    setLoading(true)
    cart.getCart()
    cart.cartTotal()
    setLoading(false)
  }, [cart])

  // const goToCheckout = () => {
  //   if (!cart.cartTotal()) {
  //     toast({ description: 'You dont have any items in the cart.' })
  //     return
  //   }
  //   router.push('/checkout')
  // }

  if (cart.getCart().length === 0) {
    return (
      <div className='flex max-md:flex-col  gap-x-32 items-center'>
        <EmptyList heading='Shopping cart is empty' btnText='Check our books' />
        <TfiFaceSad size={140} className='mt-10' />
      </div>
    )
  }

  return (
    <div className='container'>
      <TextHeading text={'Shopping cart'} />
      <div className='flex justify-between max-md:flex-col'>
        <div className='w-fit'>
          {cart.getCart().map((item: BookCardProps) => {
            return <BookItem book={item} key={item.id} />
          })}
        </div>

        {/* Summary */}
        <div className='w-[28.125rem] italic font-mono text-2xl p-10'>
          <TextHeading text={'Summary'} />
          <div className='border my-4 p-4 rounded-lg space-y-2'>
            <div className='flex justify-between '>
              <span>Items :</span> {cart.getCart().length}
            </div>
            <div className='flex justify-between '>
              <span>Total :</span> {formatCurrency(cart.cartTotal())}
            </div>

            <Separator />
            <div className='flex justify-between'>
              <span>Subtotal :</span> {formatCurrency(cart.cartTotal())}
            </div>
          </div>
        </div>
        {/*  */}
      </div>

      <Button asChild size={'lg'} className='w-full mt-10' variant={'destructive'}>
        <Link href={'/checkout'}> Go to checkout</Link>
      </Button>
    </div>
  )
}
export default Cart
