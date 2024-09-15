import { SubmitButton } from '@/components/form/Buttons'
import FormContainer from '@/components/form/FormContainer'
import FormInput from '@/components/form/FormInput'
import ImageInputContainer from '@/components/form/ImageInputContainer'
import { fetchProfile, updateProfileAction, updateProfileImageAction } from '@/utils/actions'

async function page() {
  const profile = await fetchProfile()

  return (
    <section>
      <h1 className='text-2xl font-semibold mb-8 capitalize'>user profile</h1>
      <div className='border p-8 rounded-md'>
        <ImageInputContainer
          image={profile.profileImage}
          name={profile.username}
          action={updateProfileImageAction}
          text='Update Profile Image'
        />

        {/* FORM */}
        <FormContainer action={updateProfileAction}>
          <div className='grid md:grid-cols-2 gap-4 mt-4'>
            <FormInput type='text' name='firstName' label='First Name' defaultValue={profile.firstName} />
            <FormInput type='text' name='lastName' label='Last Name' defaultValue={profile.lastName} />
            <FormInput type='text' name='username' label='Username' defaultValue={profile.username} />
          </div>
          <SubmitButton text='Update Profile' className='mt-8' />
        </FormContainer>
      </div>
    </section>
  )
}
export default page
