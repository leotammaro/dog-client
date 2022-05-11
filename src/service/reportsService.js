import axios from "axios";

export const deleteReport = (id) => {
  return axios({
    method: "delete",
    url: `${process.env.REACT_APP_API_URL}/report`,
    data: { id: id },
  });
};

export const getReportsByUser = (userName) => {
  return axios({
    method: "get",
    url: `${process.env.REACT_APP_API_URL}/report/${userName}`,
  });
};

export const createReport = (user, datetime, location, description, pet) => {
  return axios({
    method: "post",
    url: `${process.env.REACT_APP_API_URL}/report`,
    data: {
      datetime,
      location,
      description,
      pet,
    },
    headers: {
      Authorization: user.accessToken,
    },
  });
};
