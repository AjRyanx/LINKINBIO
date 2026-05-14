"use client";

import { useActionState } from "react";
import { login } from "@/lib/actions/auth.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LoginForm() {
  const [state, formAction] = useActionState(login, undefined);

  return (
    <form action={formAction} className="space-y-4">
      {state?.error && (
        <div className="p-3 text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg">
          {state.error}
        </div>
      )}
      <Input label="Email" id="email" name="email" type="email" required autoComplete="email" />
      <Input label="Password" id="password" name="password" type="password" required autoComplete="current-password" />
      <Button type="submit">Log in</Button>
    </form>
  );
}
