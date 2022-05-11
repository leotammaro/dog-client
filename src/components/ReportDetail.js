import { EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Image,
  Spinner,
  Stack,
  StackDivider,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { addDownloadURL } from "../service/getImagesFromStorage";
import dogNotFound from "../assets/dog_not_found.png";

function ReportDetail() {
  const { id } = useParams();
  const [reportData, setReportData] = React.useState(null);
  const [src, setSrc] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [userReportData, setUserReportData] = React.useState({});
  const [error, setError] = React.useState("");

  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/report/detail/${id}`,
    })
      .then((response) => {
        setReportData(response.data);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          setError("Report not found");
        }
      })
      .finally(() => setLoading(false));
  }, []);

  console.log(reportData);

  useEffect(() => {
    if (reportData) {
      axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}/report/user/${reportData.user}`,
      }).then((response) => setUserReportData(response.data));
    }
  }, [reportData]);

  useEffect(() => {
    if (reportData)
      addDownloadURL(reportData.pet.photoURL)
        .then(async (imageURL) => {
          await setSrc(imageURL);
        })
        .then(setLoading(false));
  }, [reportData]);

  if (error !== "") {
    return (
      <Box>
        <Image src={dogNotFound} h={40} />
        <Text>{error}</Text>
      </Box>
    );
  }

  return (
    <>
      {!loading && src !== "" ? (
        <Stack
          boxShadow="0px 0px 35px 2px rgba(0,0,0,0.15)"
          direction="row"
          divider={<StackDivider />}
          h={600}
        >
          <Image src={src} w={600} objectFit="cover" paddingRight={10} />
          <Flex
            direction={"column"}
            alignItems="center"
            justifyContent={"space-around"}
            w={600}
            padding={10}
            textAlign="center"
          >
            <Text
              alignSelf={"center"}
              fontWeight="bold"
              fontSize={9}
              textTransform="uppercase"
              paddingBottom={5}
            >
              Detalle del reporte
            </Text>
            <Flex
              alignItems={"center"}
              w="100%"
              justifyContent={"space-around"}
              marginBottom={10}
            >
              <Text
                textTransform="capitalize"
                fontSize={30}
                fontWeight="600"
                flex={0.4}
              >
                {reportData.pet.type} - {reportData.pet.breed}
              </Text>
              <Text flex={0.4}>{reportData.description}</Text>
            </Flex>
            <Flex direction={"column"} gridGap={4} w="100%">
              <Flex justifyContent={"space-around"}>
                <Box flex={0.4}>
                  <Text
                    color={"gray.500"}
                    fontWeight="600"
                    textTransform={"uppercase"}
                    fontSize={11}
                  >
                    Calle
                  </Text>
                  <Text fontSize={20}>{reportData.location.street}</Text>
                </Box>
                <Box flex={0.4}>
                  <Text
                    color={"gray.500"}
                    fontWeight="600"
                    textTransform={"uppercase"}
                    fontSize={11}
                  >
                    Ciudad
                  </Text>
                  <Text fontSize={20} textTransform="capitalize">
                    {reportData.location.city}
                  </Text>
                </Box>
              </Flex>
              <Flex justifyContent={"space-around"}>
                <Box flex={0.4}>
                  <Text
                    color={"gray.500"}
                    fontWeight="600"
                    textTransform={"uppercase"}
                    fontSize={11}
                  >
                    Tamaño
                  </Text>
                  <Text fontSize={20} textTransform="capitalize">
                    {reportData.pet.size}
                  </Text>
                </Box>
                <Box flex={0.4}>
                  <Text
                    color={"gray.500"}
                    fontWeight="600"
                    textTransform={"uppercase"}
                    fontSize={11}
                  >
                    Genero
                  </Text>
                  <Text fontSize={20} textTransform="capitalize">
                    {reportData.pet.gender}
                  </Text>
                </Box>
              </Flex>
            </Flex>

            <Flex w="100%" justifyContent={"center"} gridGap={8}>
              <Tooltip hasArrow label={reportData.phoneNumber} fontSize="md">
                <PhoneIcon />
              </Tooltip>

              <Tooltip hasArrow label={userReportData.email} fontSize="md">
                <EmailIcon />
              </Tooltip>
            </Flex>
          </Flex>
        </Stack>
      ) : (
        <Spinner />
      )}
    </>
  );
}
/*
<Flex w="100%" justifyContent={"space-around"}>
              <Flex direction={"column"} flex={0.4}>
                <Box>
                  <Text
                    color={"gray.500"}
                    fontWeight="600"
                    textTransform={"uppercase"}
                    fontSize={11}
                  >
                    Street
                  </Text>
                  <Text fontSize={24}>{reportData.location.street}</Text>
                </Box>
                <Box>
                  <Text
                    color={"gray.500"}
                    fontWeight="600"
                    textTransform={"uppercase"}
                    fontSize={11}
                  >
                    Type
                  </Text>
                  <Text fontSize={24}>{reportData.pet.type}</Text>
                </Box>
                <Box>
                  <Text
                    color={"gray.500"}
                    fontWeight="600"
                    textTransform={"uppercase"}
                    fontSize={11}
                  >
                    Size
                  </Text>
                  <Text fontSize={24}>{reportData.pet.size}</Text>
                </Box>
              </Flex>
              <Flex direction={"column"} flex={0.4}>
                <Box>
                  <Text
                    color={"gray.500"}
                    fontWeight="600"
                    textTransform={"uppercase"}
                    fontSize={11}
                  >
                    City
                  </Text>
                  <Text fontSize={24}>{reportData.location.city}</Text>
                </Box>
                <Box>
                  <Text
                    color={"gray.500"}
                    fontWeight="600"
                    textTransform={"uppercase"}
                    fontSize={11}
                  >
                    Gender
                  </Text>
                  <Text fontSize={24}>{reportData.pet.gender}</Text>
                </Box>
                <Box>
                  <Text
                    color={"gray.500"}
                    fontWeight="600"
                    textTransform={"uppercase"}
                    fontSize={11}
                  >
                    Weight
                  </Text>
                  <Text fontSize={24}>{reportData.pet.weight}</Text>
                </Box>
              </Flex>
            </Flex>*/

export default ReportDetail;
