import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <div className="animate-fade-in-up">
        <h1 className="text-5xl font-bold font-[var(--font-heading)] text-[var(--accent)] mb-2">404</h1>
        <p className="text-[var(--text-secondary)] mb-8">This page doesn&apos;t exist.</p>
        <Link
          href="/"
          className="btn-accent px-6 py-2.5 rounded-xl inline-block"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
