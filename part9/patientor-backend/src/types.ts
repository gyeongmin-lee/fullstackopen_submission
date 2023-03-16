export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  occupation: string;
  gender: string;
  ssn: string;
}

export type NonSensitivePatient = Omit<Patient, "ssn">;
