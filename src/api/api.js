import axios from "axios";

const API = axios.create({
  baseURL: "https://team-task-manager-backend-production-2b31.up.railway.app/api"
});

export default API;