"use client";

import { useActionState, useRef, useState } from "react";
import { updateProfile } from "@/lib/actions/profile.actions";

type Profile = {
  displayName: string;
  bio: string | null;
  avatarUrl: string | null;
};

const MAX_AVATAR_KB = 200;
const MAX_AVATAR_PX = 400;

export function ProfileForm({ profile }: { profile: Profile }) {
  const [state, formAction] = useActionState(updateProfile, undefined);
  const [preview, setPreview] = useState<string | null>(null);
  const [avatarDataUrl, setAvatarDataUrl] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError(null);

    if (!file.type.startsWith("image/")) {
      setUploadError("Please select an image file");
      return;
    }

    if (file.size > MAX_AVATAR_KB * 1024) {
      setUploadError(`Image too large. Max ${MAX_AVATAR_KB}KB.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      resizeImage(dataUrl, MAX_AVATAR_PX, (resized) => {
        setPreview(resized);
        setAvatarDataUrl(resized);
      });
    };
    reader.readAsDataURL(file);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    if (avatarDataUrl) {
      form.set("avatarUrl", avatarDataUrl);
    } else {
      form.delete("avatarUrl");
    }
    const fd = new FormData();
    fd.set("displayName", form.get("displayName") as string);
    fd.set("bio", form.get("bio") as string);
    if (avatarDataUrl) fd.set("avatarUrl", avatarDataUrl);
    formAction(fd);
  }

  function clearAvatar() {
    setPreview(null);
    setAvatarDataUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-6">
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

      <div className="space-y-3">
        <label className="block text-sm font-medium text-[var(--text-secondary)]">Avatar</label>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[var(--border)] bg-[var(--bg-secondary)] shrink-0 flex items-center justify-center">
            {preview || profile.avatarUrl ? (
              <img
                src={preview ?? profile.avatarUrl!}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-lg font-bold text-[var(--text-muted)]">
                {(profile.displayName ?? "?")[0].toUpperCase()}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="px-3 py-1.5 text-xs rounded-lg border border-[var(--border)] cursor-pointer
              hover:bg-[var(--bg-card-hover)] hover:border-[var(--accent)] transition-all duration-200 text-center">
              <span>Choose image</span>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </label>
            {(preview || profile.avatarUrl) && (
              <button
                type="button"
                onClick={clearAvatar}
                className="text-xs text-[var(--text-muted)] hover:text-red-400 transition-colors"
              >
                Remove
              </button>
            )}
          </div>
        </div>
        {(uploadError) && (
          <p className="text-xs text-red-400">{uploadError}</p>
        )}
        <p className="text-xs text-[var(--text-muted)]">Max {MAX_AVATAR_KB}KB · {MAX_AVATAR_PX}x{MAX_AVATAR_PX}px</p>
      </div>

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

      <button type="submit" className="btn-accent w-full px-4 py-2.5 rounded-xl">
        Save profile
      </button>
    </form>
  );
}

function resizeImage(dataUrl: string, maxPx: number, cb: (resized: string) => void) {
  const img = new Image();
  img.onload = () => {
    let { width, height } = img;
    if (width > maxPx || height > maxPx) {
      const ratio = Math.min(maxPx / width, maxPx / height);
      width = Math.round(width * ratio);
      height = Math.round(height * ratio);
    }
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0, width, height);
    cb(canvas.toDataURL("image/jpeg", 0.8));
  };
  img.src = dataUrl;
}
