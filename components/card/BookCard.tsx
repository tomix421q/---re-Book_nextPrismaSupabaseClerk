import { formatCurrency } from '@/utils/format'
import { BookCardProps } from '@/utils/types'
import Image from 'next/image'
import Link from 'next/link'
import { Separator } from '../ui/separator'
import FavoriteToggleButton from '../books/FavoriteToggleButton'

function BookCard({ book }: { book: BookCardProps }) {
  const { name, image, price, category, damage, tagline } = book
  const { id: bookId } = book

  return (
    <article className='group relative border p-2 rounded-md'>
      <Link href={`/books/${bookId}`} className='p-4'>
        <div className='relative h-[22rem]  mb-4 overflow-hidden'>
          <Image
            src={image}
            alt={name}
            fill
            priority
            sizes='(max-width: 768px) 100vw,(max-width: 1200px) 50vw'
            className='rounded-md object-cover transform group-hover:scale-110 transition-transform duration-500'
          />
        </div>
        <div className='flex justify-between items-center'>
          <h3 className='text-md font-semibold mt-1'>{name.substring(0, 20)}</h3>
        </div>
        <Separator />

        <p className='text-sm mt-1 text-muted-foreground'>{tagline.substring(0, 30)}</p>
        <p className='flex gap-x-4 text-sm my-1'>
          <span className='text-muted-foreground'>Damage :</span>
          <span className={`${damage === 'Normal' ? 'bg-green-500' : 'bg-orange-500'}  px-1 rounded-md`}>{damage}</span>
        </p>
        <div className='mt-2'>
          <span>{formatCurrency(price)}</span>
        </div>
      </Link>
      <div className='absolute top-7 right-7 z-5'>
        <FavoriteToggleButton bookId={bookId} />
      </div>
    </article>
  )
}
export default BookCard
