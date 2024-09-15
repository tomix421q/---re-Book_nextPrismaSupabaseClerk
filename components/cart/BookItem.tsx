'use client'
import { formatCurrency } from '@/utils/format'
import { BookCardProps } from '@/utils/types'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../ui/button'
import { Trash } from 'lucide-react'
import { useCart } from '@/utils/context/cart'
import { Separator } from '../ui/separator'
import FormContainer from '../form/FormContainer'
import { IconButton } from '../form/Buttons'
import { deleteMyBookAction } from '@/utils/actions'

function BookItem({ book, myAddedBooks = false }: { book: BookCardProps; myAddedBooks?: boolean }) {
  const { name, image, price, damage, tagline, id: bookId } = book
  const cart = useCart()

  const damageColor = (damage: string) => {
    if (damage === 'Normal') {
      return 'bg-green-600'
    } else if (damage === 'New') {
      return 'bg-yellow-600'
    } else if (damage === 'Very Bad') {
      return 'bg-red-400'
    } else if (damage === 'Bad') {
      return 'bg-red-600'
    }
  }

  return (
    <div className=' mb-2 p-2 flex relative'>
      <Link
        href={`/books/${bookId}`}
        className='flex overflow-hidden border w-full md:w-[500px] rounded-md hover:ring-2 ring-cyan-500 ease-in duration-150'
      >
        {/* image  */}
        <Image src={image} alt={name} priority width={100} height={100} />
        <div className='flex flex-col m-2 justify-between w-full'>
          {/* id */}
          <div className='max-w-[500px] h-auto'>
            <span className='hidden md:block text-[.625rem] text-muted-foreground'>id# {bookId}</span>
            {/* name  */}
            <div className='text-cyan-500 uppercase font-extrabold tracking-widest md:text-xl'>{name.substring(0, 30)}</div>
            {/* tagline */}
            <div className='italic font-mono tracking-tight uppercase text-xs md:text-sm h-auto'>{tagline.substring(0, 30)}</div>
          </div>
          {/* damage */}
          <div className='max-w-[500px] h-auto '>
            <Separator className='mb-2' />
            Damage : <span className={`${damageColor(damage)} px-1 rounded-md`}>{damage}</span>
          </div>
          <div>
            Price :<span className='font-bold px-1 ml-1 '>{formatCurrency(price)}</span>
          </div>
        </div>
      </Link>
      {/* Only in the cart */}
      {!myAddedBooks && (
        <Button
          onClick={() => cart.removeFromCart(book)}
          variant={'ghost'}
          size={'icon'}
          className='ml-1 absolute right-5 bottom-5 size-6'
        >
          <Trash size={20} className='text-destructive brightness-200' />
        </Button>
      )}
      {/* Only in the my books */}
      {myAddedBooks && (
        <div className='ml-1 absolute right-5 bottom-5 size-6'>
          <DeleteMyBook bookId={book.id} />{' '}
        </div>
      )}
    </div>
  )
}

const DeleteMyBook = ({ bookId }: { bookId: string }) => {
  const deleteMyBook = deleteMyBookAction.bind(null, { bookId })
  return (
    <FormContainer action={deleteMyBook}>
      <IconButton actionType='delete' />
    </FormContainer>
  )
}

export default BookItem
