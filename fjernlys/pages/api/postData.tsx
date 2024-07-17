const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const apiPostUrl = process.env.NEXT_PUBLIC_API_POST_URL;

export const postData = async (data: any) => {
  const endpointURL = `${apiBaseUrl}${apiPostUrl}`;

  try {
    const res = await fetch(endpointURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status} - ${res.statusText}`);
    }

    const result = await res.json();
    return result;
  } catch (error: any) {
    console.error("Error during fetch operation:", error);
    throw new Error(`Fetch error: ${error.message}`);
  }
};