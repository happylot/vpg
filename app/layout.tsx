import type { Metadata } from "next";
import "./globals.css";
import { BackToTop } from "./components/back-to-top";

export const metadata: Metadata = {
  title: "Vproud | Sản phẩm Việt vươn ra thế giới",
  description:
    "Vproud là dự án cộng đồng do JCI Grace tổ chức nhằm giúp doanh nghiệp Việt Nam nâng cao năng lực và đưa sản phẩm ra thị trường quốc tế.",
  icons: {
    icon: [
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.png", sizes: "any", type: "image/png" },
    ],
    shortcut: "/favicon-32.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Vproud | Sản phẩm Việt vươn ra thế giới",
    description:
      "Sản phẩm Việt. Thị trường toàn cầu. Cộng đồng giúp doanh nghiệp Việt học, chuẩn hóa, kết nối và xuất khẩu.",
    type: "website",
    images: ["/hero-pattern.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>
        {children}
        <BackToTop />
      </body>
    </html>
  );
}
