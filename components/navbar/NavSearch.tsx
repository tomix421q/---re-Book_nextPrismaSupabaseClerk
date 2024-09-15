import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Search } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

type iconProp = {
  isIcon: 'yes' | 'no'
}

function NavSearch({ isIcon = 'no' }: iconProp) {
  const searchParams = useSearchParams() //search params text
  const { push } = useRouter() //when need redirect do /books page
  const pathname = usePathname() // solution when no redirect with replace
  const { replace } = useRouter()

  const [search, setSearch] = useState(searchParams.get('search')?.toString() || '')

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams()
    console.log(params)
    if (value) {
      //condition
      params.set('search', value)
      if (pathname === '/favorites') {
        replace(`${pathname}?${params.toString()}`)
      } else {
        push(`/books?${params.toString()}`)
      }
      //
    } else {
      params.delete('search')
    }
    // console.log(pathname)
  }, 500)

  useEffect(() => {
    if (!searchParams.get('search')) {
      setSearch('')
    }
  }, [searchParams.get('search')])

  //
  //ICON
  const [openSearch, setOpenSearch] = useState(false)

  useEffect(() => {
    if (isIcon === 'no') {
      setOpenSearch(true)
    }
  }, [isIcon])

  return (
    <>
      <div className='flex gap-3 w-full'>
        <Button
          size={'icon'}
          variant={'secondary'}
          type='button'
          className={`cursor-pointer ${isIcon === 'yes' ? 'flex' : 'hidden'}`}
          onClick={() => setOpenSearch(!openSearch)}
        >
          <Search className='w-5 h-5 ' />
        </Button>
        <div className={`max-sm:w-full ${openSearch ? 'flex' : 'hidden'} max-sm:mt-3`}>
          <Input
            className={`mx-auto w-full lg:w-[300px]`}
            type='search'
            placeholder='Find book...'
            onChange={(e) => {
              setSearch(e.target.value)
              handleSearch(e.target.value)
            }}
            value={search}
          />
        </div>
      </div>
    </>
  )
}
export default NavSearch
