"use client";

import { useActionState } from "react";
import { createLink } from "@/lib/actions/link.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AddLinkForm() {
  const [state, formAction] = useActionState(createLink, undefined);

  return (
    <form action={formAction} className="space-y-4 p-6 bg-surface rounded-xl border border-border">
      <h2 className="text-lg font-semibold">Add new link</h2>
      {state?.error && (
        <div className="p-3 text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg">
          {state.error}
        </div>
      )}
      <Input label="Title" id="title" name="title" placeholder="e.g. My Portfolio" required />
      <Input label="URL" id="url" name="url" type="url" placeholder="https://example.com" required />
      <Button type="submit">Add link</Button>
    </form>
  );
}
