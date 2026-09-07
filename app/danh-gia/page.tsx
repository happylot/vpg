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
          <div className="assessment-hero__lead">
            <p>
              Công ty Cổ phần Kết nối Thương mại Toàn cầu MCV là đơn vị kết
              nối thương mại và đồng hành cùng doanh nghiệp Việt trên hành
              trình xuất khẩu — từ chuẩn hóa sản phẩm, kết nối đối tác quốc tế
              đến vận hành đơn hàng xuyên biên giới.
            </p>
            <p>
              Chúng tôi thiết lập bảng khảo sát với mong muốn giúp doanh
              nghiệp của Quý Anh/Chị sẽ được chấm điểm trên 8 tiêu chí xuất
              khẩu (sản phẩm, chứng nhận, sản xuất, bán hàng quốc tế, thương
              hiệu, giá, năng lực số, cam kết lãnh đạo) và nhận về bản kết quả
              kèm khuyến nghị lộ trình riêng — biết doanh nghiệp mình đang
              đứng ở đâu và cần chuẩn bị gì để đưa sản phẩm ra thị trường thế
              giới.
            </p>
            <p>
              Vui lòng trả lời đúng thực tế hiện tại — không có câu trả lời
              đẹp hay xấu, chỉ có bức tranh chính xác để chúng tôi tư vấn
              đúng.
            </p>
            <p className="assessment-hero__lead-note">
              Chúng tôi cam kết thông tin của Anh/Chị chỉ dùng cho mục đích
              đánh giá, tư vấn, được bảo mật và không chia sẻ cho bên thứ ba.
            </p>
          </div>
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
