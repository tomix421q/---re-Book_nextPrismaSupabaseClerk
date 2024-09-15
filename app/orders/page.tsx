import { fetchOrdersAction } from '@/utils/actions'
import { BookCardProps } from '@/utils/types'
import { JsonValue } from '@prisma/client/runtime/library'
import Link from 'next/link'
import Image from 'next/image'
import { formatCurrency } from '@/utils/format'
import { Separator } from '@/components/ui/separator'
import TextHeading from '@/components/book-info/TextHeading'
import EmptyList from '@/components/books/EmptyList'

type OrderProps = {
  id: string
  orderTotal: number
  paymentStatus: boolean
  items: JsonValue
  adress: string
  createdAt: Date
}

async function Orders() {
  const fetchOrders: OrderProps[] = await fetchOrdersAction()
  // console.log(fetchOrdersAction)
  if (fetchOrders.length === 0) return <EmptyList heading='You currently have no order' btnText='Check some books' />

  return (
    <div>
      <div className='flex flex-col gap-6'>
        <TextHeading text={'Your orders'} />

        {/* MAP ORDERS */}
        {fetchOrders.map((order) => {
          const { id, orderTotal, paymentStatus, items, adress, createdAt } = order
          const buyItems = JSON.parse(items as string)

          return (
            <div key={order.id} className='border p-4 gap-4 md:px-10 rounded-md lg:grid grid-cols-[500px_1px_auto]'>
              {/* INFO start */}
              <div className='space-y-1'>
                <h4>
                  <span className='text-sm'>
                    Order ID : <span className='text-muted-foreground text-sm'>{id}</span>
                  </span>
                </h4>
                <h4>
                  <span className='text-sm'>
                    Order total : <span className='text-muted-foreground text-sm'>{formatCurrency(orderTotal)}</span>
                  </span>
                </h4>

                <h4>
                  <span className='text-sm'>
                    Delivery adress : <span className='text-muted-foreground text-sm'>{adress}</span>
                  </span>
                </h4>
                <h4>
                  <span className='text-sm'>
                    Payment status :
                    <span className='text-muted-foreground text-sm'>{paymentStatus ? 'Complete' : 'Pending'}</span>
                  </span>
                </h4>
                <h4>
                  <span className='text-sm'>
                    Order created : <span className='text-muted-foreground text-sm'>{createdAt.toUTCString()}</span>
                  </span>
                </h4>
              </div>
              {/* info end */}
              <Separator orientation='vertical' className='hidden md:flex h-auto ring-1 w-full mt-1' />
              <Separator orientation='horizontal' className='flex md:hidden mt-4 ring-1' />
              {/* ITEMS start */}
              <div className=''>
                <h5 className='text-center uppercase text-muted-foreground text-sm mt-1'>Buyed items : </h5>
                <div className='flex gap-4 text-center overflow-auto mt-4 '>
                  {buyItems.map((item: BookCardProps) => {
                    const name = item.name
                    return (
                      <Link key={item.id} href={`/books/${item.id}`} className=''>
                        <Image
                          src={item.image}
                          alt={item.name}
                          priority
                          width={50}
                          height={10}
                          className='h-[80px] mx-auto w-auto'
                        />
                        <p className='text-muted-foreground text-[.625rem] mt-1'> {name.substring(0, 25)}...</p>
                      </Link>
                    )
                  })}
                </div>
              </div>
              {/* items end */}
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default Orders
