import { Loader } from 'lucide-react'

function Loading() {
  return (
    <div className=' z-50 w-full flex justify-center items-center h-[70vh]'>
      <Loader className='animate-spin size-32 text-primary' />
    </div>
  )
}
export default Loading
