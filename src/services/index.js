import axios from "axios";
import { camelizeKeys, decamelizeKeys } from "humps";

/**
 * An Axios instance dedicated to communication with Rick and Morty API
 * See documentation at https://rickandmortyapi.com/documentation
 **/

const baseURL =
  import.meta.env.VITE_RICK_MORTY_API_URL || "https://rickandmortyapi.com/api/";

export const rickAndMortyAPI = axios.create({ baseURL });

// Axios middleware to convert all api responses to camelCase
rickAndMortyAPI.interceptors.response.use((response) => {
  const isJSON = response.headers["content-type"].includes("application/json");
  if (isJSON) {
    response.data = camelizeKeys(response.data);
  }
  return response;
});

// Axios middleware to convert all api requests to snake_case
rickAndMortyAPI.interceptors.request.use((config) => {
  const newConfig = { ...config };

  if (config.params) {
    newConfig.params = decamelizeKeys(config.params);
  }

  if (config.data) {
    newConfig.data = decamelizeKeys(config.data);
  }

  return newConfig;
});
