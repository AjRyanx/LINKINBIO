"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export function SignupForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.get("email"),
          password: form.get("password"),
          username: form.get("username"),
          displayName: form.get("displayName"),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong");
        return;
      }

      const result = await signIn("credentials", {
        email: form.get("email") as string,
        password: form.get("password") as string,
        redirect: false,
      });

      if (result?.error) {
        setError("Account created. Please log in.");
        router.push("/auth/login");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        disabled={loading}
        className="btn-accent w-full px-4 py-2.5 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Creating account..." : "Create account"}
      </button>
    </form>
  );
}
