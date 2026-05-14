"use client";

import { useState } from "react";
import { deleteLink, toggleLink } from "@/lib/actions/link.actions";

type Link = {
  id: string;
  title: string;
  url: string;
  order: number;
  isActive: boolean;
};

export function LinkList({ links }: { links: Link[] }) {
  const [editingId, setEditingId] = useState<string | null>(null);

  if (links.length === 0) {
    return (
      <div className="p-6 bg-surface rounded-xl border border-border text-center text-text-secondary">
        No links yet. Add your first link above.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {links
        .sort((a, b) => a.order - b.order)
        .map((link, index) => (
          <div
            key={link.id}
            className="flex items-center gap-3 p-4 bg-surface rounded-xl border border-border"
          >
            <span className="text-text-secondary text-sm w-6">{index + 1}.</span>
            <div className="flex-1 min-w-0">
              <p className={`font-medium truncate ${!link.isActive ? "line-through text-text-secondary" : ""}`}>
                {link.title}
              </p>
              <p className="text-sm text-text-secondary truncate">{link.url}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={async () => {
                  await toggleLink(link.id);
                }}
                className={`px-3 py-1 text-xs rounded-lg transition-colors ${
                  link.isActive
                    ? "bg-green-500/10 text-green-400 border border-green-500/20"
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
                className="px-3 py-1 text-xs bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}
