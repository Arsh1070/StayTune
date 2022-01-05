import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import ContextWrapper from "./Components/contextWarper";
import reducer, { initial } from "./Components/Reducer";

ReactDOM.render(
  <React.StrictMode>
    <ContextWrapper initial={initial} reducer={reducer}>
      <App />
    </ContextWrapper>
  </React.StrictMode>,
  document.getElementById("root")
);
