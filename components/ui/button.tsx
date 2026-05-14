"use client";

import { useFormStatus } from "react-dom";

export function Button({
  children,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { pending } = useFormStatus();

  return (
    <button
      className={`w-full px-4 py-2.5 bg-brand text-white rounded-lg font-medium
        hover:bg-brand-hover disabled:opacity-50 disabled:cursor-not-allowed
        transition-colors ${className}`}
      disabled={pending || props.disabled}
      {...props}
    >
      {pending ? "Please wait..." : children}
    </button>
  );
}
