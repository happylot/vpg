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

export const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: "san-pham-ho-so",
    category: "Độ sẵn sàng của sản phẩm",
    categoryMax: 20,
    text: "Sản phẩm của bạn đã có nhãn mác song ngữ, thông số kỹ thuật và hồ sơ chất lượng đầy đủ chưa?",
    options: [
      { label: "Chưa có, sản phẩm chỉ bán ở thị trường trong nước", points: 0 },
      { label: "Đang xây dựng, mới có một phần thông tin", points: 3 },
      { label: "Đã có nhưng cần hoàn thiện thêm để đạt chuẩn quốc tế", points: 7 },
      { label: "Đã đầy đủ, sẵn sàng đưa vào hồ sơ chào hàng quốc tế", points: 10 },
    ],
  },
  {
    id: "san-pham-thi-hieu",
    category: "Độ sẵn sàng của sản phẩm",
    categoryMax: 20,
    text: "Sản phẩm đã được điều chỉnh phù hợp với thị hiếu, quy chuẩn kỹ thuật của thị trường mục tiêu nước ngoài chưa?",
    options: [
      { label: "Chưa từng nghiên cứu thị trường mục tiêu", points: 0 },
      { label: "Đã tìm hiểu sơ bộ nhưng chưa điều chỉnh sản phẩm", points: 3 },
      { label: "Đã thử nghiệm điều chỉnh với một vài thị trường", points: 7 },
      { label: "Đã có phiên bản sản phẩm chuẩn hoá riêng cho xuất khẩu", points: 10 },
    ],
  },
  {
    id: "chung-nhan",
    category: "Chứng nhận và tuân thủ",
    categoryMax: 15,
    text: "Doanh nghiệp đã có những chứng nhận nào liên quan đến ngành hàng (ISO, HACCP, FDA, CE, Organic...)?",
    options: [
      { label: "Chưa có chứng nhận nào", points: 0 },
      { label: "Đang trong quá trình xin một chứng nhận", points: 3 },
      { label: "Đã có 1-2 chứng nhận cơ bản", points: 5 },
      { label: "Đã có đầy đủ chứng nhận cần thiết cho thị trường mục tiêu", points: 8 },
    ],
  },
  {
    id: "tuan-thu-phap-ly",
    category: "Chứng nhận và tuân thủ",
    categoryMax: 15,
    text: "Doanh nghiệp có theo dõi, cập nhật quy định thuế, hải quan, kiểm dịch của thị trường xuất khẩu không?",
    options: [
      { label: "Không theo dõi, chưa có ai phụ trách việc này", points: 0 },
      { label: "Có tìm hiểu khi phát sinh nhu cầu cụ thể", points: 2 },
      { label: "Có theo dõi định kỳ nhưng chưa hệ thống hoá", points: 5 },
      { label: "Có quy trình cập nhật và tuân thủ rõ ràng", points: 7 },
    ],
  },
  {
    id: "cong-suat",
    category: "Năng lực sản xuất",
    categoryMax: 15,
    text: "Công suất sản xuất hiện tại có đáp ứng được đơn hàng xuất khẩu số lượng lớn, giao hàng ổn định không?",
    options: [
      { label: "Chỉ đủ phục vụ thị trường nội địa quy mô nhỏ", points: 0 },
      { label: "Có thể tăng công suất nhưng cần thời gian chuẩn bị", points: 3 },
      { label: "Đáp ứng được đơn hàng vừa, ổn định trong ngắn hạn", points: 5 },
      { label: "Đáp ứng tốt đơn hàng lớn, có kế hoạch mở rộng dài hạn", points: 8 },
    ],
  },
  {
    id: "kiem-soat-chat-luong",
    category: "Năng lực sản xuất",
    categoryMax: 15,
    text: "Doanh nghiệp có hệ thống kiểm soát chất lượng (QC/QA) xuyên suốt quy trình sản xuất không?",
    options: [
      { label: "Chưa có quy trình kiểm soát chất lượng rõ ràng", points: 0 },
      { label: "Kiểm tra thủ công, chưa ghi chép hệ thống", points: 2 },
      { label: "Có quy trình QC cơ bản, ghi chép đầy đủ", points: 5 },
      { label: "Có hệ thống QC/QA chuẩn hoá, có nhân sự chuyên trách", points: 7 },
    ],
  },
  {
    id: "kinh-nghiem-xuat-khau",
    category: "Năng lực bán hàng xuất khẩu",
    categoryMax: 15,
    text: "Doanh nghiệp đã từng có giao dịch hoặc đơn hàng xuất khẩu (trực tiếp hoặc qua trung gian) chưa?",
    options: [
      { label: "Chưa từng xuất khẩu", points: 0 },
      { label: "Đã xuất khẩu qua trung gian, chưa làm việc trực tiếp", points: 3 },
      { label: "Đã có vài đơn hàng xuất khẩu trực tiếp", points: 5 },
      { label: "Xuất khẩu thường xuyên, có khách hàng quốc tế ổn định", points: 8 },
    ],
  },
  {
    id: "nhan-su-ban-hang",
    category: "Năng lực bán hàng xuất khẩu",
    categoryMax: 15,
    text: "Doanh nghiệp có đội ngũ phụ trách bán hàng quốc tế, đàm phán hợp đồng ngoại thương không?",
    options: [
      { label: "Chưa có nhân sự phụ trách mảng này", points: 0 },
      { label: "Chủ doanh nghiệp kiêm nhiệm khi cần", points: 2 },
      { label: "Có 1 nhân sự phụ trách bán hàng quốc tế", points: 5 },
      { label: "Có đội ngũ chuyên trách, thành thạo đàm phán ngoại thương", points: 7 },
    ],
  },
  {
    id: "thuong-hieu-quoc-te",
    category: "Thương hiệu quốc tế",
    categoryMax: 10,
    text: "Sản phẩm/thương hiệu của bạn đã có câu chuyện, bản sắc riêng và tài liệu marketing (website, catalogue tiếng Anh...) chưa?",
    options: [
      { label: "Chưa có tài liệu marketing bằng tiếng nước ngoài", points: 0 },
      { label: "Có một vài tài liệu cơ bản, chưa đồng bộ", points: 3 },
      { label: "Có website/catalogue tiếng Anh tương đối đầy đủ", points: 7 },
      { label: "Có bộ nhận diện thương hiệu và câu chuyện sản phẩm rõ ràng", points: 10 },
    ],
  },
  {
    id: "gia-canh-tranh",
    category: "Sức cạnh tranh về giá",
    categoryMax: 10,
    text: "Giá thành sản phẩm sau khi cộng chi phí logistics, thuế xuất khẩu có còn cạnh tranh so với đối thủ tại thị trường mục tiêu không?",
    options: [
      { label: "Chưa từng tính toán chi phí xuất khẩu đầy đủ", points: 0 },
      { label: "Đã ước tính sơ bộ, giá còn cao hơn đối thủ", points: 3 },
      { label: "Giá tương đương đối thủ trong khu vực", points: 7 },
      { label: "Giá cạnh tranh tốt, có lợi thế rõ ràng", points: 10 },
    ],
  },
  {
    id: "nang-luc-so",
    category: "Năng lực số",
    categoryMax: 10,
    text: "Doanh nghiệp có hiện diện số (website, sàn thương mại điện tử quốc tế, mạng xã hội B2B) để tiếp cận khách hàng nước ngoài không?",
    options: [
      { label: "Chưa có hiện diện số nào hướng tới khách quốc tế", points: 0 },
      { label: "Có mạng xã hội nhưng nội dung chủ yếu tiếng Việt", points: 3 },
      { label: "Có website hoặc gian hàng trên 1 sàn TMĐT quốc tế", points: 7 },
      { label: "Hiện diện đa kênh, chủ động tiếp cận khách hàng quốc tế", points: 10 },
    ],
  },
  {
    id: "cam-ket-lanh-dao",
    category: "Cam kết của ban lãnh đạo",
    categoryMax: 5,
    text: "Ban lãnh đạo có xác định xuất khẩu là chiến lược ưu tiên và sẵn sàng đầu tư nguồn lực (thời gian, tài chính, nhân sự) không?",
    options: [
      { label: "Xuất khẩu chỉ là ý tưởng, chưa có kế hoạch cụ thể", points: 0 },
      { label: "Quan tâm nhưng chưa bố trí nguồn lực rõ ràng", points: 2 },
      { label: "Đã có kế hoạch và phân bổ nguồn lực ban đầu", points: 3 },
      { label: "Xác định là chiến lược ưu tiên, đầu tư nguồn lực dài hạn", points: 5 },
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
    max: 40,
    desc: "Doanh nghiệp cần xây dựng nền tảng cơ bản trước khi tính đến xuất khẩu: hoàn thiện sản phẩm, chứng nhận và năng lực sản xuất.",
  },
  {
    label: "Đang chuẩn bị",
    min: 41,
    max: 65,
    desc: "Doanh nghiệp đã có nền tảng ban đầu, cần củng cố năng lực bán hàng, thương hiệu và chứng nhận để tự tin bước ra quốc tế.",
  },
  {
    label: "Sẵn sàng xuất khẩu",
    min: 66,
    max: 85,
    desc: "Doanh nghiệp đủ điều kiện tiếp cận thị trường quốc tế, nên tập trung mở rộng kênh bán hàng và tối ưu chi phí cạnh tranh.",
  },
  {
    label: "Sẵn sàng toàn cầu",
    min: 86,
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
