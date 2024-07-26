const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const apiGetUrl = process.env.NEXT_PUBLIC_API_GET_URL;

export const getRiskProbCons = async () => {
  try {
    const endpointURL = `${apiBaseUrl}${apiGetUrl}/risk-probability-consequence`;
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
    return jsonData;
  } catch (error) {
    console.error("Error fetching risk categories:", error);
    throw error; // Re-throw the error if you need to handle it further up the chain
  }
};
