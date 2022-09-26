const API_END_POINT = "https://ab180-sdk-coding-assignment.vercel.app";

const request = async (url: string, options?: Record<string, string | Object>) => {
  const response = await fetch(`${API_END_POINT}${url}`, options);

  if (!response.ok) {
    throw new Error("api 에러");
  }

  const data = response.json();

  console.log(data);

  return data;
};

export const fetchTrackEvent = async (category: string, action?: string) => {
  const data = await request("/api/track-event", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    data: {
      category,
      action,
    },
  });

  console.log(data);
};
