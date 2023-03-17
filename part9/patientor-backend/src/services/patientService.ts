import { v1 as uuid } from "uuid";
import patients from "../../data/patients";
import { NewPatientEntry, NonSensitivePatient, Patient } from "../types";

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
    ...entry,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const findById = (id: string): Patient | undefined => {
  const entry = patients.find((p) => p.id === id);
  return entry;
};

export default {
  getEntries,
  addEntry,
  findById,
};
