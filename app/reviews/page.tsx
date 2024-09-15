import TextHeading from '@/components/book-info/TextHeading'
import EmptyList from '@/components/books/EmptyList'
import { IconButton } from '@/components/form/Buttons'
import FormContainer from '@/components/form/FormContainer'
import ReviewCard from '@/components/reviews/ReviewCard'
import { deleteReviewAction, fetchBookReviewsByUser } from '@/utils/actions'

async function ReviewCardPage() {
  const reviews = await fetchBookReviewsByUser()
  if (reviews.length === 0) return <EmptyList />

  return (
    <>
      <TextHeading text={'Your Reviews'} />
      <section className='grid md:grid-cols-2 gap-8 mt-4'>
        {reviews.map((review) => {
          const { comment } = review
          const { name, image } = review.book
          const reviewInfo = {
            comment,
            name,
            image,
          }
          return (
            <ReviewCard key={review.id} reviewInfo={reviewInfo}>
              <DeleteReview reviewId={review.id} />
            </ReviewCard>
          )
        })}
      </section>
    </>
  )
}

const DeleteReview = ({ reviewId }: { reviewId: string }) => {
  const deleteReview = deleteReviewAction.bind(null, { reviewId })
  return (
    <FormContainer action={deleteReview}>
      <IconButton actionType='delete' />
    </FormContainer>
  )
}

export default ReviewCardPage
