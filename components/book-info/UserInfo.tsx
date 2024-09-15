import Image from 'next/image'

type UserInfoProps = {
  profile: {
    profileImage: string
    firstName: string
  }
}

function UserInfo({ profile: { profileImage, firstName } }: UserInfoProps) {
  return (
    <article className='grid grid-cols-[auto,1fr] gap-1'>
      <Image src={profileImage} alt={firstName} width={50} height={50} className='rounded-md w-12 h-12 object-cover' />
      <div>
        <p>
          <span className='font-bold'>{firstName}</span>
        </p>
        <p className='text-muted-foreground font-light capitalize'>verified</p>
      </div>
    </article>
  )
}
export default UserInfo
