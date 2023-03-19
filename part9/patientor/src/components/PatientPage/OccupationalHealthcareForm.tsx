import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import React from "react";
import { useDiagnosisCodes } from "../../hooks/useDiagnosisCodes";
import { usePatientEntryForm } from "../../hooks/usePatientEntryForm";
import { EntryWithoutId, SickLeave } from "../../types";

interface Props {
  onSubmit: (values: EntryWithoutId) => void;
}

const initialFormValues: EntryWithoutId = {
  description: "",
  date: "",
  specialist: "",
  type: "OccupationalHealthcare",
  employerName: "",
  sickLeave: {
    startDate: "",
    endDate: "",
  } as SickLeave,
  diagnosisCodes: [],
};

const OccupationalHealthcareForm = ({ onSubmit }: Props) => {
  const { availableDiagnosisCodes } = useDiagnosisCodes();

  const {
    formValues,
    setFormValues,
    handleDateChange,
    handleInputChange,
    handleDiagnosisChange,
  } = usePatientEntryForm(initialFormValues);

  const handleSickLeaveDateChange = (name: string, value: Dayjs | null) => {
    const newValue = {
      ...formValues.sickLeave,
      [name]: value?.toISOString().substring(0, 10) || "",
    } as SickLeave;

    setFormValues({
      ...formValues,
      sickLeave: newValue,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(formValues);
    setFormValues(initialFormValues);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          name="description"
          label="Description"
          size="small"
          value={formValues.description}
          onChange={handleInputChange}
        />
        <DatePicker
          label="Date"
          value={dayjs(formValues.date) || null}
          onChange={(date) => handleDateChange("date", date)}
        />
        <TextField
          name="specialist"
          label="Specialist"
          size="small"
          value={formValues.specialist}
          onChange={handleInputChange}
        />
        <TextField
          name="employerName"
          label="Employer Name"
          size="small"
          value={formValues.employerName}
          onChange={handleInputChange}
        />
        <DatePicker
          label="Sick Leave Start Date"
          value={dayjs(formValues.sickLeave?.startDate) || null}
          onChange={(date) => handleSickLeaveDateChange("startDate", date)}
        />
        <DatePicker
          label="Sick Leave End Date"
          value={dayjs(formValues.sickLeave?.endDate) || null}
          onChange={(date) => handleSickLeaveDateChange("endDate", date)}
        />
        <FormControl>
          <InputLabel>Diagnosis Codes</InputLabel>
          <Select
            name="diagnosisCodes"
            label="Diagnosis Codes"
            placeholder="Diagnoses Codes"
            value={formValues.diagnosisCodes}
            onChange={handleDiagnosisChange}
            multiple
          >
            {availableDiagnosisCodes?.map((code) => (
              <MenuItem key={code} value={code}>
                {code}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Box>
    </form>
  );
};

export default OccupationalHealthcareForm;
