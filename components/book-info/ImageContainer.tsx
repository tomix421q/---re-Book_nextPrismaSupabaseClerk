import Image from 'next/image'

function ImageContainer({ mainImage, name }: { mainImage: string; name: string }) {
  return (
    <section>
      <Image
        src={mainImage}
        alt={name}
        width={350}
        height={350}
        sizes='100vw'
        priority
        className='object-cover rounded-md my-10  mx-auto'
      />
    </section>
  )
}
export default ImageContainer
