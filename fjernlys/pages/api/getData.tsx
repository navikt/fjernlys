import { error } from "console";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const apiGetUrl = process.env.NEXT_PUBLIC_API_GET_URL;

export const getData = async (data: string) => {
  const endpointURL = `${apiBaseUrl}${apiGetUrl}/reports?service=${encodeURIComponent(
    data
  )}`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch(endpointURL, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Http error, status = ${response.status}`);
      }
      return response.json();
    })
    .then((jsonData) => {
      // console.log("Data fetched successfully:", jsonData);
      return jsonData;
    })
    .catch((error) => console.error(error));
};
