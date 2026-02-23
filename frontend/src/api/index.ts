import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5000/api",
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.error || error.message || "Something went wrong";
    console.error("[API Error]", message);
    return Promise.reject({ message, status: error.response?.status });
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
