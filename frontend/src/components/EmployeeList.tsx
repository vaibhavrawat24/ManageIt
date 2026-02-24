import { useEmployees } from "@/hooks/useEmployees";
import { format } from "date-fns";
import { Button } from "@/components/ui/Button";
import api from "@/api";
import toast from "react-hot-toast";

export default function EmployeeList() {
  const { employees, refreshEmployees } = useEmployees();

  const handleDeleteEmployee = async (id: number, name: string) => {
    if (
      !window.confirm(
        `Delete employee "${name}" and all their attendance records?`,
      )
    ) {
      return;
    }

    try {
      await api.delete(`/employees/${id}`);
      toast.success("Employee deleted");
      refreshEmployees();
    } catch (err: any) {
      toast.error(err.message || "Failed to delete employee");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-100">
          <thead>
            <tr className="bg-slate-50">
              <th className="px-6 py-3.5 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3.5 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3.5 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3.5 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Department
              </th>
              <th className="px-6 py-3.5 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Added
              </th>
              <th className="px-6 py-3.5 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {employees.map((emp) => (
              <tr
                key={emp.id}
                className="hover:bg-slate-50/70 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                  {emp.employee_id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                  {emp.full_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  {emp.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  {emp.department}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                  {format(new Date(emp.created_at), "MMM d, yyyy")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteEmployee(emp.id, emp.full_name)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
