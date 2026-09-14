import { z } from 'zod';

export const appointmentSchema = z.object({
  requesterName: z.string().min(2, 'Este campo é obrigatório'),
  scheduledDate: z.string().min(1, 'Este campo é obrigatório'),
  scheduledTime: z.string().min(1, 'Este campo é obrigatório'),
});

export type AppointmentFormValues = z.infer<typeof appointmentSchema>;
