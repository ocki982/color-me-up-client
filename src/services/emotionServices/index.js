import { unAuthAxiosCall } from "../";

// Makes the request to the emotions endpoint to get back
// the color for that emotion
export const getEmotion = async (text) => {
  return unAuthAxiosCall("/emotions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
        text
    }
  });
};

