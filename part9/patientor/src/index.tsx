import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";

import App from "./App";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </LocalizationProvider>
);
