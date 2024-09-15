import React from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'

type ReviewCardProps = {
  reviewInfo: {
    comment: string
    name: string
    image: string
  }
  children?: React.ReactNode
}

function ReviewCard({ reviewInfo, children }: ReviewCardProps) {
  return (
    <Card className='relative'>
      <CardHeader>
        <div className='flex items-center'>
          <img src={reviewInfo.image} alt='profile' className='w-12 h-12 rounded-full object-cover' />
          <div className='ml-4'>
            <h3 className='text-lg font-bold capitalize mb-3'>
              <span className='text-xs mr-1 text-muted-foreground'>Book:</span>
              {reviewInfo.name}
            </h3>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p>{reviewInfo.comment}</p>
      </CardContent>
      {/* delete button  */}
      <div className='absolute top-3 right-3'>{children}</div>
    </Card>
  )
}
export default ReviewCard
