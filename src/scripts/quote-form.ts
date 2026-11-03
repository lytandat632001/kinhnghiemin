import { site } from "../config/site";

interface QuoteResponse {
  ok?: boolean;
  saved?: boolean;
  emailSent?: boolean;
  message?: string;
  warning?: string;
  error?: string;
}

interface QuotePayload {
  name: string;
  phone: string;
  product: string;
  size: string;
  quantity: string;
  message: string;
}

function sendQuote(payload: QuotePayload): Promise<QuoteResponse> {
  return new Promise((resolve, reject) => {
    const callbackName = `__quoteCallback_${Date.now()}_${Math.random()
      .toString(36)
      .slice(2)}`;
    const callbackWindow = window as unknown as Record<
      string,
      (response: QuoteResponse) => void
    >;
    const script = document.createElement("script");
    let settled = false;
    let timeoutId = 0;

    const cleanup = () => {
      window.clearTimeout(timeoutId);
      delete callbackWindow[callbackName];
      script.remove();
    };

    const fail = (error: Error) => {
      if (settled) return;
      settled = true;
      cleanup();
      reject(error);
    };

    callbackWindow[callbackName] = (response) => {
      if (settled) return;
      settled = true;
      cleanup();
      resolve(response);
    };

    script.onerror = () =>
      fail(
        new Error(
          "Không kết nối được Apps Script. Hãy kiểm tra URL triển khai Web App.",
        ),
      );

    timeoutId = window.setTimeout(
      () => fail(new Error("Apps Script không phản hồi. Vui lòng thử lại sau.")),
      20000,
    );

    const params = new URLSearchParams({
      ...payload,
      callback: callbackName,
    });
    script.src = `${site.formEndpoint}?${params.toString()}`;
    script.async = true;
    document.head.appendChild(script);
  });
}

export function initQuoteForm() {
  const form = document.getElementById("quote-form") as HTMLFormElement | null;
  if (!form) return;

  const messageEl = document.getElementById("form-message") as HTMLDivElement | null;
  const submitBtn = form.querySelector("button[type=submit]") as HTMLButtonElement;
  let submitting = false;

  function showMessage(text: string, type: "success" | "error") {
    if (!messageEl) return;
    messageEl.textContent = text;
    messageEl.className = `form-message ${type}`;
    messageEl.hidden = false;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (submitting) return;

    if (messageEl) {
      messageEl.hidden = true;
      messageEl.textContent = "";
    }

    const formData = new FormData(form);
    if (!formData.get("consent")) {
      showMessage("Vui lòng xác nhận đồng ý để xưởng liên hệ tư vấn.", "error");
      return;
    }

    const payload = {
      name: String(formData.get("name") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      product: String(formData.get("product") || "").trim(),
      size: String(formData.get("size") || "").trim(),
      quantity: String(formData.get("quantity") || "").trim(),
      message: String(formData.get("message") || "").trim(),
    };

    if (!payload.name || !payload.phone || !payload.product) {
      showMessage("Vui lòng điền đầy đủ Họ tên, SĐT và Loại sản phẩm.", "error");
      return;
    }

    if (payload.phone.replace(/\D/g, "").length < 9) {
      showMessage("Số điện thoại chưa hợp lệ.", "error");
      return;
    }

    submitting = true;
    submitBtn.disabled = true;
    submitBtn.textContent = "Đang gửi...";

    try {
      const result = await sendQuote(payload);

      if (!result.ok || !result.saved) {
        showMessage(
          result.error || "Chưa lưu được yêu cầu. Vui lòng thử lại hoặc gọi trực tiếp.",
          "error",
        );
        return;
      }

      showMessage(
        result.emailSent === false
          ? "Yêu cầu đã lưu. Email thông báo chưa gửi được; xưởng sẽ kiểm tra hộp thư và quyền gửi email."
          : "Cảm ơn bạn! Yêu cầu đã được lưu. Xưởng sẽ liên hệ trong thời gian sớm nhất.",
        "success",
      );
      form.reset();
    } catch (err) {
      showMessage(
        err instanceof Error
          ? err.message
          : "Lỗi kết nối. Vui lòng thử lại hoặc gọi trực tiếp.",
        "error",
      );
    } finally {
      submitting = false;
      submitBtn.disabled = false;
      submitBtn.textContent = "Gửi yêu cầu";
    }
  });
}
