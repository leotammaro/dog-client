import { Box, Image, Spinner, Text } from "@chakra-ui/react";
import React from "react";
import { Marker, Popup } from "react-leaflet";
import { addDownloadURL } from "../service/getImagesFromStorage";
import L from "leaflet";
import MarkerIcon from "../assets/marker.svg";

function AnimalMapData({ reportResult, hoverId }) {
  const markerIcon = L.icon({
    iconUrl: MarkerIcon,
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
  });
  const [src, setSrc] = React.useState("");

  const loadImage = React.useCallback(() => {
    if (reportResult)
      addDownloadURL(reportResult.pet.photoURL).then(async (imageURL) => {
        await setSrc(imageURL);
      }, []);
  }, [reportResult]);

  const reportData = () => {
    window.open(`/report/${reportResult._id}`, "_blank");
  };

  return (
    <>
      {reportResult && (
        <Box onClick={reportData}>
          <Marker
            position={reportResult.location.loc.coordinates}
            icon={markerIcon}
            opacity={hoverId === reportResult._id ? 1 : 0.6}
          >
            <Popup onOpen={loadImage}>
              <Box w={150} _hover={{ cursor: "pointer" }}>
                {!src ? <Spinner /> : <Image src={src} objectFit="contain" />}
                <Text fontSize={20} textTransform={"capitalize"}>
                  {reportResult.description}
                </Text>
              </Box>
            </Popup>
          </Marker>
        </Box>
      )}
    </>
  );
}

export default AnimalMapData;
