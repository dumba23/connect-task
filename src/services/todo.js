import axios from "@/plugins/axios/axios.js";

export const getTodoList = async () => {
  return await axios.get("/todos");
};
