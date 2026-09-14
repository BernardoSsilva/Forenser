import { z } from 'zod';

export const complaintSchema = z.object({
  reporterName: z.string().min(2, 'Este campo é obrigatório'),
  location: z.string().min(3, 'Informe a localidade do ocorrido'),
  description: z.string().min(10, 'Descreva a denúncia com mais detalhes'),
});

export type ComplaintFormValues = z.infer<typeof complaintSchema>;
