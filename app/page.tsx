const pillars = [
  {
    title: "Học viện VPG",
    eyebrow: "01",
    text: "Đào tạo thực chiến về nền tảng xuất khẩu, mức độ sẵn sàng của sản phẩm, bán hàng quốc tế, tiếp thị toàn cầu và ứng dụng AI cho xuất khẩu.",
  },
  {
    title: "Chuỗi chương trình địa phương",
    eyebrow: "02",
    text: "Các chương trình tại tỉnh thành, kết hợp cập nhật thị trường, lớp chuyên sâu, câu chuyện thực tế, thảo luận chuyên gia và kết nối kinh doanh.",
  },
  {
    title: "Cộng đồng VPG",
    eyebrow: "03",
    text: "Biến mỗi sự kiện thành một cộng đồng liên tục: doanh nghiệp có hồ sơ, nhu cầu, thị trường mục tiêu và cơ hội kết nối sau chương trình.",
  },
  {
    title: "Mạng lưới chuyên gia",
    eyebrow: "04",
    text: "Tập hợp chuyên gia đang trực tiếp làm thị trường trong hậu cần quốc tế, tuân thủ, pháp lý, xây dựng thương hiệu, thương mại điện tử, AI và bán hàng xuất khẩu.",
  },
  {
    title: "Kết nối toàn cầu",
    eyebrow: "05",
    text: "Kết nối nhà mua hàng, nhà nhập khẩu, nhà phân phối, sàn thương mại và tổ chức quốc tế thông qua ngày gặp gỡ nhà mua hàng và ngày kết nối nguồn cung toàn cầu.",
  },
];

const journey = [
  "Biết đến",
  "Học hỏi",
  "Đánh giá",
  "Chuẩn bị",
  "Kết nối",
  "Xuất khẩu",
  "Mở rộng",
];

const partnerTiers = [
  {
    name: "Đối tác chiến lược",
    detail:
      "Đồng hành dài hạn trên quy mô toàn quốc, đóng góp nguồn lực chiến lược và tham gia chuỗi chương trình địa phương.",
    contribution: "300-500 triệu+ / năm",
  },
  {
    name: "Đối tác cốt lõi",
    detail:
      "Cung cấp các giải pháp thiết yếu cho hành trình xuất khẩu: hậu cần quốc tế, chứng nhận, pháp lý, bán hàng và tiếp thị quốc tế.",
    contribution: "100-200 triệu / năm",
  },
  {
    name: "Đối tác đồng hành",
    detail:
      "Đồng hành theo một chương trình, một địa phương hoặc một chiến dịch cụ thể bằng tài trợ, hiện vật, công nghệ, địa điểm hoặc nhân sự.",
    contribution: "20-50 triệu / chương trình",
  },
  {
    name: "Đối tác chuyên môn",
    detail:
      "Đóng góp tri thức, kinh nghiệm, câu chuyện thực tế, hoạt động cố vấn và nội dung cho Học viện VPG và các phiên tư vấn xuất khẩu.",
    contribution: "Đóng góp tri thức",
  },
];

const readiness = [
  ["Độ sẵn sàng của sản phẩm", 20],
  ["Chứng nhận và tuân thủ", 15],
  ["Năng lực sản xuất", 15],
  ["Năng lực bán hàng xuất khẩu", 15],
  ["Thương hiệu quốc tế", 10],
  ["Sức cạnh tranh về giá", 10],
  ["Năng lực số", 10],
  ["Cam kết của ban lãnh đạo", 5],
];

const kpis = [
  ["12", "tỉnh thành"],
  ["15-20", "sự kiện"],
  ["3.000+", "doanh nghiệp tham dự"],
  ["500", "doanh nghiệp được đánh giá"],
  ["100+", "nhà mua hàng quốc tế"],
  ["20-30", "câu chuyện thành công"],
];

