import { create } from 'zustand'

type Book = {
  id: string
  name: string
  price: number
}

type CartItem = {
  book: Book
  quantity: number
}

type CartState = {
  cart: CartItem[]
  addToCart: (book: Book) => void
  removeFromCart: (id: string) => void
  clearCart: () => void
  setCart: (newCart: CartItem[]) => void
}

// Zustand store
const useCartStore = create<CartState>((set) => ({
  cart: [],

  addToCart: (book) =>
    set((state) => {
      const itemExists = state.cart.find((item) => item.book.id === book.id) // Odkazujeme na `book.id`
      if (itemExists) {
        return {
          cart: state.cart.map((item) =>
            item.book.id === book.id
              ? { ...item, quantity: item.quantity + 1 } // Zvýšime `quantity`
              : item
          ),
        }
      } else {
        return {
          cart: [...state.cart, { book, quantity: 1 }], // Pridáme knihu do `book` objektu
        }
      }
    }),
  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.book.id !== id), // Odstraňujeme podľa `book.id`
    })),
  clearCart: () => set({ cart: [] }),
  setCart: (newCart) => set({ cart: newCart }),
}))
