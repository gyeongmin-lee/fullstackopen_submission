import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";

import { Patient, PatientFormValues } from "../../types";
import AddPatientModal from "../AddPatientModal";

import HealthRatingBar from "../HealthRatingBar";

import { useMutation, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import patientService from "../../services/patients";

interface Props {
  patients: Patient[];
}

const PatientListPage = ({ patients }: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const queryClient = useQueryClient();

  const { mutate: mutatePatient } = useMutation(patientService.create, {
    onSuccess: () => {
      queryClient.invalidateQueries("patients");
    },
  });

  const submitNewPatient = async (values: PatientFormValues) => {
    try {
      mutatePatient(values);
      setModalOpen(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            ""
          );
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  return (
    <div className="App">
      <Box>
        <Typography align="center" variant="h6">
          Patient list
        </Typography>
      </Box>
      <Table style={{ marginBottom: "1em" }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Occupation</TableCell>
            <TableCell>Health Rating</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(patients).map((patient: Patient) => (
            <TableRow key={patient.id}>
              <TableCell>
                <Link to={`/patients/${patient.id}`}> {patient.name}</Link>
              </TableCell>
              <TableCell>{patient.gender}</TableCell>
              <TableCell>{patient.occupation}</TableCell>
              <TableCell>
                <HealthRatingBar showText={false} rating={1} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AddPatientModal
        modalOpen={modalOpen}
        onSubmit={submitNewPatient}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Patient
      </Button>
    </div>
  );
};

export default PatientListPage;
