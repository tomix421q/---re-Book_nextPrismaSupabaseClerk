'use client'
import { useRouter } from 'next/router'
import DarkMode from './DarkMode'
import LinksDropdown from './LinksDropdown'
import Logo from './Logo'
import NavSearch from './NavSearch'
import { FiShoppingCart } from 'react-icons/fi'
import { Button } from '../ui/button'
import Link from 'next/link'
import { SignedIn, SignedOut, SignInButton, useUser } from '@clerk/nextjs'
import SignOutLink from './SignOutLink'
import SignInLink from './SignOutLink'
import { FaRegHeart } from 'react-icons/fa'

function Navbar() {
  const { user } = useUser()
  return (
    <nav className='border-b '>
      <div className='container fley flex-col sm:flex-row sm:justify-between sm:items-center gap-4 py-4 '>
        <div className='flex gap-4 justify-between items-center'>
          <div className='flex gap-x-4 items-center'>
            <Logo />
            {/* DESKTOP */}
            <div className='hidden sm:flex'>
              <NavSearch isIcon={'yes'} />
            </div>
          </div>

          <div className='flex gap-x-2 items-center'>
            <DarkMode />

            {user ? (
              <Button asChild variant={'outline'}>
                <Link href={'/cart'}>
                  <FiShoppingCart size={20} />
                </Link>
              </Button>
            ) : (
              <SignInButton mode='modal'>
                <Button variant={'outline'} className='w-full text-left'>
                  {' '}
                  <FiShoppingCart size={20} />
                </Button>
              </SignInButton>
            )}

            <LinksDropdown />
          </div>
        </div>
        {/* MOBILE */}
        <div className='flex sm:hidden w-full'>
          <NavSearch isIcon={'no'} />
        </div>
      </div>
    </nav>
  )
}
export default Navbar
