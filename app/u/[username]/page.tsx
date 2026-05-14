import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ username: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  const user = await prisma.user.findUnique({
    where: { username },
  });

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
    <div className="min-h-screen flex flex-col items-center px-6 py-16">
      {user.avatarUrl && (
        <img
          src={user.avatarUrl}
          alt={user.displayName ?? user.username}
          className="w-24 h-24 rounded-full object-cover border-2 border-brand mb-4"
        />
      )}

      <h1 className="text-2xl font-bold mb-1">
        {user.displayName ?? user.username}
      </h1>

      {user.bio && (
        <p className="text-text-secondary text-center max-w-sm mb-8">
          {user.bio}
        </p>
      )}

      <div className="w-full max-w-sm space-y-3">
        {user.links.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-3.5 px-4 bg-surface border border-border
              rounded-xl text-center font-medium
              hover:bg-surface-light hover:border-brand/50
              transition-all duration-200"
          >
            {link.title}
          </a>
        ))}
      </div>

      {user.links.length === 0 && (
        <p className="text-text-secondary">No links yet</p>
      )}

      <footer className="mt-auto pt-16 text-text-secondary text-xs">
        <a href="/" className="hover:text-brand transition-colors">
          LinkInBio
        </a>
      </footer>
    </div>
  );
}
