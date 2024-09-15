import TextHeading from '@/components/book-info/TextHeading'
import EmptyList from '@/components/books/EmptyList'
import BookItem from '@/components/cart/BookItem'
import { fetchMyBooks } from '@/utils/actions'
import { BookCardProps } from '@/utils/types'

async function MyAddedBooks() {
  const fetchBookAdded: BookCardProps[] = await fetchMyBooks()
  if (fetchBookAdded.length === 0) return <EmptyList />

  return (
    <div className='container '>
      <TextHeading text={'My books in the shop'} />
      <div className='w-fit flex flex-wrap mt-10'>
        {fetchBookAdded.map((book) => (
          <BookItem key={book.id} book={book} myAddedBooks={true} />
        ))}
      </div>
    </div>
  )
}
export default MyAddedBooks
