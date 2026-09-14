import { z } from 'zod';

export const editProfileSchema = z.object({
  email: z.string().email('E-mail inválido'),
  phoneNumber: z.string().min(10, 'Telefone inválido'),
});

export type EditProfileFormValues = z.infer<typeof editProfileSchema>;
