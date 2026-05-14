import { z } from 'zod';

export const trainerProfileSchema = z.object({
  specialties: z.array(z.string()).optional(),
  bio: z.string().max(500).optional(),
  hourlyRate: z.number().positive().optional(),
});

export const availabilitySchema = z.object({
  availability: z.array(
    z.object({
      day: z.string(),
      timeSlots: z.array(z.string()),
    })
  ),
});
