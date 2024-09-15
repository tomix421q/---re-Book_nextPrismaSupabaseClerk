'use client'
import { useState } from 'react'
import { Button } from '../ui/button'

function Description({ description }: { description: string }) {
  const [isFullDescriptionShow, setIsFullDescriptionShow] = useState(false)
  const words = description.split(' ')
  const isLongDescription = words.length > 100

  const toggleDescription = () => {
    setIsFullDescriptionShow(!isFullDescriptionShow)
  }

  const displayedDescription = isLongDescription && !isFullDescriptionShow ? words.slice(0, 100).join(' ') + '...' : description

  return (
    <div>
      <p className='font-light'>{displayedDescription}</p>
      {isLongDescription && (
        <Button variant={'link'} className='pl-0' onClick={toggleDescription}>
          {isFullDescriptionShow ? 'Show less' : 'Show more'}
        </Button>
      )}
    </div>
  )
}
export default Description
