import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import React from "react";
import { useDiagnosisCodes } from "../../hooks/useDiagnosisCodes";
import { usePatientEntryForm } from "../../hooks/usePatientEntryForm";
import { EntryWithoutId, HealthCheckRating } from "../../types";

interface Props {
  onSubmit: (values: EntryWithoutId) => void;
}

const initialFormValues: EntryWithoutId = {
  healthCheckRating: HealthCheckRating.Healthy,
  description: "",
  date: "",
  specialist: "",
  type: "HealthCheck",
  diagnosisCodes: [],
};

const HealthCheckForm: React.FC<Props> = ({ onSubmit }) => {
  const { availableDiagnosisCodes } = useDiagnosisCodes();

  const {
    formValues,
    setFormValues,
    handleDateChange,
    handleInputChange,
    handleDiagnosisChange,
  } = usePatientEntryForm(initialFormValues);

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
        <FormControl component="fieldset">
          <FormLabel component="legend">Health Check Rating</FormLabel>
          <RadioGroup
            name="healthCheckRating"
            value={formValues.healthCheckRating}
            onChange={handleInputChange}
          >
            <FormControlLabel
              value={HealthCheckRating.Healthy}
              control={<Radio />}
              label="Healthy"
            />
            <FormControlLabel
              value={HealthCheckRating.LowRisk}
              control={<Radio />}
              label="Low Risk"
            />
            <FormControlLabel
              value={HealthCheckRating.HighRisk}
              control={<Radio />}
              label="High Risk"
            />
            <FormControlLabel
              value={HealthCheckRating.CriticalRisk}
              control={<Radio />}
              label="Critical Risk"
            />
          </RadioGroup>
        </FormControl>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Box>
    </form>
  );
};

export default HealthCheckForm;
