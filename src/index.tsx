import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Auth0Provider } from "@auth0/auth0-react";

const domain: string = process.env.REACT_APP_AUTH0_DOMAIN || "";
const clientId: string = process.env.REACT_APP_AUTH0_CLIENT_ID || "";
const audience: string = process.env.REACT_APP_AUTH0_AUDIENCE || "";

ReactDOM.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    audience={audience}
    redirectUri={window.location.origin}
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Auth0Provider>,
  document.getElementById("root")
);

reportWebVitals();
