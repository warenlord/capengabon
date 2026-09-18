import { revalidatePath } from "next/cache";

/** Revalidates every cached route across the site after an admin content change. */
export function revalidateSite(): void {
  revalidatePath("/", "layout");
}
