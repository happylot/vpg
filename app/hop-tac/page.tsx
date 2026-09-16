import type { Metadata } from "next";
import { SiteNav } from "../components/site-nav";
import { PartnerForm } from "./partner-form";

export const metadata: Metadata = {
  title: "Hợp tác cùng MCV | Vproud",
  description:
    "Đưa danh mục sản phẩm Việt Nam chinh phục thị trường bán lẻ trực tuyến Hoa Kỳ cùng MCV - nhà máy lo sản xuất, MCV lo đầu ra & thị trường.",
};

const painPoints = [
  {
    title: "Phụ Thuộc Gia Công Truyền Thống (B2B)",
    points: [
      "Biên lợi nhuận mỏng.",
      "Rủi ro đứt gãy đơn hàng cao.",
      "Không sở hữu tệp khách hàng cuối.",
    ],
  },
  {
    title: "Rào Cản & Rủi Ro Tự Vận Hành",
    points: [
      "Thiếu chuyên môn bản địa (thuật toán Amazon/Walmart).",
      "Rủi ro tiêu chuẩn đóng gói, hải quan Mỹ và luật Sở hữu trí tuệ.",
    ],
  },
  {
    title: "Áp Lực Tồn Kho & Lãng Phí Công Suất",
    points: [
      "Dây chuyền và khuôn mẫu đã đầu tư sẵn nhưng chưa khai thác hết công suất cho thị trường quốc tế.",
    ],
  },
];

const pillars = [
  {
    title: "Hạ Tầng Bán Hàng Đa Sàn",
    text: "Quản trị tập trung Amazon (FBA), Walmart (WFS), và Wayfair (nội thất/decor).",
  },
  {
    title: "Nghiên Cứu Thị Trường & Dữ Liệu",
    text: "Phân tích dung lượng, mức độ cạnh tranh và định giá tối ưu dựa trên dữ liệu thật.",
  },
  {
    title: "Xây Dựng Thương Hiệu & Tối Ưu Chuyển Đổi",
    text: "Đăng ký Brand Registry, thiết kế 3D render, video & nội dung A+ chuẩn thị hiếu Mỹ.",
  },
  {
    title: "Chiến Lược Traffic & Quảng Cáo (PPC)",
    text: "Điều phối PPC đa tầng (Sponsored Products, Brands, Display, DSP), tối ưu ACOS/TACOS.",
  },
  {
    title: "Logistics Xuyên Biên Giới",
    text: "Tối ưu vận tải biển/air, thông quan, kho bãi nội địa Mỹ & mạng lưới kho đệm 3PL.",
  },
];

const factoryResponsibilities = [
  { label: "Sản phẩm", text: "Cấp danh mục sản phẩm sẵn có, bản vẽ, câu chuyện chế tác." },
  { label: "Chất lượng", text: "Tiêu chuẩn an toàn, chứng chỉ (FDA, FSC, EPA)." },
  { label: "Đóng gói", text: "Chuẩn thùng carton/pallet (drop test, barcode) & giao hàng cảng (FOB)." },
  { label: "Bảo hành", text: "Hỗ trợ kỹ thuật/lỗi sản xuất." },
];

const mcvResponsibilities = [
  { label: "Listing & Brand", text: "Lọc SKU tiềm năng, lập tài khoản, bảo vệ brand, thiết kế A+." },
  { label: "Tăng trưởng", text: "Ngân sách quảng cáo, xử lý Deals/Coupons (Prime Day)." },
  { label: "Logistics", text: "Cước biển/air, thông quan Mỹ, kéo hàng FBA/WFS/3PL." },
  { label: "CSKH", text: "Hỗ trợ khách Mỹ 24/7, quản lý Review & Return Rate." },
];

