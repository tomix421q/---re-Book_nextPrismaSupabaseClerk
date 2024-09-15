import { categories } from '@/utils/categories'
import { Label } from '../ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

const name = 'category'
function CategoriesInput({ defaultValue }: { defaultValue?: string }) {
  return (
    <div className='mb-4'>
      <Label htmlFor={name} className='capitalize'>
        Categories
      </Label>
      {/*  */}
      {/*  */}
      <Select defaultValue={defaultValue || categories[0].label} name={name} required>
        <SelectTrigger id={name}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {categories.map((item) => {
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
export default CategoriesInput
