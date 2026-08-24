const pillars = [
  {
    title: "VPG Academy",
    eyebrow: "01",
    text: "Đào tạo thực chiến về nền tảng xuất khẩu, sẵn sàng sản phẩm, bán hàng quốc tế, marketing toàn cầu và AI for Export.",
  },
  {
    title: "VPG Roadshow",
    eyebrow: "02",
    text: "Chuỗi chương trình tại các tỉnh thành, kết hợp market update, masterclass, case study, expert panel và business matching.",
  },
  {
    title: "VPG Community",
    eyebrow: "03",
    text: "Biến mỗi sự kiện thành một cộng đồng liên tục: doanh nghiệp có profile, nhu cầu, thị trường mục tiêu và cơ hội kết nối.",
  },
  {
    title: "Expert Network",
    eyebrow: "04",
    text: "Mạng lưới chuyên gia đang trực tiếp làm thị trường: logistics, compliance, legal, branding, e-commerce, AI và export sales.",
  },
  {
    title: "Global Connection",
    eyebrow: "05",
    text: "Kết nối buyer, importer, distributor, marketplace và tổ chức quốc tế thông qua Buyer Day và Global Sourcing Day.",
  },
];

const journey = [
  "Discover",
  "Learn",
  "Assess",
  "Prepare",
  "Connect",
  "Export",
  "Scale",
];

const partnerTiers = [
  {
    name: "Strategic Partner",
    detail:
      "Đồng hành dài hạn trên quy mô toàn quốc, đóng góp nguồn lực chiến lược và tham gia chuỗi Roadshow.",
    contribution: "300-500M+ / năm",
  },
  {
    name: "Core Partner",
    detail:
      "Cung cấp giải pháp thiết yếu cho hành trình xuất khẩu: logistics, certification, legal, sales, marketing.",
    contribution: "100-200M / năm",
  },
  {
    name: "Supporting Partner",
    detail:
      "Đồng hành theo một chương trình, địa phương, roadshow hoặc chiến dịch cụ thể bằng tài trợ và nguồn lực.",
    contribution: "20-50M / event",
  },
  {
    name: "Knowledge Partner",
    detail:
      "Đóng góp tri thức, kinh nghiệm, case study, mentoring và nội dung cho VPG Academy và Export Clinic.",
    contribution: "Knowledge Contribution",
  },
];

const readiness = [
  ["Product Readiness", 20],
  ["Certification & Compliance", 15],
  ["Production Capacity", 15],
  ["Export Sales Capability", 15],
  ["International Branding", 10],
  ["Pricing Competitiveness", 10],
  ["Digital Capability", 10],
  ["Management Commitment", 5],
];

const kpis = [
  ["12", "tỉnh thành"],
  ["15-20", "sự kiện"],
  ["3.000+", "doanh nghiệp tham dự"],
  ["500", "Export Assessment"],
  ["100+", "buyer quốc tế"],
  ["20-30", "success stories"],
];

export default function Home() {
  return (
    <main>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__visual" aria-hidden="true" />
        <div className="hero__shade" aria-hidden="true" />
        <nav className="nav" aria-label="Điều hướng VPG">
          <a className="brand" href="#top" aria-label="VPG home">
            <span>VPG</span>
            <small>Vietnam Products Go Global</small>
          </a>
          <div className="nav__links">
            <a href="#pillars">Trụ cột</a>
            <a href="#model">Mô hình</a>
            <a href="#partners">Partner Pool</a>
          </div>
        </nav>

        <div className="hero__content" id="top">
          <p className="kicker">Vietnam Products. Global Markets.</p>
          <h1 id="hero-title">VPG</h1>
          <h2>Vietnam Products Go Global</h2>
          <p className="hero__lead">
            Dự án cộng đồng do JCI Grace tổ chức, kết nối tri thức, chuyên gia,
            đối tác và cơ hội thị trường để giúp doanh nghiệp Việt Nam đưa sản
            phẩm ra thế giới.
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
            <span>Mission</span>
            <strong>Đưa sản phẩm Việt ra thế giới</strong>
          </div>
          <div>
            <span>Model</span>
            <strong>Community - Partner - Beneficiary</strong>
          </div>
          <div>
            <span>North Star</span>
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
              VPG giúp doanh nghiệp sản xuất, SME, local brand, hợp tác xã,
              doanh nghiệp OCOP và các đơn vị đã xuất khẩu giảm chi phí thử-sai
              trong hành trình quốc tế hóa.
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
          <p className="section-label">Enterprise Journey</p>
          <h2>Một funnel thống nhất từ nhận biết đến mở rộng thị trường.</h2>
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
              Từ đào tạo đến kết nối buyer, VPG thiết kế một vòng lặp tăng
              trưởng cho doanh nghiệp.
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
              JCI Grace kiến tạo, Partner đóng góp, doanh nghiệp Việt học và
              tăng trưởng.
            </h2>
            <p className="section-copy">
              Nền tảng VPG được quản trị theo nguyên tắc Community First, Value
              Before Sales, Neutral Platform, Quality Control và Impact
              Measurement.
            </p>
          </div>
          <div className="model-flow" aria-label="Mô hình vận hành VPG">
            <div className="flow-node flow-node--top">JCI Grace</div>
            <div className="flow-row">
              <div className="flow-node">Partner Pool</div>
              <div className="flow-node">Expert Network</div>
            </div>
            <div className="flow-node flow-node--wide">
              Academy - Roadshow - Workshop - Export Clinic - Buyer Day
            </div>
            <div className="flow-node flow-node--gold">Vietnamese Enterprises</div>
            <div className="flow-node flow-node--market">Global Market</div>
          </div>
        </div>
      </section>

      <section className="readiness section">
        <div className="section__inner section__inner--split">
          <div>
            <p className="section-label">Export Readiness Score</p>
            <h2>Một IP riêng để đo lường tiến bộ của doanh nghiệp.</h2>
            <p className="section-copy">
              Mỗi doanh nghiệp được đánh giá trên thang 100 điểm, từ Not Ready,
              Preparing, Export Ready đến Global Ready.
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
            <p className="section-label">VPG Partner Pool</p>
            <h2>
              Hệ sinh thái đối tác đóng góp nguồn lực trước, xây dựng uy tín
              sau, phát sinh business minh bạch.
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
            <p className="section-label">KPI năm đầu tiên</p>
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
          <p className="section-label">More Vietnamese Products Go Global</p>
          <h2>
            VPG tạo giá trị cộng đồng trước, thương mại hóa hệ sinh thái sau.
          </h2>
          <a className="button button--primary" href="#partners">
            Kết nối với VPG
          </a>
        </div>
      </section>
    </main>
  );
}
