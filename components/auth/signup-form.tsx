"use client";

import { useActionState } from "react";
import { signup } from "@/lib/actions/auth-actions";

export function SignupForm() {
  const [error, formAction] = useActionState(signup, undefined);

  return (
    <form action={formAction} className="space-y-4">
      {error && (
        <div className="p-3 text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl animate-fade-in">
          {error}
        </div>
      )}

      <div className="space-y-1.5">
        <label htmlFor="displayName" className="block text-sm font-medium text-[var(--text-secondary)]">
          Display name
        </label>
        <input
          id="displayName"
          name="displayName"
          required
          className="input-field w-full px-4 py-2.5"
          placeholder="Your name"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="email" className="block text-sm font-medium text-[var(--text-secondary)]">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="input-field w-full px-4 py-2.5"
          placeholder="you@example.com"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="username" className="block text-sm font-medium text-[var(--text-secondary)]">
          Username
        </label>
        <input
          id="username"
          name="username"
          required
          pattern="^[a-zA-Z0-9_]+$"
          className="input-field w-full px-4 py-2.5"
          placeholder="yourname"
        />
        <p className="text-xs text-[var(--text-muted)]">Used for your page URL: /u/yourname</p>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="password" className="block text-sm font-medium text-[var(--text-secondary)]">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="new-password"
          className="input-field w-full px-4 py-2.5"
          placeholder="At least 6 characters"
        />
      </div>

      <button
        type="submit"
        className="btn-accent w-full px-4 py-2.5 rounded-xl"
      >
        Create account
      </button>
    </form>
  );
}
