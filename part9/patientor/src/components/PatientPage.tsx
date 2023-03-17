import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useMatch } from "react-router-dom";
import patientService from "../services/patients";
import { Patient } from "../types";

const PatientPage = () => {
  const match = useMatch("/patients/:id");
  const patientID = match?.params.id;

  const [patient, setPatient] = useState<Patient | undefined>();

  useEffect(() => {
    const fetchPatient = async () => {
      if (!patientID) return;

      const patient = await patientService.getOne(patientID);
      setPatient(patient);
    };
    void fetchPatient();
  }, [patientID]);

  if (!patient)
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

  const { name, occupation, ssn } = patient;

  return (
    <Box
      minWidth="275px"
      maxWidth="500px"
      p={2}
      bgcolor="background.paper"
      borderRadius="4px"
    >
      <Typography variant="h5" component="div" gutterBottom>
        {name}
      </Typography>
      <Typography variant="body1">Occupation: {occupation}</Typography>
      {ssn && <Typography variant="body1">SSN: {ssn}</Typography>}
    </Box>
  );
};

export default PatientPage;
