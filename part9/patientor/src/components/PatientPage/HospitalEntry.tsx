import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import { Box, Typography } from "@mui/material";
import { Entry } from "../../types";

interface Props {
  entry: Extract<Entry, { type: "Hospital" }>;
}

const HospitalEntry = ({ entry }: Props) => {
  return (
    <Box
      key={entry.id}
      mb={2}
      border={2}
      borderColor="grey.500"
      bgcolor="background.paper"
      borderRadius="4px"
      padding={2}
      marginBottom="1rem"
    >
      <Typography variant="body1">
        {entry.date} <HealthAndSafetyIcon />
      </Typography>
      <Typography gutterBottom variant="body1">
        {entry.description}
      </Typography>
      <Typography gutterBottom variant="body1">
        Discharge: {entry.discharge?.date} - {entry.discharge?.criteria}
      </Typography>

      {entry.diagnosisCodes && (
        <Box>
          <Typography fontWeight="bold" variant="body1">
            Diagnosis codes:
          </Typography>
          <ul>
            {entry.diagnosis?.map((diagnose) => (
              <Typography component="li" key={diagnose.code}>
                {diagnose.code} {diagnose.name}
              </Typography>
            ))}
          </ul>
        </Box>
      )}
    </Box>
  );
};

export default HospitalEntry;
