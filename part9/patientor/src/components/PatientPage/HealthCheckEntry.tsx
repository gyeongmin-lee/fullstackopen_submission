import FactCheckIcon from "@mui/icons-material/FactCheck";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box, Typography } from "@mui/material";
import { Entry, HealthCheckRating } from "../../types";

interface Props {
  entry: Extract<Entry, { type: "HealthCheck" }>;
}

const iconColorMap = {
  [HealthCheckRating.Healthy]: "green",
  [HealthCheckRating.LowRisk]: "yellow",
  [HealthCheckRating.HighRisk]: "orange",
  [HealthCheckRating.CriticalRisk]: "red",
};

const HealthCheckEntry = ({ entry }: Props) => {
  const iconColor = iconColorMap[entry.healthCheckRating];

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
        {entry.date} <FactCheckIcon />
      </Typography>
      <Typography gutterBottom variant="body1">
        {entry.description}
      </Typography>

      <FavoriteIcon htmlColor={iconColor} />

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

export default HealthCheckEntry;
