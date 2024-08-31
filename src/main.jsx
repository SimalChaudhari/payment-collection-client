import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { MaterialTailwindControllerProvider } from "@/context";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import Store from "./store";
import 'react-toastify/dist/ReactToastify.css';
import { HelmetProvider } from 'react-helmet-async';
import "../public/css/tailwind.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={Store}>
    <BrowserRouter>
    <HelmetProvider>
      <ThemeProvider>
        <MaterialTailwindControllerProvider>
          <App />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </MaterialTailwindControllerProvider>
      </ThemeProvider>
      </HelmetProvider>
    </BrowserRouter>
  </Provider>
);
