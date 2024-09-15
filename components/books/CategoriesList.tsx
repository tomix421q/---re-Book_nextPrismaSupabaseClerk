'use client'
import { categories } from '@/utils/categories'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu'
import { useSearchParams } from 'next/navigation'
import { Clapperboard, Delete, DeleteIcon, RemoveFormattingIcon } from 'lucide-react'
import { LuDelete } from 'react-icons/lu'
import { Button } from '../ui/button'

function CategoriesList({ category, search }: { category?: string; search?: string }) {
  const searchTerm = search ? `&search=${search}` : ''
  const searchParams = useSearchParams()
  const actualCategory = searchParams.get('category') || ''

  return (
    <section className='mb-8 flex gap-x-4'>
      <DropdownMenu>
        <DropdownMenuTrigger className='w-[13.5rem] border rounded-md p-1'>
          {actualCategory || 'Select Genre'}
        </DropdownMenuTrigger>
        <DropdownMenuContent className='bg-primary-foreground z-50'>
          <div className='grid grid-cols-2 gap-2 h-auto relative flex-wrap'>
            {categories.map((item) => {
              const isActive = item.label === category
              return (
                <DropdownMenuRadioItem key={item.label} value={item.label}>
                  <a
                    className={`${isActive ? 'bg-secondary-foreground px-2 text-black rounded-md' : ''} w-full`}
                    href={`books/?category=${item.label}${searchTerm}`}
                  >
                    {item.label}
                  </a>
                </DropdownMenuRadioItem>
              )
            })}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      <div>
        <Button size={'icon'} asChild className={`${actualCategory ? 'bg-red-400 flex' : 'hidden'} p-1`}>
          <Link href={`/books/?${searchTerm}`}>
            <Delete className={`w-[35px] h-[35px] flex items-center justify-center `} />
          </Link>
        </Button>
      </div>
    </section>
  )
}
export default CategoriesList
