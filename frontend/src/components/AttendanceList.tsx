import { format } from "date-fns";
import { Button } from "@/components/ui/Button";
import { useAttendance } from "@/hooks/useAttendance";

interface AttendanceListProps {
  selectedEmployeeId: number | null;
  refreshTrigger: number;
}

export default function AttendanceList({
  selectedEmployeeId,
  refreshTrigger,
}: AttendanceListProps) {
  const { attendance, isLoading, error, refreshAttendance } = useAttendance({
    selectedEmployeeId,
    refreshTrigger,
  });

  if (!selectedEmployeeId) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center text-slate-500">
        Select an employee from the form to view their attendance
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 w-64 bg-slate-200 rounded"></div>
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-12 bg-slate-50 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center">
        <p className="text-red-600 mb-4">{error}</p>
        <Button variant="primary" size="sm" onClick={refreshAttendance}>
          Retry
        </Button>
      </div>
    );
  }

  if (!attendance.length) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center text-slate-500">
        No attendance records yet for this employee
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
        <h3 className="text-lg font-medium text-slate-800">
          Attendance Records
        </h3>
        <Button variant="secondary" size="sm" onClick={refreshAttendance}>
          Refresh
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-100">
          <thead>
            <tr className="bg-slate-50">
              <th className="px-6 py-3.5 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3.5 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3.5 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Marked At
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {attendance.map((record) => (
              <tr
                key={record.id}
                className="hover:bg-slate-50/70 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                  {format(new Date(record.date), "MMM d, yyyy")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      record.status === "present"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {record.status === "present" ? "Present" : "Absent"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                  {format(new Date(record.created_at), "MMM d, yyyy • HH:mm")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
