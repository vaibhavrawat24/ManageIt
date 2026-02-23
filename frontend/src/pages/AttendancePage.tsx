import AttendanceForm from "@/components/AttendanceForm";
import AttendanceList from "@/components/AttendanceList";
import { useState } from "react";

export default function AttendancePage() {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(
    null,
  );
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleRefresh = () => setRefreshTrigger((prev) => prev + 1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-semibold text-slate-800 mb-6">Attendance</h2>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 xl:col-span-3">
          <AttendanceForm
            selectedEmployeeId={selectedEmployeeId}
            setSelectedEmployeeId={setSelectedEmployeeId}
            onSuccess={handleRefresh}
          />
        </div>
        <div className="lg:col-span-8 xl:col-span-9">
          <AttendanceList
            selectedEmployeeId={selectedEmployeeId}
            refreshTrigger={refreshTrigger}
          />
        </div>
      </div>
    </div>
  );
}
