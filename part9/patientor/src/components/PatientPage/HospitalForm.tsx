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
import { EntryWithoutId } from "../../types";

interface Props {
  onSubmit: (values: EntryWithoutId) => void;
}

const initialFormValues: EntryWithoutId = {
  description: "",
  date: "",
  specialist: "",
  type: "Hospital",
  discharge: {
    date: "",
    criteria: "",
  },
  diagnosisCodes: [],
};

const HospitalForm = ({ onSubmit }: Props) => {
  const { availableDiagnosisCodes } = useDiagnosisCodes();

  const {
    formValues,
    setFormValues,
    handleDateChange,
    handleInputChange,
    handleDiagnosisChange,
  } = usePatientEntryForm(initialFormValues);

  const handleDischargeInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      discharge: {
        ...formValues.discharge,
        [name]: value,
      },
    });
  };

  const handleDischargeDateChange = (name: string, value: Dayjs | null) => {
    setFormValues({
      ...formValues,
      discharge: {
        ...formValues.discharge,
        [name]: value?.toISOString().substring(0, 10) || "",
      },
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
        <DatePicker
          label="Discharge Date"
          value={dayjs(formValues.discharge.date) || null}
          onChange={(date) => handleDischargeDateChange("date", date)}
        />
        <TextField
          name="criteria"
          label="Discharge Criteria"
          size="small"
          value={formValues.discharge.criteria}
          onChange={handleDischargeInputChange}
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

export default HospitalForm;
