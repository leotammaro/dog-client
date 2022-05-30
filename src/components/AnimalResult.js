import { Image, Flex, Text, Box, Spinner } from "@chakra-ui/react";
import React, { useState, useEffect, useContext } from "react";
import { addDownloadURL } from "../service/getImagesFromStorage";
import moment from "moment";
import deleteIcon from "../assets/delete.svg";
import UserContext from "../context/UserContext";

function AnimalResult({ petData, userName, setHoverId, onDelete }) {
  const [src, setSrc] = useState("");
  const [loading, setLoading] = useState(true);
  const user = useContext(UserContext);

  const reportData = () => {
    window.open(`/report/${petData._id}`, "_blank");
  };

  useEffect(() => {
    addDownloadURL(petData.pet.photoURL).then(async (imageURL) => {
      await setSrc(imageURL);
      setLoading(false);
    });
  }, []);

  const handleMouseEnter = React.useCallback(() => {
    setHoverId?.(petData._id);
  }, []);

  const handleMouseLeave = React.useCallback(() => {
    setHoverId?.("");
  }, []);

  return (
    <Flex
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      marginBottom={5}
    >
      {loading ? (
        <Flex
          h={200}
          w={{ base: 400, lg: 700 }}
          justifyContent="center"
          alignItems={"center"}
        >
          <Spinner />
        </Flex>
      ) : (
        <Flex
          marginTop={{ base: 10, lg: 0 }}
          borderBottom="1px solid #ECECEC"
          paddingY={10}
        >
          <Image
            src={src}
            marginRight={5}
            w={{ base: 300, lg: 400 }}
            h={200}
            borderRadius={5}
            objectFit={"cover"}
            onClick={reportData}
            cursor="pointer"
            boxShadow={"5px 4px 5px -1px rgba(158,158,158,0.75)"}
          />
          <Flex w={400} direction="column" justifyContent={"space-between"}>
            <Flex direction={"column"} gridGap={5} fontSize={18}>
              <Text textTransform="capitalize">{`${petData.pet.type} - ${petData.pet.breed}`}</Text>
              <Text>
                Encontrado el dia: {moment(petData.datetime).format("ll")}
              </Text>
              <Text>
                Encontrado en: {petData.location.street},{" "}
                {petData.location.city}
              </Text>
            </Flex>
            {user?.email.split("@")[0] === userName && (
              <Image
                alignSelf={"flex-end"}
                marginRight={10}
                src={deleteIcon}
                opacity={0.5}
                _hover={{ opacity: 1 }}
                h={6}
                w={6}
                cursor="pointer"
                onClick={() => onDelete(petData)}
              />
            )}
          </Flex>
        </Flex>
      )}
    </Flex>
  );
}

export default AnimalResult;
