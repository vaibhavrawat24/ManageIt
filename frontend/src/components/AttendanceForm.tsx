import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import api from "@/api";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { useEmployees } from "@/hooks/useEmployees";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const schema = z.object({
  employee_id: z
    .number({ message: "Select an employee" })
    .positive({ message: "Select an employee" }),
  date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" }),
  status: z.enum(["present", "absent"], {
    message: "Select status",
  }),
});

type FormData = z.infer<typeof schema>;

interface AttendanceFormProps {
  selectedEmployeeId: number | null;
  setSelectedEmployeeId: (id: number | null) => void;
  onSuccess: () => void;
}

export default function AttendanceForm({
  selectedEmployeeId,
  setSelectedEmployeeId,
  onSuccess,
}: AttendanceFormProps) {
  const { employees, isLoading: employeesLoading } = useEmployees();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      status: "present",
    },
  });

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (selectedEmployeeId !== null) {
      setValue("employee_id", selectedEmployeeId);
    }
  }, [selectedEmployeeId, setValue]);

  const onSubmit = async (data: FormData) => {
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      await api.post("/attendance", data);
      reset();
      toast.success("Attendance marked successfully");
      onSuccess();
    } catch (err: any) {
      const message = err.response?.data?.error || "Failed to mark attendance";
      setSubmitError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-lg font-semibold text-slate-800 mb-6">
        Mark Attendance
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Select
          label="Employee"
          error={errors.employee_id?.message}
          value={selectedEmployeeId ?? ""}
          onChange={(e) => {
            const id = Number(e.target.value);
            setSelectedEmployeeId(isNaN(id) ? null : id);
          }}
          disabled={employeesLoading}
        >
          <option value="">Select employee</option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.full_name} ({emp.employee_id})
            </option>
          ))}
        </Select>

        <Input
          label="Date"
          type="date"
          error={errors.date?.message}
          {...register("date")}
        />

        <Select
          label="Status"
          error={errors.status?.message}
          {...register("status")}
        >
          <option value="present">Present</option>
          <option value="absent">Absent</option>
        </Select>

        {submitError && (
          <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-md">
            {submitError}
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          size="md"
          className="w-full"
          loading={isSubmitting}
          disabled={isSubmitting || !selectedEmployeeId}
        >
          Mark Attendance
        </Button>
      </form>
    </div>
  );
}
