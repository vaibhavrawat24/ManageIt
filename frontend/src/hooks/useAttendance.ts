import { useState, useEffect, useCallback } from "react";
import api from "@/api";
import type { Attendance } from "@/types";

interface UseAttendanceProps {
  selectedEmployeeId: number | null;
  refreshTrigger: number;
}

export function useAttendance({
  selectedEmployeeId,
  refreshTrigger,
}: UseAttendanceProps) {
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshAttendance = useCallback(async () => {
    if (!selectedEmployeeId) {
      setAttendance([]);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await api.get("/attendance", {
        params: { employee_id: selectedEmployeeId },
      });
      setAttendance(res.data.attendance || []);
    } catch (err: any) {
      setError(err.message || "Failed to load attendance");
    } finally {
      setIsLoading(false);
    }
  }, [selectedEmployeeId]);

  useEffect(() => {
    refreshAttendance();
  }, [refreshAttendance, refreshTrigger]);

  return {
    attendance,
    isLoading,
    error,
    refreshAttendance,
  };
}
