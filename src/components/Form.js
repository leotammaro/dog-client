import { Box, Flex } from "@chakra-ui/layout";
import React from "react";

function Form() {
  return (
    <Flex
      h="calc(100vh - 60px)"
      w="100%"
      alignItems="center"
      justifyContent="center"
      backgroundColor="#D5DAE6"
    >
      <Box borderRadius="40px" w="800px" h="700px" backgroundColor="#fff"></Box>
    </Flex>
  );
}

export default Form;
