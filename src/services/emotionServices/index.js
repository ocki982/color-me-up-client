import { unAuthAxiosCall } from "../";

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

