export type AssessmentOption = {
  label: string;
  points: number;
};

export type AssessmentQuestion = {
  id: string;
  category: string;
  categoryMax: number;
  text: string;
  options: AssessmentOption[];
};

// Nhánh 1 — dành cho doanh nghiệp CHƯA từng xuất khẩu (A10 = "Chưa từng")
export const assessmentQuestionsBranch1: AssessmentQuestion[] = [
  {
    id: "n1-q1",
    category: "Độ sẵn sàng của sản phẩm",
    categoryMax: 20,
    text: "Sản phẩm chủ lực của anh/chị đang được bán như thế nào?",
    options: [
      { label: "Bán ổn định trong nước trên 2 năm, có khách quay lại", points: 5 },
      { label: "Bán ổn định dưới 2 năm", points: 3 },
      { label: "Mới đưa ra thị trường, đang thăm dò", points: 0 },
      { label: "Chưa bán ra thị trường", points: 0 },
    ],
  },
  {
    id: "n1-q2",
    category: "Độ sẵn sàng của sản phẩm",
    categoryMax: 20,
    text: "Bao bì và nhãn sản phẩm hiện ở mức nào?",
    options: [
      {
        label:
          "Đã có bao bì + nhãn tiếng Anh (hoặc ngôn ngữ thị trường mục tiêu) đạt chuẩn, sẵn sàng đưa vào hồ sơ chào hàng quốc tế",
        points: 5,
      },
      { label: "Bao bì tốt, nhãn tiếng Việt đầy đủ theo quy định trong nước", points: 3 },
      { label: "Bao bì đơn giản, nhãn chưa đầy đủ", points: 0 },
      { label: "Chưa đầu tư bao bì, nhãn mác", points: 0 },
    ],
  },
  {
    id: "n1-q3",
    category: "Độ sẵn sàng của sản phẩm",
    categoryMax: 20,
    text: "Khả năng chịu vận chuyển dài ngày (đóng gói, hạn dùng / độ bền)?",
    options: [
      { label: "Đã kiểm chứng thực tế qua các lô hàng gửi đi xa hoặc xuất thử", points: 5 },
      { label: "Chưa gửi xa nhưng hạn dùng/độ bền và đóng gói đáp ứng được", points: 3 },
      { label: "Chưa chắc chắn, cần cải tiến đóng gói", points: 0 },
      { label: "Sản phẩm hiện tại khó vận chuyển xa", points: 0 },
    ],
  },
  {
    id: "n1-q4",
    category: "Độ sẵn sàng của sản phẩm",
    categoryMax: 20,
    text: "Đã tìm hiểu / điều chỉnh sản phẩm theo thị hiếu nước ngoài (khẩu vị, kích cỡ, mẫu mã)?",
    options: [
      { label: "Đã nghiên cứu thị trường mục tiêu và điều chỉnh sản phẩm", points: 5 },
      { label: "Đã tìm hiểu, đang lên kế hoạch điều chỉnh", points: 3 },
      { label: "Mới nghe qua, chưa tìm hiểu kỹ", points: 0 },
      { label: "Chưa từng tìm hiểu", points: 0 },
    ],
  },
  {
    id: "n1-q5",
    category: "Chứng nhận và tuân thủ",
    categoryMax: 15,
    text: "Chứng nhận chất lượng cao nhất doanh nghiệp đang có?",
    options: [
      {
        label:
          "Chứng nhận quốc tế phù hợp thị trường mục tiêu (HACCP, ISO 22000, GMP, FDA, Organic, CE…)",
        points: 5,
      },
      { label: "Chứng nhận trong nước (VSATTP, OCOP, VietGAP, hợp quy…)", points: 3 },
      { label: "Đang làm hồ sơ chứng nhận", points: 0 },
      { label: "Chưa có chứng nhận nào", points: 0 },
    ],
  },
  {
    id: "n1-q6",
    category: "Chứng nhận và tuân thủ",
    categoryMax: 15,
    text: "Hồ sơ pháp lý sản phẩm (công bố chất lượng, phiếu kiểm nghiệm, mã số mã vạch, truy xuất nguồn gốc)?",
    options: [
      { label: "Đầy đủ và còn hiệu lực", points: 5 },
      { label: "Có một phần, đang bổ sung", points: 3 },
      { label: "Mới bắt đầu làm", points: 0 },
      { label: "Chưa có", points: 0 },
    ],
  },
  {
    id: "n1-q7",
    category: "Chứng nhận và tuân thủ",
    categoryMax: 15,
    text: "Mức độ nắm yêu cầu của thị trường mục tiêu (quy định nhãn, kiểm dịch, thuế nhập khẩu…)?",
    options: [
      { label: "Nắm rõ, có tài liệu hoặc đơn vị tư vấn cụ thể", points: 5 },
      { label: "Biết những yêu cầu chính, chưa đầy đủ", points: 3 },
      { label: "Biết rất sơ lược", points: 0 },
      { label: "Chưa biết bắt đầu từ đâu", points: 0 },
    ],
  },
  {
    id: "n1-q8",
    category: "Năng lực sản xuất",
    categoryMax: 15,
    text: "Nếu có đơn hàng xuất khẩu đều đặn (ví dụ 1 container/tháng), cơ sở sản xuất đáp ứng thế nào?",
    options: [
      { label: "Đáp ứng được ngay với công suất hiện tại", points: 5 },
      { label: "Cần 1–3 tháng chuẩn bị thêm", points: 3 },
      { label: "Phải đầu tư đáng kể mới đáp ứng được", points: 0 },
      { label: "Chưa thể đáp ứng", points: 0 },
    ],
  },
  {
    id: "n1-q9",
    category: "Năng lực sản xuất",
    categoryMax: 15,
    text: "Kiểm soát chất lượng giữa các lô hàng?",
    options: [
      { label: "Có quy trình kiểm soát chất lượng bằng văn bản, có người phụ trách", points: 5 },
      { label: "Kiểm soát theo kinh nghiệm, chất lượng khá ổn định", points: 3 },
      { label: "Thỉnh thoảng còn chênh lệch giữa các lô", points: 0 },
      { label: "Chưa có cách kiểm soát", points: 0 },
    ],
  },
  {
    id: "n1-q10",
    category: "Năng lực sản xuất",
    categoryMax: 15,
    text: "Nguồn nguyên liệu đầu vào?",
    options: [
      {
        label: "Chủ động (tự sản xuất hoặc hợp đồng vùng nguyên liệu), truy xuất được nguồn gốc",
        points: 5,
      },
      { label: "Mua ngoài nhưng nhà cung cấp ổn định", points: 3 },
      { label: "Mua theo thời vụ, giá và sản lượng biến động", points: 0 },
      { label: "Thường xuyên thiếu / không ổn định", points: 0 },
    ],
  },
  {
    id: "n1-q11",
    category: "Năng lực bán hàng xuất khẩu",
    categoryMax: 15,
    text: "Kinh nghiệm giao dịch quốc tế đến nay?",
    options: [
      { label: "Đã xuất khẩu chính ngạch, có đơn hàng lặp lại", points: 5 },
      { label: "Đã xuất vài đơn (qua trung gian, tiểu ngạch hoặc khách lẻ nước ngoài)", points: 3 },
      { label: "Mới có khách hỏi, chưa chốt được đơn", points: 0 },
      { label: "Chưa có giao dịch quốc tế nào", points: 0 },
    ],
  },
  {
    id: "n1-q12",
    category: "Năng lực bán hàng xuất khẩu",
    categoryMax: 15,
    text: "Nhân sự phụ trách xuất khẩu (ngoại ngữ, chứng từ, đàm phán)?",
    options: [
      { label: "Có nhân sự chuyên trách đủ năng lực", points: 5 },
      { label: "Có người kiêm nhiệm", points: 3 },
      { label: "Thuê ngoài từng việc khi cần", points: 0 },
      { label: "Chưa có ai", points: 0 },
    ],
  },
  {
    id: "n1-q13",
    category: "Năng lực bán hàng xuất khẩu",
    categoryMax: 15,
    text: "Mức độ nắm nghiệp vụ xuất khẩu (Incoterms, thanh toán LC/TT, logistics, chứng từ)?",
    options: [
      { label: "Đã làm thực tế, tự tin xử lý", points: 5 },
      { label: "Hiểu lý thuyết, chưa làm thực tế", points: 3 },
      { label: "Biết sơ qua", points: 0 },
      { label: "Chưa biết", points: 0 },
    ],
  },
  {
    id: "n1-q14",
    category: "Thương hiệu quốc tế",
    categoryMax: 10,
    text: "Bảo hộ nhãn hiệu?",
    options: [
      { label: "Đã đăng ký bảo hộ ở nước ngoài hoặc qua hệ thống Madrid", points: 5 },
      { label: "Đã đăng ký trong nước, chưa đăng ký nước ngoài", points: 3 },
      { label: "Đang nộp hồ sơ", points: 0 },
      { label: "Chưa đăng ký", points: 0 },
    ],
  },
  {
    id: "n1-q15",
    category: "Thương hiệu quốc tế",
    categoryMax: 10,
    text: "Bộ tài liệu thương hiệu cho khách quốc tế (profile, catalogue, website / nội dung tiếng Anh, câu chuyện sản phẩm)?",
    options: [
      { label: "Có đầy đủ, sẵn sàng gửi khách", points: 5 },
      { label: "Có một phần (ví dụ: có catalogue nhưng chưa có bản tiếng Anh)", points: 3 },
      { label: "Đang xây dựng", points: 0 },
      { label: "Chưa có", points: 0 },
    ],
  },
  {
    id: "n1-q16",
    category: "Sức cạnh tranh về giá",
    categoryMax: 10,
    text: "Tính giá xuất khẩu?",
    options: [
      { label: "Đã có bảng giá FOB/CIF, biết rõ biên lợi nhuận khi xuất", points: 5 },
      { label: "Đã tính giá thành đầy đủ, chưa quy ra giá xuất khẩu", points: 3 },
      { label: "Mới có giá bán nội địa", points: 0 },
      { label: "Chưa tính toán giá thành bài bản", points: 0 },
    ],
  },
  {
    id: "n1-q17",
    category: "Sức cạnh tranh về giá",
    categoryMax: 10,
    text: "So sánh với sản phẩm cùng loại tại thị trường mục tiêu?",
    options: [
      {
        label:
          "Đã khảo giá đối thủ: giá cạnh tranh, hoặc có điểm khác biệt rõ để bán giá cao hơn",
        points: 5,
      },
      { label: "Đã khảo giá, thấy giá mình cao hơn và chưa rõ cách tạo khác biệt", points: 3 },
      { label: "Mới xem qua loa", points: 0 },
      { label: "Chưa từng khảo sát", points: 0 },
    ],
  },
  {
    id: "n1-q18",
    category: "Năng lực số",
    categoryMax: 10,
    text: "Hiện diện số của doanh nghiệp?",
    options: [
      {
        label: "Website + kênh mạng xã hội / sàn TMĐT hoạt động đều, có đơn hàng online",
        points: 5,
      },
      { label: "Có fanpage / gian hàng nhưng cập nhật không đều", points: 3 },
      { label: "Mới lập kênh, chưa vận hành", points: 0 },
      { label: "Chưa có kênh nào", points: 0 },
    ],
  },
  {
    id: "n1-q19",
    category: "Năng lực số",
    categoryMax: 10,
    text: "Ứng dụng công cụ số trong bán hàng – vận hành (quảng cáo online, quản lý đơn, CRM, sàn B2B như Alibaba, AI…)?",
    options: [
      { label: "Đang dùng thường xuyên và có hiệu quả", points: 5 },
      { label: "Đã thử một vài công cụ", points: 3 },
      { label: "Biết nhưng chưa dùng", points: 0 },
      { label: "Chưa tiếp cận", points: 0 },
    ],
  },
  {
    id: "n1-q20",
    category: "Cam kết của ban lãnh đạo",
    categoryMax: 5,
    text: "Mức độ ưu tiên của lãnh đạo với xuất khẩu?",
    options: [
      {
        label: "Là mục tiêu chiến lược: đã có ngân sách và nhân sự cho 12–24 tháng tới",
        points: 5,
      },
      { label: "Muốn làm trong 1–2 năm tới, chưa có kế hoạch cụ thể", points: 3 },
      { label: "Đang thăm dò, đi học hỏi trước", points: 0 },
      { label: "Chưa nằm trong kế hoạch", points: 0 },
    ],
  },
];

