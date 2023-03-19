import { useQuery } from "react-query";
import diagnosisService from "../services/diagnosis";

export const useDiagnosisCodes = () => {
  const { data: diagnosis } = useQuery("diagnosis", diagnosisService.getAll);
  const availableDiagnosisCodes = diagnosis?.map((d) => d.code);

  return {
    availableDiagnosisCodes,
  };
};
