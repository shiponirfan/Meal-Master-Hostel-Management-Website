import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import Routes from "./routes/Routes";
import Main from "./layouts/Main";
import Themes from "./utils/Themes";
import 'react-awesome-button/dist/styles.css';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Themes>
      <RouterProvider router={Routes}>
        <Main />/
      </RouterProvider>
    </Themes>
  </React.StrictMode>
);
