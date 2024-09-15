'use client'

import { useState } from 'react'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import FormContainer from '../form/FormContainer'
import { createReviewAction } from '@/utils/actions'
import { Textarea } from '../ui/textarea'
import TextAreaInput from '../form/TextAreaInput'
import { SubmitButton } from '../form/Buttons'

function SubmitReview({ bookId }: { bookId: string }) {
  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false)
  return (
    <div className='mt-10'>
      <Button onClick={() => setIsReviewFormVisible((prev) => !prev)}>
        {isReviewFormVisible === true ? 'Close Review' : 'Open review'}
      </Button>
      {isReviewFormVisible && (
        <Card className='p-2 mt-8'>
          <FormContainer action={createReviewAction}>
            <input type='hidden' name='bookId' value={bookId} />
            <TextAreaInput name={'comment'} labelText='told your thoughts on this book' defaultValue='Very good book!!' />
            <SubmitButton text='Submit' className='mt-4' />
          </FormContainer>
        </Card>
      )}
    </div>
  )
}
export default SubmitReview
