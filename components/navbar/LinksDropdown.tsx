import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { LuAlignLeft } from 'react-icons/lu'
import Link from 'next/link'
import { Button } from '../ui/button'
import { links } from '@/utils/links'
import { User2 } from 'lucide-react'
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs'
import SignOutLink from './SignOutLink'
import { Separator } from '../ui/separator'

function LinksDropdown() {
  const publicLinks = links.filter((link) => !link.requireAuth)
  // const privateLinks = links.filter((link) => link.requireAuth)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='secondary' className='flex gap-4 max-w-[100px]'>
          <LuAlignLeft className='w-6 h-6' />
          <User2 />
        </Button>
      </DropdownMenuTrigger>
      {/*  */}
      <DropdownMenuContent className='w-52' align='start' sideOffset={10}>
        {/* Signed-out */}
        <SignedOut>
          {publicLinks.map((link) => (
            <DropdownMenuItem key={link.href}>
              <a href={link.href} className='capitalize w-full'>
                {link.label}
              </a>
            </DropdownMenuItem>
          ))}
          <Separator />
          <DropdownMenuItem>
            <SignInButton mode='modal'>
              <button className='w-full text-left'>Login</button>
            </SignInButton>
          </DropdownMenuItem>
        </SignedOut>
        {/* Sign-in */}
        <SignedIn>
          {links.map((link) => {
            return (
              <DropdownMenuItem key={link.href}>
                <a
                  href={link.href}
                  className={`w-full dark:bg-muted-foreground'
                  } capitalize w-full`}
                >
                  {link.label}
                </a>
              </DropdownMenuItem>
            )
          })}
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignOutLink />
          </DropdownMenuItem>
        </SignedIn>
        {/*  */}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default LinksDropdown
