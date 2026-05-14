"use client";

import { useActionState } from "react";
import { updateProfile } from "@/lib/actions/profile.actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Profile = {
  displayName: string;
  bio: string | null;
  avatarUrl: string | null;
};

export function ProfileForm({ profile }: { profile: Profile }) {
  const [state, formAction] = useActionState(updateProfile, undefined);

  return (
    <form action={formAction} className="space-y-4 p-6 bg-surface rounded-xl border border-border">
      <h2 className="text-lg font-semibold">Profile</h2>
      {state?.error && (
        <div className="p-3 text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg">
          {state.error}
        </div>
      )}
      {state?.success && (
        <div className="p-3 text-sm text-green-400 bg-green-400/10 border border-green-400/20 rounded-lg">
          Profile updated
        </div>
      )}
      <Input
        label="Display name"
        id="displayName"
        name="displayName"
        defaultValue={profile.displayName}
        required
      />
      <div className="space-y-1.5">
        <label htmlFor="bio" className="block text-sm font-medium text-text-secondary">
          Bio
        </label>
        <textarea
          id="bio"
          name="bio"
          defaultValue={profile.bio ?? ""}
          maxLength={200}
          rows={3}
          className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg
            text-text-primary placeholder:text-text-secondary/50 resize-none
            focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent
            transition-colors"
          placeholder="Short bio about yourself"
        />
      </div>
      <Input
        label="Avatar URL (optional)"
        id="avatarUrl"
        name="avatarUrl"
        type="url"
        defaultValue={profile.avatarUrl ?? ""}
        placeholder="https://example.com/avatar.jpg"
      />
      <Button type="submit">Save profile</Button>
    </form>
  );
}
