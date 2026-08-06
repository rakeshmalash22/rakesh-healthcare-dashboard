import axios from "axios";

const API = axios.create({
  baseURL: "https://fedskillstest.coalitiontechnologies.workers.dev",
  auth: {
    username: "coalition",
    password: "skills-test",
  },
});

export default API;