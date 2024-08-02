const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const apiGetUrl = process.env.NEXT_PUBLIC_API_GET_URL;

export const getRiskLevels = async (data: string) => {
  const endpointURL = `/api/get/risk-levels?service=${encodeURIComponent(
    data
  )}`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetch(endpointURL, options)
    .then((res) => {
      if (!res.ok) {
        if (res.status === 404) {
          throw new Error("Not Found");
        } else if (res.status === 500) {
          throw new Error("Internal Server Error");
        } else {
          throw new Error(
            `HTTP error! status: ${res.status} - ${res.statusText}`
          );
        }
      }
      return res.json();
    })
    .then((jsonData) => {
      // console.log("Data fetched successfully:", jsonData);
      return jsonData;
    })
    .catch((error) => console.error(error));
};