// Nhánh 2 — dành cho doanh nghiệp ĐÃ/ĐANG xuất khẩu (A10 = "Đã xuất thử vài đơn" / "Đang xuất khẩu đều")
export const assessmentQuestionsBranch2: AssessmentQuestion[] = [
  {
    id: "n2-x1",
    category: "Độ sẵn sàng của sản phẩm",
    categoryMax: 20,
    text: "Đơn hàng lặp lại từ khách quốc tế?",
    options: [
      { label: "Có khách đặt lặp lại đều đặn", points: 5 },
      { label: "Có một vài khách quay lại", points: 3 },
      { label: "Chủ yếu đơn một lần", points: 0 },
      { label: "Chưa có đơn lặp lại", points: 0 },
    ],
  },
  {
    id: "n2-x2",
    category: "Độ sẵn sàng của sản phẩm",
    categoryMax: 20,
    text: "Bao bì – nhãn cho thị trường xuất khẩu?",
    options: [
      { label: "Đã bản địa hóa cho từng thị trường xuất", points: 5 },
      { label: "Một phiên bản tiếng Anh dùng chung", points: 3 },
      { label: "Đang làm", points: 0 },
      { label: "Chưa có phiên bản xuất khẩu", points: 0 },
    ],
  },
  {
    id: "n2-x3",
    category: "Độ sẵn sàng của sản phẩm",
    categoryMax: 20,
    text: "Chất lượng hàng khi đến tay khách (khiếu nại, trả hàng)?",
    options: [
      { label: "Chưa từng bị khiếu nại đáng kể", points: 5 },
      { label: "Có vấn đề nhỏ, đã xử lý ổn", points: 3 },
      { label: "Từng bị khiếu nại hoặc trả hàng đáng kể", points: 0 },
      { label: "Đang là vấn đề lặp lại", points: 0 },
    ],
  },
  {
    id: "n2-x4",
    category: "Độ sẵn sàng của sản phẩm",
    categoryMax: 20,
    text: "Cải tiến sản phẩm theo phản hồi thị trường?",
    options: [
      { label: "Có quy trình thu phản hồi và cải tiến định kỳ", points: 5 },
      { label: "Đã điều chỉnh vài lần theo phản hồi", points: 3 },
      { label: "Có nghe phản hồi nhưng chưa điều chỉnh", points: 0 },
      { label: "Chưa thu nhận phản hồi", points: 0 },
    ],
  },
  {
    id: "n2-x5",
    category: "Chứng nhận và tuân thủ",
    categoryMax: 15,
    text: "Chứng nhận cho thị trường?",
    options: [
      { label: "Đủ cho thị trường hiện tại và sẵn cho thị trường mới định vào", points: 5 },
      { label: "Đủ cho thị trường hiện tại", points: 3 },
      { label: "Thiếu một phần, đang bổ sung", points: 0 },
      { label: "Đang vướng chứng nhận", points: 0 },
    ],
  },
  {
    id: "n2-x6",
    category: "Chứng nhận và tuân thủ",
    categoryMax: 15,
    text: "Chứng từ & thủ tục hải quan?",
    options: [
      { label: "Đội ngũ tự xử lý thành thạo", points: 5 },
      { label: "Thuê forwarder trọn gói nhưng nắm được hồ sơ", points: 3 },
      { label: "Phụ thuộc hoàn toàn vào bên thứ ba", points: 0 },
      { label: "Thường xuyên gặp lỗi chứng từ", points: 0 },
    ],
  },
  {
    id: "n2-x7",
    category: "Chứng nhận và tuân thủ",
    categoryMax: 15,
    text: "Theo dõi quy định mới của thị trường (nhãn, kiểm dịch, thuế)?",
    options: [
      { label: "Có người / kênh theo dõi thường xuyên", points: 5 },
      { label: "Cập nhật khi phát sinh việc", points: 3 },
      { label: "Chỉ biết khi bị vướng", points: 0 },
      { label: "Không theo dõi", points: 0 },
    ],
  },
  {
    id: "n2-x8",
    category: "Năng lực sản xuất",
    categoryMax: 15,
    text: "Nếu đơn hàng tăng gấp đôi, năng lực sản xuất đáp ứng thế nào?",
    options: [
      { label: "Đáp ứng được ngay", points: 5 },
      { label: "Cần 1–3 tháng chuẩn bị", points: 3 },
      { label: "Phải đầu tư đáng kể", points: 0 },
      { label: "Chưa thể đáp ứng", points: 0 },
    ],
  },
  {
    id: "n2-x9",
    category: "Năng lực sản xuất",
    categoryMax: 15,
    text: "Ổn định chất lượng giữa các lô hàng xuất?",
    options: [
      { label: "Kiểm soát chất lượng bằng văn bản, kiểm tra trước xuất từng lô", points: 5 },
      { label: "Theo kinh nghiệm, khá ổn định", points: 3 },
      { label: "Thỉnh thoảng lệch chuẩn giữa các lô", points: 0 },
      { label: "Từng bị khách phàn nàn nhiều về chênh lệch", points: 0 },
    ],
  },
  {
    id: "n2-x10",
    category: "Năng lực sản xuất",
    categoryMax: 15,
    text: "Nguồn nguyên liệu cho đơn hàng dài hạn?",
    options: [
      {
        label: "Chủ động (tự sản xuất hoặc hợp đồng vùng nguyên liệu), truy xuất được nguồn gốc",
        points: 5,
      },
      { label: "Mua ngoài nhưng nhà cung cấp ổn định", points: 3 },
      { label: "Mua theo thời vụ, giá và sản lượng biến động", points: 0 },
      { label: "Thường xuyên thiếu / không ổn định", points: 0 },
    ],
  },
  {
    id: "n2-x11",
    category: "Năng lực bán hàng xuất khẩu",
    categoryMax: 15,
    text: "Mức chủ động của kênh bán chủ lực?",
    options: [
      { label: "Bán trực tiếp cho nhà nhập khẩu / chuỗi bán lẻ, có hợp đồng", points: 5 },
      { label: "Qua công ty ủy thác hoặc trung gian xuất khẩu", points: 3 },
      { label: "Tiểu ngạch hoặc khách lẻ nước ngoài", points: 0 },
      { label: "Mới dừng ở gửi mẫu, chào hàng", points: 0 },
    ],
  },
  {
    id: "n2-x12",
    category: "Năng lực bán hàng xuất khẩu",
    categoryMax: 15,
    text: "Hoàn thiện đơn hàng tại thị trường đích (kho, fulfillment)?",
    options: [
      { label: "Có kho hoặc đối tác fulfillment tại thị trường đích", points: 5 },
      { label: "Dùng dịch vụ theo từng lô hàng", points: 3 },
      { label: "Gửi thẳng từ Việt Nam theo từng đơn", points: 0 },
      { label: "Chưa có phương án", points: 0 },
    ],
  },
  {
    id: "n2-x13",
    category: "Năng lực bán hàng xuất khẩu",
    categoryMax: 15,
    text: "Thanh toán quốc tế?",
    options: [
      { label: "LC hoặc có bảo hiểm tín dụng xuất khẩu, quy trình chuẩn", points: 5 },
      { label: "TT có đặt cọc trước", points: 3 },
      { label: "TT trả sau, chủ yếu dựa trên tin tưởng", points: 0 },
      { label: "Từng bị nợ xấu / chưa có quy trình thanh toán", points: 0 },
    ],
  },
  {
    id: "n2-x14",
    category: "Thương hiệu quốc tế",
    categoryMax: 10,
    text: "Bảo hộ nhãn hiệu tại thị trường xuất khẩu?",
    options: [
      { label: "Đã đăng ký tại các thị trường chính", points: 5 },
      { label: "Đang nộp hồ sơ", points: 3 },
      { label: "Mới đăng ký trong nước", points: 0 },
      { label: "Chưa đăng ký", points: 0 },
    ],
  },
  {
    id: "n2-x15",
    category: "Thương hiệu quốc tế",
    categoryMax: 10,
    text: "Marketing quốc tế & nguồn khách mới?",
    options: [
      {
        label:
          "Có ngân sách, kênh chạy đều; khách mới đến từ nhiều nguồn chủ động (hội chợ, sàn B2B, digital)",
        points: 5,
      },
      { label: "Làm theo đợt; có 1–2 nguồn khách ổn định", points: 3 },
      { label: "Chỉ dựa vào trung gian giới thiệu", points: 0 },
      { label: "Chưa làm, hoàn toàn bị động", points: 0 },
    ],
  },
  {
    id: "n2-x16",
    category: "Sức cạnh tranh về giá",
    categoryMax: 10,
    text: "Biên lợi nhuận xuất khẩu?",
    options: [
      { label: "Nắm rõ theo từng dòng sản phẩm / thị trường, biên tốt", points: 5 },
      { label: "Nắm được ở mức tổng thể", points: 3 },
      { label: "Còn mơ hồ", points: 0 },
      { label: "Đang bán mà không rõ lãi lỗ", points: 0 },
    ],
  },
  {
    id: "n2-x17",
    category: "Sức cạnh tranh về giá",
    categoryMax: 10,
    text: "Kiểm soát chi phí logistics trong giá bán?",
    options: [
      { label: "Biết rõ tỷ lệ, có phương án tối ưu (bán được CIF/DDP)", points: 5 },
      { label: "Biết chi phí nhưng chưa tối ưu (chủ yếu bán FOB)", points: 3 },
      { label: "Không tách bạch được chi phí logistics", points: 0 },
      { label: "Đang là điểm nghẽn lớn nhất", points: 0 },
    ],
  },
  {
    id: "n2-x18",
    category: "Năng lực số",
    categoryMax: 10,
    text: "Thương mại điện tử xuyên biên giới (Amazon, Walmart, TikTok Shop, Alibaba…)?",
    options: [
      { label: "Đang bán trên sàn quốc tế, có đơn đều", points: 5 },
      { label: "Đã mở gian hàng, đơn chưa đều", points: 3 },
      { label: "Đang tìm hiểu, chưa mở", points: 0 },
      { label: "Chưa có kế hoạch", points: 0 },
    ],
  },
  {
    id: "n2-x19",
    category: "Năng lực số",
    categoryMax: 10,
    text: "Dữ liệu & công cụ quản trị xuất khẩu?",
    options: [
      { label: "Có hệ thống theo dõi đơn – khách – tồn kho (CRM/ERP)", points: 5 },
      { label: "Quản lý bằng Excel bài bản", points: 3 },
      { label: "Ghi chép rời rạc", points: 0 },
      { label: "Không theo dõi có hệ thống", points: 0 },
    ],
  },
  {
    id: "n2-x20",
    category: "Cam kết của ban lãnh đạo",
    categoryMax: 5,
    text: "Đầu tư của lãnh đạo cho mở rộng xuất khẩu 12–24 tháng tới?",
    options: [
      {
        label: "Kế hoạch cụ thể: thị trường / kênh, ngân sách và nhân sự chuyên trách",
        points: 5,
      },
      { label: "Có định hướng, chưa có ngân sách và nhân sự", points: 3 },
      { label: "Muốn mở rộng nhưng chưa biết cách", points: 0 },
      { label: "Chưa nằm trong kế hoạch", points: 0 },
    ],
  },
];

