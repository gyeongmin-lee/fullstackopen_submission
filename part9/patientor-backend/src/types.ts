export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  occupation: string;
  gender: Gender;
  ssn: string;
}

export type NonSensitivePatient = Omit<Patient, "ssn">;

export type NewPatientEntry = Omit<Patient, "id">;
