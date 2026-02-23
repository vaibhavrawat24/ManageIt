import { forwardRef, type SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, className, children, ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && (
          <label className="block text-sm font-medium text-slate-700">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={cn(
            "block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm",
            "focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none",
            "disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500",
            error && "border-red-400 focus:border-red-500 focus:ring-red-500",
            className,
          )}
          {...props}
        >
          {children}
        </select>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  },
);

Select.displayName = "Select";

export { Select };
