import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useMatch } from "react-router-dom";
import patientService from "../../services/patients";
import { Gender, Patient } from "../../types";
import EntryDetails from "./EntryDetails";

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

  const { name, occupation, ssn, gender, entries } = patient;

  const getGenderIcon = () => {
    if (gender === Gender.Male) {
      return <MaleIcon fontSize="small" />;
    } else if (gender === Gender.Female) {
      return <FemaleIcon fontSize="small" />;
    } else {
      return null;
    }
  };

  return (
    <Box
      minWidth="275px"
      maxWidth="500px"
      p={2}
      bgcolor="background.paper"
      borderRadius="4px"
    >
      <Box marginBottom={3}>
        <Typography variant="h5" component="div" gutterBottom>
          {name} {getGenderIcon()}
        </Typography>
        <Typography variant="body1">Occupation: {occupation}</Typography>
        {ssn && <Typography variant="body1">SSN: {ssn}</Typography>}
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
