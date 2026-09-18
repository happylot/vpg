import { sendOtpEmail } from "../../submit/notify";
import { createToken } from "../token";

const OTP_TTL_MS = 10 * 60 * 1000;

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function generateOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export async function POST(request: Request) {
  const secret = process.env.OTP_SECRET;
  if (!secret) {
    return Response.json({ error: "Chưa cấu hình OTP_SECRET." }, { status: 500 });
  }

  try {
    const { email } = (await request.json()) as { email?: string };
    const trimmedEmail = (email ?? "").trim().toLowerCase();

    if (!isValidEmail(trimmedEmail)) {
      return Response.json({ error: "Email không hợp lệ." }, { status: 400 });
    }

    const otp = generateOtp();
    const exp = Date.now() + OTP_TTL_MS;
    const token = await createToken({ email: trimmedEmail, otp, exp, purpose: "otp-pending" }, secret);

    await sendOtpEmail(trimmedEmail, otp);

    return Response.json({ token });
  } catch (error) {
    console.error("Không gửi được mã OTP:", error);
    return Response.json(
      { error: "Không thể gửi mã xác nhận, vui lòng thử lại sau ít phút." },
      { status: 500 },
    );
  }
}
