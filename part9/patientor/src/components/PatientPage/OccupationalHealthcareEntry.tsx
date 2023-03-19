import WorkIcon from "@mui/icons-material/Work";
import { Box, Typography } from "@mui/material";
import { Entry } from "../../types";

interface Props {
  entry: Extract<Entry, { type: "OccupationalHealthcare" }>;
}

const OccupationalHealthcareEntry = ({ entry }: Props) => {
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
        {entry.date} <WorkIcon /> {entry.employerName}
      </Typography>
      <Typography gutterBottom variant="body1">
        {entry.description}
      </Typography>

      {entry.sickLeave && (
        <Typography gutterBottom variant="body1">
          Sick Leave: {entry.sickLeave?.startDate} - {entry.sickLeave?.endDate}
        </Typography>
      )}

      {entry.diagnosis && entry.diagnosis.length > 0 && (
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

export default OccupationalHealthcareEntry;