export type ReadinessLevel = {
  label: string;
  min: number;
  max: number;
  desc: string;
};

export const readinessLevels: ReadinessLevel[] = [
  {
    label: "Chưa sẵn sàng",
    min: 0,
    max: 39,
    desc: "Doanh nghiệp cần xây dựng nền tảng cơ bản trước khi tính đến xuất khẩu: hoàn thiện sản phẩm, chứng nhận và năng lực sản xuất.",
  },
  {
    label: "Đang chuẩn bị",
    min: 40,
    max: 59,
    desc: "Doanh nghiệp đã có nền tảng ban đầu, cần củng cố năng lực bán hàng, thương hiệu và chứng nhận để tự tin bước ra quốc tế.",
  },
  {
    label: "Sẵn sàng xuất khẩu",
    min: 60,
    max: 79,
    desc: "Doanh nghiệp đủ điều kiện tiếp cận thị trường quốc tế, nên tập trung mở rộng kênh bán hàng và tối ưu chi phí cạnh tranh.",
  },
  {
    label: "Sẵn sàng toàn cầu",
    min: 80,
    max: 100,
    desc: "Doanh nghiệp có năng lực toàn diện, sẵn sàng mở rộng sang nhiều thị trường và xây dựng thương hiệu quốc tế dài hạn.",
  },
];

