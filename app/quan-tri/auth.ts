export const ADMIN_COOKIE = "vpg_admin_auth";
const SALT = "vpg-admin-salt";

export async function hashAdminPassword(password: string) {
  const data = new TextEncoder().encode(`${password}:${SALT}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}
