import { fetchBooks } from '@/utils/actions'
import { BookCardProps } from '@/utils/types'
import EmptyList from './EmptyList'
import BooksList from './BooksList';

async function BooksContainer({ category, search }: { category?: string; search?: string }) {
  const books: BookCardProps[] = await fetchBooks({ category, search })

  if (books.length === 0) {
    return <EmptyList heading='No results' message='Try changing or removing some of your filters.' btnText='Clear Filters' />
  }
  return <BooksList books={books} />
}
export default BooksContainer
