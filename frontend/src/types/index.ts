export interface Employee {
  id: number;
  employee_id: string;
  full_name: string;
  email: string;
  department: string;
  created_at: string;
}

export interface EmployeeCreate {
  employee_id: string;
  full_name: string;
  email: string;
  department: string;
}

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

export interface ApiError {
  message: string;
  status?: number;
}
