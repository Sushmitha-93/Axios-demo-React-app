import React from "react";
import * as Sentry from "@sentry/browser";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";

Sentry.init({
  dsn: "https://15ab3bccf8b54494b6db30399b667c1a@sentry.io/1479678"
});

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
