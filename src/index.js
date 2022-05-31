import React from "react";
import ReactDOM from "react-dom";
import { ColorModeScript } from '@chakra-ui/react'
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "normalize.css";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import theme from "./data/theme";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_API_AUTHDOMAIN,
  projectId: process.env.REACT_APP_API_PROJECTID,
  storageBucket: process.env.REACT_APP_API_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_API_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_API_APPID,
  measurementId: process.env.REACT_APP_API_MEASUREMENTID,
};
const app = initializeApp(firebaseConfig);
getAnalytics(app);

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
