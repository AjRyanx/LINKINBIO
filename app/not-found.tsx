import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl font-bold mb-4">Not found</h1>
      <p className="text-text-secondary mb-8">This page doesn&apos;t exist.</p>
      <Link
        href="/"
        className="px-6 py-2.5 bg-brand text-white rounded-lg hover:bg-brand-hover transition-colors"
      >
        Go home
      </Link>
    </div>
  );
}
