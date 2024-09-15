import { fetchBookReviews, fetchBookReviewsByUser } from '@/utils/actions'
import TextHeading from '../book-info/TextHeading'
import ReviewCard from './ReviewCard'

async function BookReviews({ bookId }: { bookId: string }) {
  const reviews = await fetchBookReviews(bookId)
  if (reviews.length < 1) return null
  return (
    <div className='mt-10'>
      <TextHeading text={'Reviews'} />
      <div className='grid md:grid-cols-2 gap-8 mt-4'>
        {reviews.map((review) => {
          const { comment } = review
          const { firstName, profileImage } = review.profile
          const reviewInfo = {
            comment,
            name: firstName,
            image: profileImage,
          }
          return <ReviewCard key={review.id} reviewInfo={reviewInfo} />
        })}
      </div>
    </div>
  )
}
export default BookReviews
