import { cookies } from "next/headers";
import type { Metadata } from "next";
import { ADMIN_COOKIE, hashAdminPassword } from "./auth";
import { LoginForm } from "./login-form";
import { RegistrationsList } from "./registrations-list";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Quản trị đăng ký | Vproud",
  robots: { index: false, follow: false },
};

async function isAuthenticated() {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return false;

  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value;
  if (!token) return false;

  const expected = await hashAdminPassword(adminPassword);
  return token === expected;
}

export default async function AdminPage() {
  const authed = await isAuthenticated();

  return (
    <main className="admin-page">
      {authed ? <RegistrationsList /> : <LoginForm />}
    </main>
  );
}
