import { SelectChangeEvent } from "@mui/material";
import { Dayjs } from "dayjs";
import { useState } from "react";
import { EntryWithoutId } from "../types";

export const usePatientEntryForm = <T extends EntryWithoutId>(
  initialFormValues: T
) => {
  const [formValues, setFormValues] = useState(initialFormValues);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: name === "healthCheckRating" ? Number(value) : value,
    });
  };

  const handleDiagnosisChange = (event: SelectChangeEvent<string[]>) => {
    const { value } = event.target;
    setFormValues({
      ...formValues,
      diagnosisCodes: typeof value === "string" ? value.split(",") : value,
    });
  };

  const handleDateChange = (name: string, value: Dayjs | null) => {
    setFormValues({
      ...formValues,
      [name]: value?.toISOString().substring(0, 10) || "",
    });
  };

  return {
    formValues,
    setFormValues,
    handleInputChange,
    handleDiagnosisChange,
    handleDateChange,
  };
};
