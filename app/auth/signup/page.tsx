import Link from "next/link";
import { SignupForm } from "@/components/auth/signup-form";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <Link href="/" className="block text-xl font-bold text-brand text-center mb-8">
          LinkInBio
        </Link>
        <h1 className="text-2xl font-bold text-center mb-8">Create your page</h1>
        <SignupForm />
        <p className="mt-6 text-center text-sm text-text-secondary">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-brand hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
