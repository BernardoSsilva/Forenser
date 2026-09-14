import { apiClient } from '@/lib/api-client';
import { IncidentReport, LocationType } from '@/lib/types';

interface BaseIncidentReportInput {
  occurredAt: string;
  occurredTime: string;
  locationType: LocationType;
  address: string;
  informantName: string;
  narrative: string;
}

export interface CreateTrafficAccidentInput extends BaseIncidentReportInput {
  driverName: string;
  vehiclesInvolved: string;
}

export interface CreateTheftInput extends BaseIncidentReportInput {
  involvedViolence: boolean;
  propertyTaken: boolean;
  victimName: string;
  stolenItems: string;
}

export interface CreateDomesticViolenceInput extends BaseIncidentReportInput {
  involvedViolence: boolean;
  victimName: string;
}

export async function listIncidentReports(): Promise<IncidentReport[]> {
  const response = await apiClient.get<IncidentReport[]>('/incident-reports');
  return response.data;
}

export async function createTrafficAccidentReport(
  data: CreateTrafficAccidentInput,
): Promise<IncidentReport> {
  const response = await apiClient.post<IncidentReport>(
    '/incident-reports/traffic-accidents',
    data,
  );
  return response.data;
}

export async function createTheftReport(data: CreateTheftInput): Promise<IncidentReport> {
  const response = await apiClient.post<IncidentReport>('/incident-reports/thefts', data);
  return response.data;
}

export async function createDomesticViolenceReport(
  data: CreateDomesticViolenceInput,
): Promise<IncidentReport> {
  const response = await apiClient.post<IncidentReport>(
    '/incident-reports/domestic-violence',
    data,
  );
  return response.data;
}
