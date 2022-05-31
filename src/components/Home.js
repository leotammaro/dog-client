import { Flex } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import Finder from "./Finder";
import Map from "./Map";
import MapContext from "../context/MapContext";
import axios from "axios";
import FormAnimalLost from "./FormAnimalLost";
import AnimalsResults from "./AnimalsResults";

function Home() {
  const [currentBounds, setCurrentBounds] = useState([]);
  const [mapCenter, setMapCenter] = useState([]);
  const [reportsResults, setReportsResults] = useState([]);
  const homeRef = React.useRef(null);
  const [hoverId, setHoverId] = React.useState("");

  const getReports = React.useCallback(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/report`,
      params: {
        upperRight: currentBounds[0]?.join(","),
        bottomLeft: currentBounds[1]?.join(","),
      },
    }).then((response) => setReportsResults(response.data));
  }, [currentBounds, setReportsResults]);

  useEffect(() => {
    if (currentBounds.length !== 0) {
      getReports();
    }
  }, [currentBounds, getReports]);

  useEffect(() => {
    if (homeRef.current.offsetWidth < 970) {
      axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}/report/near`,
        params: {
          lat: mapCenter[0],
          lon: mapCenter[1],
        },
      }).then((response) => {
        setReportsResults(response.data);
      });
    } else {
      if (currentBounds.length !== 0) getReports();
    }
  }, [currentBounds.length, getReports, mapCenter]);

  return (
    <MapContext.Provider
      value={{ currentBounds, setCurrentBounds, mapCenter, setMapCenter }}
    >
      <Flex
        w="100vw"
        padding="0px 10px"
        borderRadius="20px"
        overflow="hidden"
        direction={"column"}
      >
        <FormAnimalLost onSave={getReports} />
        <Finder results={reportsResults} />
        <Flex
          w="100%"
          ref={homeRef}
          justifyContent="center"
          h="100%"
          alignItems={"center"}
        >
          <AnimalsResults results={reportsResults} setHoverId={setHoverId} />
          <Map results={reportsResults} hoverId={hoverId} />
        </Flex>
      </Flex>
    </MapContext.Provider>
  );
}

export default Home;
