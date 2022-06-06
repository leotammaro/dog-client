import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import React, { useEffect, useState } from "react";
import { ChakraProvider, Spinner, Flex } from "@chakra-ui/react";
import "./app.css";
import Auth from "./views/Auth";
import { getAuth } from "firebase/auth";
import UserContext from "./context/UserContext";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import ReportDetail from "./components/ReportDetail";
import axios from "axios";
import theme from "./data/theme";
import PrivateRoute from "./components/PrivateRoute";
import LoginForm from "./components/LoginForm"
import RegisterForm from "./components/RegisterForm"

function App() {
  const [user, setUser] = useState({ isLoading: true, isLoggedIn: false });
  useEffect(() => {
    getAuth().onAuthStateChanged(function (firebaseUser) {
      setUser({
        ...firebaseUser,
        isLoading: false,
        isLoggedIn: !!firebaseUser,
      });
      if (firebaseUser) {
        axios({
          url: `${process.env.REACT_APP_API_URL}/user/me`,
          method: "get",
          headers: {
            Authorization: firebaseUser.accessToken,
          },
        });
      }
    });
  }, []);

  return (
    <ChakraProvider colorModeManager={"cookie"} theme={theme}>
      <UserContext.Provider value={user}>
        <Router>
          <Navbar />
          <Flex
            h="calc(100vh - 110px)"
            w="100%"
            alignItems="center"
            justifyContent="center"
          >
            {user.isLoading ? (
              <Spinner />
            ) : (
              <Switch>
                <Route path="/login">
                  <Auth component={<LoginForm />} />
                </Route>
                <Route path="/register">
                  <Auth component={<RegisterForm />} />
                </Route>
                <Route path="/app">
                  <PrivateRoute><Home /></PrivateRoute>
                </Route>
                <Route path="/report/:id">
                  <ReportDetail />
                </Route>
                <Route path="/:userName">
                  <PrivateRoute><Profile /></PrivateRoute>
                </Route>
                <Route path="/">
                  <PrivateRoute><Home /></PrivateRoute>
                </Route>
              </Switch>
            )}
          </Flex>
        </Router>
      </UserContext.Provider>
    </ChakraProvider>
  );
}

export default App;
