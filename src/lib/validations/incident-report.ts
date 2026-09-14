import { z } from 'zod';

const baseIncidentReportSchema = {
  occurredAt: z.string().min(1, 'Este campo é obrigatório'),
  occurredTime: z.string().min(1, 'Este campo é obrigatório'),
  locationType: z.enum(['RAILWAY', 'PUBLIC_ROAD', 'OTHER'], {
    message: 'Selecione o tipo de local',
  }),
  address: z.string().min(3, 'Este campo é obrigatório'),
  informantName: z.string().min(2, 'Este campo é obrigatório'),
  narrative: z.string().min(10, 'Descreva o ocorrido com mais detalhes'),
};

export const trafficAccidentSchema = z.object({
  ...baseIncidentReportSchema,
  driverName: z.string().min(2, 'Este campo é obrigatório'),
  vehiclesInvolved: z.string().min(3, 'Informe placa, modelo e ano dos veículos'),
});

export type TrafficAccidentFormValues = z.infer<typeof trafficAccidentSchema>;

export const theftSchema = z.object({
  ...baseIncidentReportSchema,
  involvedViolence: z.enum(['true', 'false'], { message: 'Selecione uma opção' }),
  propertyTaken: z.enum(['true', 'false'], { message: 'Selecione uma opção' }),
  victimName: z.string().min(2, 'Este campo é obrigatório'),
  stolenItems: z.string().min(3, 'Descreva os objetos envolvidos'),
});

export type TheftFormValues = z.infer<typeof theftSchema>;

export const domesticViolenceSchema = z.object({
  ...baseIncidentReportSchema,
  involvedViolence: z.enum(['true', 'false'], { message: 'Selecione uma opção' }),
  victimName: z.string().min(2, 'Este campo é obrigatório'),
});

export type DomesticViolenceFormValues = z.infer<typeof domesticViolenceSchema>;
