import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import { Input } from "@chakra-ui/input";
import { Flex, Grid, Stack } from "@chakra-ui/layout";
import React from "react";
import { chakra ,Text} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@chakra-ui/button";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function LoginForm() {
  const { register, handleSubmit } = useForm();
  const LinkCh = chakra(Link);
  const [errorAuth,setErrorAuth] = React.useState("")

  const logInWithEmail = (email, password) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .catch((error) => {
        const errorMessage = error.message;
        setErrorAuth(errorMessage)
      });
    
  };
  return (
    <form
      onSubmit={handleSubmit((data) => {
        logInWithEmail(data.email, data.password);
      })}
      style={{ display: "contents" }}
    >
      <Grid templateColumns="1fr" rowGap="20px" marginBottom="20px" >
        <Flex alignItems="center">
          <EmailIcon position="absolute" marginLeft="20px" />
          <Input
            position="relative"
            placeholder="Tu email"
            width={{ base: "100%" }}
            paddingLeft="35px"
            fontSize="14px"
            padding={{ base: "10px 50px", lg: "26px 60px" }}
            borderRadius="10px"
            fontWeight="400"
            boxShadow="0px 0px 3px rgba(0,0,0,0.1)"
            _focus={{ outline: "none" }}
            {...register("email")}
          ></Input>
        </Flex>
        <Flex alignItems="center">
          <LockIcon position="absolute" marginLeft="20px" />
          <Input
            position="relative"
            placeholder="Contraseña"
            fontSize="14px"
            width={{ base: "100%" }}
            padding={{ base: "10px 50px", lg: "26px 60px" }}
            borderRadius="10px"
            fontWeight="400"
            boxShadow="0px 0px 3px rgba(0,0,0,0.1)"
            _focus={{ outline: "none" }}
            type="password"
            {...register("password")}
          ></Input>
        </Flex>
        <Text h={10} color="red" fontSize={"12"}>{errorAuth}</Text>
      </Grid>
      <Flex alignItems="center" justifyContent="space-between">
        <Stack
          justifyContent="space-between"
          spacing={5}
          direction={{ base: "column", lg: "row" }}
        >
          <LinkCh fontSize="12px" color="gray" fontWeight="500" to="/register">
            Registrarse
          </LinkCh>
          <LinkCh fontSize="12px" color="gray" fontWeight="500" to="/">
            ¿Olvidaste la contraseña?
          </LinkCh>
        </Stack>
        <Button
          bg="#3C58C9"
          color="white"
          padding={{ base: "20px 17px", xl: "24px 20px" }}
          fontSize="12px"
          fontWeight="500"
          borderRadius="9px"
          _hover={{ backgroundColor: "#3C58C9" }}
          type="submit"
          letterSpacing="0.5px"
        >
          Conectarse
        </Button>
      </Flex>
    </form>
  );
}

export default LoginForm;