const riskDefense = [
  {
    label: "Kiểm soát Hải quan & Nhập kho",
    text: "Xử lý chuẩn xác tem nhãn (prep/labeling), drop test, tránh hàng bị từ chối nhập kho FBA/WFS.",
  },
  {
    label: "Bảo vệ Tài khoản",
    text: "Quản lý sức khỏe tài khoản (Account Health), tránh vi phạm thuật toán và luật Sở hữu trí tuệ.",
  },
  {
    label: "Tồn kho linh hoạt",
    text: "Kết hợp kho 3PL tại Mỹ để tránh phí lưu kho dài hạn cắt cổ trên sàn.",
  },
];

const riskOffense = [
  {
    label: "Unit Economics",
    text: "Dự báo tài chính chi tiết tới từng SKU trước khi xuất hàng (đảm bảo khả năng sinh lời).",
  },
  {
    label: "Tối ưu Quảng cáo",
    text: "Quản trị ngân sách PPC đa tầng nghiêm ngặt, giữ ACOS/TACOS luôn trong ngưỡng an toàn.",
  },
  {
    label: "Tăng tỷ lệ chuyển đổi",
    text: "Đẩy mạnh hình ảnh 3D/Video chuẩn Mỹ để bán được giá cao.",
  },
];

const roadmapPhases = [
  {
    phase: "Giai đoạn 1 (Tháng 1-2)",
    title: "Thử nghiệm & Kiểm chứng (Pilot)",
    goal: "Đưa hàng sang Mỹ nhanh nhất, test tỷ lệ chuyển đổi thực tế.",
    detail:
      "Lọc 3-5 SKU chủ lực (kích thước tối ưu, khó vỡ, giá bán lẻ $25-$80). Vận chuyển lô nhỏ (LCL/Air) trực tiếp vào kho Mỹ. Lên listing chuẩn SEO, lấy Early Reviews (Amazon Vine).",
  },
  {
    phase: "Giai đoạn 2 (Tháng 3-5)",
    title: "Chuẩn hóa & Mở rộng quy mô (Scale-up)",
    goal: "Tối ưu chi phí logistics, phủ sóng đa sàn (Walmart, Wayfair).",
    detail:
      "Chuyển sang xuất khẩu nguyên container (FCL) để ép cước phí vận chuyển. Đẩy Winning Products sang Walmart Marketplace & Wayfair. Thiết lập Lead-time và chu kỳ đặt hàng.",
  },
  {
    phase: "Giai đoạn 3 (Tháng 6+)",
    title: "Tùy biến & Độc quyền (Exclusive)",
    goal: "Ra mắt phiên bản cải tiến, triệt tiêu cạnh tranh về giá.",
    detail:
      "Nhà máy tùy biến sản xuất theo insight khách hàng: combo (bundle), màu sắc/kích thước độc quyền, bao bì thương hiệu riêng - dựa trên dữ liệu hành vi và đánh giá thực tế từ người dùng Mỹ.",
  },
];

const financeOptions = [
  {
    name: "Option A: Chia Sẻ Lợi Nhuận (Profit Sharing)",
    thinking: "Tối ưu hóa biên lợi nhuận dài hạn.",
    action:
      "Đồng hành cùng sự bùng nổ của sản phẩm. Hai bên cùng chia sẻ rủi ro và thành quả kinh doanh trực tiếp tại Mỹ.",
  },
  {
    name: "Option B: Mua Đứt Gối Đầu (Wholesale)",
    thinking: "Ưu tiên an toàn tài chính tuyệt đối.",
    action:
      "Tập trung thuần túy vào sản xuất. Đảm bảo dòng tiền ổn định và sản lượng đầu ra không bị ảnh hưởng bởi biến động sàn.",
  },
];

