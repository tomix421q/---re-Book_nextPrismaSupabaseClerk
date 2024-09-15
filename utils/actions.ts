'use server'
import db from './db'
import { clerkClient, currentUser, getAuth } from '@clerk/nextjs/server'
import { bookSchema, createReviewSchema, imageSchema, orderSchema, profileSchema, validateWithZodSchema } from './schemas'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { uploadImage } from './supabase'
import { string } from 'zod'
import { BookCardProps } from './types'

const getAuthUser = async () => {
  const user = await currentUser()
  if (!user) {
    throw new Error('You must be logged in to access this route')
  }
  if (!user.privateMetadata.hasProfile) redirect('/profile/create')
  return user
}

const renderError = (error: unknown): { message: string } => {
  console.log(error)
  return {
    message: error instanceof Error ? error.message : 'An error occured',
  }
}

export const createProfileAction = async (prevState: any, formData: FormData) => {
  //   const firstName = formData.get('firstName') as string
  try {
    const user = await currentUser()
    if (!user) throw new Error('Please login to create a profile')

    const rawData = Object.fromEntries(formData)
    const validatedFields = validateWithZodSchema(profileSchema, rawData)

    await db.profile.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        profileImage: user.imageUrl ?? '',
        ...validatedFields,
      },
    })
    await clerkClient.users.updateUserMetadata(user.id, {
      privateMetadata: {
        hasProfile: true,
      },
    })
  } catch (error) {
    return { message: error instanceof Error ? error.message : 'An error occured' }
  }
  redirect('/')
}

export const fetchProfileImage = async () => {
  const user = await currentUser()
  if (!user) return null

  const profile = await db.profile.findUnique({
    where: {
      clerkId: user.id,
    },
    select: {
      profileImage: true,
    },
  })
  return profile?.profileImage
}

export const fetchProfile = async () => {
  const user = await getAuthUser()

  const profile = await db.profile.findUnique({
    where: {
      clerkId: user.id,
    },
  })
  if (!profile) return redirect('/profile/create')
  return profile
}

export const updateProfileAction = async (prevState: any, formData: FormData): Promise<{ message: string }> => {
  const user = await getAuthUser()

  try {
    const rawData = Object.fromEntries(formData)
    const validatedFields = validateWithZodSchema(profileSchema, rawData)

    await db.profile.update({
      where: {
        clerkId: user.id,
      },
      data: validatedFields,
    })
    revalidatePath('/profile')
    return { message: 'Profile updated successfully' }
  } catch (error) {
    return renderError(error)
  }
}

export const updateProfileImageAction = async (prevState: any, formData: FormData): Promise<{ message: string }> => {
  const user = await getAuthUser()
  try {
    const image = formData.get('image') as File
    const validatedFields = validateWithZodSchema(imageSchema, { image })
    const fullPath = await uploadImage(validatedFields.image)

    await db.profile.update({
      where: {
        clerkId: user.id,
      },
      data: {
        profileImage: fullPath,
      },
    })
    revalidatePath('/profile')
    return { message: 'Profile image update succesfully' }
  } catch (error) {
    return renderError(error)
  }
}

export const createBookAction = async (prevState: any, formData: FormData): Promise<{ message: string }> => {
  const user = await getAuthUser()

  try {
    const rawData = Object.fromEntries(formData)
    const file = formData.get('image') as File

    const validatedFields = validateWithZodSchema(bookSchema, rawData)
    const validatedFile = validateWithZodSchema(imageSchema, { image: file })
    const fullPath = await uploadImage(validatedFile.image)

    await db.book.create({
      data: {
        ...validatedFields,
        image: fullPath,
        profileId: user.id,
      },
    })
  } catch (error) {
    return renderError(error)
  }
  redirect('/')
}

export const fetchBooks = async ({ search = '', category }: { search?: string; category?: string }) => {
  const books = await db.book.findMany({
    where: {
      category,
      OR: [{ name: { contains: search, mode: 'insensitive' } }],
    },
    select: {
      id: true,
      name: true,
      tagline: true,
      category: true,
      image: true,
      price: true,
      damage: true,
    },
  })
  return books
}

export const fetchFavoriteId = async ({ bookId }: { bookId: string }) => {
  const user = await getAuthUser()
  const favorite = await db.favorite.findFirst({
    where: {
      bookId,
      profileId: user.id,
    },
    select: { id: true },
  })
  return favorite?.id || null
}

export const toggleFavoriteAction = async (prevState: { bookId: string; favoriteId: string | null; pathname: string }) => {
  const user = await getAuthUser()
  const { bookId, favoriteId, pathname } = prevState
  try {
    if (favoriteId) {
      await db.favorite.delete({
        where: {
          id: favoriteId,
        },
      })
    } else {
      await db.favorite.create({
        data: {
          bookId,
          profileId: user.id,
        },
      })
    }
    revalidatePath(pathname)
    return { message: favoriteId ? 'Removed from Favorite' : 'Added to Favorite' }
  } catch (error) {
    return renderError(error)
  }
}

