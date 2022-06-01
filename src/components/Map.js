import React, { useContext, useEffect } from "react";
import { MapContainer, TileLayer, useMap, useMapEvent } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Box } from "@chakra-ui/layout";
import MapContext from "../context/MapContext";
import AnimalMapData from "./AnimalMapData";

function Component() {
  const { setCurrentBounds } = useContext(MapContext);
  const map = useMap();

  const setNewBouds = React.useCallback(() => {
    const { _northEast, _southWest } = map.getBounds();
    setCurrentBounds([
      [_northEast.lat, _northEast.lng],
      [_southWest.lat, _southWest.lng],
    ]);
    localStorage.setItem(
      "center",
      `${map.getCenter().lat},${map.getCenter().lng}`
    );
    localStorage.setItem("zoom", map.getZoom());
  }, [map, setCurrentBounds]);

  useMapEvent("moveend", setNewBouds);

  useEffect(() => {
    const existingCenter = localStorage.getItem("center");
    if (existingCenter) {
      const existingZoom = localStorage.getItem("zoom");
      const latlng = existingCenter.split(",");
      map.setView([latlng[0], latlng[1]], existingZoom || 12);
    } else {
      navigator.geolocation.getCurrentPosition(function (position) {
        map.setView([position.coords.latitude, position.coords.longitude]);
        setNewBouds();
      });
    }
  }, [map, setNewBouds]);

  return <></>;
}

function Map({ results, hoverId }) {
  // eslint-disable-next-line no-unused-vars

  return (
    <Box
      flex={{ base: "1", lg: "0.5" }}
      h={{ base: "calc(100vh - 180px)", lg: "calc(100vh - 140px)" }}
    >
      <MapContainer
        center={[-34.6194586, -58.4510539]}
        zoom={12}
        style={{
          height: "100%",
          flex: "1",
          borderRadius: "20px",
        }}
      >
        <Component />
        <TileLayer url="https://api.mapbox.com/styles/v1/tammaroivan/ckw0z68ul9ayg14ujo394a0lo/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoidGFtbWFyb2l2YW4iLCJhIjoiY2trazhvN2oyMTVnZDJucGczazM4emdscyJ9.T4aK0C48vrmOWMD8DKjzMw" />
        {results &&
          results.map((reportResult) => (
            <AnimalMapData
              reportResult={reportResult}
              key={reportResult._id}
              hoverId={hoverId}
            />
          ))}
      </MapContainer>
    </Box>
  );
}

export default Map;
