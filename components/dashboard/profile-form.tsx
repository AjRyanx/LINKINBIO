"use client";

import { useActionState } from "react";
import { updateProfile } from "@/lib/actions/profile.actions";

type Profile = {
  displayName: string;
  bio: string | null;
  avatarUrl: string | null;
};

export function ProfileForm({ profile }: { profile: Profile }) {
  const [state, formAction] = useActionState(updateProfile, undefined);

  return (
    <form action={formAction} className="space-y-4 bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-6">
      <h2 className="text-lg font-semibold font-[var(--font-heading)]">Profile</h2>
      {state?.error && (
        <div className="p-3 text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl animate-fade-in">
          {state.error}
        </div>
      )}
      {state?.success && (
        <div className="p-3 text-sm text-[var(--accent)] bg-[var(--accent-glow)] border border-[var(--accent)]/20 rounded-xl animate-fade-in">
          Profile updated
        </div>
      )}
      <div className="space-y-1.5">
        <label htmlFor="displayName" className="block text-sm font-medium text-[var(--text-secondary)]">
          Display name
        </label>
        <input
          id="displayName"
          name="displayName"
          defaultValue={profile.displayName}
          required
          className="input-field w-full px-4 py-2.5"
        />
      </div>
      <div className="space-y-1.5">
        <label htmlFor="bio" className="block text-sm font-medium text-[var(--text-secondary)]">
          Bio
        </label>
        <textarea
          id="bio"
          name="bio"
          defaultValue={profile.bio ?? ""}
          maxLength={200}
          rows={3}
          className="input-field w-full px-4 py-2.5 resize-none"
          placeholder="Short bio about yourself"
        />
      </div>
      <div className="space-y-1.5">
        <label htmlFor="avatarUrl" className="block text-sm font-medium text-[var(--text-secondary)]">
          Avatar URL
        </label>
        <input
          id="avatarUrl"
          name="avatarUrl"
          type="url"
          defaultValue={profile.avatarUrl ?? ""}
          className="input-field w-full px-4 py-2.5"
          placeholder="https://example.com/avatar.jpg"
        />
      </div>
      <button type="submit" className="btn-accent w-full px-4 py-2.5 rounded-xl">
        Save profile
      </button>
    </form>
  );
}
