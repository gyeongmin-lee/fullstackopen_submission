import axios from "axios";
import {
  Diagnosis,
  Entry,
  EntryWithoutId,
  Patient,
  PatientFormValues,
} from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const getPopulatedEntries = async (entries: Entry[]) => {
  if (
    entries.some(
      (entry) => entry.diagnosisCodes && entry.diagnosisCodes.length > 0
    )
  ) {
    const { data: diagnoses } = await axios.get<Diagnosis[]>(
      `${apiBaseUrl}/diagnoses`
    );
    return entries.map((entry) => {
      if (entry.diagnosisCodes) {
        entry.diagnosis = diagnoses.filter((diagnosis) =>
          entry.diagnosisCodes?.includes(diagnosis.code)
        );
      }
      return entry;
    });
  }
};

const getOne = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);

  const populatedEntries = await getPopulatedEntries(data.entries);
  if (populatedEntries) {
    data.entries = populatedEntries;
  }

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const addEntry = async (id: string, object: EntryWithoutId) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients/${id}/entries`,
    object
  );

  const populatedEntries = await getPopulatedEntries(data.entries);
  if (populatedEntries) {
    data.entries = populatedEntries;
  }

  return data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll,
  create,
  getOne,
  addEntry,
};
