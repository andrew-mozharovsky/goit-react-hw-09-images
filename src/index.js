import React from "react";
import ReactDOM from "react-dom";

import "modern-normalize";
import "./styles.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
