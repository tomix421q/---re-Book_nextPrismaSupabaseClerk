import { BookCardProps } from '@/utils/types'
import BookCard from '../card/BookCard'
import TextHeading from '../book-info/TextHeading'

function BooksList({ books }: { books: BookCardProps[] }) {
  return (
    <>
      <TextHeading text={'Books'} />
      <section className='mt-8 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        {books.map((item) => {
          return <BookCard key={item.id} book={item} />
        })}
      </section>
    </>
  )
}
export default BooksList
