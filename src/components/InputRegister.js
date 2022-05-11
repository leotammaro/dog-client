import React from "react";
import { Input } from "@chakra-ui/input";
import { Flex, Text, Box } from "@chakra-ui/layout";
import { EmailIcon, InfoIcon, LockIcon } from "@chakra-ui/icons";
import { useFormContext } from "react-hook-form";

function InputRegister({ type, errors }) {
  const { register } = useFormContext();
  const inputType = {
    name: "Tu nombre",
    email: "Tu email",
    password: "Contraseña",
  };
  const iconStyle = {
    position: "absolute",
    marginLeft: "20px",
  };
  console.log(errors[type]);
  return (
    <Box>
      <Flex alignItems="center">
        {
          {
            email: <EmailIcon style={iconStyle} />,
            name: <InfoIcon style={iconStyle} />,
            password: <LockIcon style={iconStyle} />,
          }[type]
        }

        <Input
          position="relative"
          placeholder={inputType[type]}
          width={{ base: "100%" }}
          paddingLeft="35px"
          fontSize="14px"
          padding={{ base: "10px 50px", lg: "26px 60px" }}
          borderRadius="10px"
          fontWeight="400"
          boxShadow="0px 0px 3px rgba(0,0,0,0.1)"
          _focus={{
            borderColor: errors[type] ? "red" : "none",
          }}
          borderColor={errors[type] ? "red" : "none"}
          {...register(type, { required: true })}
        />
      </Flex>
      <Text>{errors[type] && `${type} is required`}</Text>
    </Box>
  );
}

export default InputRegister;
