import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import "./global.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { stores, StoreContext } from "./stores.ts";
import HttpService from "./services/HttpService.ts";

HttpService.configure();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StoreContext.Provider value={stores}>
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </StoreContext.Provider>
  </React.StrictMode>
);
