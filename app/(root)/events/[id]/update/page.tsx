import EventForm from '@/components/shared/EventForm';
import { getEventById } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs';
import React from 'react';

type UpdateEventProps = {
	params: {
		id: string
	}
}

const UpdateEvent = async ({ params: { id } }: UpdateEventProps ) => {
	const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string

	const event = await getEventById(id)
	return (
		<>
			<section className="bg-primary-50 bg-dotted-pattern bg-cover py-55 md:py-10">
				<h3 className="wrapper h3-bold text-center">Update Event</h3>
			</section>
			<div className="wrapper my-8">
				<EventForm userId={userId} type='Update' event={event} eventId={event._id} />
			</div>
		</>
	);
};

export default UpdateEvent;