const financeComparisonRows = [
  {
    label: "Cơ chế Giá & Cung cấp",
    profitSharing: "Nhà máy cấp hàng theo giá xuất xưởng (FOB/Ex-works).",
    wholesale: "MCV thu mua trực tiếp, cam kết sản lượng định kỳ.",
  },
  {
    label: "Thỏa thuận Thanh toán",
    profitSharing: "Chia % lợi nhuận ròng sau khi trừ chi phí.",
    wholesale: "Nhà máy cấp công nợ gối đầu 30-60 ngày. Nhận tiền theo tiến độ.",
  },
  {
    label: "Quyền Phân phối",
    profitSharing: "Hợp tác vận hành trên các SKU được chọn lọc.",
    wholesale: "Nhà máy cam kết độc quyền phân phối cho MCV trên sàn TMĐT Mỹ.",
  },
  {
    label: "Rủi ro Chi phí Vận hành",
    profitSharing: "Chi phí (sàn, kho, ads) trừ trực tiếp vào doanh thu trước khi chia.",
    wholesale: "MCV gánh 100% rủi ro biến động chi phí. Nhà máy an toàn tuyệt đối.",
  },
  {
    label: "Chân dung Phù hợp",
    profitSharing: "Muốn tối ưu biên lợi nhuận, đồng hành phát triển thương hiệu.",
    wholesale: "Ưu tiên dòng tiền đều, tập trung 100% vào năng lực sản xuất.",
  },
];

const unitEconomicsWaterfall = [
  { label: "Giá Bán Lẻ (Retail Price)", text: "Giá khách hàng Mỹ thanh toán ($)." },
  { label: "− Phí Nền Tảng (Platform Fees)", text: "Hoa hồng Amazon/Walmart (thường ~15%)." },
  { label: "− Phí Xử Lý Đơn Hàng (Fulfillment/FBA)", text: "Phí đóng gói, giao hàng chặng cuối tại Mỹ." },
  { label: "− Ngân Sách Quảng Cáo (PPC/ACOS)", text: "Chi phí marketing duy trì top hiển thị." },
  { label: "− Giá Vốn & Logistics (COGS + Freight)", text: "Giá FOB nhà máy + cước biển/thông quan." },
  { label: "= Lợi Nhuận Ròng (Net Profit)", text: "Dòng tiền thực tế mang về." },
];

const valueStats = [
  {
    stat: "100%",
    title: "Khai Thác Công Suất (Ready-to-ship)",
    text: "Biến khuôn mẫu, dây chuyền, và hàng lưu kho sẵn có thành dòng doanh thu mới mà không cần R&D lại sản phẩm.",
  },
  {
    stat: "0",
    title: "Chi Phí 'Thử Sai' Bản Địa",
    text: "Tránh hoàn toàn các khoản tiền phạt, khóa tài khoản, hoặc lưu kho cắt cổ do thiếu kinh nghiệm vận hành Amazon/hải quan Mỹ.",
  },
  {
    stat: "1",
    title: "Cầu Nối Toàn Diện",
    text: "Hệ sinh thái trọn gói từ Logistics, Kho bãi, đến Quảng cáo. Nhà máy chỉ cần sản xuất, MCV giải quyết toàn bộ đầu ra.",
  },
];

const launchSequence = [
  {
    step: "Bước 1",
    title: "Cung cấp Dữ liệu (Nhà máy)",
    text: "Gửi danh mục sản phẩm (Catalog) hiện có kèm thông số kỹ thuật (Kích thước, Trọng lượng) và Giá xuất xưởng (FOB).",
  },
  {
    step: "Bước 2",
    title: "Báo cáo Tiền khả thi (MCV - Trong 3 đến 5 ngày)",
    text: "MCV phản hồi Bảng dự phóng Unit Economics chi tiết: định giá bán tại Mỹ, chi phí sàn/logistics ước tính và lợi nhuận kỳ vọng cho từng SKU.",
  },
  {
    step: "Bước 3",
    title: "Chốt Phương án & Ký kết (MOU)",
    text: "Thống nhất mô hình tài chính (Profit Sharing hoặc Wholesale). Ký kết Biên bản ghi nhớ (MOU) và khởi động quy trình chuẩn bị hàng Giai đoạn 1.",
  },
];

