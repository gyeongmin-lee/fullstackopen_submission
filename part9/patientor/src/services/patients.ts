import axios from "axios";
import { Diagnosis, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const getOne = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);

  if (
    data.entries.some(
      (entry) => entry.diagnosisCodes && entry.diagnosisCodes.length > 0
    )
  ) {
    const { data: diagnoses } = await axios.get<Diagnosis[]>(
      `${apiBaseUrl}/diagnoses`
    );
    data.entries = data.entries.map((entry) => {
      if (entry.diagnosisCodes) {
        entry.diagnosis = diagnoses.filter((diagnosis) =>
          entry.diagnosisCodes?.includes(diagnosis.code)
        );
      }
      return entry;
    });
  }

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll,
  create,
  getOne,
};
