import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <Link href="/" className="block text-xl font-bold text-brand text-center mb-8">
          LinkInBio
        </Link>
        <h1 className="text-2xl font-bold text-center mb-8">Welcome back</h1>
        <LoginForm />
        <p className="mt-6 text-center text-sm text-text-secondary">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="text-brand hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
