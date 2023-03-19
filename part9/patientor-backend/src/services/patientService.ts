import { v1 as uuid } from "uuid";
import patients from "../../data/patients";
import {
  EntryWithoutId,
  NewPatientEntry,
  NonSensitivePatient,
  Patient,
} from "../types";

const getEntries = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, occupation, gender }) => ({
    id,
    name,
    dateOfBirth,
    occupation,
    gender,
  }));
};

const addEntry = (entry: NewPatientEntry) => {
  const newPatientEntry = {
    id: uuid(),
    entries: [],
    ...entry,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntryToPatient = (
  patientId: string,
  entry: EntryWithoutId
): Patient | undefined => {
  const newEntry = {
    id: uuid(),
    ...entry,
  };

  const patient = patients.find((p) => p.id === patientId);
  if (patient && patient.entries) {
    patient.entries = [...patient.entries, newEntry];
  }
  return patient;
};

const findById = (id: string): Patient | undefined => {
  const entry = patients.find((p) => p.id === id);
  return entry;
};

export default {
  getEntries,
  addEntry,
  findById,
  addEntryToPatient,
};