export const fetchFavorites = async () => {
  const user = await getAuthUser()
  const favorites = await db.favorite.findMany({
    where: {
      profileId: user.id,
    },
    select: {
      book: {
        select: {
          id: true,
          name: true,
          tagline: true,
          price: true,
          image: true,
          damage: true,
          category: true,
        },
      },
    },
  })
  return favorites.map((favorite) => favorite.book)
}

export const fetchBookDetails = (id: string) => {
  return db.book.findUnique({
    where: {
      id,
    },
    include: {
      profile: true,
    },
  })
}

export const createReviewAction = async (prevState: any, formData: FormData) => {
  const user = await getAuthUser()
  try {
    const rawData = Object.fromEntries(formData)

    const validatedFields = validateWithZodSchema(createReviewSchema, rawData)
    await db.review.create({
      data: {
        ...validatedFields,
        profileId: user.id,
      },
    })
    revalidatePath(`/book/${validatedFields.bookId}`)
    return { message: 'Review submitted successfully' }
  } catch (error) {
    return renderError(error)
  }
}

export const fetchBookReviews = async (bookId: string) => {
  const reviews = await db.review.findMany({
    where: { bookId },
    select: {
      id: true,
      comment: true,
      profile: {
        select: {
          firstName: true,
          profileImage: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  return reviews
}

export const fetchBookReviewsByUser = async () => {
  const user = await getAuthUser()
  const reviews = await db.review.findMany({
    where: {
      profileId: user.id,
    },
    select: {
      id: true,
      comment: true,
      book: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  })
  return reviews
}

export const deleteReviewAction = async (prevState: { reviewId: string }) => {
  const { reviewId } = prevState
  const user = await getAuthUser()

  try {
    await db.review.delete({
      where: {
        id: reviewId,
        profileId: user.id,
      },
    })
    revalidatePath('/reviews')
    return { message: 'Review deleted successfully.' }
  } catch (error) {
    return renderError(error)
  }
}

export const findExistingReview = async (userId: string, bookId: string) => {
  return db.review.findFirst({
    where: {
      profileId: userId,
      bookId: bookId,
    },
  })
}

export const createOrderAction = async (prevState: any, formData: FormData) => {
  const user = await getAuthUser()
  const rawData = Object.fromEntries(formData)
  const { firstName, email, adress } = rawData
  const rawDataForZod = { firstName, email, adress }

  const itemsString = rawData.items as string
  const parsedItems = JSON.parse(itemsString)

  let validatedFields
  try {
    validatedFields = validateWithZodSchema(orderSchema, rawDataForZod)
  } catch (error) {
    return renderError(error)
  }

  // check price from front
  const booksPriceCheck = await db.book.findMany({
    where: {
      id: {
        in: parsedItems.id,
      },
    },
    select: {
      id: true,
      price: true,
      name: true,
    },
  })
  if (booksPriceCheck.length === 0) {
    return { message: 'No books found for the given IDs' }
  }

  let orderId
  try {
    const orderTotalPrice = booksPriceCheck.reduce((sum, item) => sum + item.price, 0)
    const order = await db.order.create({
      data: {
        orderTotal: orderTotalPrice,
        paymentStatus: false,
        profileId: user.id,
        items: parsedItems,
        name: validatedFields.firstName,
        emailAdress: validatedFields.email,
        adress: validatedFields.adress,
      },
    })
    orderId = order.id
  } catch (error) {
    return renderError(error)
  }

  return redirect(`/payment?orderId=${orderId}`)
}

export const fetchOrdersAction = async () => {
  const user = await getAuthUser()

  const orders = await db.order.findMany({
    where: {
      profileId: user.id,
    },
    select: {
      id: true,
      orderTotal: true,
      paymentStatus: true,
      items: true,
      adress: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  // console.log(orders)
  return orders
}

export const fetchMyBooks = async () => {
  const user = await getAuthUser()
  return db.book.findMany({
    where: {
      profileId: user.id,
    },
  })
}

export const deleteMyBookAction = async (prevState: { bookId: string }) => {
  const user = await getAuthUser()
  const { bookId } = prevState
  try {
    await db.book.delete({
      where: {
        id: bookId,
        profileId: user.id,
      },
    })
    revalidatePath('/myBooksAdd')
    return { message: 'Book deleted successfully.' }
  } catch (error) {
    renderError(error)
    return { message: '' }
  }
}

//
//HOME
//
export const fetchNewestBooksAction = async () => {
  const newestBooks = await db.book.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    take: 10,
    select: {
      id: true,
      name: true,
      image: true,
      createdAt: true,
    },
  })
  return newestBooks
}
