import EmployeeForm from "@/components/EmployeeForm";
import EmployeeList from "@/components/EmployeeList";

export default function EmployeePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-semibold text-slate-800 mb-6">Employees</h2>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 xl:col-span-3">
          <EmployeeForm onSuccess={() => window.location.reload()} />
        </div>
        <div className="lg:col-span-8 xl:col-span-9">
          <EmployeeList />
        </div>
      </div>
    </div>
  );
}
