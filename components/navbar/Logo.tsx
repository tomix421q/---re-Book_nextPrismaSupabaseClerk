import Link from 'next/link'
import { Button } from '../ui/button'
import logoImg from '@/public/bookLogo.svg'
import Image from 'next/image'

function Logo() {
  return (
    <>
      <Button size={'icon'} variant={'ghost'} asChild className=' hover:rotate-[10deg] transition-all ease-in duration-300'>
        <Link href={'/'}>
          <Image src={logoImg} alt={'logo'} priority />
        </Link>
      </Button>
      <Link href={'/'} className='ml-[-16px] leading-4 tracking-tight text-xl'>
        <div className={`flex flex-col items-start self-start font-qwitcher`}>
          <span className=''>Re -</span>
          <span>Book</span>
        </div>
      </Link>
    </>
  )
}
export default Logo
