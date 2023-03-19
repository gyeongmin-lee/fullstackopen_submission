import { Button, Container, Divider, Typography } from "@mui/material";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";

import { useQuery } from "react-query";
import PatientListPage from "./components/PatientListPage";
import PatientPage from "./components/PatientPage";
import patientService from "./services/patients";

const App = () => {
  const { data: patients } = useQuery("patients", patientService.getAll);

  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/patients/:id" element={<PatientPage />} />
            <Route
              path="/"
              element={<PatientListPage patients={patients || []} />}
            />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
