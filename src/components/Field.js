import { Text } from "@chakra-ui/layout";
import React from "react";

function Field({ error, children, label }) {
  return (
    <div>
      <Text fontWeight="600" fontSize="12px" margin="5px 3px">
        {label}
      </Text>
      {children}
      {error && (
        <Text color="red" fontSize="12px" margin="5px 3px">
          {error}
        </Text>
      )}
    </div>
  );
}

export default Field;
