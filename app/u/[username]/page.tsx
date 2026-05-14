import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ username: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  const user = await prisma.user.findUnique({ where: { username } });

  if (!user) return { title: "Not Found" };

  return {
    title: `${user.displayName ?? user.username} — LinkInBio`,
    description: user.bio ?? `Check out ${user.displayName ?? user.username}'s links`,
    openGraph: {
      title: `${user.displayName ?? user.username} — LinkInBio`,
      description: user.bio ?? undefined,
      ...(user.avatarUrl ? { images: [{ url: user.avatarUrl }] } : {}),
    },
  };
}

export default async function ProfilePage({ params }: Props) {
  const { username } = await params;

  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      links: {
        where: { isActive: true },
        orderBy: { order: "asc" },
      },
    },
  });

  if (!user) notFound();

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-12 sm:py-16">
      <div className="w-full max-w-sm flex flex-col items-center animate-fade-in-up">
        {user.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt={user.displayName ?? user.username}
            className="w-24 h-24 rounded-full object-cover border-2 border-[var(--accent)] mb-4"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-[var(--bg-card)] border-2 border-[var(--border)] mb-4
            flex items-center justify-center">
            <span className="text-2xl font-bold font-[var(--font-heading)] text-[var(--accent)]">
              {(user.displayName ?? user.username)[0].toUpperCase()}
            </span>
          </div>
        )}

        <h1 className="text-xl font-bold font-[var(--font-heading)] text-center mb-1">
          {user.displayName ?? user.username}
        </h1>

        {user.bio && (
          <p className="text-[var(--text-secondary)] text-sm text-center max-w-xs mb-8 leading-relaxed">
            {user.bio}
          </p>
        )}

        <div className="w-full space-y-3">
          {user.links.map((link, i) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link-card block w-full py-3.5 px-4 text-center font-medium
                text-[var(--text-primary)] animate-fade-in-up"
              style={{ animationDelay: `${0.3 + i * 0.1}s` }}
            >
              {link.title}
            </a>
          ))}
        </div>

        {user.links.length === 0 && (
          <p className="text-[var(--text-muted)] text-sm mt-8">No links yet</p>
        )}
      </div>

      <footer className="mt-auto pt-16 pb-4 text-[var(--text-muted)] text-xs animate-fade-in">
        <a href="/" className="hover:text-[var(--accent)] transition-colors duration-200">
          LinkInBio
        </a>
      </footer>
    </div>
  );
}
