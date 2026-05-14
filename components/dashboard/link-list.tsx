"use client";

import { toggleLink, deleteLink } from "@/lib/actions/link.actions";

type Link = {
  id: string;
  title: string;
  url: string;
  order: number;
  isActive: boolean;
};

export function LinkList({ links }: { links: Link[] }) {
  if (links.length === 0) {
    return (
      <div className="text-center text-[var(--text-muted)] text-sm py-12 bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl">
        No links yet. Add your first link above.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {links
        .sort((a, b) => a.order - b.order)
        .map((link, index) => (
          <div
            key={link.id}
            className="card-hover flex items-center gap-3 p-4 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl"
          >
            <span className="text-[var(--text-muted)] text-sm w-5 shrink-0 font-medium">
              {index + 1}
            </span>
            <div className="flex-1 min-w-0">
              <p
                className={`font-medium truncate text-sm ${
                  !link.isActive ? "line-through text-[var(--text-muted)]" : ""
                }`}
              >
                {link.title}
              </p>
              <p className="text-xs text-[var(--text-muted)] truncate">{link.url}</p>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={async () => {
                  await toggleLink(link.id);
                }}
                className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-all duration-200 ${
                  link.isActive
                    ? "bg-[var(--accent-glow)] text-[var(--accent)] border border-[var(--accent)]/20"
                    : "bg-gray-500/10 text-gray-400 border border-gray-500/20"
                }`}
              >
                {link.isActive ? "Active" : "Hidden"}
              </button>
              <button
                onClick={async () => {
                  if (confirm("Delete this link?")) {
                    await deleteLink(link.id);
                  }
                }}
                className="px-2.5 py-1 text-xs rounded-lg font-medium
                  bg-red-500/10 text-red-400 border border-red-500/20
                  hover:bg-red-500/20 transition-all duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}
