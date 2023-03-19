import {
  Diagnose,
  Discharge,
  EntryWithoutId,
  Gender,
  NewPatientEntry,
  SickLeave,
} from "./types";

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newEntry: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
    };

    return newEntry;
  }

  throw new Error("Incorrect data: some fields are missing");
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name");
  }

  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error("Incorrect or missing date of birth");
  }

  return dateOfBirth;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("Incorrect or missing ssn");
  }

  return ssn;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender");
  }

  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect or missing occupation");
  }

  return occupation;
};

export const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "type" in object
  ) {
    if (object.type === "HealthCheck") {
      const newEntry: EntryWithoutId = {
        type: "HealthCheck",
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object),
        healthCheckRating:
          "healthCheckRating" in object
            ? parseHealthCheckRating(object.healthCheckRating)
            : 0,
      };

      return newEntry;
    } else if (object.type === "OccupationalHealthcare") {
      if (!("employerName" in object)) {
        throw new Error("Incorrect or missing data");
      }

      const newEntry: EntryWithoutId = {
        type: "OccupationalHealthcare",
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object),
        employerName: parseEmployerName(object.employerName),
        sickLeave:
          "sickLeave" in object ? parseSickLeave(object.sickLeave) : undefined,
      };

      return newEntry;
    } else if (object.type === "Hospital") {
      if (!("discharge" in object)) {
        throw new Error("Incorrect or missing data");
      }

      const newEntry: EntryWithoutId = {
        type: "Hospital",
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object),
        discharge: parseDischarge(object.discharge),
      };

      return newEntry;
    } else {
      throw new Error("Incorrect or missing data");
    }
  }

  throw new Error("Incorrect or missing data");
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error("Incorrect or missing description");
  }

  return description;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date");
  }

  return date;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error("Incorrect or missing specialist");
  }

  return specialist;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnose["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnose["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnose["code"]>;
};

const parseHealthCheckRating = (healthCheckRating: unknown): number => {
  if (healthCheckRating === undefined) {
    throw new Error("Incorrect or missing health check rating");
  }

  if (
    Number.isNaN(Number(healthCheckRating)) ||
    Number(healthCheckRating) < 0 ||
    Number(healthCheckRating) > 3
  ) {
    throw new Error("Incorrect or missing health check rating");
  }

  return Number(healthCheckRating);
};

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error("Incorrect or missing employer name");
  }

  return employerName;
};

const parseSickLeave = (sickLeave: unknown): SickLeave | undefined => {
  if (!sickLeave) {
    return undefined;
  }

  if (typeof sickLeave !== "object") {
    throw new Error("Incorrect or missing sick leave");
  }

  if (
    !("startDate" in sickLeave) ||
    !("endDate" in sickLeave) ||
    !isString(sickLeave.startDate) ||
    !isString(sickLeave.endDate) ||
    !isDate(sickLeave.startDate) ||
    !isDate(sickLeave.endDate)
  ) {
    throw new Error("Incorrect or missing sick leave");
  }

  return sickLeave as SickLeave;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || typeof discharge !== "object") {
    throw new Error("Incorrect or missing discharge");
  }

  if (
    !("date" in discharge) ||
    !("criteria" in discharge) ||
    !isString(discharge.date) ||
    !isString(discharge.criteria) ||
    !isDate(discharge.date)
  ) {
    throw new Error("Incorrect or missing discharge");
  }

  return discharge as Discharge;
};

export default toNewPatientEntry;
