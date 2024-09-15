type NavLink = {
  href: string
  label: string
  requireAuth?: boolean
}

export const links: NavLink[] = [
  { href: '/', label: 'home' },
  { href: '/books ', label: 'books' },
  { href: '/reviews ', label: 'Reviews', requireAuth: true },
  { href: '/favorites ', label: 'favorites', requireAuth: true },
  { href: '/orders ', label: 'orders', requireAuth: true },
  { href: '/cart ', label: 'Shoping cart', requireAuth: true },
  { href: '/myBooksAdd/create ', label: 'Sell my book', requireAuth: true },
  { href: '/myBooksAdd ', label: 'My added books', requireAuth: true },
  { href: '/profile ', label: 'profile', requireAuth: true },
]
