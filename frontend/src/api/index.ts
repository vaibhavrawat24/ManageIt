import axios, { AxiosError, type AxiosResponse } from "axios";
import { getUserNamespace } from "@/lib/session";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api",
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const userNamespace = getUserNamespace();
  config.headers["X-User-ID"] = userNamespace;

  if (import.meta.env.DEV) {
    console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
  }

  return config;
});

api.interceptors.response.use(
  (response: AxiosResponse) => response,

  (error: AxiosError) => {
    let message = "Something went wrong";

    if (error.response?.data) {
      const data = error.response.data as Record<string, unknown>;
      if (data.error) {
        message = String(data.error);
      } else if (data.errors) {
        const errors = data.errors;
        message = Array.isArray(errors)
          ? errors.join(", ")
          : typeof errors === "object"
            ? Object.values(errors).flat().join(", ")
            : String(errors) || message;
      } else if (data.message) {
        message = String(data.message);
      }
    } else if (error.message) {
      message = error.message;
    }

    if (import.meta.env.DEV) {
      console.error("[API Error]", {
        url: error.config?.url,
        method: error.config?.method,
        status: error.response?.status,
        data: error.response?.data,
        message,
      });
    }

    return Promise.reject({
      message,
      status: error.response?.status,
      rawError: error,
    });
  },
);

export interface Attendance {
  id: number;
  employee_id: number;
  date: string;
  status: "present" | "absent";
  created_at: string;
}

export interface AttendanceCreate {
  employee_id: number;
  date: string;
  status: "present" | "absent";
}

export default api;
