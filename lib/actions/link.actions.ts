"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

const createLinkSchema = z.object({
  title: z.string().min(1, "Title is required").max(100),
  url: z.string().url("Must be a valid URL"),
});

const updateLinkSchema = z.object({
  id: z.string(),
  title: z.string().min(1).max(100),
  url: z.string().url(),
});

export async function createLink(_prevState: unknown, formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Not authenticated" };
  }

  const validated = createLinkSchema.safeParse({
    title: formData.get("title"),
    url: formData.get("url"),
  });

  if (!validated.success) {
    return { error: validated.error.errors[0]?.message ?? "Invalid input" };
  }

  const count = await prisma.link.count({
    where: { userId: session.user.id },
  });

  await prisma.link.create({
    data: {
      userId: session.user.id,
      title: validated.data.title,
      url: validated.data.url,
      order: count,
    },
  });

  revalidatePath("/dashboard");
  return { success: true };
}

export async function updateLink(_prevState: unknown, formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Not authenticated" };

  const validated = updateLinkSchema.safeParse({
    id: formData.get("id"),
    title: formData.get("title"),
    url: formData.get("url"),
  });

  if (!validated.success) {
    return { error: "Invalid input" };
  }

  const link = await prisma.link.findFirst({
    where: { id: validated.data.id, userId: session.user.id },
  });

  if (!link) return { error: "Link not found" };

  await prisma.link.update({
    where: { id: validated.data.id },
    data: {
      title: validated.data.title,
      url: validated.data.url,
    },
  });

  revalidatePath("/dashboard");
  return { success: true };
}

export async function deleteLink(id: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Not authenticated" };

  const link = await prisma.link.findFirst({
    where: { id, userId: session.user.id },
  });

  if (!link) return { error: "Link not found" };

  await prisma.link.delete({ where: { id } });

  revalidatePath("/dashboard");
  return { success: true };
}

export async function toggleLink(id: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Not authenticated" };

  const link = await prisma.link.findFirst({
    where: { id, userId: session.user.id },
  });

  if (!link) return { error: "Link not found" };

  await prisma.link.update({
    where: { id },
    data: { isActive: !link.isActive },
  });

  revalidatePath("/dashboard");
  return { success: true };
}

export async function reorderLinks(linkIds: string[]) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Not authenticated" };

  await prisma.$transaction(
    linkIds.map((id, index) =>
      prisma.link.update({
        where: { id },
        data: { order: index },
      })
    )
  );

  revalidatePath("/dashboard");
  return { success: true };
}
