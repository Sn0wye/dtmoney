import { z } from 'zod';

export const userSchema = z.object({
  name: z.string({
    required_error: 'Name is required',
    invalid_type_error: 'Name must be a string',
  }),
  id: z.string({ required_error: 'Id is required' }),
  profilePic: z.string().nullish(),
});
