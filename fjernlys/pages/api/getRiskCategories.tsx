const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const apiGetUrl = process.env.NEXT_PUBLIC_API_GET_URL;

export const getRiskCategories = async () => {
  try {
    const endpointURL = `${apiBaseUrl}${apiGetUrl}/risk-category`;
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

    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error("Error fetching risk categories:", error);
    throw error;
  }
};
