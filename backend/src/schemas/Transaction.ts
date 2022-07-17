import { z } from 'zod';

export const transactionSchema = z.object({
  userId: z.string({
    required_error: 'UserId is required',
  }),
  value: z.number(),
  type: z.string({
    required_error: 'Type is required',
    invalid_type_error: 'Type must be a string',
  }),
  title: z.string({
    required_error: 'Title is required',
  }),
  category: z.string({
    required_error: 'Category is required',
  }),
});
