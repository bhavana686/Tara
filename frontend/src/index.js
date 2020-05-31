import React from "react";
import ReactDOM from "react-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import teal from "@material-ui/core/colors/teal";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";

// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7BiKp4KyYuukdSh7NRxtxUCQswHaM-T8",
  authDomain: "tara-6d692.firebaseapp.com",
  projectId: "tara-6d692",
  appId: "1:1075279321967:web:8d268124d505baee02669a",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: purple,
    // secondary: {
    //   main: "#f44336",
    // },
    // accent: green,
  },
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </MuiThemeProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
