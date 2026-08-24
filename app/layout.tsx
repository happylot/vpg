import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VPG | Sản phẩm Việt vươn ra thế giới",
  description:
    "VPG là dự án cộng đồng do JCI Grace tổ chức nhằm giúp doanh nghiệp Việt Nam nâng cao năng lực và đưa sản phẩm ra thị trường quốc tế.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "VPG | Sản phẩm Việt vươn ra thế giới",
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
      <body>{children}</body>
    </html>
  );
}
