'use client'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from './theme-provider'
import CartProvider from '../utils/context/cart'

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster />
      <CartProvider>
        <ThemeProvider attribute='class' defaultTheme='dark' enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </CartProvider>
    </>
  )
}

export default Providers
