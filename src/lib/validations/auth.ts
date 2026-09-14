import { z } from 'zod';

export const registerSchema = z
  .object({
    name: z.string().min(3, 'Informe seu nome completo'),
    email: z.string().email('E-mail inválido'),
    phoneNumber: z.string().min(10, 'Telefone inválido'),
    cpf: z.string().min(11, 'CPF inválido'),
    sex: z.enum(['MALE', 'FEMALE'], { message: 'Selecione uma opção' }),
    birthDate: z.string().min(1, 'Este campo é obrigatório'),
    password: z.string().min(8, 'A senha deve ter ao menos 8 caracteres'),
    confirmPassword: z.string().min(1, 'Este campo é obrigatório'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas devem ser iguais',
    path: ['confirmPassword'],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(1, 'Este campo é obrigatório'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