export function getReadinessLevel(score: number): ReadinessLevel {
  return (
    readinessLevels.find((level) => score >= level.min && score <= level.max) ??
    readinessLevels[0]
  );
}

export type BusinessTextField = {
  kind: "text";
  id: string;
  label: string;
  type?: "text" | "tel" | "email";
  placeholder?: string;
  required: boolean;
};

export type BusinessRadioField = {
  kind: "radio";
  id: string;
  label: string;
  options: string[];
  allowOther?: boolean;
  required: boolean;
};

export type BusinessCheckboxField = {
  kind: "checkbox";
  id: string;
  label: string;
  options: string[];
  allowOther?: boolean;
  maxSelect: number;
  required: boolean;
};

export type BusinessField = BusinessTextField | BusinessRadioField | BusinessCheckboxField;

// Phần A – Thông tin doanh nghiệp (13 câu, không tính điểm). A10 là câu rẽ nhánh.
export const businessInfoFields: BusinessField[] = [
  {
    kind: "text",
    id: "companyName",
    label: "Tên doanh nghiệp của Quý Anh/Chị",
    placeholder: "Công ty TNHH...",
    required: true,
  },
  {
    kind: "text",
    id: "contactName",
    label: "Họ tên người điền & chức vụ",
    placeholder: "Nguyễn Văn A - Giám đốc",
    required: true,
  },
  {
    kind: "text",
    id: "phone",
    label: "Số điện thoại",
    type: "tel",
    placeholder: "09xx xxx xxx",
    required: true,
  },
  {
    kind: "text",
    id: "email",
    label: "Email",
    type: "email",
    placeholder: "ban@doanhnghiep.vn",
    required: true,
  },
  {
    kind: "text",
    id: "province",
    label: "Công ty/ Doanh nghiệp của Anh/Chị ở tỉnh / thành phố nào",
    placeholder: "Ví dụ: Hà Nội",
    required: true,
  },
  {
    kind: "radio",
    id: "businessType",
    label: "Loại hình công ty/doanh nghiệp",
    options: [
      "Doanh nghiệp sản xuất",
      "Hợp tác xã",
      "Hộ kinh doanh",
      "Chủ thể OCOP",
      "Doanh nghiệp thương mại",
    ],
    allowOther: true,
    required: true,
  },
  {
    kind: "text",
    id: "productIndustry",
    label: "Ngành hàng & sản phẩm chủ lực (ghi rõ tên sản phẩm)",
    placeholder: "Ví dụ: Cà phê rang xay",
    required: true,
  },
  {
    kind: "radio",
    id: "workforceSize",
    label: "Quy mô lao động",
    options: ["Dưới 10 nhân sự", "10–50 nhân sự", "51–200 nhân sự", "Trên 200 nhân sự"],
    required: true,
  },
  {
    kind: "radio",
    id: "revenue",
    label: "Doanh thu năm gần nhất",
    options: ["Dưới 1 tỷ", "1–10 tỷ", "10–50 tỷ", "50–200 tỷ", "Trên 200 tỷ"],
    required: true,
  },
  {
    kind: "radio",
    id: "exportExperience",
    label: "Doanh nghiệp của Anh/Chị đã từng xuất khẩu chưa?",
    options: ["Chưa từng", "Đã xuất thử vài đơn", "Đang xuất khẩu đều"],
    required: true,
  },
  {
    kind: "checkbox",
    id: "targetMarkets",
    label: "Thị trường mong muốn hướng tới (chọn tối đa 2)",
    options: ["Mỹ", "EU", "Nhật Bản", "Hàn Quốc", "Trung Quốc", "ASEAN", "Trung Đông"],
    allowOther: true,
    maxSelect: 2,
    required: true,
  },
  {
    kind: "checkbox",
    id: "challenges",
    label: "Khó khăn lớn nhất hiện nay (chọn tối đa 2)",
    options: [
      "Chứng nhận – pháp lý",
      "Tìm khách hàng",
      "Chi phí logistics",
      "Vốn",
      "Nhân sự xuất khẩu",
      "Bao bì – thương hiệu",
      "Chưa biết bắt đầu từ đâu",
    ],
    maxSelect: 2,
    required: true,
  },
  {
    kind: "radio",
    id: "referralChannel",
    label: "Anh/chị biết đến Vproud qua kênh nào?",
    options: ["Hiệp hội – Sở ngành", "Facebook", "Bạn bè giới thiệu", "Sự kiện"],
    allowOther: true,
    required: true,
  },
];

