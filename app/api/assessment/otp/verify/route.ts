import { createToken, readToken } from "../token";

const SESSION_TTL_MS = 2 * 60 * 60 * 1000;

type PendingPayload = { email: string; otp: string; exp: number; purpose: "otp-pending" };

export async function POST(request: Request) {
  const secret = process.env.OTP_SECRET;
  if (!secret) {
    return Response.json({ error: "Chưa cấu hình OTP_SECRET." }, { status: 500 });
  }

  try {
    const { token, otp } = (await request.json()) as { token?: string; otp?: string };
    if (!token || !otp) {
      return Response.json({ error: "Thiếu thông tin xác nhận." }, { status: 400 });
    }

    const payload = await readToken<PendingPayload>(token, secret);
    if (!payload || payload.purpose !== "otp-pending") {
      return Response.json(
        { error: "Phiên xác nhận không hợp lệ, vui lòng gửi lại mã." },
        { status: 400 },
      );
    }

    if (Date.now() > payload.exp) {
      return Response.json({ error: "Mã xác nhận đã hết hạn, vui lòng gửi lại mã." }, { status: 400 });
    }

    if (payload.otp !== otp.trim()) {
      return Response.json({ error: "Mã xác nhận không đúng." }, { status: 400 });
    }

    const sessionToken = await createToken(
      { email: payload.email, exp: Date.now() + SESSION_TTL_MS, purpose: "otp-verified" },
      secret,
    );

    return Response.json({ token: sessionToken, email: payload.email });
  } catch (error) {
    console.error("Không xác thực được mã OTP:", error);
    return Response.json({ error: "Không thể xác nhận mã, vui lòng thử lại." }, { status: 500 });
  }
}
