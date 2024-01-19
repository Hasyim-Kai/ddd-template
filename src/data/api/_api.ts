import axios from "axios";
import { config } from "@commons/utils/config";

const api = axios.create({
  baseURL: config.apibaseUrl,
});

api.interceptors.request.use((config) => {
  // object yang diharapkan di setiap project
  /*
    contoh nama project
    nama-project-webadmin
    nama-project-andon
    nama-project-hmi
  */
  /*
    nama-project-webadmin:{
      token: "token1234"
    }
  */
  const localStorageData = localStorage.getItem("nsk_token");
  const auth = localStorageData
    ? JSON.parse(localStorageData)
    : { token: null };
  config.headers["Authorization"] = `Bearer ${auth?.token}`;
  return config;
});

export { api };
