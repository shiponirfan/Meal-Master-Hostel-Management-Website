import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import Routes from "./routes/Routes";
import Main from "./layouts/Main";
import "react-awesome-button/dist/styles.css";
import SiteTheme from "./utils/SiteTheme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./providers/AuthProvider";
import { Toaster } from "react-hot-toast";
import '@smastrom/react-rating/style.css'
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <SiteTheme>
          <RouterProvider router={Routes}>
            <Main />/
          </RouterProvider>
        </SiteTheme>
      </QueryClientProvider>
      <Toaster />
    </AuthProvider>
  </React.StrictMode>
);
