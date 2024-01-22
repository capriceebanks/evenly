import * as z from 'zod';

export const eventFormSchema = z.object({
	title: z
		.string()
		.min(3, { message: 'Title too short, must have at least 3 characters.' }),
	description: z
		.string()
		.min(10, {
			message: 'Description too short, must have at least 10 characters.',
		})
		.max(400, {
			message: 'Description too long, must have at most 400 characters.',
		}),
    location: z.string().min(3, { message: 'Location too short, must have at least 3 characters.' }).max(400, { message: 'Location too long, must have at most 400 characters.' }),
    imageUrl: z.string().url({ message: 'Invalid image URL.' }),
    startDateTime: z.date(),
    endDateTime: z.date(),
    categoryId: z.string(),
    price: z.string(),
    isFree: z.boolean(),
    url: z.string().url({ message: 'Invalid URL.' }),
  })
