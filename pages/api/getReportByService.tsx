import { error } from "console";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const apiGetUrl = process.env.NEXT_PUBLIC_API_GET_URL;

export const getReportByService = async (data: string) => {
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
        if (response.status === 404) {
          throw new Error("Not Found");
        } else if (response.status === 500) {
          throw new Error("Internal Server Error");
        } else {
          throw new Error(
            `HTTP error! status: ${response.status} - ${response.statusText}`
          );
        }
      }
      return response.json();
    })
    .then((jsonData) => {
      // console.log("Data fetched successfully:", jsonData);
      return jsonData;
    })
    .catch((error) => console.error(error));
};
