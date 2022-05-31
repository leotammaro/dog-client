import { EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import {
  Box,
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
  }, [id]);

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
          boxShadow={{ base: "", lg: "0px 0px 35px 2px rgba(0,0,0,0.15)" }}
          direction={{ base: "column", lg: "row" }}
          divider={<StackDivider />}
          h={{ base: 700, lg: 500 }}
          justifyContent="space-between"
          padding={5}
        >
          <Image
            src={src}
            w={{ base: 400, md: 500, lg: 500 }}
            objectFit="cover"
            paddingRight={{ base: 0, lg: 10 }}
          />
          <Flex
            direction={"column"}
            alignItems="center"
            justifyContent={"space-around"}
            padding={{ base: 0, lg: 10 }}
            textAlign="center"
            gridGap={5}
            marginTop={{ base: 10, lg: 0 }}
          >
            <Text
              alignSelf={"center"}
              fontWeight="bold"
              fontSize={{ base: 16, lg: 9 }}
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
                fontSize={{ base: 18, lg: 30 }}
                fontWeight="500"
                flex={{ base: 1, lg: 0.4 }}
              >
                {reportData.pet.type} - {reportData.pet.breed}
              </Text>
              <Text flex={0.4} display={{ base: "none", lg: "block" }}>
                {reportData.description}
              </Text>
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
                  <Text fontSize={{ base: 14, lg: 20 }}>
                    {reportData.location.street}
                  </Text>
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
                  <Text
                    fontSize={{ base: 14, lg: 20 }}
                    textTransform="capitalize"
                  >
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
                  <Text
                    fontSize={{ base: 14, lg: 20 }}
                    textTransform="capitalize"
                  >
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
                  <Text
                    fontSize={{ base: 14, lg: 20 }}
                    textTransform="capitalize"
                  >
                    {reportData.pet.gender}
                  </Text>
                </Box>
              </Flex>
            </Flex>

            <Text fontSize={{ base: 16, lg: 20 }} fontWeight="500">
              Contactate!
            </Text>
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
export default ReportDetail;
