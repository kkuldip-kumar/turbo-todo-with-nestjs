import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:4048/",
  headers: {
    "Content-type": "application/json",
  },
});
