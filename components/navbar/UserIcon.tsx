import { fetchProfileImage } from '@/utils/actions'
import { LucideUser2 } from 'lucide-react'

async function UserIcon() {
  const profileImage = await fetchProfileImage()

  if(profileImage){
    return <img src={profileImage} className='w6 h-6 rounded-full object-cover' alt="profile image" />
  }

  return <LucideUser2 className='w-6 bg-primary rounded-full text-white' />
}
export default UserIcon
