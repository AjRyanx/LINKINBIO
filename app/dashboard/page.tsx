import { redirect } from "next/navigation";
import { auth, signOut } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AddLinkForm } from "@/components/dashboard/add-link-form";
import { LinkList } from "@/components/dashboard/link-list";
import { ProfileForm } from "@/components/dashboard/profile-form";
import { ThemeToggle } from "@/components/theme-toggle";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/auth/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      links: { orderBy: { order: "asc" } },
    },
  });

  if (!user) redirect("/auth/login");

  return (
    <div className="min-h-screen">
      <nav className="flex items-center justify-between p-4 sm:p-6 max-w-3xl mx-auto w-full animate-fade-in">
        <span className="text-lg font-[var(--font-heading)] font-bold text-[var(--accent)]">
          LinkInBio
        </span>
        <div className="flex items-center gap-3">
          <a
            href={`/u/${user.username}`}
            target="_blank"
            className="text-sm font-medium text-[var(--accent)] hover:underline hidden sm:block"
          >
            View page &rarr;
          </a>
          <ThemeToggle />
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button
              type="submit"
              className="px-3 py-1.5 text-sm rounded-xl border border-[var(--border)]
                text-[var(--text-secondary)] hover:text-[var(--text-primary)]
                hover:bg-[var(--bg-card)] transition-all duration-200"
            >
              Sign out
            </button>
          </form>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 pb-12 space-y-6 animate-fade-in-up">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold font-[var(--font-heading)]">Dashboard</h1>
            <p className="text-sm text-[var(--text-secondary)] mt-1">
              Your page:{" "}
              <a
                href={`/u/${user.username}`}
                target="_blank"
                className="text-[var(--accent)] hover:underline font-medium"
              >
                /u/{user.username}
              </a>
            </p>
          </div>
          <a
            href={`/u/${user.username}`}
            target="_blank"
            className="btn-accent px-4 py-2 text-sm rounded-xl sm:hidden"
          >
            View page
          </a>
        </div>

        <ProfileForm
          profile={{
            displayName: user.displayName ?? user.username,
            bio: user.bio,
            avatarUrl: user.avatarUrl,
          }}
        />

        <AddLinkForm />

        <div className="space-y-3">
          <h2 className="text-lg font-semibold font-[var(--font-heading)]">
            Your links{" "}
            <span className="text-[var(--text-muted)] font-normal text-sm font-[var(--font-body)]">
              ({user.links.length})
            </span>
          </h2>
          <LinkList links={user.links} />
        </div>
      </main>
    </div>
  );
}
