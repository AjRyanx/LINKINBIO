"use client";

import { useActionState } from "react";
import { signup } from "@/lib/actions/auth.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SignupForm() {
  const [state, formAction] = useActionState(signup, undefined);

  return (
    <form action={formAction} className="space-y-4">
      {state?.error && (
        <div className="p-3 text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg">
          {state.error}
        </div>
      )}
      <Input label="Display name" id="displayName" name="displayName" required />
      <Input label="Email" id="email" name="email" type="email" required autoComplete="email" />
      <Input
        label="Username"
        id="username"
        name="username"
        required
        placeholder="yourname (used for your linkinbio page)"
        pattern="^[a-zA-Z0-9_]+$"
      />
      <Input label="Password" id="password" name="password" type="password" required autoComplete="new-password" />
      <Button type="submit">Create account</Button>
    </form>
  );
}
