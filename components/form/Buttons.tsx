'use client'

import { useFormStatus } from 'react-dom'
import { Button } from '../ui/button'
import { Heart, Loader, LoaderIcon, WatchIcon } from 'lucide-react'
import { SignInButton } from '@clerk/nextjs'
import { LuPenSquare, LuTrash } from 'react-icons/lu'

type btnSize = 'default' | 'lg' | 'sm'

type SubmitButtonsProps = {
  className?: string
  text?: string
  size?: btnSize
}

export function SubmitButton({ className = '', text = 'submit', size = 'lg' }: SubmitButtonsProps) {
  const { pending } = useFormStatus()

  return (
    <Button type='submit' disabled={pending} className={`capitalize ${className}`} size={size}>
      {pending ? (
        <>
          <LoaderIcon className='mr-2 h-4 w-4 animate-spin' />
          Please wait...
        </>
      ) : (
        text
      )}
    </Button>
  )
}

export const CardSignInButton = () => {
  return (
    <SignInButton mode='modal'>
      <Button type='button' size={'icon'} variant={'outline'} className='p-2 cursor-pointer' asChild>
        <Heart />
      </Button>
    </SignInButton>
  )
}

export const CardSubmitButton = ({ isFavorite }: { isFavorite: boolean }) => {
  const { pending } = useFormStatus()
  return (
    <Button type='submit' size={'icon'} variant={'outline'} className='p-2 cursor-pointer'>
      {pending ? (
        <LoaderIcon className='animate-spin' />
      ) : isFavorite ? (
        <Heart className=' fill-red-500 text-red-500' />
      ) : (
        <Heart />
      )}
    </Button>
  )
}

type actionType = 'edit' | 'delete'
export const IconButton = ({ actionType }: { actionType: actionType }) => {
  const { pending } = useFormStatus()

  const renderIcon = () => {
    switch (actionType) {
      case 'edit':
        return <LuPenSquare />
      case 'delete':
        return <LuTrash />
      default:
        const never: never = actionType
        throw new Error(`Invalid action type : ${never}`)
    }
  }

  return (
    <Button type='submit' size={'icon'} variant={'link'} className='p-2 cursor-pointer'>
      {pending ? <Loader className='animate-spin' /> : renderIcon()}
    </Button>
  )
}
