import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between p-6 max-w-5xl mx-auto w-full">
        <span className="text-xl font-bold text-brand">LinkInBio</span>
        <div className="flex gap-4">
          <Link
            href="/auth/login"
            className="px-4 py-2 text-sm text-text-primary hover:text-white transition-colors"
          >
            Log in
          </Link>
          <Link
            href="/auth/signup"
            className="px-4 py-2 text-sm bg-brand text-white rounded-lg hover:bg-brand-hover transition-colors"
          >
            Sign up
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 max-w-2xl">
          All your{" "}
          <span className="text-brand">important links</span>
          {" "}in one place
        </h1>
        <p className="text-text-secondary text-lg md:text-xl mb-10 max-w-xl">
          Create your free link-in-bio page. Share your socials, store, portfolio
          and more. Built for Nigerian creators and small businesses.
        </p>
        <Link
          href="/auth/signup"
          className="px-8 py-3 bg-brand text-white rounded-lg text-lg font-medium hover:bg-brand-hover transition-colors"
        >
          Get started — it&apos;s free
        </Link>
      </main>

      <footer className="p-6 text-center text-text-secondary text-sm">
        &copy; {new Date().getFullYear()} LinkInBio
      </footer>
    </div>
  );
}
