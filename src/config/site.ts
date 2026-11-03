// ============================================
// CẤU HÌNH TOÀN SITE — Kinh Nghiệm In
// ============================================

export const site = {
  name: "Kinh Nghiệm In",
  shortName: "KNI",
  description:
    "Xưởng in hộp giấy, túi giấy, ly in logo và decal. Tư vấn quy cách, hỗ trợ thiết kế đơn giản và nhận yêu cầu báo giá trực tiếp.",
  phone: "0349458387",
  phoneDisplay: "0349 458387",
  zalo: "0349458387",
  email: "huyennhu1230@gmail.com",
  address: "",
  // Must be the active Apps Script Web App URL ending in /exec.
  // The currently configured deployment URL responds with HTTP 404 and must be replaced after redeploying Apps Script.
  formEndpoint:
    "https://script.google.com/macros/s/AKfycBzRyCUtJskgeqmelvowpzG1mTkmZMI86svAdK_m4Hv1wIpQKVn2NyQmbpteba8rUPD2/exec",
  siteUrl: "https://kinhnghiemin.pages.dev",
};

export const nav = [
  { label: "Trang chủ", href: "/" },
  { label: "Sản phẩm", href: "/san-pham" },
  { label: "Blog", href: "/blog" },
  { label: "Liên hệ", href: "/lien-he" },
];

export interface ProductFaq {
  q: string;
  a: string;
}

export interface Product {
  slug: string;
  icon: string;
  name: string;
  desc: string;
  intro: string;
  useCases: string[];
  applications: string[];
  materials: string[];
  faqs: ProductFaq[];
}

