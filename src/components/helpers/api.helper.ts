import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { Icons, toast } from "react-toastify";
import { PaginationResponse } from "../pagination/type";
import { TaskCreateModel, TaskModel } from "../../models/task.model";

/**
 * A helper class to make API requests with HTTP methods using `axios`
 */
export class ApiHelper {
  /**
   * @constructor
   * @param {string} baseUrl - The base URL for the API
   */
  constructor() {
    axios.defaults.baseURL = import.meta.env.VITE_API_URL as string;
  }

  /**
   * A helper function to make a `GET` request to the API using `axios`
   * @param path - The path to the API endpoint
   * @param config - `axios` request configuration object
   * @returns {Promise<AxiosResponse<T>>} The `axios` response object
   */
  private async GET<T>(
    path: string,
    config: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return axios.get<T, AxiosResponse<T>>(
      path,
      Object.keys(config).length ? config : undefined
    );
  }

  private async POST<T, D>(path: string, data?: D): Promise<AxiosResponse<T>> {
    return axios.post<T, AxiosResponse<T>, D>(path, data);
  }

  async listTasks(pageSize: number, currentPage: number) {
    return this.GET<PaginationResponse<TaskModel>>("/task", {
      params: {
        take: pageSize,
        skip: (currentPage - 1) * pageSize,
      },
    }).catch((error) => {
      toast(`${error}`, {
        icon: Icons.error,
        closeOnClick: false,
        autoClose: 2500,
        type: "error",
      });

      return {
        data: {
          items: [],
          meta: {
            currentPage: 0,
            totalPages: 0,
            currentPageSize: 0,
            totalItemsCount: 0,
          },
        },
      };
    });
  }

  async createTask(data: TaskCreateModel) {
    return this.POST<TaskModel, TaskCreateModel>("/task", data).catch(
      (error) => {
        if (error.response) {
          toast(
            `${[...(error.response.data.message?.message ?? [])].join(",")}`,
            {
              icon: Icons.error,
              closeOnClick: false,
              autoClose: 2500,
              type: "error",
            }
          );
        } else {
          toast(`${error.message}`, {
            icon: Icons.error,
            closeOnClick: false,
            autoClose: 2500,
            type: "error",
          });
        }
      }
    );
  }

  async taskDetail(id: string) {
    try {
      return this.GET<TaskModel>(`/task/${id}`, {});
    } catch (error) {
      toast(`${error}`, {
        icon: Icons.error,
        closeOnClick: false,
        autoClose: 2500,
        type: "error",
      });
    }
  }
}
