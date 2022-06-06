import React from "react";
import { Box, Flex, Grid } from "@chakra-ui/layout";
import { Image, Text } from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import logo from "../assets/logo.svg";
import googleLogo from "../assets/googleLogo.svg";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import dogImage from "../images/dogLogin.jpg";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import Home from "../components/Home.js";
import { Redirect } from "react-router-dom";

function Auth({ component }) {
  const user = React.useContext(UserContext);
  const history = useHistory();
  const singInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then(() => {
        history.push("/app");
      })
      .catch((error) => {
        console.warn(error);
      });
  };
  return user.isLoggedIn ? (
    <Redirect component={<Home />} />
  ) : (
    <Flex height={{ base: "100vh" }} alignItems="center" w="100%">
      <Grid templateColumns="2fr" flex="40%" justifyItems="center" h="100vh">
        <Image src={logo} w="60px" h="60px" alignSelf="flex-start" />
        <Box w="70%">
          {component}
          <Flex direction="column" paddingTop="20px">
            <Text
              textAlign="center"
              _before={{
                content: '""',
                backgroundColor: "#EDEDED",
                width: "45%",
                height: "1px",
                position: "absolute",
                left: "0",
                top: "10px",
              }}
              _after={{
                content: '""',
                backgroundColor: "#EDEDED",
                width: "45%",
                height: "1px",
                position: "absolute",
                right: "0",
                top: "10px",
              }}
              position="relative"
              w="100%"
            >
              O
            </Text>
            <Button
              marginTop="40px"
              display="flex"
              padding={{ base: "10px 40px", lg: "26px" }}
              backgroundColor="white"
              border="1px solid rgba(0,0,0,0.1)"
              borderRadius="25px"
              justifyContent="center"
              onClick={singInWithGoogle}
            >
              <Image
                src={googleLogo}
                w="20px"
                h="20px"
                position="absolute"
                left="30px"
              />
              <Text fontSize={{ base: "12px", sm: "14px" }}>
                Conectarse con Google
              </Text>
            </Button>
          </Flex>
        </Box>
      </Grid>
      <Box
        display={{ base: "none", lg: "block" }}
        minW="60%"
        h="100vh"
        bgImage={dogImage}
        bgSize="cover"
        backgroundPosition="65%"
        backgroundRepeat="no-repeat"
      ></Box>
    </Flex>
  );
}

export default Auth;
