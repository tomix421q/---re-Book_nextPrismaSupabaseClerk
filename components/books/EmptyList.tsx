import Link from 'next/link'
import { Button } from '../ui/button'

function EmptyList({
  heading = 'No books in the list',
  message = 'Keep exploring books',
  btnText = 'Back home',
}: {
  heading?: string
  message?: string
  btnText?: string
}) {
  return (
    <div className='mt-8'>
      <h2 className='font-bold text-5xl tracking-wider font-qwitcher'>{heading}</h2>
      <p className='text-lg mt-4'>{message}</p>
      <Button asChild className='mt-8 capitaliz' size={'lg'} variant={'destructive'}>
        <Link href={'/books'}>{btnText}</Link>
      </Button>
    </div>
  )
}
export default EmptyList
