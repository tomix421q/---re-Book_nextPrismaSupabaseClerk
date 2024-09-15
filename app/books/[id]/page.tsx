// 'use client'
import Description from '@/components/book-info/Description'
import ImageContainer from '@/components/book-info/ImageContainer'
import TextHeading from '@/components/book-info/TextHeading'
import UserInfo from '@/components/book-info/UserInfo'
import BreadCrumbs from '@/components/books/BreadCrumbs'
import FavoriteToggleButton from '@/components/books/FavoriteToggleButton'
import ShareButton from '@/components/books/ShareButton'
import BookReviews from '@/components/reviews/BookReviews'
import SubmitReview from '@/components/reviews/SubmitReview'
import { Separator } from '@/components/ui/separator'
import { fetchBookDetails, findExistingReview } from '@/utils/actions'
import { formatCurrency } from '@/utils/format'
import { auth } from '@clerk/nextjs/server'
import { AudioWaveform, BaggageClaim, Library } from 'lucide-react'
import dynamic from 'next/dynamic'
import { redirect } from 'next/navigation'

import BuyButton from '@/components/book-info/BuyButton'

const DynamicDescription = dynamic(() => import('@/components/book-info/Description'), {
  ssr: false,
})

async function BookDetailsPage({ params }: { params: { id: string } }) {
  const book = await fetchBookDetails(params.id)
  const { profileImage = '', firstName = '' } = book?.profile || {}
  const profileInfo = { profileImage, firstName }

  // console.log(book)
  const { userId } = auth()
  const isNotOwner = book?.profile.clerkId !== userId
  const reviewDoesNotExist = userId && isNotOwner && !(await findExistingReview(userId, book!.id))
  if (!book) redirect('/')

  return (
    <section className='container'>
      <BreadCrumbs name={book.name} />
      <header className='flex justify-between items-center mt-4'>
        <div className='flex-1'>
          <h1 className='text-3xl md:text-6xl font-qwitcher mb-4'>{book.name}</h1>
          <p className='text-muted-foreground mb-2 text-sm italic'>{book.tagline}</p>
        </div>

        <div className='flex items-center gap-x-4'>
          {/* share favorite buttons*/}
          <ShareButton name={book.name} bookId={book.id} />
          <FavoriteToggleButton bookId={book.id} />
        </div>
      </header>
      <Separator />

      {/* CONTENT  */}
      <section className='grid md:grid-cols-2 gap-x-12 gap-y-4 mt-6'>
        {/* IMAGE */}
        <ImageContainer mainImage={book.image} name={book.name} />
        {/* DESCRIPTION */}
        <div className='my-auto'>
          <TextHeading text={'Description'} />
          <div className='tracking-tight text-sm md:text-lg leading-5 w-full font-light'>
            <Description description={book.description} />
          </div>
        </div>
        {/* CATEGORY */}
        <div>
          <TextHeading text={'Category'} />
          <h3 className='font-bold text-xl md:text-3xl flex gap-x-2 items-center'>
            <Library className='my-auto size-10' /> {book.category}
          </h3>
        </div>
        {/* DAMAGE */}
        <div>
          <TextHeading text={'Damage'} />
          <h3 className='font-bold text-xl md:text-3xl flex gap-x-2 items-center'>
            <AudioWaveform className='my-auto size-10' /> {book.damage}
          </h3>
        </div>
        {/* PRICE  + Add to cart*/}
        <div>
          <TextHeading text={'Price'} />
          <h3 className='font-bold text-xl md:text-3xl flex gap-x-2 items-center text-primary-400'>
            <BaggageClaim className='my-auto size-10' />
            <span className='text-primary'> {formatCurrency(book.price)}</span>
          </h3>
          <BuyButton book={book} />
        </div>
        {/* SELLER */}
        <div>
          <TextHeading text={'Seller'} />
          <div className='flex items-center gap-x-3 '>
            <UserInfo profile={profileInfo} />
          </div>
        </div>
      </section>
      <Separator className='mt-10' />
      {/*  */}
      {/* REVIEW */}
      {/*  */}
      {/* <SubmitReview bookId={book.id} /> */}
      {/* If is auth true,if user not owner book ... so form for comment is unlocked*/}
      <>
        {reviewDoesNotExist ? (
          <SubmitReview bookId={book.id} />
        ) : (
          <h3 className='py-2 m-1 italic font-light text-sm text-muted-foreground'>
            {!isNotOwner && ' *You are owner this book, you are not able add comment.'}
          </h3>
        )}
      </>
      <BookReviews bookId={book.id} />
    </section>
  )
}

export default BookDetailsPage
