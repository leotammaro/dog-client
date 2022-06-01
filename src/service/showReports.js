import { Flex } from "@chakra-ui/react";
import React from "react";
import AnimalResult from "../components/AnimalResult";

function ShowReports({ reports, onDelete, userName }) {
  return (
    <Flex justifyContent="center" alignItems="center" direction="column">
      {reports &&
        reports.map((report) => {
          return (
            <AnimalResult
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
