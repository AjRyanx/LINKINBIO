import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="flex items-center justify-between p-4 sm:p-6 max-w-5xl mx-auto w-full animate-fade-in">
        <span className="text-lg font-[var(--font-heading)] font-bold text-[var(--accent)]">
          LinkInBio
        </span>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/auth/login"
            className="px-4 py-2 text-sm rounded-xl border border-[var(--border)] text-[var(--text-primary)]
              hover:bg-[var(--bg-card)] hover:border-[var(--accent)] transition-all duration-200"
          >
            Log in
          </Link>
          <Link
            href="/auth/signup"
            className="btn-accent px-4 py-2 text-sm rounded-xl"
          >
            Sign up
          </Link>
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <div className="animate-fade-in-up max-w-2xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight">
            All your{" "}
            <span className="text-[var(--accent)]">important links</span>
            <br />
            in one place
          </h1>
          <p className="text-[var(--text-secondary)] text-base sm:text-lg mb-10 max-w-md mx-auto leading-relaxed">
            Create your free link-in-bio page. Share your socials, store, portfolio
            and more. Built for Nigerian creators and small businesses.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/auth/signup"
              className="btn-accent px-8 py-3 rounded-xl text-base font-semibold w-full sm:w-auto text-center"
            >
              Get started — it&apos;s free
            </Link>
            <Link
              href="/auth/login"
              className="px-8 py-3 rounded-xl text-base font-semibold w-full sm:w-auto text-center
                border border-[var(--border)] text-[var(--text-primary)]
                hover:bg-[var(--bg-card)] hover:border-[var(--accent)] transition-all duration-200"
            >
              Log in
            </Link>
          </div>
        </div>

        <div className="mt-16 sm:mt-24 w-full max-w-2xl animate-fade-in-up stagger-4 opacity-0">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            {[
              { title: "Simple setup", desc: "Add your links in seconds. No coding needed." },
              { title: "Free to use", desc: "Zero cost. Built for Nigerian creators." },
              { title: "Mobile first", desc: "Looks great on any device, even on slow networks." },
            ].map((item) => (
              <div
                key={item.title}
                className="card-hover bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5"
              >
                <h3 className="font-[var(--font-heading)] font-semibold text-sm text-[var(--accent)] mb-1.5">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="p-6 text-center text-[var(--text-muted)] text-xs animate-fade-in stagger-6 opacity-0">
        &copy; {new Date().getFullYear()} LinkInBio
      </footer>
    </div>
  );
}
