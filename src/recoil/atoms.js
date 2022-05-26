import { atom } from "recoil";

// Function to work with recoil and make global states on the page
export const allMessagesAtom = atom({
  key: "allMessagesAtom",
  default: [],
});

export default allMessagesAtom