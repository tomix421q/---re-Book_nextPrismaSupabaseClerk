import Cart from '@/components/cart/Cart'
import Loading from '@/components/Loading'
import dynamic from 'next/dynamic'
const DynamicCart = dynamic(() => import('@/components/cart/Cart'), {
  ssr: false,
  loading: () => <Loading />,
})
function CartPage() {
  return (
    <div>
      <DynamicCart />
    </div>
  )
}
export default CartPage
