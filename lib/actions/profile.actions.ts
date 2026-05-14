"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

const profileSchema = z.object({
  displayName: z.string().min(1, "Display name is required").max(50),
  bio: z.string().max(200, "Bio must be 200 characters or less").optional(),
  avatarUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

export async function updateProfile(_prevState: unknown, formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Not authenticated" };

  const validated = profileSchema.safeParse({
    displayName: formData.get("displayName"),
    bio: formData.get("bio") || undefined,
    avatarUrl: formData.get("avatarUrl") || undefined,
  });

  if (!validated.success) {
    return { error: validated.error.errors[0]?.message ?? "Invalid input" };
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      displayName: validated.data.displayName,
      bio: validated.data.bio || null,
      avatarUrl: validated.data.avatarUrl || null,
    },
  });

  revalidatePath("/dashboard");
  return { success: true };
}
