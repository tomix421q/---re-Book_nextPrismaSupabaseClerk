'use client'
import { DropdownMenuContent, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { useTheme } from 'next-themes'
import { DropdownMenu, DropdownMenuItem } from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { MoonIcon, MoonStar, SunDimIcon, SunIcon, Sunrise } from 'lucide-react'
import { Toggle } from '../ui/toggle'
import { useState } from 'react'

function DarkMode() {
  const { setTheme, theme } = useTheme()

  function themeSwitch() {
    if (theme === 'light') {
      setTheme('dark')
      return
    }
    if (theme === 'dark') {
      setTheme('light')
      return
    }
  }

  return (
    <>
      {/* <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={'secondary'} size={'icon'}>
            <SunIcon className='h-6 w-6 rotate-0 scale-100 transition-all dark:scale-0' />
            <MoonIcon className='absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
            <span className='sr-only'>Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme('system')}>System</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu> */}
      <Toggle onClick={() => themeSwitch()} variant={'outline'} className=' hover:bg-slate-300 hover:dark:bg-slate-800'>
        {/*  */}
        <SunIcon className=' h-5 w-5 rotate-0 scale-0 transition-all dark:scale-100 ' />
        <MoonStar className='absolute h-5 w-5 rotate-45 scale-100 transition-all  dark:scale-0 dark:rotate-90' />
      </Toggle>
    </>
  )
}
export default DarkMode
