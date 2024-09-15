import TextHeading from '@/components/book-info/TextHeading'
import { SubmitButton } from '@/components/form/Buttons'
import CategoriesInput from '@/components/form/CategoriesInput'
import DamageInput from '@/components/form/DamageInput'
import FormContainer from '@/components/form/FormContainer'
import FormInput from '@/components/form/FormInput'
import ImageInput from '@/components/form/ImageInput'
import PriceInput from '@/components/form/PriceInput'
import TextAreaInput from '@/components/form/TextAreaInput'
import { Separator } from '@/components/ui/separator'
import { createBookAction } from '@/utils/actions'

function CreateBook() {
  return (
    <section>
      <TextHeading text={'Create offer'} />
      <div className='p-8 rounded-md border border-dotted mt-10 lg:mt-20'>
        <h3 className='tracking-wide bg-secondary p-1 w-fit px-4 rounded-md'>General Info</h3>
        <Separator className='mb-8' />
        <FormContainer action={createBookAction}>
          <div className='grid md:grid-cols-2 gap-10 mb-4'>
            <FormInput name={'name'} type={'text'} label='Name (30 limit)' defaultValue='Harry Potter' />
            <FormInput
              name={'tagline'}
              type={'text'}
              label='Tagline (40limit)'
              defaultValue='A beautiful book about spells, simply a classic'
            />
            {/* Price */}
            <PriceInput />
            {/* categories  */}
            <CategoriesInput />
          </div>
          {/* text area / description  */}
          <TextAreaInput name={'description'} labelText='Description (10 - 1000 Words)' />
          {/* damage */}
          <DamageInput />
          {/* image */}
          <ImageInput />
          <SubmitButton text='Add a book for sale' />
        </FormContainer>
      </div>
    </section>
  )
}
export default CreateBook
