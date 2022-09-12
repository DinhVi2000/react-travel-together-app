import axios from "axios";
import React from "react";

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";

import AppRoutes from "./routes/AppRoutes";

function App() {
  const queryClient = new QueryClient();
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AppRoutes />
    </QueryClientProvider>
  );
}

export default App;
