import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import React, { useEffect, useState } from "react";
import { ChakraProvider, Spinner, Flex } from "@chakra-ui/react";
import "./app.css";
import Auth from "./views/Auth";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import { getAuth } from "firebase/auth";
import UserContext from "./context/UserContext";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import ReportDetail from "./components/ReportDetail";
import axios from "axios";

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
    <ChakraProvider>
      <UserContext.Provider value={user}>
        <Router>
          <Navbar />
          <Flex
            h="calc(100vh - 90px)"
            w="100%"
            alignItems="center"
            justifyContent="center"
          >
            {user.isLoading ? (
              <Spinner />
            ) : (
              <Switch>
                <Route path="/login">
                  {user.isLoggedIn ? (
                    <Redirect to="/app" />
                  ) : (
                    <Auth>
                      <LoginForm />
                    </Auth>
                  )}
                </Route>
                <Route path="/register">
                  {user.isLoggedIn ? (
                    <Redirect to="/app" />
                  ) : (
                    <Auth>
                      <RegisterForm />
                    </Auth>
                  )}
                </Route>
                <Route path="/app">
                  <Home />
                </Route>
                <Route path="/report/:id">
                  <ReportDetail />
                </Route>
                <Route path="/:userName">
                  <Profile />
                </Route>
                <Route path="/">
                  {user.isLoggedIn ? (
                    <Redirect to="/app" />
                  ) : (
                    <Redirect to="/login" />
                  )}
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
