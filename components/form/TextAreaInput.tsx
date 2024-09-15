import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'

type TextAreaInputProps = {
  name: string
  labelText?: string
  defaultValue?: string
}

function TextAreaInput({ name, labelText, defaultValue }: TextAreaInputProps) {
  return (
    <div className='mb-4'>
      <Label htmlFor={name} className='capitalize m-2 text-center'>
        {labelText || name}
      </Label>
      <Textarea
        id={name}
        name={name}
        defaultValue={defaultValue || tempDefaultDescription}
        rows={5}
        required
        className='leading-loose my-2'
      />
    </div>
  )
}

const tempDefaultDescription =
  'Harry Potter, a young boy living with his cruel aunt, uncle, and cousin, learns on his eleventh birthday that he is a wizard. He is invited to attend Hogwarts School of Witchcraft and Wizardry, where he learns about magic, makes friends like Hermione Granger and Ron Weasley, and discovers his past. Harry finds out that his parents were killed by the dark wizard Lord Voldemort, who also tried to kill Harry as a baby but mysteriously failed, leaving Harry with a lightning-shaped scar on his forehead.Throughout his years at Hogwarts, Harry uncovers more about his connection to Voldemort and battles various dangers, including Voldemort’s attempts to return to power. Alongside his friends and mentors like Professor Dumbledore, Harry faces trials that test his bravery, loyalty, and integrity, ultimately leading to a final confrontation with Voldemort, where he must make a great sacrifice to protect the magical world and end the dark wizard’s reign of terror.'

export default TextAreaInput
