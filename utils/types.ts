export type actionFunction = (prevState: any, formData: FormData) => Promise<{ message: string }>

export type BookCardProps = {
  image: string
  id: string
  name: string
  tagline: string
  price: number
  category: string
  damage: string
}
