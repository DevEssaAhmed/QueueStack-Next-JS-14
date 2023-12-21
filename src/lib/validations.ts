import * as z from 'zod';

export const questionsSchema = z.object({
  title: z.string().min(10).max(130),
  // explanation: z.string().min(50, { message: 'explanation must be at least 100 characters' }),
  explanation: z.string().min(20),

  tags: z.array(z.string().min(3).max(20)).min(1).max(5, {
    message: 'tags must be between 1 and 5',
  }),
});

export const answersSchema = z.object({
  answer: z.string().min(50),
});
export const ProfileValidation = z.object({
  name: z.string().min(5).max(30),
  username: z.string().min(5).max(20),
  bio: z.union([z.string().min(5).max(200), z.literal('')]),
  portfolioWebsite: z.union([z.string().url(), z.literal('')]),
  location: z.union([z.string().min(5).max(50), z.literal('')]),
});
