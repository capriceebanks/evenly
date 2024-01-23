import Collections from '@/components/shared/Collection';
import { Button } from '@/components/ui/button';
import { getEventsByUser } from '@/lib/actions/event.actions';
import { getOrdersByUser } from '@/lib/actions/order.actions';
import { IOrder } from '@/lib/database/models/order.model';
import { SearchParamProps } from '@/types';
import { auth } from '@clerk/nextjs';
import Link from 'next/link';
import React from 'react'

const ProfilePage = async ({ searchParams }: SearchParamProps) => {

  const { sessionClaims } = auth()
  const userId = sessionClaims?.userId as string
  const ordersPage = Number(searchParams.ordersPage) || 1
  const eventsPage = Number(searchParams.eventsPage) || 1

  const orders = await getOrdersByUser({ userId, page: ordersPage })
  const orderedEvents = orders?.data.map((order: IOrder) => (order.event) || [])
  
  const organisedEvents = await getEventsByUser({ 
    userId, 
    page: eventsPage,   
  })

  return (
    <>
    {/* My Tickets */}
      <section className='bg-primary-50 bg-dotted.pattern bg-cover bg-center py-5 md:py-10'>
        <div className='wrapper flex items-center justify-center sm:justify-between'>
          <h3 className='h3-bold text-center sm:text-left'>
            My Tickets
          </h3>
          <Button asChild size='lg' className='button hidden sm:flex'>
            <Link href='/#events'>
              Explore More Events
            </Link>
          </Button>
        </div>
      </section>
      <section className='wrapper py-8'>
        {/* IMPLEMENT AFTER!! */}
      <Collections
					data={orderedEvents}
					emptyTitle="No Tickets Found"
					emptyStateSubtext="Come back when you've bought some!"
					collectionType="My Tickets"
					limit={3}
					page={ordersPage}
          urlParamName='ordersPage'
					totalPages={orders?.totalPages}
				/>
      </section>
    {/* Events Organised */}
    <section className='bg-primary-50 bg-dotted.pattern bg-cover bg-center py-5 md:py-10'>
        <div className='wrapper flex items-center justify-center sm:justify-between'>
          <h3 className='h3-bold text-center sm:text-left'>
            Events Organised
          </h3>
          <Button asChild size='lg' className='button hidden sm:flex'>
            <Link href='/events/create'>
              Create New Event
            </Link>
          </Button>
        </div>
      </section>
      <section className='wrapper py-8'>
      <Collections
					data={organisedEvents?.data}
					emptyTitle="No Created Events Found"
					emptyStateSubtext="Come back when you've created some!"
					collectionType="Events Organised"
					limit={6}
					page={eventsPage}
          urlParamName='eventsPage'
					totalPages={organisedEvents?.totalPages}
				/>
      </section>

    </>
  )
}

export default ProfilePage
