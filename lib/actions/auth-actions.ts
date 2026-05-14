"use server";

import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const signupSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3).max(20).regex(/^[a-zA-Z0-9_]+$/),
  password: z.string().min(6),
  displayName: z.string().min(1),
});

export async function login(_prevState: string | undefined, formData: FormData) {
  try {
    await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return "Invalid email or password";
    }
    throw error;
  }
}

export async function signup(_prevState: string | undefined, formData: FormData) {
  const parsed = signupSchema.safeParse({
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
    displayName: formData.get("displayName"),
  });

  if (!parsed.success) {
    return parsed.error.errors[0]?.message ?? "Invalid input";
  }

  const { email, username, password, displayName } = parsed.data;

  try {
    const existing = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] },
    });

    if (existing) {
      return existing.email === email ? "Email already in use" : "Username already taken";
    }

    const hashed = await bcrypt.hash(password, 12);

    await prisma.user.create({
      data: { email, username, password: hashed, displayName },
    });

    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return "Invalid email or password";
    }
    throw error;
  }
}
