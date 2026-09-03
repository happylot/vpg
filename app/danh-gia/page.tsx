import type { Metadata } from "next";
import { SiteNav } from "../components/site-nav";
import { AssessmentForm } from "./assessment-form";

export const metadata: Metadata = {
  title: "Đánh giá sẵn sàng xuất khẩu | Vproud",
  description:
    "Đo lường mức độ sẵn sàng xuất khẩu của doanh nghiệp bạn trên thang 100 điểm, dựa trên 8 tiêu chí cốt lõi của Vproud.",
};

export default function DanhGiaPage() {
  return (
    <main>
      <section className="assessment-hero">
        <div className="hero__visual" aria-hidden="true" />
        <div className="hero__shade" aria-hidden="true" />
        <SiteNav variant="sub" />
        <div className="assessment-hero__content">
          <p className="kicker">Thang điểm sẵn sàng xuất khẩu</p>
          <h1>Đánh giá mức độ sẵn sàng xuất khẩu của doanh nghiệp</h1>
          <p className="assessment-hero__lead">
            Trả lời khảo sát gồm 3 phần - thông tin doanh nghiệp, 20 câu chấm
            điểm theo đúng tình trạng xuất khẩu của bạn và nhu cầu hỗ trợ - để
            biết doanh nghiệp của bạn đang ở đâu trên thang 100 điểm, từ chưa
            sẵn sàng, đang chuẩn bị, sẵn sàng xuất khẩu đến sẵn sàng toàn cầu.
          </p>
        </div>
      </section>

      <section className="section assessment-section">
        <div className="section__inner">
          <AssessmentForm />
        </div>
      </section>
    </main>
  );
}
