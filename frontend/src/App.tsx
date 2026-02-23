import { Routes, Route, NavLink } from "react-router-dom";
import EmployeePage from "./pages/EmployeePage";
import AttendancePage from "./pages/AttendancePage";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-xl font-semibold text-slate-800">ManageIt</h1>

            <nav className="flex space-x-8">
              <NavLink
                to="/employees"
                className={({ isActive }) =>
                  `text-sm font-medium ${
                    isActive
                      ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                      : "text-slate-600 hover:text-slate-900"
                  }`
                }
              >
                Employees
              </NavLink>

              <NavLink
                to="/attendance"
                className={({ isActive }) =>
                  `text-sm font-medium ${
                    isActive
                      ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                      : "text-slate-600 hover:text-slate-900"
                  }`
                }
              >
                Attendance
              </NavLink>
            </nav>
          </div>
        </div>
      </header>

      {}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<EmployeePage />} />
          <Route path="/employees" element={<EmployeePage />} />
          <Route path="/attendance" element={<AttendancePage />} />
          {}
          <Route
            path="*"
            element={<div className="p-8 text-center">Page not found</div>}
          />
        </Routes>
      </main>
    </div>
  );
}
