"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

const MAX_DATA_URL_BYTES = 1_500_000;

const profileSchema = z.object({
  displayName: z.string().min(1, "Display name is required").max(50),
  bio: z.string().max(200, "Bio must be 200 characters or less").optional(),
  avatarUrl: z
    .string()
    .refine(
      (val) => {
        if (val === "") return true;
        if (val.startsWith("data:image/")) {
          const base64 = val.split(",")[1];
          if (!base64) return false;
          const size = Math.round((base64.length * 3) / 4);
          return size <= MAX_DATA_URL_BYTES;
        }
        try {
          new URL(val);
          return true;
        } catch {
          return false;
        }
      },
      { message: `Image too large (max ~${Math.round(MAX_DATA_URL_BYTES / 1000)}KB) or invalid URL` }
    )
    .optional()
    .or(z.literal("")),
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

  const avatarUrl = validated.data.avatarUrl;
  const finalAvatar =
    avatarUrl === "" || !avatarUrl
      ? null
      : avatarUrl;

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      displayName: validated.data.displayName,
      bio: validated.data.bio || null,
      avatarUrl: finalAvatar,
    },
  });

  revalidatePath("/dashboard");
  return { success: true };
}
