import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import {
  Alert,
  Box,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { AxiosError } from "axios";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useMatch } from "react-router-dom";
import patientService from "../../services/patients";
import { EntryTypes, EntryWithoutId, Gender, Patient } from "../../types";
import EntryDetails from "./EntryDetails";
import HealthCheckForm from "./HealthCheckForm";
import HospitalForm from "./HospitalForm";
import OccupationalHealthcareForm from "./OccupationalHealthcareForm";

const PatientPage = () => {
  const match = useMatch("/patients/:id");
  const patientID = match?.params.id;
  const [formType, setFormType] = useState<EntryTypes>(EntryTypes.Hospital);

  const { data: patient, isError } = useQuery(["patient", patientID], () =>
    patientService.getOne(patientID || "")
  );

  const queryClient = useQueryClient();

  const { mutate } = useMutation<Patient, { error: string }, EntryWithoutId>(
    (params) => patientService.addEntry(patientID || "", params),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["patient", patientID]);
      },
    }
  );

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>(undefined);

  if (isError || !patient)
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        marginTop="2rem"
      >
        <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
          Patient not found.
        </Typography>
      </Box>
    );

  const { name, occupation, ssn, gender, entries } = patient;

  const handleSubmitEntry = async (params: EntryWithoutId) => {
    if (!patientID) return;

    try {
      mutate(params);
      showSuccess("New entry added successfully.");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          showError(error.response.data);
        }
      }
    }
  };

  const getGenderIcon = () => {
    if (gender === Gender.Male) {
      return <MaleIcon fontSize="small" />;
    } else if (gender === Gender.Female) {
      return <FemaleIcon fontSize="small" />;
    } else {
      return null;
    }
  };

  const getFormType = () => {
    if (formType === "Hospital") {
      return <HospitalForm onSubmit={handleSubmitEntry} />;
    } else if (formType === "OccupationalHealthcare") {
      return <OccupationalHealthcareForm onSubmit={handleSubmitEntry} />;
    } else {
      return <HealthCheckForm onSubmit={handleSubmitEntry} />;
    }
  };

  const showError = (error: string, timeout = 5000) => {
    setError(error);
    setTimeout(() => {
      setError(undefined);
    }, timeout);
  };

  const showSuccess = (message: string, timeout = 5000) => {
    setSuccess(message);
    setTimeout(() => {
      setSuccess(undefined);
    }, timeout);
  };

  return (
    <Box
      minWidth="275px"
      maxWidth="500px"
      p={2}
      bgcolor="background.paper"
      borderRadius="4px"
    >
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}
      <Box marginBottom={3}>
        <Typography variant="h5" component="div" gutterBottom>
          {name} {getGenderIcon()}
        </Typography>
        <Typography variant="body1">Occupation: {occupation}</Typography>
        {ssn && <Typography variant="body1">SSN: {ssn}</Typography>}
      </Box>
      <Box marginBottom={3} gap={2} display="flex" flexDirection="column">
        <FormControl size="small">
          <Select
            value={formType}
            onChange={(e) => setFormType(e.target.value as EntryTypes)}
          >
            <MenuItem value={EntryTypes.Hospital}>New Hospital Entry</MenuItem>
            <MenuItem value={EntryTypes.OccupationalHealthcare}>
              New Occupation Health
            </MenuItem>
            <MenuItem value={EntryTypes.HealthCheck}>New Health Check</MenuItem>
          </Select>
        </FormControl>
        {getFormType()}
      </Box>
      {entries.length > 0 && (
        <>
          <Typography variant="h6" component="div">
            entries
          </Typography>
          {entries.map((entry) => (
            <EntryDetails key={entry.id} entry={entry} />
          ))}
        </>
      )}
    </Box>
  );
};

export default PatientPage;
