import { atom } from "recoil";

export const allMessagesAtom = atom({
  key: "allMessagesAtom",
  default: [],
});

export default allMessagesAtom