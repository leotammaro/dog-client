import { Box, Flex, Text } from "@chakra-ui/layout";
import React from "react";
import "./resultsbar.css";
import DogResult from "../components/DogResult";
import { Image } from "@chakra-ui/react";
import dogNotFound from "../assets/dog_not_found.png";

function DogsResults({ results, setHoverId }) {
  return (
    <Box
      height="100%"
      overflow="scroll"
      className="results-container"
      flex={{ base: "1", lg: "0.5" }}
      h="calc(100vh - 140px)"
      justifyContent="center"
    >
      {results?.length !== 0 ? (
        results?.map((dog, i) => {
          return (
            <DogResult petData={dog} setHoverId={setHoverId} key={dog._id} />
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

export default DogsResults;
