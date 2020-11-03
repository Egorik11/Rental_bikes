import axios from "axios";
const baseUrl =
  process.env.REACT_APP_ENV === "production"
    ? ""
    : process.env.REACT_APP_HOST_API_SERVER_DEV;
export const httpMethod = (url, data, method) => {
  return axios(baseUrl + url, {
    data,
    headers: { "Content-Type": "application/json; charset=utf-8" },
    method,
  })
    .then((res) => res.data)
    .catch((e) => {
      console.log(e);
    });
};
