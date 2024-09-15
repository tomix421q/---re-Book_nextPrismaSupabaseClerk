'use client'
import { Share } from 'lucide-react'
import { Button } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import {
  TwitterShareButton,
  EmailShareButton,
  LinkedinShareButton,
  TwitterIcon,
  EmailIcon,
  LinkedinIcon,
  FacebookMessengerIcon,
  FacebookShareButton,
} from 'react-share'

function ShareButton({ bookId, name }: { bookId: string; name: string }) {
  const url = process.env.NEXT_PUBLIC_WEBSITE_URL
  const shareLink = `${url}/book/${bookId}`
  return (
    <Popover>
      <PopoverTrigger>
        <Button asChild variant={'outline'} size={'icon'} className='p-2'>
          <Share />
        </Button>
      </PopoverTrigger>
      <PopoverContent side='top' align='end' sideOffset={10} className='flex items-center gap-x-2 justify-center w-full'>
        <TwitterShareButton title={name} url={shareLink}>
          <TwitterIcon size={32} />
        </TwitterShareButton>
        <LinkedinShareButton url={shareLink} title={name}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
        <EmailShareButton url={shareLink} subject={name}>
          <EmailIcon size={32} round />
        </EmailShareButton>
        <FacebookShareButton url={shareLink} title={name}>
          <FacebookMessengerIcon size={32} round />
        </FacebookShareButton>
      </PopoverContent>
    </Popover>
  )
}
export default ShareButton
