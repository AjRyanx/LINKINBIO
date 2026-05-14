import { redirect } from "next/navigation";
import { auth, signOut } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AddLinkForm } from "@/components/dashboard/add-link-form";
import { LinkList } from "@/components/dashboard/link-list";
import { ProfileForm } from "@/components/dashboard/profile-form";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/auth/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      links: {
        orderBy: { order: "asc" },
      },
    },
  });

  if (!user) redirect("/auth/login");

  return (
    <div className="min-h-screen">
      <header className="flex items-center justify-between p-6 max-w-3xl mx-auto">
        <span className="text-xl font-bold text-brand">LinkInBio</span>
        <div className="flex items-center gap-4">
          <a
            href={`/u/${user.username}`}
            target="_blank"
            className="text-sm text-brand hover:underline"
          >
            View page &rarr;
          </a>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button
              type="submit"
              className="text-sm text-text-secondary hover:text-white transition-colors"
            >
              Sign out
            </button>
          </form>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 pb-12 space-y-8">
        <div>
          <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
          <p className="text-text-secondary text-sm">
            Your page:{" "}
            <a
              href={`/u/${user.username}`}
              target="_blank"
              className="text-brand hover:underline"
            >
              /u/{user.username}
            </a>
          </p>
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
          <h2 className="text-lg font-semibold">
            Your links ({user.links.length})
          </h2>
          <LinkList links={user.links} />
        </div>
      </main>
    </div>
  );
}
