import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Landingimg from '@/public/landingImg.png'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import TextHeading from '@/components/book-info/TextHeading'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { fetchNewestBooksAction } from '@/utils/actions'
import { BsDot } from 'react-icons/bs'

type NewItem = {
  id: string
  name: string
  image: string
  createdAt: Date
}

async function HomePage() {
  const fetchNewestBooks = await fetchNewestBooksAction()
  // console.log(fetchNewestBooks)
  return (
    <>
      {/* HERO */}
      <section className='grid md:grid-cols-2 gap-12 items-center justify-centerr lg:mt-12'>
        <div className='w-full '>
          <div>
            <h2 className='font-qwitcher font-extrabold block text-5xl sm:text-7xl md:text-8xl dark:text-yellow-200 tracking-wide mb-8'>
              Welcome <br className='md:hidden' />
              to <br className='hidden lg:block' /> Re-Book!
            </h2>
            <p className='italic tracking-wider leading-6 lg:leading-10 text-md md:text-xl lg:text-2xl max-w-lg'>
              &quot; Discover a world of stories waiting for you. Whether you’re looking to sell cherished reads or find your next
              great book, re-Book is your marketplace for preloved literature. Explore, connect, and share your passion for books
              with a community that values every page. &quot;
            </p>
          </div>

          <div className='w-full mx-auto text-start'>
            <Button
              variant={'default'}
              size={'lg'}
              className='my-4 mt-12 sm:w-[18.5rem] ring-2 ring-yellow-200 font-qwitcher font-bold tracking-wide text-2xl bg-secondary-foreground'
              asChild
            >
              <Link href={'/books'}>Explore stories</Link>
            </Button>
          </div>
          <Separator className='my-4 ring-1' />
        </div>
        <div>
          <Image priority src={Landingimg} alt='landing img' />
        </div>
      </section>

      {/* LATEST ITEMS */}
      <section className='mt-32 mb-48'>
        <TextHeading text={'Newest books'} />
        <ScrollArea className='w-full whitespace-nowrap rounded-md border ring-1'>
          <div className='flex w-max space-x-10 p-8'>
            {fetchNewestBooks.map((book: NewItem) => {
              return (
                <figure key={book.id} className='hover:scale-110 transition-all ease-out'>
                  <Link href={`/books/${book.id}`}>
                    <div className='overflow-hidden rounded-md'>
                      <Image
                        src={book.image}
                        alt={book.name}
                        className='aspect-[3/4] h-fit object-cover w-[300px] mx-auto'
                        width={300}
                        height={400}
                      />
                    </div>
                    <figcaption className='pt-2 text-sm capitalize tracking-wider text-center flex flex-col border-t-2 '>
                      <span className='font-semibold text-foreground'>{book.name}</span>
                      <span className='font-semibold text-muted-foreground text-xs'>
                        {new Date(book.createdAt).toLocaleDateString()}
                      </span>
                    </figcaption>
                  </Link>
                </figure>
              )
            })}
          </div>
          <ScrollBar orientation='horizontal' className='h-[.875rem] bg-primary ' />
        </ScrollArea>
      </section>

      {/* SOME NEXT */}
      <section className='h-[27.5rem]'>
        <TextHeading text={'Some next content'} />
        <div className=' w-full flex items-center justify-center  mt-24'>
          <BsDot size={300} className='animate-bounce rotate-180 duration-1000' />
          <BsDot size={300} className='animate-bounce rotate-180 duration-1500' />
          <BsDot size={300} className='animate-bounce rotate-180 duration-2000' />
        </div>
        <Link href={'/'} className='text-center block'>
          UP
        </Link>
      </section>
    </>
  )
}
export default HomePage