export const products: Product[] = [
  {
    slug: "hop-giay",
    icon: "📦",
    name: "Hộp giấy",
    desc: "Hộp giấy in theo kích thước và nhận diện thương hiệu của bạn.",
    intro:
      "Hộp giấy được tư vấn theo sản phẩm cần đóng gói, cách sử dụng và hình ảnh thương hiệu. Xưởng hỗ trợ trao đổi quy cách, chất liệu và thiết kế đơn giản trước khi in.",
    useCases: ["Hộp đựng thực phẩm, bánh và quà tặng", "Hộp mỹ phẩm, phụ kiện và sản phẩm bán lẻ", "Bao bì đóng gói cho cửa hàng và doanh nghiệp"],
    applications: ["Hộp giấy gấp theo kích thước", "Hộp có in logo và thông tin sản phẩm", "Hộp quà tặng theo yêu cầu"],
    materials: ["Kraft — phong cách tự nhiên", "Ivory — bề mặt sáng, phù hợp in hình ảnh", "Duplex — lựa chọn phổ biến cho hộp giấy"],
    faqs: [
      { q: "Chưa có mẫu hộp thì có tư vấn được không?", a: "Được. Bạn cho biết sản phẩm cần đựng và kích thước dự kiến, xưởng sẽ trao đổi phương án quy cách phù hợp." },
      { q: "Xưởng có hỗ trợ thiết kế không?", a: "Xưởng có thể hỗ trợ tư vấn và thiết kế đơn giản. Hãy mô tả nhu cầu trong form để được trao đổi cụ thể." },
    ],
  },
  {
    slug: "tui-giay",
    icon: "🛍️",
    name: "Túi giấy",
    desc: "Túi giấy in logo cho cửa hàng, quán và thương hiệu bán lẻ.",
    intro:
      "Túi giấy có thể tùy chỉnh kích thước, chất liệu, quai và nội dung in. Xưởng tư vấn theo sản phẩm đựng bên trong và mục đích sử dụng.",
    useCases: ["Cửa hàng thời trang, mỹ phẩm và phụ kiện", "Tiệm bánh, quán cà phê và cửa hàng quà tặng", "Túi đựng sản phẩm hoặc tài liệu"],
    applications: ["Túi giấy có quai", "Túi in logo và thông tin thương hiệu", "Túi giấy theo kích thước riêng"],
    materials: ["Kraft — vẻ ngoài tự nhiên", "Couche — bề mặt in hình ảnh nổi bật", "Ivory — bề mặt sáng và cứng cáp"],
    faqs: [
      { q: "Có thể làm túi theo kích thước riêng không?", a: "Có thể trao đổi kích thước theo sản phẩm cần đựng. Gửi số đo hoặc ảnh tham khảo để được tư vấn." },
      { q: "Có thể in logo lên túi không?", a: "Có. Bạn có thể gửi logo hoặc trao đổi ý tưởng để được hỗ trợ chuẩn bị nội dung in." },
    ],
  },
  {
    slug: "ly-in-logo",
    icon: "🥤",
    name: "Ly in logo",
    desc: "Ly giấy và ly nhựa in nhận diện cho quán đồ uống, sự kiện và thương hiệu.",
    intro:
      "Ly in logo giúp thương hiệu xuất hiện trên mỗi đơn hàng mang đi. Xưởng tư vấn loại ly, vị trí in và cách chuẩn bị thiết kế theo nhu cầu sử dụng.",
    useCases: ["Quán cà phê, trà sữa, nước ép", "Sự kiện, hội nghị và chương trình quảng bá", "Thương hiệu đồ uống cần bao bì mang đi"],
    applications: ["Ly giấy in logo", "Ly nhựa in nhận diện", "Ly theo dung tích và nhu cầu sử dụng"],
    materials: ["Ly giấy — phù hợp đồ uống nóng hoặc lạnh tùy cấu tạo", "Ly nhựa — phù hợp đồ uống lạnh và mang đi"],
    faqs: [
      { q: "Tôi chưa có file thiết kế ly thì sao?", a: "Bạn có thể gửi logo, tên thương hiệu hoặc ý tưởng. Xưởng sẽ trao đổi phương án thiết kế đơn giản phù hợp." },
      { q: "Cần cung cấp gì để được báo giá?", a: "Nếu biết, hãy gửi loại ly, dung tích và số lượng dự kiến. Nếu chưa rõ, cứ để lại thông tin liên hệ để được tư vấn." },
    ],
  },
  {
    slug: "tem-dan-ly",
    icon: "🥤",
    name: "Tem dán ly",
    desc: "Tem nhãn cho quán cà phê, trà sữa, đồ uống mang đi.",
    intro:
      "Tem dán ly giúp quán nhận diện thương hiệu trên từng ly nước, đồng thời ghi rõ thông tin đơn hàng để tránh nhầm lẫn.",
    useCases: [
      "Quán cà phê, trà sữa, nước ép, sinh tố",
      "Chuỗi đồ uống cần đồng bộ nhận diện",
      "Shop online bán đồ uống take-away",
    ],
    applications: [
      "Dán thân ly nhựa, ly giấy",
      "Dán nắp ly để niêm phong",
      "Tem ghi tên món, size, topping",
    ],
    materials: [
      "Decal giấy — dễ bóc, phù hợp ly dùng 1 lần",
      "Decal nhựa PVC — chống nước, bền hơn",
      "Decal trong suốt — nhìn xuyên, tối giản",
    ],
    faqs: [
      {
        q: "Tem có chống nước không?",
        a: "Tùy chất liệu. Decal nhựa PVC chống nước tốt, phù hợp ly đá. Decal giấy chỉ dùng ly không đổ mồ hôi.",
      },
      {
        q: "Đặt số lượng ít có nhận không?",
        a: "Bạn gửi số lượng dự kiến để xưởng xác nhận và tư vấn phương án phù hợp.",
      },
    ],
  },
  {
    slug: "decal",
    icon: "🏷️",
    name: "Decal sản phẩm",
    desc: "Tem dán sản phẩm, chai lọ, hộp, túi theo yêu cầu.",
    intro:
      "Decal và tem nhãn dùng để dán lên sản phẩm, giúp nhận diện thương hiệu và cung cấp thông tin cần thiết cho người mua.",
    useCases: [
      "Chai lọ mỹ phẩm, thực phẩm, đồ uống",
      "Hộp, túi, bao bì sản phẩm",
      "Sản phẩm thủ công, handmade",
    ],
    applications: [
      "Tem dán chai, lọ, hũ",
      "Tem niêm phong hộp",
      "Tem thông tin thành phần, hạn dùng",
    ],
    materials: [
      "Decal giấy — in đẹp, không chống nước",
      "Decal nhựa PVC — chống nước, chống trầy",
      "Decal xi bạc — sang trọng, dùng mỹ phẩm",
    ],
    faqs: [
      {
        q: "Có cán màng bóng/mờ không?",
        a: "Có. Bạn cho biết nhu cầu để xưởng tư vấn loại màng phù hợp.",
      },
      {
        q: "Tem có bám chắc trên chai nhựa không?",
        a: "Phụ thuộc bề mặt và keo. Bạn gửi mẫu chai để xưởng tư vấn loại keo phù hợp.",
      },
    ],
  },
  {
    slug: "bao-bi-thuc-pham",
    icon: "🍱",
    name: "Bao bì thực phẩm",
    desc: "Bao bì an toàn cho đồ ăn, take-away, đóng gói.",
    intro:
      "Bao bì thực phẩm cần đáp ứng yêu cầu an toàn vệ sinh, đồng thời giữ được hình ảnh thương hiệu sạch sẽ, chuyên nghiệp.",
    useCases: [
      "Quán ăn, nhà hàng take-away",
      "Cơ sở sản xuất thực phẩm đóng gói",
      "Bếp cloud kitchen, shop đồ ăn online",
    ],
    applications: [
      "Hộp đựng đồ ăn",
      "Túi giấy đựng bánh mì, burger",
      "Khay, hộp đựng thức ăn nhanh",
    ],
    materials: [
      "Giấy tráng PE — chống thấm dầu mỡ",
      "Giấy kraft thực phẩm — an toàn",
      "Giấy tráng sinh học — thân thiện môi trường",
    ],
    faqs: [
      {
        q: "Có chứng nhận an toàn thực phẩm không?",
        a: "Tùy loại giấy. Bạn cho biết yêu cầu cụ thể để xưởng kiểm tra và phản hồi.",
      },
      {
        q: "Chịu được đồ nóng bao nhiêu độ?",
        a: "Phụ thuộc chất liệu. Bạn cho biết món dự kiến đựng để xưởng tư vấn loại phù hợp.",
      },
    ],
  },
  {
    slug: "danh-thiep",
    icon: "💳",
    name: "Danh thiếp",
    desc: "Name card chuyên nghiệp cho cá nhân và doanh nghiệp.",
    intro:
      "Danh thiếp là ấn phẩm đầu tiên khách nhìn thấy khi gặp bạn — cần gọn, rõ và chuyên nghiệp.",
    useCases: [
      "Cá nhân, freelancer, chủ doanh nghiệp",
      "Nhân viên kinh doanh, tư vấn",
      "Sự kiện, hội thảo, networking",
    ],
    applications: [
      "Name card cá nhân",
      "Card cảm ơn kèm đơn hàng",
      "Card giới thiệu dịch vụ",
    ],
    materials: [
      "Giấy couché 300gsm — phổ thông",
      "Giấy mỹ thuật — sang trọng, có vân",
      "Giấy kraft — phong cách tự nhiên",
    ],
    faqs: [
      {
        q: "Có cán màng mờ/bóng không?",
        a: "Có. Cán màng giúp card cứng và bền màu hơn.",
      },
      {
        q: "Có ép kim không?",
        a: "Có, tùy ngân sách. Ép kim tạo điểm nhấn sang trọng.",
      },
    ],
  },
];

