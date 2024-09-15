import BooksList from '@/components/books/BooksList'
import EmptyList from '@/components/books/EmptyList'
import { fetchFavorites } from '@/utils/actions'

async function page() {
  const favorites = await fetchFavorites()

  if (favorites.length === 0) {
    return <EmptyList btnText='Check some books'/>
  }
  return <BooksList books={favorites} />
}
export default page
