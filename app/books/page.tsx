import BooksContainer from '@/components/books/BooksContainer'
import CategoriesList from '@/components/books/CategoriesList'

function Books({ searchParams }: { searchParams: { category?: string; search?: string } }) {
  console.log(searchParams)
  return (
    <section>
      <CategoriesList category={searchParams?.category} search={searchParams?.search} />

      <BooksContainer category={searchParams?.category} search={searchParams?.search} />
    </section>
  )
}
export default Books
