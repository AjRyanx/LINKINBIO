export function Input({
  label,
  id,
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-text-secondary">
        {label}
      </label>
      <input
        id={id}
        className={`w-full px-3 py-2.5 bg-surface border border-border rounded-lg
          text-text-primary placeholder:text-text-secondary/50
          focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent
          transition-colors ${className}`}
        {...props}
      />
    </div>
  );
}