export default function Home() {
  return (
    <main>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__visual" aria-hidden="true" />
        <div className="hero__shade" aria-hidden="true" />
        <nav className="nav" aria-label="Điều hướng VPG">
          <a className="brand" href="#top" aria-label="Trang chủ VPG">
            <span>VPG</span>
            <small>Sản phẩm Việt vươn ra thế giới</small>
          </a>
          <div className="nav__links">
            <a href="#pillars">Trụ cột</a>
            <a href="#model">Mô hình</a>
            <a href="#partners">Đối tác</a>
          </div>
        </nav>

        <div className="hero__content" id="top">
          <p className="kicker">Sản phẩm Việt. Thị trường toàn cầu.</p>
          <h1 id="hero-title">VPG</h1>
          <h2>Sản phẩm Việt vươn ra thế giới</h2>
          <p className="hero__lead">
            Dự án cộng đồng do JCI Grace tổ chức, kết nối tri thức, chuyên gia,
            đối tác và cơ hội thị trường để giúp doanh nghiệp Việt Nam đưa sản
            phẩm ra thị trường quốc tế.
          </p>
          <div className="hero__actions">
            <a className="button button--primary" href="#journey">
              Khám phá hành trình
            </a>
            <a className="button button--ghost" href="#partners">
              Trở thành đối tác
            </a>
          </div>
        </div>

        <div className="hero__panel" aria-label="Trọng tâm của VPG">
          <div>
            <span>Sứ mệnh</span>
            <strong>Đưa sản phẩm Việt ra thế giới</strong>
          </div>
          <div>
            <span>Mô hình</span>
            <strong>Cộng đồng - Đối tác - Doanh nghiệp thụ hưởng</strong>
          </div>
          <div>
            <span>Chỉ số trọng tâm</span>
            <strong>Doanh nghiệp phát sinh giao dịch quốc tế</strong>
          </div>
        </div>
      </section>

      <section className="intro section">
        <div className="section__inner section__inner--split">
          <div>
            <p className="section-label">Sứ mệnh</p>
            <h2>
              Thu hẹp khoảng cách giữa sản phẩm tốt và khả năng bán ra thế
              giới.
            </h2>
          </div>
          <div className="intro__copy">
            <p>
              VPG giúp doanh nghiệp sản xuất, doanh nghiệp nhỏ và vừa, thương
              hiệu Việt, hợp tác xã, doanh nghiệp OCOP và các đơn vị đã xuất
              khẩu giảm chi phí thử-sai trong hành trình quốc tế hóa.
            </p>
            <p>
              Chương trình không chỉ dạy cách xuất khẩu. VPG xây dựng một hệ
              sinh thái để doanh nghiệp hiểu thị trường, chuẩn hóa sản phẩm, tìm
              khách hàng, xuất khẩu và mở rộng thị trường.
            </p>
          </div>
        </div>
      </section>

      <section className="journey section" id="journey">
        <div className="section__inner">
          <p className="section-label">Hành trình doanh nghiệp</p>
          <h2>Một lộ trình thống nhất từ nhận biết đến mở rộng thị trường.</h2>
          <div className="journey__track" aria-label="Hành trình doanh nghiệp trong VPG">
            {journey.map((step, index) => (
              <div className="journey__step" key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{step}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pillars section" id="pillars">
        <div className="section__inner">
          <div className="section__head">
            <p className="section-label">5 trụ cột hoạt động</p>
            <h2>
              Từ đào tạo đến kết nối nhà mua hàng, VPG thiết kế một vòng lặp
              tăng trưởng cho doanh nghiệp.
            </h2>
          </div>
          <div className="pillar-grid">
            {pillars.map((pillar) => (
              <article className="pillar-card" key={pillar.title}>
                <span>{pillar.eyebrow}</span>
                <h3>{pillar.title}</h3>
                <p>{pillar.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="model section" id="model">
        <div className="section__inner section__inner--split">
          <div>
            <p className="section-label">Mô hình vận hành</p>
            <h2>
              JCI Grace kiến tạo, đối tác đóng góp, doanh nghiệp Việt học và
              tăng trưởng.
            </h2>
            <p className="section-copy">
              Nền tảng VPG được quản trị theo các nguyên tắc: đặt cộng đồng ở
              trung tâm, tạo giá trị trước khi bán hàng, giữ vai trò trung lập,
              kiểm soát chất lượng và đo lường tác động thực tế.
            </p>
          </div>
          <div className="model-flow" aria-label="Mô hình vận hành VPG">
            <div className="flow-node flow-node--top">JCI Grace</div>
            <div className="flow-row">
              <div className="flow-node">Hệ sinh thái đối tác</div>
              <div className="flow-node">Mạng lưới chuyên gia</div>
            </div>
            <div className="flow-node flow-node--wide">
              Đào tạo - Chương trình địa phương - Hội thảo chuyên sâu - Tư vấn
              xuất khẩu - Ngày gặp gỡ nhà mua hàng
            </div>
            <div className="flow-node flow-node--gold">Doanh nghiệp Việt Nam</div>
            <div className="flow-node flow-node--market">Thị trường toàn cầu</div>
          </div>
        </div>
      </section>

      <section className="readiness section">
        <div className="section__inner section__inner--split">
          <div>
            <p className="section-label">Thang điểm sẵn sàng xuất khẩu</p>
            <h2>Một phương pháp riêng để đo lường tiến bộ của doanh nghiệp.</h2>
            <p className="section-copy">
              Mỗi doanh nghiệp được đánh giá trên thang 100 điểm, từ chưa sẵn
              sàng, đang chuẩn bị, sẵn sàng xuất khẩu đến sẵn sàng toàn cầu.
            </p>
          </div>
          <div className="score-list">
            {readiness.map(([label, score]) => (
              <div className="score-row" key={label}>
                <span>{label}</span>
                <div className="score-row__bar">
                  <i style={{ width: `${Number(score) * 5}%` }} />
                </div>
                <strong>{score}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="partners section" id="partners">
        <div className="section__inner">
          <div className="section__head">
            <p className="section-label">Hệ sinh thái đối tác VPG</p>
            <h2>
              Đối tác đóng góp nguồn lực trước, xây dựng uy tín sau, rồi phát
              sinh cơ hội kinh doanh trên nguyên tắc minh bạch.
            </h2>
          </div>
          <div className="partner-grid">
            {partnerTiers.map((tier) => (
              <article className="partner-card" key={tier.name}>
                <h3>{tier.name}</h3>
                <p>{tier.detail}</p>
                <span>{tier.contribution}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="impact section">
        <div className="section__inner">
          <div className="section__head">
            <p className="section-label">Chỉ tiêu năm đầu tiên</p>
            <h2>
              Thành công được đo bằng tác động thực tế, không chỉ bằng số người
              tham dự.
            </h2>
          </div>
          <div className="kpi-grid">
            {kpis.map(([value, label]) => (
              <div className="kpi" key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="finale">
        <div className="finale__inner">
          <p className="section-label">Thêm nhiều sản phẩm Việt vươn ra thế giới</p>
          <h2>
            VPG tạo giá trị cộng đồng trước, phát triển hệ sinh thái bền vững
            sau.
          </h2>
          <a className="button button--primary" href="#partners">
            Kết nối với VPG
          </a>
        </div>
      </section>
    </main>
  );
}
