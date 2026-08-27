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
    slug: "chuong-trinh-dia-phuong-phu-tho",
    category: "Chuỗi chương trình địa phương",
    title: "Chuỗi chương trình địa phương: Kết nối doanh nghiệp Phú Thọ",
    summary:
      "Chương trình tại Phú Thọ cập nhật thị trường xuất khẩu chè, nông sản chế biến và sản phẩm thủ công gắn với vùng đất Tổ.",
    description: [
      "Chương trình địa phương mang Vproud đến với doanh nghiệp sản xuất, hợp tác xã và doanh nghiệp OCOP tại Phú Thọ - vùng đất giàu bản sắc với sản phẩm chè, nông sản chế biến và thủ công mỹ nghệ.",
      "Nội dung tập trung vào tiêu chuẩn xuất khẩu chè, đóng gói sản phẩm nông nghiệp và cách kể câu chuyện thương hiệu gắn với văn hóa vùng đất Tổ.",
    ],
    dateLabel: "10/09/2026",
    timeLabel: "08:00 - 12:00",
    isoDate: "2026-09-10",
    location: "Phú Thọ",
    venue: "Trung tâm Văn hóa tỉnh Phú Thọ",
    format: "Trực tiếp",
    price: "Miễn phí",
    capacity: "150 doanh nghiệp",
    cover: "/asset/events/hoabinh.jpg",
    highlights: [
      "Cập nhật thị trường xuất khẩu chè và nông sản chế biến",
      "Hướng dẫn tiêu chuẩn đóng gói và chứng nhận cho hàng OCOP",
      "Chia sẻ cách xây dựng câu chuyện thương hiệu gắn với văn hóa vùng đất Tổ",
      "Kết nối kinh doanh trực tiếp với chuyên gia và đối tác Vproud",
    ],
    audience:
      "Doanh nghiệp sản xuất chè, nông sản chế biến, hợp tác xã và doanh nghiệp OCOP tại Phú Thọ và các tỉnh lân cận.",
    agenda: [
      {
        time: "08:00",
        title: "Đón tiếp và giới thiệu chương trình Vproud tại địa phương",
        desc: "Giới thiệu mục tiêu chuỗi chương trình địa phương và cách doanh nghiệp tham gia hệ sinh thái Vproud.",
      },
      {
        time: "09:00",
        title: "Cập nhật thị trường xuất khẩu chè và nông sản chế biến",
        desc: "Thông tin nhu cầu thị trường quốc tế, tiêu chuẩn nhập khẩu chè và xu hướng tiêu dùng.",
      },
      {
        time: "10:15",
        title: "Xây dựng thương hiệu sản phẩm gắn với văn hóa vùng đất Tổ",
        desc: "Hướng dẫn cách kể câu chuyện sản phẩm để tạo khác biệt trên thị trường quốc tế.",
      },
      {
        time: "11:00",
        title: "Kết nối kinh doanh trực tiếp",
        desc: "Doanh nghiệp trao đổi trực tiếp với chuyên gia và đối tác đồng hành Vproud.",
      },
    ],
    speakers: [
      {
        name: "Chuyên gia xuất khẩu nông sản",
        role: "Mạng lưới chuyên gia Vproud",
        bio: "Tư vấn tiêu chuẩn xuất khẩu chè và nông sản chế biến sang thị trường châu Á, châu Âu.",
      },
      {
        name: "Đại diện doanh nghiệp địa phương",
        role: "Câu chuyện thực tế",
        bio: "Doanh nghiệp sản xuất chè tại Phú Thọ đã xuất khẩu thành công sang thị trường quốc tế.",
      },
    ],
  },
  {
    slug: "chuong-trinh-dia-phuong-yen-bai",
    category: "Chuỗi chương trình địa phương",
    title: "Chuỗi chương trình địa phương: Kết nối doanh nghiệp Yên Bái",
    summary:
      "Chương trình tại Yên Bái tập trung vào chè Shan tuyết, quế và nông sản vùng cao có tiềm năng xuất khẩu.",
    description: [
      "Chương trình địa phương mang Vproud đến với doanh nghiệp, hợp tác xã và doanh nghiệp OCOP tại Yên Bái, nơi có thế mạnh về chè Shan tuyết, quế và nông sản vùng cao.",
      "Nội dung tập trung vào chứng nhận hữu cơ, tiêu chuẩn xuất khẩu quế và cách tiếp cận nhà mua hàng quốc tế cho nông sản đặc sản vùng cao.",
    ],
    dateLabel: "24/09/2026",
    timeLabel: "08:00 - 12:00",
    isoDate: "2026-09-24",
    location: "Yên Bái",
    venue: "Trung tâm Văn hóa tỉnh Yên Bái",
    format: "Trực tiếp",
    price: "Miễn phí",
    capacity: "150 doanh nghiệp",
    cover: "/asset/events/9.jpg",
    highlights: [
      "Cập nhật thị trường xuất khẩu chè Shan tuyết và quế",
      "Hướng dẫn chứng nhận hữu cơ và tiêu chuẩn cho nông sản vùng cao",
      "Chia sẻ câu chuyện thực tế từ doanh nghiệp địa phương đã xuất khẩu quế",
      "Kết nối kinh doanh trực tiếp với chuyên gia và đối tác Vproud",
    ],
    audience:
      "Doanh nghiệp sản xuất chè, quế, nông sản vùng cao, hợp tác xã và doanh nghiệp OCOP tại Yên Bái và các tỉnh lân cận.",
    agenda: [
      {
        time: "08:00",
        title: "Đón tiếp và giới thiệu chương trình Vproud tại địa phương",
        desc: "Giới thiệu mục tiêu chuỗi chương trình địa phương và cách doanh nghiệp tham gia hệ sinh thái Vproud.",
      },
      {
        time: "09:00",
        title: "Cập nhật thị trường xuất khẩu chè Shan tuyết và quế",
        desc: "Thông tin nhu cầu thị trường, tiêu chuẩn nhập khẩu và xu hướng tiêu dùng quốc tế.",
      },
      {
        time: "10:15",
        title: "Câu chuyện thực tế: Doanh nghiệp địa phương xuất khẩu quế thành công",
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
        name: "Chuyên gia chứng nhận hữu cơ",
        role: "Mạng lưới chuyên gia Vproud",
        bio: "Hỗ trợ doanh nghiệp vùng cao hoàn thiện chứng nhận hữu cơ cho chè và quế xuất khẩu.",
      },
      {
        name: "Đại diện doanh nghiệp địa phương",
        role: "Câu chuyện thực tế",
        bio: "Doanh nghiệp sản xuất quế tại Yên Bái đã xuất khẩu thành công sang thị trường Ấn Độ, Trung Đông.",
      },
    ],
  },
  {
    slug: "chuong-trinh-dia-phuong-bac-ninh",
    category: "Chuỗi chương trình địa phương",
    title: "Chuỗi chương trình địa phương: Kết nối doanh nghiệp Bắc Ninh",
    summary:
      "Chương trình tại Bắc Ninh đồng hành cùng làng nghề gốm, tranh dân gian và đồ gỗ mỹ nghệ trên hành trình xuất khẩu.",
    description: [
      "Chương trình địa phương mang Vproud đến với các làng nghề và doanh nghiệp sản xuất tại Bắc Ninh, nơi nổi tiếng với gốm Phù Lãng, tranh Đông Hồ và đồ gỗ mỹ nghệ.",
      "Nội dung tập trung vào tiêu chuẩn đóng gói, bảo hộ sở hữu trí tuệ cho sản phẩm làng nghề và cách tiếp cận thị trường quà tặng, trang trí quốc tế.",
    ],
    dateLabel: "08/10/2026",
    timeLabel: "08:00 - 12:00",
    isoDate: "2026-10-08",
    location: "Bắc Ninh",
    venue: "Trung tâm Văn hóa tỉnh Bắc Ninh",
    format: "Trực tiếp",
    price: "Miễn phí",
    capacity: "150 doanh nghiệp",
    cover: "/asset/events/ai-ceo.jpg",
    highlights: [
      "Cập nhật thị trường xuất khẩu gốm, tranh dân gian và đồ gỗ mỹ nghệ",
      "Hướng dẫn bảo hộ sở hữu trí tuệ và thương hiệu cho sản phẩm làng nghề",
      "Chia sẻ câu chuyện thực tế từ làng nghề đã xuất khẩu thành công",
      "Kết nối kinh doanh trực tiếp với chuyên gia và đối tác Vproud",
    ],
    audience:
      "Doanh nghiệp làng nghề, cơ sở sản xuất gốm, tranh dân gian, đồ gỗ mỹ nghệ tại Bắc Ninh và các tỉnh lân cận.",
    agenda: [
      {
        time: "08:00",
        title: "Đón tiếp và giới thiệu chương trình Vproud tại địa phương",
        desc: "Giới thiệu mục tiêu chuỗi chương trình địa phương và cách doanh nghiệp tham gia hệ sinh thái Vproud.",
      },
      {
        time: "09:00",
        title: "Cập nhật thị trường xuất khẩu sản phẩm làng nghề",
        desc: "Thông tin nhu cầu thị trường quà tặng, trang trí quốc tế và tiêu chuẩn nhập khẩu.",
      },
      {
        time: "10:15",
        title: "Bảo hộ sở hữu trí tuệ và thương hiệu cho sản phẩm làng nghề",
        desc: "Hướng dẫn đăng ký bảo hộ kiểu dáng, nhãn hiệu khi đưa sản phẩm ra thị trường quốc tế.",
      },
      {
        time: "11:00",
        title: "Kết nối kinh doanh trực tiếp",
        desc: "Doanh nghiệp trao đổi trực tiếp với chuyên gia và đối tác đồng hành Vproud.",
      },
    ],
    speakers: [
      {
        name: "Chuyên gia sở hữu trí tuệ",
        role: "Mạng lưới chuyên gia Vproud",
        bio: "Tư vấn bảo hộ nhãn hiệu, kiểu dáng công nghiệp cho sản phẩm làng nghề khi xuất khẩu.",
      },
      {
        name: "Đại diện doanh nghiệp địa phương",
        role: "Câu chuyện thực tế",
        bio: "Cơ sở sản xuất gốm tại Bắc Ninh đã đưa sản phẩm vào chuỗi cửa hàng quà tặng quốc tế.",
      },
    ],
  },
  {
    slug: "chuong-trinh-dia-phuong-lang-son",
    category: "Chuỗi chương trình địa phương",
    title: "Chuỗi chương trình địa phương: Kết nối doanh nghiệp Lạng Sơn",
    summary:
      "Chương trình tại Lạng Sơn cập nhật thị trường biên mậu, nông sản và cơ hội xuất khẩu qua các cửa khẩu biên giới.",
    description: [
      "Chương trình địa phương mang Vproud đến với doanh nghiệp tại Lạng Sơn - địa phương cửa ngõ biên mậu với thế mạnh về hồi, na và nông sản xuất khẩu qua biên giới.",
      "Nội dung tập trung vào thủ tục xuất khẩu qua cửa khẩu, tiêu chuẩn kiểm dịch nông sản và cách đa dạng hóa thị trường ngoài kênh biên mậu truyền thống.",
    ],
    dateLabel: "22/10/2026",
    timeLabel: "08:00 - 12:00",
    isoDate: "2026-10-22",
    location: "Lạng Sơn",
    venue: "Trung tâm Văn hóa tỉnh Lạng Sơn",
    format: "Trực tiếp",
    price: "Miễn phí",
    capacity: "150 doanh nghiệp",
    cover: "/asset/events/hoabinh.jpg",
    highlights: [
      "Cập nhật thủ tục xuất khẩu qua cửa khẩu và quy định biên mậu mới nhất",
      "Hướng dẫn tiêu chuẩn kiểm dịch cho nông sản xuất khẩu (hồi, na, nông sản tươi)",
      "Chia sẻ cách đa dạng hóa thị trường ngoài kênh biên mậu truyền thống",
      "Kết nối kinh doanh trực tiếp với chuyên gia và đối tác Vproud",
    ],
    audience:
      "Doanh nghiệp nông sản, thương mại biên mậu, hợp tác xã tại Lạng Sơn và các tỉnh biên giới phía Bắc.",
    agenda: [
      {
        time: "08:00",
        title: "Đón tiếp và giới thiệu chương trình Vproud tại địa phương",
        desc: "Giới thiệu mục tiêu chuỗi chương trình địa phương và cách doanh nghiệp tham gia hệ sinh thái Vproud.",
      },
      {
        time: "09:00",
        title: "Cập nhật thủ tục xuất khẩu qua cửa khẩu và quy định biên mậu",
        desc: "Thông tin quy định hải quan, kiểm dịch mới nhất cho hàng nông sản qua biên giới.",
      },
      {
        time: "10:15",
        title: "Đa dạng hóa thị trường ngoài kênh biên mậu",
        desc: "Gợi ý hướng tiếp cận thị trường quốc tế xa hơn biên mậu truyền thống cho nông sản đặc sản.",
      },
      {
        time: "11:00",
        title: "Kết nối kinh doanh trực tiếp",
        desc: "Doanh nghiệp trao đổi trực tiếp với chuyên gia và đối tác đồng hành Vproud.",
      },
    ],
    speakers: [
      {
        name: "Chuyên gia thủ tục hải quan biên mậu",
        role: "Mạng lưới chuyên gia Vproud",
        bio: "Am hiểu quy định xuất khẩu qua cửa khẩu và thủ tục kiểm dịch nông sản biên giới phía Bắc.",
      },
      {
        name: "Đại diện doanh nghiệp địa phương",
        role: "Câu chuyện thực tế",
        bio: "Doanh nghiệp nông sản tại Lạng Sơn đã mở rộng thị trường ngoài kênh biên mậu truyền thống.",
      },
    ],
  },
  {
    slug: "chuong-trinh-dia-phuong-ha-tay",
    category: "Chuỗi chương trình địa phương",
    title: "Chuỗi chương trình địa phương: Kết nối doanh nghiệp Hà Tây",
    summary:
      "Chương trình tại Hà Tây đồng hành cùng làng nghề lụa, mây tre đan và sơn mài trên hành trình đưa sản phẩm ra quốc tế.",
    description: [
      "Chương trình địa phương mang Vproud đến với các làng nghề truyền thống vùng Hà Tây, nơi nổi tiếng với lụa Vạn Phúc, mây tre đan và sơn mài.",
      "Nội dung tập trung vào tiêu chuẩn chất lượng cho hàng thủ công mỹ nghệ, đóng gói bảo quản khi vận chuyển quốc tế và xây dựng câu chuyện thương hiệu làng nghề.",
    ],
    dateLabel: "12/11/2026",
    timeLabel: "08:00 - 12:00",
    isoDate: "2026-11-12",
    location: "Hà Tây",
    venue: "Trung tâm Văn hóa vùng Hà Tây",
    format: "Trực tiếp",
    price: "Miễn phí",
    capacity: "150 doanh nghiệp",
    cover: "/asset/events/9.jpg",
    highlights: [
      "Cập nhật thị trường xuất khẩu lụa, mây tre đan và sơn mài",
      "Hướng dẫn tiêu chuẩn chất lượng và đóng gói bảo quản khi vận chuyển quốc tế",
      "Chia sẻ câu chuyện xây dựng thương hiệu làng nghề ra thị trường quốc tế",
      "Kết nối kinh doanh trực tiếp với chuyên gia và đối tác Vproud",
    ],
    audience:
      "Doanh nghiệp làng nghề lụa, mây tre đan, sơn mài và thủ công mỹ nghệ vùng Hà Tây.",
    agenda: [
      {
        time: "08:00",
        title: "Đón tiếp và giới thiệu chương trình Vproud tại địa phương",
        desc: "Giới thiệu mục tiêu chuỗi chương trình địa phương và cách doanh nghiệp tham gia hệ sinh thái Vproud.",
      },
      {
        time: "09:00",
        title: "Cập nhật thị trường xuất khẩu hàng thủ công mỹ nghệ",
        desc: "Thông tin nhu cầu thị trường quốc tế cho lụa, mây tre đan, sơn mài và tiêu chuẩn nhập khẩu.",
      },
      {
        time: "10:15",
        title: "Đóng gói, bảo quản khi vận chuyển quốc tế",
        desc: "Hướng dẫn kỹ thuật đóng gói giúp hàng thủ công mỹ nghệ giữ chất lượng khi vận chuyển đường dài.",
      },
      {
        time: "11:00",
        title: "Kết nối kinh doanh trực tiếp",
        desc: "Doanh nghiệp trao đổi trực tiếp với chuyên gia và đối tác đồng hành Vproud.",
      },
    ],
    speakers: [
      {
        name: "Chuyên gia đóng gói và logistics hàng thủ công",
        role: "Mạng lưới chuyên gia Vproud",
        bio: "Tư vấn kỹ thuật đóng gói, bảo quản cho hàng thủ công mỹ nghệ xuất khẩu đường dài.",
      },
      {
        name: "Đại diện doanh nghiệp làng nghề",
        role: "Câu chuyện thực tế",
        bio: "Doanh nghiệp lụa Vạn Phúc đã đưa sản phẩm vào các cửa hàng thời trang quốc tế.",
      },
    ],
  },
  {
    slug: "chuong-trinh-dia-phuong-hung-yen",
    category: "Chuỗi chương trình địa phương",
    title: "Chuỗi chương trình địa phương: Kết nối doanh nghiệp Hưng Yên",
    summary:
      "Chương trình tại Hưng Yên tập trung vào nhãn lồng, tương Bần và nông sản chế biến có tiềm năng xuất khẩu.",
    description: [
      "Chương trình địa phương mang Vproud đến với doanh nghiệp, hợp tác xã và hộ sản xuất tại Hưng Yên, nơi nổi tiếng với nhãn lồng, tương Bần và nông sản chế biến.",
      "Nội dung tập trung vào chế biến sâu để kéo dài hạn sử dụng, tiêu chuẩn an toàn thực phẩm và cách tiếp cận nhà mua hàng quốc tế cho nông sản đặc sản.",
    ],
    dateLabel: "26/11/2026",
    timeLabel: "08:00 - 12:00",
    isoDate: "2026-11-26",
    location: "Hưng Yên",
    venue: "Trung tâm Văn hóa tỉnh Hưng Yên",
    format: "Trực tiếp",
    price: "Miễn phí",
    capacity: "150 doanh nghiệp",
    cover: "/asset/events/ai-ceo.jpg",
    highlights: [
      "Cập nhật thị trường xuất khẩu nhãn lồng chế biến và tương Bần",
      "Hướng dẫn chế biến sâu để kéo dài hạn sử dụng và đạt tiêu chuẩn xuất khẩu",
      "Chia sẻ câu chuyện thực tế từ doanh nghiệp địa phương đã xuất khẩu thành công",
      "Kết nối kinh doanh trực tiếp với chuyên gia và đối tác Vproud",
    ],
    audience:
      "Doanh nghiệp chế biến nông sản, hợp tác xã và hộ sản xuất tại Hưng Yên và các tỉnh đồng bằng sông Hồng.",
    agenda: [
      {
        time: "08:00",
        title: "Đón tiếp và giới thiệu chương trình Vproud tại địa phương",
        desc: "Giới thiệu mục tiêu chuỗi chương trình địa phương và cách doanh nghiệp tham gia hệ sinh thái Vproud.",
      },
      {
        time: "09:00",
        title: "Cập nhật thị trường xuất khẩu nông sản chế biến",
        desc: "Thông tin nhu cầu thị trường quốc tế cho nhãn lồng chế biến, tương Bần và tiêu chuẩn an toàn thực phẩm.",
      },
      {
        time: "10:15",
        title: "Chế biến sâu để kéo dài hạn sử dụng",
        desc: "Hướng dẫn kỹ thuật chế biến, bảo quản giúp nông sản đạt tiêu chuẩn xuất khẩu đường dài.",
      },
      {
        time: "11:00",
        title: "Kết nối kinh doanh trực tiếp",
        desc: "Doanh nghiệp trao đổi trực tiếp với chuyên gia và đối tác đồng hành Vproud.",
      },
    ],
    speakers: [
      {
        name: "Chuyên gia an toàn thực phẩm xuất khẩu",
        role: "Mạng lưới chuyên gia Vproud",
        bio: "Tư vấn tiêu chuẩn an toàn thực phẩm và chế biến sâu cho nông sản xuất khẩu.",
      },
      {
        name: "Đại diện doanh nghiệp địa phương",
        role: "Câu chuyện thực tế",
        bio: "Doanh nghiệp chế biến nhãn lồng tại Hưng Yên đã xuất khẩu thành công sang thị trường châu Âu.",
      },
    ],
  },
  {
    slug: "chuong-trinh-dia-phuong-hai-phong",
    category: "Chuỗi chương trình địa phương",
    title: "Chuỗi chương trình địa phương: Kết nối doanh nghiệp Hải Phòng",
    summary:
      "Chương trình tại Hải Phòng tập trung vào hải sản chế biến, logistics cảng biển và cơ hội xuất khẩu qua cửa ngõ hàng hải.",
    description: [
      "Chương trình địa phương mang Vproud đến với doanh nghiệp tại Hải Phòng - thành phố cảng biển với thế mạnh hải sản chế biến và logistics xuất khẩu.",
      "Nội dung tập trung vào tiêu chuẩn xuất khẩu hải sản, tối ưu chi phí logistics qua cảng biển và kết nối trực tiếp với nhà mua hàng quốc tế.",
    ],
    dateLabel: "10/12/2026",
    timeLabel: "08:00 - 12:00",
    isoDate: "2026-12-10",
    location: "Hải Phòng",
    venue: "Trung tâm Hội nghị tỉnh Hải Phòng",
    format: "Trực tiếp",
    price: "Miễn phí",
    capacity: "150 doanh nghiệp",
    cover: "/asset/events/hoabinh.jpg",
    highlights: [
      "Cập nhật thị trường xuất khẩu hải sản chế biến",
      "Tối ưu chi phí và thủ tục logistics xuất khẩu qua cảng biển",
      "Chia sẻ câu chuyện thực tế từ doanh nghiệp địa phương đã xuất khẩu thành công",
      "Kết nối kinh doanh trực tiếp với chuyên gia và đối tác Vproud",
    ],
    audience:
      "Doanh nghiệp chế biến hải sản, logistics và xuất nhập khẩu tại Hải Phòng và khu vực duyên hải Bắc Bộ.",
    agenda: [
      {
        time: "08:00",
        title: "Đón tiếp và giới thiệu chương trình Vproud tại địa phương",
        desc: "Giới thiệu mục tiêu chuỗi chương trình địa phương và cách doanh nghiệp tham gia hệ sinh thái Vproud.",
      },
      {
        time: "09:00",
        title: "Cập nhật thị trường xuất khẩu hải sản chế biến",
        desc: "Thông tin nhu cầu thị trường quốc tế, tiêu chuẩn kiểm dịch và chứng nhận cho hải sản xuất khẩu.",
      },
      {
        time: "10:15",
        title: "Tối ưu chi phí logistics qua cảng biển",
        desc: "Hướng dẫn lựa chọn phương thức vận chuyển và tối ưu chi phí logistics khi xuất khẩu qua cảng.",
      },
      {
        time: "11:00",
        title: "Kết nối kinh doanh trực tiếp",
        desc: "Doanh nghiệp trao đổi trực tiếp với chuyên gia và đối tác đồng hành Vproud.",
      },
    ],
    speakers: [
      {
        name: "Chuyên gia logistics cảng biển",
        role: "Mạng lưới chuyên gia Vproud",
        bio: "Nhiều năm kinh nghiệm tối ưu chi phí và thủ tục logistics xuất khẩu qua cảng biển.",
      },
      {
        name: "Đại diện doanh nghiệp địa phương",
        role: "Câu chuyện thực tế",
        bio: "Doanh nghiệp chế biến hải sản tại Hải Phòng đã xuất khẩu thành công sang thị trường Nhật Bản, Hàn Quốc.",
      },
    ],
  },
  {
    slug: "chuong-trinh-dia-phuong-quang-ninh",
    category: "Chuỗi chương trình địa phương",
    title: "Chuỗi chương trình địa phương: Kết nối doanh nghiệp Quảng Ninh",
    summary:
      "Chương trình tại Quảng Ninh tập trung vào hải sản, gốm sứ và sản phẩm gắn với du lịch có tiềm năng xuất khẩu.",
    description: [
      "Chương trình địa phương mang Vproud đến với doanh nghiệp tại Quảng Ninh, nơi có thế mạnh về hải sản, gốm sứ Đông Triều và sản phẩm quà tặng gắn với du lịch Hạ Long.",
      "Nội dung tập trung vào tiêu chuẩn xuất khẩu hải sản, chứng nhận cho gốm sứ mỹ nghệ và cách khai thác kênh khách du lịch quốc tế cho sản phẩm địa phương.",
    ],
    dateLabel: "17/12/2026",
    timeLabel: "08:00 - 12:00",
    isoDate: "2026-12-17",
    location: "Quảng Ninh",
    venue: "Trung tâm Văn hóa tỉnh Quảng Ninh",
    format: "Trực tiếp",
    price: "Miễn phí",
    capacity: "150 doanh nghiệp",
    cover: "/asset/events/9.jpg",
    highlights: [
      "Cập nhật thị trường xuất khẩu hải sản và gốm sứ mỹ nghệ",
      "Hướng dẫn chứng nhận chất lượng cho gốm sứ Đông Triều xuất khẩu",
      "Chia sẻ cách khai thác kênh khách du lịch quốc tế cho sản phẩm địa phương",
      "Kết nối kinh doanh trực tiếp với chuyên gia và đối tác Vproud",
    ],
    audience:
      "Doanh nghiệp chế biến hải sản, sản xuất gốm sứ, quà tặng du lịch tại Quảng Ninh và khu vực Đông Bắc Bộ.",
    agenda: [
      {
        time: "08:00",
        title: "Đón tiếp và giới thiệu chương trình Vproud tại địa phương",
        desc: "Giới thiệu mục tiêu chuỗi chương trình địa phương và cách doanh nghiệp tham gia hệ sinh thái Vproud.",
      },
      {
        time: "09:00",
        title: "Cập nhật thị trường xuất khẩu hải sản và gốm sứ mỹ nghệ",
        desc: "Thông tin nhu cầu thị trường quốc tế, tiêu chuẩn kiểm dịch và chứng nhận chất lượng.",
      },
      {
        time: "10:15",
        title: "Khai thác kênh khách du lịch quốc tế cho sản phẩm địa phương",
        desc: "Gợi ý cách đưa sản phẩm quà tặng, đặc sản tiếp cận khách du lịch quốc tế qua Hạ Long.",
      },
      {
        time: "11:00",
        title: "Kết nối kinh doanh trực tiếp",
        desc: "Doanh nghiệp trao đổi trực tiếp với chuyên gia và đối tác đồng hành Vproud.",
      },
    ],
    speakers: [
      {
        name: "Chuyên gia chứng nhận chất lượng xuất khẩu",
        role: "Mạng lưới chuyên gia Vproud",
        bio: "Tư vấn chứng nhận chất lượng cho hải sản và gốm sứ mỹ nghệ xuất khẩu.",
      },
      {
        name: "Đại diện doanh nghiệp địa phương",
        role: "Câu chuyện thực tế",
        bio: "Doanh nghiệp gốm sứ tại Quảng Ninh đã đưa sản phẩm vào chuỗi quà tặng du lịch quốc tế.",
      },
    ],
  },
];

export function getEventBySlug(slug: string): VpgEvent | undefined {
  return events.find((event) => event.slug === slug);
}
