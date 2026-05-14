import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";
import { ThemeToggle } from "@/components/theme-toggle";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="flex items-center justify-between p-4 sm:p-6 max-w-5xl mx-auto w-full animate-fade-in">
        <Link href="/" className="text-lg font-[var(--font-heading)] font-bold text-[var(--accent)]">
          LinkInBio
        </Link>
        <ThemeToggle />
      </nav>

      <main className="flex-1 flex items-center justify-center px-4 pb-16">
        <div className="w-full max-w-sm animate-fade-in-up">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
            <p className="text-[var(--text-secondary)] text-sm">Log in to manage your links</p>
          </div>

          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-6">
            <LoginForm />
          </div>

          <p className="mt-6 text-center text-sm text-[var(--text-secondary)]">
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="text-[var(--accent)] hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
