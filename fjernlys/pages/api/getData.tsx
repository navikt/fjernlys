const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const apiGetUrl = process.env.NEXT_PUBLIC_API_GET_URL;

export const getData = async (data: string) => {
  const endpointURL = `${apiBaseUrl}${apiGetUrl}/reports?service=${encodeURIComponent(
    data
  )}`;

  try {
    const res = await fetch(endpointURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status} - ${res.statusText}`);
    }

    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Error during fetch operation:", error);
  }
};
