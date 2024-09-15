import { Label } from '../ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

type Damage = {
  label: 'Normal' | 'Bad' | 'Very Bad' | 'New'
}

const damage: Damage[] = [{ label: 'Bad' }, { label: 'New' }, { label: 'Normal' }, { label: 'Very Bad' }]

const name = 'damage'
function DamageInput({ defaultValue }: { defaultValue?: string }) {
  return (
    <div className='mb-10'>
      <Label htmlFor={name} className='capitalize'>
        How is book damaged?
      </Label>
      {/*  */}
      {/*  */}
      <Select defaultValue={defaultValue || damage[2].label} name={name} required>
        <SelectTrigger id={name}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {damage.map((item) => {
            return (
              <SelectItem key={item.label} value={item.label}>
                <span>{item.label}</span>
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>
    </div>
  )
}
export default DamageInput
