const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const apiGetUrl = process.env.NEXT_PUBLIC_API_GET_URL;

export const getRiskProbCons = async (serviceName: string) => {
  try {
    const endpointURL = `/api/get/risk-probability-consequence?service=${encodeURIComponent(
      serviceName
    )}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(endpointURL, options);

    if (!response.ok) {
      throw new Error(`HTTP error, status = ${response.status}`);
    }

    // Parse JSON data directly
    const jsonData = await response.json();
    console.log("Data fetched successfully:", jsonData);

    return jsonData;
  } catch (error) {
    console.error("Error fetching risk categories:", error);
    throw error;
  }
};
