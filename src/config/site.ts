// ============================================
// CẤU HÌNH TOÀN SITE — Kinh Nghiệm In
// ============================================

export const site = {
  name: "Kinh Nghiệm In",
  shortName: "KNI",
  description:
    "Chia sẻ kinh nghiệm chọn chất liệu, quy cách in và nhà in phù hợp cho quán cà phê, cửa hàng và doanh nghiệp.",
  phone: "0349458387",
  phoneDisplay: "0349 458387",
  zalo: "0349458387",
  email: "huyennhu1230@gmail.com",
  address: "",
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
        a: "Bạn gửi số lượng dự kiến, tôi sẽ xác nhận và tư vấn phương án phù hợp.",
      },
    ],
  },
  {
    slug: "decal",
    icon: "🏷️",
    name: "Decal & tem nhãn",
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
        a: "Có. Bạn cho biết nhu cầu, tôi sẽ tư vấn loại màng phù hợp.",
      },
      {
        q: "Tem có bám chắc trên chai nhựa không?",
        a: "Phụ thuộc bề mặt và keo. Bạn gửi mẫu chai, tôi tư vấn loại keo phù hợp.",
      },
    ],
  },
  {
    slug: "hop-giay",
    icon: "📦",
    name: "Hộp giấy",
    desc: "Hộp bao bì cho thực phẩm, bánh ngọt, quà tặng.",
    intro:
      "Hộp giấy giúp bảo vệ sản phẩm và nâng cao trải nghiệm khách hàng khi nhận hàng.",
    useCases: [
      "Tiệm bánh, tiệm bánh ngọt",
      "Cửa hàng quà tặng, đặc sản",
      "Shop thời trang, phụ kiện",
    ],
    applications: [
      "Hộp bánh, hộp bánh quy",
      "Hộp quà tặng theo mùa",
      "Hộp đựng phụ kiện, mỹ phẩm",
    ],
    materials: [
      "Giấy mỹ thuật — đẹp, phù hợp quà tặng",
      "Giấy kraft — tự nhiên, thân thiện môi trường",
      "Giấy duplex — phổ thông, giá hợp lý",
    ],
    faqs: [
      {
        q: "Có in theo kích thước riêng không?",
        a: "Có. Bạn gửi kích thước và hình dạng mong muốn, tôi sẽ tư vấn và báo giá.",
      },
      {
        q: "Có làm mẫu trước không?",
        a: "Tùy đơn. Bạn trao đổi trực tiếp, tôi sẽ thông báo khả năng làm mẫu.",
      },
    ],
  },
  {
    slug: "tui-giay",
    icon: "🛍️",
    name: "Túi giấy",
    desc: "Túi giấy mang thương hiệu cho cửa hàng, shop.",
    intro:
      "Túi giấy vừa là bao bì, vừa là kênh quảng bá thương hiệu miễn phí mỗi khi khách mang về.",
    useCases: [
      "Cửa hàng thời trang, phụ kiện",
      "Tiệm bánh, cửa hàng thực phẩm",
      "Shop mỹ phẩm, quà tặng",
    ],
    applications: [
      "Túi đựng sản phẩm khi khách mua",
      "Túi quà tặng cho dịp lễ",
      "Túi đựng tài liệu, catalogue",
    ],
    materials: [
      "Giấy kraft — tự nhiên, chắc",
      "Giấy mỹ thuật — sang trọng",
      "Giấy ivory — mịn, in đẹp",
    ],
    faqs: [
      {
        q: "Có quai xách không?",
        a: "Có. Bạn chọn quai giấy, quai ruy băng, hoặc quai dây.",
      },
      {
        q: "Cán màng bóng được không?",
        a: "Được. Cán màng giúp túi cứng hơn và chống nước nhẹ.",
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
        a: "Tùy loại giấy. Bạn cho biết yêu cầu cụ thể, tôi sẽ xác nhận với nhà cung cấp.",
      },
      {
        q: "Chịu được đồ nóng bao nhiêu độ?",
        a: "Phụ thuộc chất liệu. Bạn cho biết món dự kiến đựng, tôi tư vấn loại phù hợp.",
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
    title: "Gửi yêu cầu",
    desc: "Điền form hoặc gọi trực tiếp. Càng chi tiết càng nhanh.",
  },
  {
    num: 2,
    title: "Tư vấn & báo giá",
    desc: "Tư vấn chất liệu, quy cách, số lượng phù hợp ngân sách.",
  },
  {
    num: 3,
    title: "Xác nhận & sản xuất",
    desc: "Chốt đơn, kiểm tra file thiết kế, đưa vào in.",
  },
  {
    num: 4,
    title: "Giao hàng",
    desc: "Giao toàn quốc, đóng gói cẩn thận, đúng hẹn.",
  },
];

export const faqs = [
  {
    q: "Tôi chưa biết chọn chất liệu nào, có được tư vấn không?",
    a: "Có. Bạn chỉ cần cho biết sản phẩm dùng cho mục đích gì, tôi sẽ gợi ý chất liệu và quy cách phù hợp nhất với ngân sách.",
  },
  {
    q: "Bao lâu thì có hàng?",
    a: "Thời gian phụ thuộc số lượng và kỹ thuật gia công. Sau khi bạn gửi yêu cầu, tôi sẽ báo thời gian cụ thể theo từng đơn.",
  },
  {
    q: "Có nhận in số lượng ít không?",
    a: "Tùy sản phẩm. Bạn cứ gửi số lượng dự kiến, tôi sẽ xác nhận có nhận hay không và tư vấn phương án phù hợp.",
  },
  {
    q: "Tôi cần chuẩn bị file thiết kế như thế nào?",
    a: "Sau khi bạn gửi yêu cầu, tôi sẽ liên hệ hướng dẫn chi tiết. Về cơ bản cần file gốc (AI, PSD, PDF) hoặc ảnh độ phân giải cao.",
  },
];