const furnitureFactoryResponsibilities = [
  "Cung cấp danh mục sản phẩm (các dòng sản phẩm đã chọn lọc).",
  "Cung cấp hình ảnh & thông số kỹ thuật.",
  "Áp dụng chính sách giá sỉ (giá buôn).",
  "Hỗ trợ vận chuyển đến kho hoặc khách hàng.",
];

const furnitureMcvResponsibilities = [
  "Triển khai kênh bán hàng đa nền tảng (online & offline).",
  "Tư vấn & chốt đơn hàng.",
  "Xử lý đơn hàng toàn trình.",
  "Chăm sóc khách hàng hậu mãi.",
];

const furnitureProductStandards = [
  {
    title: "Sẵn Hàng Tồn Kho (Ready Stock)",
    text: "Đảm bảo khả năng cung ứng tức thì cho thị trường.",
  },
  {
    title: "Thông Số Rõ Ràng",
    text: "Minh bạch về kích thước, chất liệu và cấu tạo.",
  },
  {
    title: "Hình Ảnh & Video",
    text: "Cung cấp tư liệu thực tế, đạt chuẩn marketing chuyên nghiệp.",
  },
  {
    title: "Hướng Dẫn Lắp Ráp",
    text: "Bắt buộc có đối với trải nghiệm khách hàng tự lắp ráp.",
  },
];

const furnitureShipping = [
  {
    title: "Dropshipping",
    flow: "Nhà máy → Đơn vị vận chuyển → Trực tiếp đến khách hàng",
  },
  {
    title: "Giao sỉ nguyên lô",
    flow: "Nhà máy → Vận chuyển hỗ trợ → Kho tập kết của MCV",
  },
];

const furnitureLaunchSteps = [
  {
    step: "Bước 1",
    title: "Ký Kết (MOU)",
    text: "Ký thỏa thuận nguyên tắc, xác lập khuôn khổ hợp tác phân phối.",
  },
  {
    step: "Bước 2",
    title: "Bàn Giao",
    text: "Nhận Catalog, bảng giá sỉ, và toàn bộ tài liệu marketing từ nhà máy.",
  },
  {
    step: "Bước 3",
    title: "Phủ Sóng",
    text: "Đồng loạt niêm yết sản phẩm trên sàn TMĐT, mạng xã hội, và hệ thống cửa hàng.",
  },
  {
    step: "Bước 4",
    title: "Chuyển Đổi",
    text: "Phát sinh đơn hàng thực tế, MCV tiếp nhận và xử lý toàn trình đến tay khách hàng.",
  },
];

const resources = [
  {
    href: "/asset/partners/vietnam-manufacturing-us-ecommerce-blueprint.pdf",
    title: "Vietnam Manufacturing US E-commerce Blueprint",
    text: "Bản đề xuất tổng quát 14 trang: mô hình hợp tác, 5 trụ cột vận hành, lộ trình triển khai và phương án tài chính.",
  },
  {
    href: "/asset/partners/de-xuat-hop-tac-do-go.pdf",
    title: "Đề xuất hợp tác kinh doanh đồ gỗ",
    text: "Bản đề xuất riêng cho ngành đồ gỗ/nội thất: mô hình phân công trách nhiệm, tiêu chuẩn sản phẩm và cơ chế vận hành - tài chính.",
  },
];

