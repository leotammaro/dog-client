import { Box, Flex, Text } from "@chakra-ui/layout";
import React from "react";
import "./resultsbar.css";
import AnimalResult from "./AnimalResult";
import { Image } from "@chakra-ui/react";
import dogNotFound from "../assets/dog_not_found.png";

function AnimalsResults({ results, setHoverId }) {
  return (
    <Box
      height="100%"
      overflow="scroll"
      className="results-container"
      flex={{ base: "1", lg: "0.5" }}
      h="calc(100vh - 140px)"
      justifyContent="center"
      display={{ base: "none", lg: "flex" }}
    >
      {results?.length !== 0 ? (
        results?.map((dog, i) => {
          return (
            <AnimalResult petData={dog} setHoverId={setHoverId} key={dog._id} />
          );
        })
      ) : (
        <Flex
          textAlign="center"
          h="100%"
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Image src={dogNotFound} w={100} />
          <Text fontSize="20px">
            No se han encontrado perros perdidos por esta zona!
          </Text>
        </Flex>
      )}
    </Box>
  );
}

export default AnimalsResults;