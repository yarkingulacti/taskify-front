import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

/**
 * A helper class to make API requests with HTTP methods using `axios`
 */
export class ApiHelper {
  /**
   * @constructor
   * @param {string} baseUrl - The base URL for the API
   */
  constructor(baseUrl: string) {
    axios.defaults.baseURL = baseUrl;
  }

  /**
   * A helper function to make a `GET` request to the API using `axios`
   * @param path - The path to the API endpoint
   * @param config - `axios` request configuration object
   * @returns {Promise<AxiosResponse<T>>} The `axios` response object
   */
  async GET<T>(
    path: string,
    config: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return axios.get<T, AxiosResponse<T>>(path, config);
  }

  async POST<T, D>(path: string, data?: D): Promise<AxiosResponse<T>> {
    return axios.post<T, AxiosResponse<T>, D>(path, data);
  }
}