export default function HopTacPage() {
  return (
    <main>
      <section className="assessment-hero">
        <div className="hero__visual" aria-hidden="true" />
        <div className="hero__shade" aria-hidden="true" />
        <SiteNav variant="sub" />
        <div className="assessment-hero__content">
          <p className="kicker">Bản đề xuất từ MCV</p>
          <h1>Hợp Tác Chiến Lược: Tối Ưu Hóa Năng Lực Sản Xuất</h1>
          <p className="assessment-hero__lead">
            Đưa danh mục sản phẩm Việt Nam chinh phục thị trường bán lẻ trực
            tuyến Hoa Kỳ một cách an toàn và tối ưu nhất - nhà máy lo sản
            xuất, MCV lo đầu ra & thị trường.
          </p>
          <a className="button button--primary partner-hero__cta" href="#dang-ky-hop-tac">
            Đăng ký hợp tác ngay
          </a>
        </div>
      </section>

      <section className="section partner-section">
        <div className="section__inner">
          <p className="section-label">Bài toán trọng điểm</p>
          <h2>Vì sao nhà máy sản xuất Việt Nam khó tự vào thị trường Mỹ?</h2>
          <div className="partner-pain-grid">
            {painPoints.map((item) => (
              <div className="partner-pain-card" key={item.title}>
                <h3>{item.title}</h3>
                <ul>
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section partner-section partner-section--alt">
        <div className="section__inner">
          <p className="section-label">MCV: Cây cầu rút ngắn khoảng cách xuyên biên giới</p>
          <h2>Giải phóng công suất sản xuất hiện tại thành doanh thu D2C trực tiếp tại Mỹ</h2>
          <div className="partner-bridge">
            <div className="partner-bridge__side">
              <h3>Nhà Máy VN</h3>
              <p>Tận dụng 100% năng lực "Ready-to-Ship". Không chi phí đầu tư lại sản phẩm.</p>
            </div>
            <div className="partner-bridge__arrow" aria-hidden="true">
              →
            </div>
            <div className="partner-bridge__side partner-bridge__side--highlight">
              <h3>Thị Trường Mỹ</h3>
              <p>Thương mại hóa thần tốc, sở hữu khách hàng cuối, với mức rủi ro tiệm cận 0.</p>
            </div>
          </div>

          <h3 className="partner-subheading">5 trụ cột năng lực vận hành thực chiến từ MCV</h3>
          <div className="partner-pillar-list">
            {pillars.map((pillar, index) => (
              <div className="partner-pillar-row" key={pillar.title}>
                <span className="partner-pillar-row__index">{index + 1}</span>
                <div>
                  <h4>{pillar.title}</h4>
                  <p>{pillar.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section partner-section">
        <div className="section__inner">
          <p className="section-label">Phân định trách nhiệm</p>
          <h2>Chuyên môn hóa tuyệt đối - 0% chồng chéo vận hành</h2>
          <div className="partner-split">
            <div className="partner-split__col">
              <h3>Nhà Máy lo Sản Xuất</h3>
              <dl className="partner-split__list">
                {factoryResponsibilities.map((item) => (
                  <div key={item.label}>
                    <dt>{item.label}</dt>
                    <dd>{item.text}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="partner-split__col partner-split__col--highlight">
              <h3>MCV lo Đầu Ra & Thị Trường</h3>
              <dl className="partner-split__list">
                {mcvResponsibilities.map((item) => (
                  <div key={item.label}>
                    <dt>{item.label}</dt>
                    <dd>{item.text}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <h3 className="partner-subheading">Chiến lược triệt tiêu rủi ro & tối đa hóa biên lợi nhuận</h3>
          <div className="partner-split">
            <div className="partner-split__col">
              <h3>Phòng Thủ (Triệt tiêu phí "thử sai")</h3>
              <dl className="partner-split__list">
                {riskDefense.map((item) => (
                  <div key={item.label}>
                    <dt>{item.label}</dt>
                    <dd>{item.text}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="partner-split__col partner-split__col--highlight">
              <h3>Tấn Công (Tối ưu chuyển đổi & lợi nhuận)</h3>
              <dl className="partner-split__list">
                {riskOffense.map((item) => (
                  <div key={item.label}>
                    <dt>{item.label}</dt>
                    <dd>{item.text}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section className="section partner-section partner-section--alt">
        <div className="section__inner">
          <p className="section-label">Lộ trình triển khai</p>
          <h2>3 giai đoạn chặt chẽ - từ thử nghiệm đến chiếm lĩnh thị trường</h2>
          <div className="partner-roadmap">
            {roadmapPhases.map((phase) => (
              <div className="partner-roadmap__card" key={phase.phase}>
                <p className="partner-roadmap__phase">{phase.phase}</p>
                <h3>{phase.title}</h3>
                <p className="partner-roadmap__goal">
                  <strong>Mục tiêu:</strong> {phase.goal}
                </p>
                <p>{phase.detail}</p>
              </div>
            ))}
          </div>
          <figure className="partner-figure">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/asset/partners/us-market-roadmap.jpg" alt="Lộ trình chinh phục thị trường Mỹ cùng MCV" />
            <figcaption>Chiến lược đưa sản phẩm Việt chinh phục thị trường Mỹ cùng MCV</figcaption>
          </figure>
        </div>
      </section>

      <section className="section partner-section">
        <div className="section__inner">
          <p className="section-label">Video giới thiệu</p>
          <h2>Xem MCV đồng hành cùng nhà máy Việt như thế nào</h2>
          <div className="partner-video-grid">
            <figure className="partner-video">
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
              <video controls preload="metadata" src="/asset/partners/chien-luoc-xuat-khau-my.mp4" />
              <figcaption>Chiến lược xuất khẩu Mỹ</figcaption>
            </figure>
            <figure className="partner-video">
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
              <video controls preload="metadata" src="/asset/partners/cach-xuong-viet-ban-truc-tiep-sang-my.mp4" />
              <figcaption>Cách xưởng Việt bán hàng trực tiếp sang Mỹ</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="section partner-section partner-section--alt">
        <div className="section__inner">
          <p className="section-label">Phương án tài chính</p>
          <h2>MCV thiết kế hai mô hình linh hoạt theo khẩu vị rủi ro của Ban Lãnh Đạo</h2>
          <div className="partner-finance-grid">
            {financeOptions.map((option) => (
              <div className="partner-finance-card" key={option.name}>
                <h3>{option.name}</h3>
                <p>
                  <strong>Tư duy:</strong> {option.thinking}
                </p>
                <p>
                  <strong>Hành động:</strong> {option.action}
                </p>
              </div>
            ))}
          </div>

          <div className="partner-table-wrap">
            <table className="partner-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Mô Hình Profit Sharing</th>
                  <th>Mô Hình Wholesale</th>
                </tr>
              </thead>
              <tbody>
                {financeComparisonRows.map((row) => (
                  <tr key={row.label}>
                    <th>{row.label}</th>
                    <td>{row.profitSharing}</td>
                    <td>{row.wholesale}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section partner-section">
        <div className="section__inner">
          <p className="section-label">Minh bạch dòng tiền</p>
          <h2>Cấu trúc Unit Economics ở cấp độ từng SKU</h2>
          <p className="partner-lead">
            MCV luôn thiết lập và thống nhất bảng Unit Economics mô phỏng với
            Nhà máy trước khi ký kết, đảm bảo tính khả thi của mọi SKU.
          </p>
          <div className="partner-waterfall">
            {unitEconomicsWaterfall.map((row) => (
              <div className="partner-waterfall__row" key={row.label}>
                <span>{row.label}</span>
                <strong>{row.text}</strong>
              </div>
            ))}
          </div>

          <div className="partner-stats">
            {valueStats.map((item) => (
              <div className="partner-stat-card" key={item.title}>
                <p className="partner-stat-card__number">{item.stat}</p>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section partner-section partner-section--alt">
        <div className="section__inner">
          <p className="section-label">Case study: Ngành đồ gỗ</p>
          <h2>Tối ưu tốc độ triển khai - bỏ qua khâu R&D, bán ngay hàng có sẵn</h2>
          <p className="partner-lead">
            Bỏ qua khâu R&D - đưa trực tiếp sản phẩm có sẵn từ nhà máy đến
            tay người tiêu dùng.
          </p>

          <h3 className="partner-subheading">
            Mô hình hợp tác gắn kết: phát huy tối đa thế mạnh
          </h3>
          <div className="partner-split">
            <div className="partner-split__col">
              <h3>Nhà Máy / Trung Tâm Sản Xuất</h3>
              <ul className="partner-plain-list">
                {furnitureFactoryResponsibilities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="partner-split__col partner-split__col--highlight">
              <h3>MCV / Trung Tâm Phân Phối</h3>
              <ul className="partner-plain-list">
                {furnitureMcvResponsibilities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <h3 className="partner-subheading">Tiêu chuẩn sản phẩm "Go-To-Market"</h3>
          <p className="partner-lead">
            Tập trung phân phối các dòng sản phẩm có sẵn của nhà máy nhằm
            tối đa hóa tốc độ bán hàng.
          </p>
          <div className="partner-pain-grid partner-pain-grid--four">
            {furnitureProductStandards.map((item) => (
              <div className="partner-pain-card" key={item.title}>
                <h3>{item.title}</h3>
                <p className="partner-pain-card__text">{item.text}</p>
              </div>
            ))}
          </div>

          <h3 className="partner-subheading">Cơ chế vận hành & tài chính chuyên nghiệp</h3>
          <div className="partner-finance-grid">
            <div className="partner-finance-card">
              <h3>Giá Vốn</h3>
              <p>Chiết khấu sâu theo bậc thang số lượng.</p>
            </div>
            <div className="partner-finance-card">
              <h3>Thanh Toán</h3>
              <p>Linh hoạt: gối đầu hoặc thanh toán theo đơn hàng thực tế (tùy thỏa thuận).</p>
            </div>
          </div>
          <div className="partner-shipping-grid">
            {furnitureShipping.map((item) => (
              <div className="partner-shipping-card" key={item.title}>
                <h4>{item.title}</h4>
                <p>{item.flow}</p>
              </div>
            ))}
          </div>

          <h3 className="partner-subheading">
            Kế hoạch triển khai: từ thỏa thuận đến đơn hàng đầu tiên
          </h3>
          <div className="partner-launch-steps">
            {furnitureLaunchSteps.map((step) => (
              <div className="partner-launch-step" key={step.step}>
                <p className="partner-launch-step__label">{step.step}</p>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>

          <figure className="partner-figure">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/asset/partners/furniture-partnership-model.jpg"
              alt="Mô hình hợp tác kinh doanh đồ gỗ giữa nhà máy và MCV"
            />
            <figcaption>
              Hợp tác kinh doanh đồ gỗ: tối ưu quy trình - bán hàng thần tốc
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="section partner-section">
        <div className="section__inner">
          <p className="section-label">Tài liệu tham khảo</p>
          <h2>Tải về bản đề xuất chi tiết</h2>
          <div className="partner-resource-grid">
            {resources.map((resource) => (
              <a className="partner-resource-card" href={resource.href} key={resource.href} target="_blank" rel="noreferrer">
                <h3>{resource.title}</h3>
                <p>{resource.text}</p>
                <span>Tải PDF →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section partner-section partner-section--alt" id="dang-ky-hop-tac">
        <div className="section__inner">
          <p className="section-label">Trình tự triển khai tiếp theo</p>
          <h2>Sẵn sàng bứt phá doanh thu?</h2>
          <p className="partner-lead">
            Hợp tác cùng MCV để đưa các sản phẩm có sẵn của bạn tiếp cận hàng
            triệu khách hàng ngay hôm nay.
          </p>
          <div className="partner-launch-steps">
            {launchSequence.map((step) => (
              <div className="partner-launch-step" key={step.step}>
                <p className="partner-launch-step__label">{step.step}</p>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>

          <PartnerForm />
        </div>
      </section>
    </main>
  );
}
