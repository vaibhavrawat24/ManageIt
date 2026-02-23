import { useState, useEffect, useCallback } from "react";
import api from "@/api";
import type { Employee, ApiError } from "@/types";

interface UseEmployeesReturn {
  employees: Employee[];
  isLoading: boolean;
  error: string | null;
  refreshEmployees: () => Promise<void>;
}

export function useEmployees(): UseEmployeesReturn {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEmployees = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.get("/employees");
      setEmployees(response.data.employees || response.data || []);
    } catch (err: any) {
      const message = err.message || "Failed to load employees";
      setError(message);
      console.error("[useEmployees]", message, err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  return {
    employees,
    isLoading,
    error,
    refreshEmployees: fetchEmployees,
  };
}