// Phần B2a – Hiện trạng xuất khẩu (E1-E6, chỉ dành cho Nhánh 2, không tính điểm)
export const branch2ProfileFields: BusinessField[] = [
  {
    kind: "checkbox",
    id: "exportMarkets",
    label: "Doanh nghiệp đang xuất khẩu sang thị trường nào? (chọn nhiều)",
    options: ["Mỹ", "EU", "Nhật Bản", "Hàn Quốc", "Trung Quốc", "ASEAN", "Trung Đông"],
    allowOther: true,
    maxSelect: 7,
    required: false,
  },
  {
    kind: "checkbox",
    id: "salesChannels",
    label: "Đang bán qua kênh / sàn nào? (chọn nhiều)",
    options: [
      "B2B trực tiếp với nhà nhập khẩu",
      "Qua công ty ủy thác – trung gian",
      "Alibaba",
      "Amazon",
      "Walmart Marketplace",
      "TikTok Shop",
      "Website tự vận hành",
      "Tiểu ngạch – biên mậu",
    ],
    allowOther: true,
    maxSelect: 8,
    required: false,
  },
  {
    kind: "radio",
    id: "salesModel",
    label: "Mô hình bán hàng xuất khẩu chủ yếu hiện nay",
    options: [
      "Bán sỉ (B2B – theo lô/container cho nhà nhập khẩu, nhà phân phối)",
      "Bán lẻ qua ecom (B2C – từng đơn tới người tiêu dùng qua sàn, website)",
      "Kết hợp cả hai – sỉ là chính",
      "Kết hợp cả hai – ecom là chính",
    ],
    required: false,
  },
  {
    kind: "radio",
    id: "exportScale",
    label: "Quy mô xuất khẩu hiện tại",
    options: [
      "Đơn lẻ theo yêu cầu",
      "Dưới 1 container mỗi quý",
      "Khoảng 1 container mỗi quý",
      "Khoảng 1 container mỗi tháng",
      "Nhiều container mỗi tháng",
    ],
    required: false,
  },
  {
    kind: "checkbox",
    id: "bottlenecks",
    label: "Điểm nghẽn lớn nhất hiện nay (chọn tối đa 2)",
    options: [
      "Tìm khách mới",
      "Chi phí logistics",
      "Thanh toán – công nợ quốc tế",
      "Chứng nhận cho thị trường mới",
      "Marketing quốc tế",
      "Kho & fulfillment tại nước ngoài",
      "Giá kém cạnh tranh",
      "Nhân sự xuất khẩu",
    ],
    maxSelect: 2,
    required: false,
  },
  {
    kind: "radio",
    id: "exportRevenueShare",
    label: "Tỷ trọng doanh thu từ xuất khẩu",
    options: ["Không đáng kể", "Dưới 10%", "10–30%", "Trên 30%"],
    required: false,
  },
];

// Phần C – Nhu cầu hỗ trợ (chung cho cả 2 nhánh, không tính điểm)
export const supportFields: BusinessField[] = [
  {
    kind: "checkbox",
    id: "supportNeeds",
    label: "Anh/chị mong muốn nhận hỗ trợ nào từ Vproud? (chọn tối đa 3)",
    options: [
      "Đào tạo xuất khẩu",
      "Đánh giá chuyên sâu 1-1",
      "Tư vấn chứng nhận",
      "Giải pháp logistics – fulfillment",
      "Xây thương hiệu & bao bì",
      "Kết nối nhà mua hàng quốc tế",
      "Bán hàng qua sàn TMĐT xuyên biên giới",
    ],
    maxSelect: 3,
    required: false,
  },
  {
    kind: "radio",
    id: "consentToContact",
    label: "Đồng ý để Vproud liên hệ tư vấn kết quả đánh giá?",
    options: ["Có", "Không"],
    required: false,
  },
];
