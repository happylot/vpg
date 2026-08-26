export type EventAgendaItem = {
  time: string;
  title: string;
  desc: string;
};

export type EventSpeaker = {
  name: string;
  role: string;
  bio: string;
};

export type VpgEvent = {
  slug: string;
  category: string;
  title: string;
  summary: string;
  description: string[];
  dateLabel: string;
  timeLabel: string;
  isoDate: string;
  location: string;
  venue: string;
  format: "Trực tiếp" | "Trực tuyến";
  price: string;
  capacity: string;
  cover: string;
  highlights: string[];
  audience: string;
  agenda: EventAgendaItem[];
  speakers: EventSpeaker[];
};

export const events: VpgEvent[] = [
  {
    slug: "ngay-hoi-san-pham-viet-vuon-ra-the-gioi-2026",
    category: "Sự kiện khởi động",
    title: "Ngày hội Sản phẩm Việt vươn ra thế giới 2026",
    summary:
      "Sự kiện khởi động chuỗi hoạt động Vproud năm 2026, quy tụ doanh nghiệp, chuyên gia và đối tác cùng công bố hành trình đưa sản phẩm Việt ra thị trường quốc tế.",
    description: [
      "Ngày hội khởi động đánh dấu năm hoạt động đầu tiên của Vproud, nơi doanh nghiệp Việt Nam gặp mạng lưới chuyên gia, đối tác và nhà mua hàng quốc tế trong một không gian duy nhất.",
      "Chương trình công bố Thang điểm sẵn sàng xuất khẩu, giới thiệu chuỗi chương trình địa phương năm 2026 và mở đăng ký cho Học viện Vproud.",
    ],
    dateLabel: "14/03/2026",
    timeLabel: "08:30 - 17:00",
    isoDate: "2026-03-14",
    location: "Hà Nội",
    venue: "Trung tâm Hội nghị Quốc gia, Hà Nội",
    format: "Trực tiếp",
    price: "Miễn phí",
    capacity: "500 doanh nghiệp",
    cover: "/asset/events/9.jpg",
    highlights: [
      "Công bố Thang điểm sẵn sàng xuất khẩu dành cho doanh nghiệp Việt",
      "Kết nối trực tiếp với mạng lưới chuyên gia và đối tác chiến lược Vproud",
      "Mở đăng ký Học viện Vproud và chuỗi chương trình địa phương 2026",
      "Khu trưng bày sản phẩm Việt có câu chuyện, có bản sắc",
    ],
    audience:
      "Doanh nghiệp sản xuất, doanh nghiệp nhỏ và vừa, hợp tác xã, doanh nghiệp OCOP và các đơn vị đã hoặc đang chuẩn bị xuất khẩu.",
    agenda: [
      {
        time: "08:30",
        title: "Đón khách và trưng bày sản phẩm Việt",
        desc: "Tham quan khu trưng bày sản phẩm có câu chuyện, kết nối sớm với đối tác và chuyên gia.",
      },
      {
        time: "09:30",
        title: "Khai mạc và giới thiệu mô hình Vproud",
        desc: "JCI Grace giới thiệu sứ mệnh, mô hình vận hành và chỉ tiêu năm đầu tiên của Vproud.",
      },
      {
        time: "10:30",
        title: "Công bố Thang điểm sẵn sàng xuất khẩu",
        desc: "Giới thiệu phương pháp đánh giá 100 điểm và cách doanh nghiệp có thể tự chấm điểm hành trình xuất khẩu.",
      },
      {
        time: "14:00",
        title: "Bàn tròn chuyên gia: Từ sản phẩm tốt đến thị trường quốc tế",
        desc: "Chuyên gia hậu cần, pháp lý, thương hiệu và bán hàng xuất khẩu chia sẻ kinh nghiệm thực chiến.",
      },
      {
        time: "16:00",
        title: "Kết nối doanh nghiệp - đối tác - nhà mua hàng",
        desc: "Không gian kết nối mở, doanh nghiệp trao đổi trực tiếp với đối tác và nhà mua hàng quan tâm.",
      },
    ],
    speakers: [
      {
        name: "Đại diện JCI Grace",
        role: "Đơn vị khởi xướng Vproud",
        bio: "Giới thiệu sứ mệnh, mô hình cộng đồng - đối tác - doanh nghiệp thụ hưởng và định hướng năm 2026.",
      },
      {
        name: "Chuyên gia hậu cần quốc tế",
        role: "Mạng lưới chuyên gia Vproud",
        bio: "Nhiều năm tư vấn xuất nhập khẩu, am hiểu chứng nhận, thủ tục hải quan và vận chuyển quốc tế.",
      },
      {
        name: "Chuyên gia xây dựng thương hiệu",
        role: "Mạng lưới chuyên gia Vproud",
        bio: "Đồng hành cùng thương hiệu Việt trong việc kể chuyện sản phẩm và định vị trên thị trường quốc tế.",
      },
    ],
  },
  {
    slug: "hoc-vien-vpg-san-sang-xuat-khau",
    category: "Đào tạo thực chiến",
    title: "Học viện Vproud: Sẵn sàng xuất khẩu",
    summary:
      "Khóa đào tạo thực chiến giúp doanh nghiệp tự đánh giá mức độ sẵn sàng, chuẩn hóa sản phẩm và xây dựng năng lực bán hàng xuất khẩu.",
    description: [
      "Học viện Vproud là chương trình đào tạo cốt lõi, cung cấp kiến thức nền tảng về xuất khẩu, mức độ sẵn sàng của sản phẩm, bán hàng quốc tế, tiếp thị toàn cầu và ứng dụng AI cho xuất khẩu.",
      "Kết thúc khóa học, doanh nghiệp nhận được bản đánh giá sẵn sàng xuất khẩu và lộ trình cải thiện cụ thể theo thang điểm 100.",
    ],
    dateLabel: "18/04/2026",
    timeLabel: "08:00 - 16:30",
    isoDate: "2026-04-18",
    location: "TP. Hồ Chí Minh",
    venue: "Khách sạn Rex Saigon, Quận 1, TP. Hồ Chí Minh",
    format: "Trực tiếp",
    price: "Miễn phí cho thành viên Vproud",
    capacity: "200 doanh nghiệp",
    cover: "/asset/events/ai-ceo.jpg",
    highlights: [
      "Tự đánh giá mức độ sẵn sàng xuất khẩu theo 8 tiêu chí cốt lõi",
      "Thực hành xây dựng hồ sơ sản phẩm chuẩn xuất khẩu",
      "Hướng dẫn ứng dụng AI trong tìm kiếm khách hàng và tiếp thị toàn cầu",
      "Nhận lộ trình cải thiện cá nhân hóa theo từng doanh nghiệp",
    ],
    audience:
      "Chủ doanh nghiệp, quản lý bán hàng và marketing của doanh nghiệp sản xuất, thương hiệu Việt đang chuẩn bị hoặc mới bắt đầu xuất khẩu.",
    agenda: [
      {
        time: "08:00",
        title: "Đăng ký và khảo sát sẵn sàng xuất khẩu",
        desc: "Doanh nghiệp hoàn thành bảng khảo sát nhanh để xác định điểm khởi đầu.",
      },
      {
        time: "09:00",
        title: "Nền tảng xuất khẩu và mức độ sẵn sàng sản phẩm",
        desc: "Phân tích 8 tiêu chí đánh giá: sản phẩm, chứng nhận, sản xuất, bán hàng, thương hiệu, giá, số hóa, cam kết lãnh đạo.",
      },
      {
        time: "11:00",
        title: "Bán hàng quốc tế và tiếp thị toàn cầu",
        desc: "Xây dựng kênh bán hàng B2B, làm việc với nhà nhập khẩu và sàn thương mại quốc tế.",
      },
      {
        time: "14:00",
        title: "Ứng dụng AI cho xuất khẩu",
        desc: "Thực hành dùng công cụ AI để nghiên cứu thị trường, soạn nội dung và tìm khách hàng mục tiêu.",
      },
      {
        time: "16:00",
        title: "Nhận lộ trình cải thiện cá nhân hóa",
        desc: "Mỗi doanh nghiệp nhận bản tổng hợp điểm số và khuyến nghị ưu tiên cải thiện.",
      },
    ],
    speakers: [
      {
        name: "Giảng viên Học viện Vproud",
        role: "Đào tạo xuất khẩu thực chiến",
        bio: "Trực tiếp xây dựng khung đánh giá sẵn sàng xuất khẩu và đồng hành cùng doanh nghiệp OCOP, doanh nghiệp vừa và nhỏ.",
      },
      {
        name: "Chuyên gia thương mại điện tử xuyên biên giới",
        role: "Mạng lưới chuyên gia Vproud",
        bio: "Có kinh nghiệm đưa sản phẩm Việt lên các sàn thương mại điện tử quốc tế.",
      },
      {
        name: "Chuyên gia ứng dụng AI cho doanh nghiệp",
        role: "Mạng lưới chuyên gia Vproud",
        bio: "Hướng dẫn doanh nghiệp nhỏ và vừa ứng dụng AI vào nghiên cứu thị trường và tiếp thị quốc tế.",
      },
    ],
  },
  {
    slug: "chuong-trinh-dia-phuong-hoa-binh",
    category: "Chuỗi chương trình địa phương",
    title: "Chuỗi chương trình địa phương: Kết nối doanh nghiệp Hòa Bình",
    summary:
      "Chương trình tại Hòa Bình kết hợp cập nhật thị trường, lớp chuyên sâu, câu chuyện thực tế và kết nối kinh doanh cho doanh nghiệp địa phương.",
    description: [
      "Chương trình địa phương mang Vproud đến gần hơn với doanh nghiệp sản xuất, hợp tác xã và doanh nghiệp OCOP tại Hòa Bình.",
      "Nội dung tập trung vào nông sản chế biến, thủ công mỹ nghệ và các sản phẩm mang bản sắc vùng miền có tiềm năng xuất khẩu.",
    ],
    dateLabel: "12/09/2026",
    timeLabel: "08:00 - 12:00",
    isoDate: "2026-09-12",
    location: "Hòa Bình",
    venue: "Trung tâm Văn hóa tỉnh Hòa Bình",
    format: "Trực tiếp",
    price: "Miễn phí",
    capacity: "150 doanh nghiệp",
    cover: "/asset/events/hoabinh.jpg",
    highlights: [
      "Cập nhật thị trường xuất khẩu nông sản chế biến và thủ công mỹ nghệ",
      "Chia sẻ câu chuyện thực tế từ doanh nghiệp địa phương đã xuất khẩu thành công",
      "Lớp chuyên sâu về chứng nhận và tiêu chuẩn cho hàng OCOP",
      "Kết nối kinh doanh trực tiếp giữa doanh nghiệp và chuyên gia Vproud",
    ],
    audience:
      "Doanh nghiệp sản xuất, hợp tác xã, doanh nghiệp OCOP và hộ kinh doanh tại Hòa Bình và các tỉnh lân cận.",
    agenda: [
      {
        time: "08:00",
        title: "Đón tiếp và giới thiệu chương trình Vproud tại địa phương",
        desc: "Giới thiệu mục tiêu chuỗi chương trình địa phương và cách doanh nghiệp tham gia hệ sinh thái Vproud.",
      },
      {
        time: "09:00",
        title: "Cập nhật thị trường nông sản chế biến và thủ công mỹ nghệ",
        desc: "Thông tin nhu cầu thị trường, tiêu chuẩn nhập khẩu và xu hướng tiêu dùng quốc tế.",
      },
      {
        time: "10:15",
        title: "Câu chuyện thực tế: Doanh nghiệp địa phương xuất khẩu thành công",
        desc: "Chia sẻ hành trình thực tế từ chuẩn hóa sản phẩm đến ký được đơn hàng xuất khẩu đầu tiên.",
      },
      {
        time: "11:00",
        title: "Kết nối kinh doanh trực tiếp",
        desc: "Doanh nghiệp trao đổi trực tiếp với chuyên gia và đối tác đồng hành Vproud.",
      },
    ],
    speakers: [
      {
        name: "Chuyên gia chứng nhận và tuân thủ",
        role: "Mạng lưới chuyên gia Vproud",
        bio: "Hỗ trợ doanh nghiệp OCOP hoàn thiện chứng nhận và tiêu chuẩn cho thị trường xuất khẩu.",
      },
      {
        name: "Đại diện doanh nghiệp địa phương",
        role: "Câu chuyện thực tế",
        bio: "Doanh nghiệp sản xuất nông sản chế biến tại Hòa Bình đã xuất khẩu thành công sang thị trường châu Á.",
      },
    ],
  },
  {
    slug: "ngay-gap-go-nha-mua-hang-quoc-te",
    category: "Kết nối toàn cầu",
    title: "Ngày gặp gỡ nhà mua hàng quốc tế",
    summary:
      "Kết nối trực tiếp doanh nghiệp Việt với nhà mua hàng, nhà nhập khẩu và nhà phân phối quốc tế trong các phiên gặp gỡ B2B.",
    description: [
      "Ngày gặp gỡ nhà mua hàng quốc tế là điểm chạm quan trọng trong hành trình doanh nghiệp: từ chuẩn bị đến kết nối thị trường thật.",
      "Doanh nghiệp đã qua đánh giá sẵn sàng xuất khẩu được ưu tiên sắp xếp các phiên gặp gỡ B2B phù hợp với ngành hàng.",
    ],
    dateLabel: "24/10/2026",
    timeLabel: "09:00 - 17:00",
    isoDate: "2026-10-24",
    location: "Đà Nẵng",
    venue: "Trung tâm Hội chợ Triển lãm Đà Nẵng",
    format: "Trực tiếp",
    price: "Miễn phí cho doanh nghiệp đã đánh giá sẵn sàng xuất khẩu",
    capacity: "100+ nhà mua hàng quốc tế",
    cover: "/asset/events/9.jpg",
    highlights: [
      "Phiên gặp gỡ B2B với nhà mua hàng, nhà nhập khẩu và nhà phân phối quốc tế",
      "Khu trưng bày sản phẩm theo ngành hàng: nông sản, thủ công mỹ nghệ, quà tặng văn hóa",
      "Tư vấn 1:1 về hậu cần quốc tế và thủ tục xuất khẩu ngay tại sự kiện",
      "Cơ hội ký kết ghi nhớ hợp tác với đối tác quốc tế",
    ],
    audience:
      "Doanh nghiệp đã hoàn thành đánh giá sẵn sàng xuất khẩu hoặc đã có sản phẩm đạt tiêu chuẩn xuất khẩu.",
    agenda: [
      {
        time: "09:00",
        title: "Khai mạc và giới thiệu nhà mua hàng tham dự",
        desc: "Giới thiệu danh sách nhà mua hàng, nhà nhập khẩu và nhà phân phối quốc tế tham gia chương trình.",
      },
      {
        time: "10:00",
        title: "Phiên gặp gỡ B2B theo ngành hàng",
        desc: "Doanh nghiệp gặp gỡ nhà mua hàng theo lịch hẹn đã sắp xếp trước dựa trên ngành hàng và nhu cầu.",
      },
      {
        time: "14:00",
        title: "Tư vấn 1:1 về hậu cần và thủ tục xuất khẩu",
        desc: "Chuyên gia hậu cần quốc tế hỗ trợ giải đáp trực tiếp các vướng mắc về vận chuyển và thủ tục.",
      },
      {
        time: "16:00",
        title: "Tổng kết kết nối và bước tiếp theo",
        desc: "Doanh nghiệp và nhà mua hàng xác nhận các bước hợp tác tiếp theo sau sự kiện.",
      },
    ],
    speakers: [
      {
        name: "Đại diện nhà mua hàng quốc tế",
        role: "Đối tác kết nối toàn cầu",
        bio: "Đại diện các nhà nhập khẩu và nhà phân phối quan tâm đến sản phẩm Việt Nam.",
      },
      {
        name: "Chuyên gia hậu cần quốc tế",
        role: "Mạng lưới chuyên gia Vproud",
        bio: "Tư vấn trực tiếp về vận chuyển quốc tế, thủ tục hải quan và tối ưu chi phí logistics.",
      },
    ],
  },
  {
    slug: "hoi-thao-ai-cho-xuat-khau",
    category: "Mạng lưới chuyên gia",
    title: "Hội thảo AI cho xuất khẩu cùng chuyên gia",
    summary:
      "Hội thảo trực tuyến cùng mạng lưới chuyên gia Vproud về ứng dụng AI trong nghiên cứu thị trường, tiếp thị và bán hàng xuất khẩu.",
    description: [
      "Hội thảo trực tuyến giúp doanh nghiệp tiếp cận nhanh các công cụ AI đang được ứng dụng thực tế trong xuất khẩu.",
      "Nội dung xoay quanh nghiên cứu thị trường, tạo nội dung tiếp thị đa ngôn ngữ và tìm kiếm khách hàng quốc tế bằng AI.",
    ],
    dateLabel: "15/11/2026",
    timeLabel: "19:30 - 21:30",
    isoDate: "2026-11-15",
    location: "Trực tuyến",
    venue: "Nền tảng trực tuyến Vproud (đường link gửi qua email sau khi đăng ký)",
    format: "Trực tuyến",
    price: "Miễn phí",
    capacity: "Không giới hạn",
    cover: "/asset/events/ai-ceo.jpg",
    highlights: [
      "Ứng dụng AI trong nghiên cứu và phân tích thị trường xuất khẩu",
      "Tạo nội dung tiếp thị đa ngôn ngữ bằng công cụ AI",
      "Tìm kiếm và tiếp cận khách hàng quốc tế hiệu quả hơn",
      "Hỏi đáp trực tiếp cùng chuyên gia ứng dụng AI cho doanh nghiệp",
    ],
    audience:
      "Doanh nghiệp, đội ngũ marketing và bán hàng xuất khẩu muốn ứng dụng AI vào công việc hàng ngày.",
    agenda: [
      {
        time: "19:30",
        title: "Giới thiệu bối cảnh ứng dụng AI trong xuất khẩu",
        desc: "Tổng quan các điểm chạm trong hành trình xuất khẩu có thể tăng tốc bằng AI.",
      },
      {
        time: "20:00",
        title: "Thực hành: Nghiên cứu thị trường và tạo nội dung bằng AI",
        desc: "Hướng dẫn trực tiếp các bước sử dụng công cụ AI phổ biến cho nghiên cứu thị trường và soạn nội dung.",
      },
      {
        time: "20:45",
        title: "Tìm kiếm khách hàng quốc tế bằng AI",
        desc: "Gợi ý quy trình tìm kiếm và tiếp cận khách hàng, nhà mua hàng quốc tế có ứng dụng AI.",
      },
      {
        time: "21:15",
        title: "Hỏi đáp cùng chuyên gia",
        desc: "Giải đáp trực tiếp các câu hỏi của doanh nghiệp tham dự.",
      },
    ],
    speakers: [
      {
        name: "Chuyên gia ứng dụng AI cho doanh nghiệp",
        role: "Mạng lưới chuyên gia Vproud",
        bio: "Chuyên hỗ trợ doanh nghiệp nhỏ và vừa ứng dụng AI vào tiếp thị và bán hàng xuất khẩu.",
      },
      {
        name: "Chuyên gia bán hàng xuất khẩu",
        role: "Mạng lưới chuyên gia Vproud",
        bio: "Nhiều năm kinh nghiệm phát triển kênh bán hàng B2B ra thị trường quốc tế.",
      },
    ],
  },
];

export function getEventBySlug(slug: string): VpgEvent | undefined {
  return events.find((event) => event.slug === slug);
}
