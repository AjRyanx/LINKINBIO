"use client";

import { useActionState } from "react";
import { createLink } from "@/lib/actions/link.actions";

export function AddLinkForm() {
  const [state, formAction] = useActionState(createLink, undefined);

  return (
    <form action={formAction} className="space-y-4 bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-6">
      <h2 className="text-lg font-semibold font-[var(--font-heading)]">Add new link</h2>
      {state?.error && (
        <div className="p-3 text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl animate-fade-in">
          {state.error}
        </div>
      )}
      <div className="space-y-1.5">
        <label htmlFor="title" className="block text-sm font-medium text-[var(--text-secondary)]">
          Title
        </label>
        <input
          id="title"
          name="title"
          required
          className="input-field w-full px-4 py-2.5"
          placeholder="e.g. My Portfolio"
        />
      </div>
      <div className="space-y-1.5">
        <label htmlFor="url" className="block text-sm font-medium text-[var(--text-secondary)]">
          URL
        </label>
        <input
          id="url"
          name="url"
          type="url"
          required
          className="input-field w-full px-4 py-2.5"
          placeholder="https://example.com"
        />
      </div>
      <button type="submit" className="btn-accent w-full px-4 py-2.5 rounded-xl">
        Add link
      </button>
    </form>
  );
}
