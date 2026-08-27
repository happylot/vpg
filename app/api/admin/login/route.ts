import { ADMIN_COOKIE, hashAdminPassword } from "../../../quan-tri/auth";

export async function POST(request: Request) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return Response.json(
      { error: "Chưa cấu hình ADMIN_PASSWORD trên server." },
      { status: 500 }
    );
  }

  const payload = (await request.json()) as { password?: string };
  const password = payload.password ?? "";

  if (password !== adminPassword) {
    return Response.json({ error: "Sai mật khẩu." }, { status: 401 });
  }

  const token = await hashAdminPassword(adminPassword);
  const isHttps = request.url.startsWith("https:");

  const response = Response.json({ ok: true });
  response.headers.append(
    "Set-Cookie",
    `${ADMIN_COOKIE}=${token}; Path=/; Max-Age=2592000; HttpOnly; SameSite=Lax${
      isHttps ? "; Secure" : ""
    }`
  );
  return response;
}
