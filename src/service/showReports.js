import { Text, Flex } from "@chakra-ui/react";
import React from "react";
import DogResult from "../components/DogResult";

function ShowReports({ reports, onDelete, userName }) {
  return (
    <Flex justifyContent="center" alignItems="center" direction="column">
      {reports &&
        reports.map((report, index) => {
          return (
            <DogResult
              petData={report}
              key={report._id}
              onDelete={onDelete}
              userName={userName}
            />
          );
        })}
    </Flex>
  );
}

export default ShowReports;
