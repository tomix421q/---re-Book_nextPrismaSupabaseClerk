import { Input } from '../ui/input'
import { Label } from '../ui/label'

function ImageInput() {
  const name = 'image'

  return (
    <div className='mb-8'>
      <Label htmlFor={name} className='capitalize'>
        Image
      </Label>
      <Input id={name} name={name} type='file' required accept='image/*' className='max-w-xs' />
    </div>
  )
}
export default ImageInput
