import { z } from 'zod';

export const createSessionSchema = z.object({
  trainerId: z.string().min(1),
  sessionDate: z.string().datetime(),
  durationMinutes: z.number().int().min(30).max(240),
});
