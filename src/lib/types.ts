export type Sex = 'MALE' | 'FEMALE';

export interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  cpf: string;
  sex: Sex;
  birthDate: string;
  createdAt: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export type IncidentReportType = 'TRAFFIC_ACCIDENT' | 'THEFT' | 'DOMESTIC_VIOLENCE';
export type LocationType = 'RAILWAY' | 'PUBLIC_ROAD' | 'OTHER';

export interface IncidentReportFace {
  id: string;
  imageUrl: string;
  description: string;
}

export interface IncidentReport {
  id: string;
  type: IncidentReportType;
  occurredAt: string;
  occurredTime: string;
  locationType: LocationType;
  address: string;
  informantName: string;
  narrative: string;
  userId: string;
  createdAt: string;
  driverName: string | null;
  vehiclesInvolved: string | null;
  propertyTaken: boolean | null;
  stolenItems: string | null;
  involvedViolence: boolean | null;
  victimName: string | null;
  face: IncidentReportFace | null;
}

export interface Appointment {
  id: string;
  requesterName: string;
  scheduledDate: string;
  scheduledTime: string;
  userId: string;
  createdAt: string;
}

export interface FacialAttributes {
  sex: string;
  ageGroup: string;
  skinColor: string;
  bodyType: string;
  faceShape: string;
  headShape: string;
  hairHeight: string;
  hairType: string;
  hairColor: string;
  hairStyle: string;
  beard: string;
  beardStyle: string;
  eyeShape: string;
  eyeColor: string;
  mouthShape: string;
  noseShape: string;
  chinShape: string;
  earShape: string;
  ethnicity: string;
  accessories: string;
  facialMarks: string;
}

export interface GeneratedFace {
  imageUrl: string;
  description: string;
}
