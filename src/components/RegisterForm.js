import { Flex, Grid, Stack } from "@chakra-ui/layout";
import React from "react";
import { chakra } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@chakra-ui/button";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import InputRegister from "./InputRegister";

function RegisterForm() {
  const methods = useForm();
  const LinkCh = chakra(Link);
  const auth = getAuth();

  const createUser = (data) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in
        //const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        //const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(createUser)}
        style={{ display: "contents" }}
      >
        <Grid templateColumns="1fr" rowGap="20px" marginBottom="20px">
          <InputRegister type="email" errors={methods.formState.errors} />
          <InputRegister type="password" errors={methods.formState.errors} />
        </Grid>
        <Flex alignItems="center" justifyContent="space-between">
          <Stack
            justifyContent="space-between"
            spacing={5}
            direction={{ base: "column", lg: "row" }}
          >
            <LinkCh fontSize="12px" color="gray" fontWeight="500" to="/login">
              Conectarse
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
            Registrarse
          </Button>
        </Flex>
      </form>
    </FormProvider>
  );
}

export default RegisterForm;
