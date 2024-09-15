import { Heart } from 'lucide-react'
import { Button } from '../ui/button'
import { auth } from '@clerk/nextjs/server'
import { CardSignInButton } from '../form/Buttons'
import { fetchFavoriteId } from '@/utils/actions'
import FavoriteToggleForm from '../form/FavoriteToggleForm'

async function FavoriteToggleButton({ bookId }: { bookId: string }) {
  const { userId } = auth()
  if (!userId) return <CardSignInButton />
  const favoriteId = await fetchFavoriteId({ bookId })
  return <FavoriteToggleForm favoriteId={favoriteId} bookId={bookId} />
}

export default FavoriteToggleButton
