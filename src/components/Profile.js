import { Box, Flex, Image, Spinner, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import ShowReports from "../service/showReports";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { deleteReport, getReportsByUser } from "../service/reportsService";
import UserContext from "../context/UserContext";
import dogNotFound from "../assets/dog_not_found.png";
import { useLocation } from "react-router-dom";
import axios from "axios";

function Profile() {
  const { userName } = useParams();
  const [reportsByUser, setReportsByUser] = useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [userProfile, setUserProfile] = React.useState(null);

  useEffect(() => {
    setLoading(true);
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/report/${userName}`,
    })
      .then((response) => {
        setUserProfile(response);
        console.log(response);
      })
      .catch((err) => setError("User not Found"));
  }, [userName]);

  useEffect(() => {
    if (userProfile) {
      getReportsByUser(userName).then((response) => {
        setReportsByUser(response.data);
        setError("");
        setLoading(false);
      });
    }
  }, [userProfile, userName]);

  const onDelete = (petData) => {
    const storage = getStorage();
    const desertRef = ref(storage, petData.pet.photoURL);
    const newReports = reportsByUser.filter(
      (reportByUser) => reportByUser._id !== petData._id
    );
    deleteObject(desertRef).then(() => {
      deleteReport(petData._id).then(setReportsByUser(newReports));
    });
  };

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
      {!loading && UserContext ? (
        <Flex direction={"column"} alignItems="center">
          {reportsByUser.length !== 0 ? (
            <>
              <Text fontSize={20} fontWeight="600">
                Reportes realizados por {userName}
              </Text>

              <>
                <Flex alignItems="center" gridGap={3}></Flex>
                <ShowReports
                  reports={reportsByUser}
                  userName={userName}
                  onDelete={onDelete}
                />
              </>
            </>
          ) : (
            <Text fontSize={20}>Este usuario no registra nigun reporte.</Text>
          )}
        </Flex>
      ) : (
        <Spinner />
      )}
    </>
  );
}

export default Profile;
