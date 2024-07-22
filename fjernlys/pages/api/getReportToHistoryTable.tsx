const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const apiGetUrl = process.env.NEXT_PUBLIC_API_GET_URL;

export const getReportCopyToHistoryTable = async (id: string) => {
  const endpointURL = `${apiBaseUrl}${apiGetUrl}/history?id=${encodeURIComponent(
    id
  )}`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return (
    fetch(endpointURL, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Http error, status = ${response.status}`);
        }
      })
      //   .then((jsonData) => {
      //     // console.log("Data fetched successfully:", jsonData);
      //     return jsonData;
      //   })
      .catch((error) => console.error(error))
  );
};
