import { ADMIN_COOKIE } from "../../../quan-tri/auth";

export async function POST() {
  const response = new Response(null, {
    status: 303,
    headers: { Location: "/quan-tri" },
  });
  response.headers.append(
    "Set-Cookie",
    `${ADMIN_COOKIE}=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax`
  );
  return response;
}
