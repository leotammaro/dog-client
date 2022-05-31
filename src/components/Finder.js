/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@chakra-ui/button";
import { Text } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Input } from "@chakra-ui/input";
import { Flex } from "@chakra-ui/layout";
import React, { useContext, useState, useEffect } from "react";
import MapContext from "../context/MapContext";
import { geoCordsfromAdress } from "../service/geolocation";

function Finder() {
  const [search, setSearch] = useState("");
  const [formResults, setFormResults] = useState("");
  const { setMapCenter } = useContext(MapContext);
  const [messageErrorAdress, setMessageErrorAdress] = React.useState("");

  const valueInput = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    async function setCords() {
      const resultsAdressSearch = await geoCordsfromAdress(formResults);
      if (resultsAdressSearch.length !== 0) {
        const { lat, lon } = resultsAdressSearch[0];
        setMessageErrorAdress("");
        setMapCenter([lat, lon]);
      } else {
        setMessageErrorAdress("Invalid Adress");
      }
    }
    if (formResults !== "") setCords();
  }, [formResults]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setMapCenter([position.coords.latitude, position.coords.longitude]);
    });
  }, []);

  return (
    <Flex
      direction="column"
      alignItems="center"
      h={"100px"}
      justifyContent="flex-start"
      padding={5}
    >
      <Flex position="relative" alignItems={"center"} h={50}>
        <Input
          marginRight="10px"
          placeholder="Calle, zona, ciudad..."
          onChange={valueInput}
          value={search}
          borderRadius="20px"
          fontSize={{ base: "12px", md: "16px" }}
          w={400}
          paddingY={6}
          _focus={{ outline: "none" }}
        ></Input>
        <Button
          backgroundColor="#000"
          opacity="0.9"
          borderRadius="20px"
          justifyContent="space-between"
          _focus={{ outline: "none" }}
          _hover={{ opacity: "1" }}
          onClick={() => setFormResults(search)}
          color="white"
          position={"absolute"}
          left={"345px"}
        >
          <SearchIcon h="15px" boxSizing="content-box" />
        </Button>
      </Flex>
      <Text fontSize={10} color="red">
        {messageErrorAdress}
      </Text>
    </Flex>
  );
}

export default Finder;
