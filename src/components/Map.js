import React, { useContext, useEffect } from "react";
import { MapContainer, TileLayer, useMap, useMapEvent } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Box } from "@chakra-ui/layout";
import MapContext from "../context/MapContext";
import AnimalMapData from "./AnimalMapData";

function Component() {
  const { mapCenter, setCurrentBounds } = useContext(MapContext);
  const map = useMap();
  map.doubleClickZoom.disable();

  const setNewBounds = React.useCallback(() => {
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

  useEffect(() => {
    if (mapCenter.length !== 0) {
      map.setView([mapCenter[0], mapCenter[1]]);
    }
  }, [mapCenter])

  useMapEvent("moveend", setNewBounds);

  useEffect(() => {
    const existingCenter = localStorage.getItem("center");
    if (existingCenter) {
      const existingZoom = localStorage.getItem("zoom");
      const latlng = existingCenter.split(",");
      map.setView([latlng[0], latlng[1]], existingZoom || 12);
    } else {
      navigator.geolocation.getCurrentPosition(function (position) {
        map.setView([position.coords.latitude, position.coords.longitude]);
        setNewBounds();
      });
    }
  }, [map, setNewBounds]);

  return <></>;
}

function Map({ results, hoverId }) {
  return (
    <Box
      flex={{ base: "1", lg: "0.5" }}
      h={"calc(100vh - 160px)"}
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