export const processSteps = [
  {
    num: 1,
    title: "Gửi nhu cầu",
    desc: "Cho biết sản phẩm bạn cần, kể cả khi chưa rõ quy cách hoặc chưa có file thiết kế.",
  },
  {
    num: 2,
    title: "Tư vấn & báo giá",
    desc: "Cùng trao đổi chất liệu, quy cách, số lượng và phần thiết kế đơn giản nếu cần.",
  },
  {
    num: 3,
    title: "Duyệt mẫu & in",
    desc: "Thống nhất nội dung, kiểm tra thiết kế và xác nhận trước khi sản xuất.",
  },
  {
    num: 4,
    title: "Giao hàng",
    desc: "Thống nhất thời gian và phương thức nhận hàng theo từng đơn.",
  },
];

export const faqs = [
  {
    q: "Tôi chưa biết chọn chất liệu nào, có được tư vấn không?",
    a: "Có. Hãy cho biết sản phẩm cần in và mục đích sử dụng. Xưởng sẽ cùng bạn trao đổi chất liệu, quy cách và số lượng phù hợp.",
  },
  {
    q: "Bao lâu thì có hàng?",
    a: "Thời gian phụ thuộc loại sản phẩm, số lượng và gia công. Xưởng sẽ trao đổi thời gian dự kiến sau khi hiểu rõ yêu cầu.",
  },
  {
    q: "Có nhận in số lượng ít không?",
    a: "Tùy sản phẩm và quy cách. Bạn cứ gửi số lượng dự kiến để xưởng kiểm tra và tư vấn phương án phù hợp.",
  },
  {
    q: "Tôi cần chuẩn bị file thiết kế như thế nào?",
    a: "Nếu đã có file, bạn có thể trao đổi gửi qua Zalo hoặc email. Nếu chưa có, hãy mô tả ý tưởng; xưởng có thể tư vấn phần thiết kế đơn giản.",
  },
];
