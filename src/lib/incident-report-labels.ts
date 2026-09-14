import { IncidentReportType, LocationType } from '@/lib/types';

export const INCIDENT_REPORT_TYPE_LABELS: Record<IncidentReportType, string> = {
  TRAFFIC_ACCIDENT: 'Acidente de trânsito',
  THEFT: 'Roubo ou furto',
  DOMESTIC_VIOLENCE: 'Violência doméstica',
};

export const LOCATION_TYPE_LABELS: Record<LocationType, string> = {
  RAILWAY: 'Via férrea',
  PUBLIC_ROAD: 'Via pública',
  OTHER: 'Outros',
};

export function formatDate(value: string) {
  return new Date(value).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
}
