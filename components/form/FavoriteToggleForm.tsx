'use client'

import { toggleFavoriteAction } from '@/utils/actions'
import { usePathname } from 'next/navigation'
import { CardSubmitButton } from './Buttons'
import FormContainer from './FormContainer'

type FavoriteToggleFormProps = {
  bookId: string
  favoriteId: string | null
}

function FavoriteToggleForm({ bookId, favoriteId }: FavoriteToggleFormProps) {
  const pathname = usePathname()
  const toggleAction = toggleFavoriteAction.bind(null, { bookId, favoriteId, pathname })
  return (
    <FormContainer action={toggleAction}>
      <CardSubmitButton isFavorite={favoriteId ? true : false} />
    </FormContainer>
  )
}
export default FavoriteToggleForm
