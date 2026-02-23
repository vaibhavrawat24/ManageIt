import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import api from "@/api";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { useState } from "react";
import toast from "react-hot-toast";

const schema = z.object({
  employee_id: z.string().min(3, "Min 3 characters").max(20),
  full_name: z.string().min(2).max(100),
  email: z.string().email("Invalid email"),
  department: z.enum([
    "Engineering",
    "Marketing",
    "HR",
    "Finance",
    "Operations",
    "Sales",
  ]),
});

type FormData = z.infer<typeof schema>;

interface Props {
  onSuccess: () => void;
}

export default function EmployeeForm({ onSuccess }: Props) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setError(null);
    setLoading(true);
    try {
      await api.post("/employees", data);
      reset();
      toast.success("Employee added successfully");
      onSuccess();
    } catch (err: any) {
      const message = err.response?.data?.error || "Failed to add employee";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-lg font-semibold text-slate-800 mb-6">
        Add Employee
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input
          label="Employee ID"
          placeholder="EMP001"
          error={errors.employee_id?.message}
          {...register("employee_id")}
        />

        <Input
          label="Full Name"
          placeholder="Vaibhav Singh"
          error={errors.full_name?.message}
          {...register("full_name")}
        />

        <Input
          label="Email"
          type="email"
          placeholder="vaibhav@example.com"
          error={errors.email?.message}
          {...register("email")}
        />

        <Select
          label="Department"
          error={errors.department?.message}
          {...register("department")}
        >
          <option value="">Select department</option>
          {[
            "Engineering",
            "Marketing",
            "HR",
            "Finance",
            "Operations",
            "Sales",
          ].map((dep) => (
            <option key={dep} value={dep}>
              {dep}
            </option>
          ))}
        </Select>

        {error && (
          <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          size="md"
          className="w-full"
          loading={loading}
        >
          Add Employee
        </Button>
      </form>
    </div>
  );
}
