import { Box, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import React, { Children } from "react";

function TextResults({ children }) {
  return (
    <Box>
      <Text></Text>
      <UnorderedList>
        <ListItem></ListItem>
        <ListItem></ListItem>
        <ListItem></ListItem>
        <ListItem></ListItem>
      </UnorderedList>
    </Box>
  );
}

export default TextResults;
