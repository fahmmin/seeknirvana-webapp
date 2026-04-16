/**
 * Extract object path from Supabase public Storage URL for the `avatars` bucket.
 */
export function publicUrlToAvatarPath(publicUrl: string, supabaseUrl: string): string | null {
  const base = supabaseUrl.replace(/\/$/, "");
  const prefix = `${base}/storage/v1/object/public/avatars/`;
  if (!publicUrl.startsWith(prefix)) {
    return null;
  }
  return publicUrl.slice(prefix.length);
}
