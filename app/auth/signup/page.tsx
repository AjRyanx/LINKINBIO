import Link from "next/link";
import { SignupForm } from "@/components/auth/signup-form";
import { ThemeToggle } from "@/components/theme-toggle";

export default function SignupPage() {
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
            <h1 className="text-3xl font-bold mb-2">Create your page</h1>
            <p className="text-[var(--text-secondary)] text-sm">Join and share your links in one place</p>
          </div>

          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-6">
            <SignupForm />
          </div>

          <p className="mt-6 text-center text-sm text-[var(--text-secondary)]">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-[var(--accent)] hover:underline font-medium">
              Log in
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
