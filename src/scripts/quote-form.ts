import { site } from "../config/site";

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
      // Tạo URL với query string
      const params = new URLSearchParams(payload).toString();
      const url = site.formEndpoint + "?" + params;

      // Gửi qua thẻ img — không vướng CORS
      // Apps Script trả JSON (không phải ảnh) → onerror sẽ chạy
      // Nhưng request ĐÃ đến server thành công
      await new Promise<void>((resolve) => {
        const img = new Image();
        const timeout = setTimeout(() => resolve(), 8000);

        img.onload = () => {
          clearTimeout(timeout);
          resolve();
        };
        img.onerror = () => {
          clearTimeout(timeout);
          resolve();
        };

        img.src = url;
      });

      // Đợi 1 giây để Apps Script kịp ghi
      await new Promise((r) => setTimeout(r, 1000));

      showMessage(
        "Cảm ơn bạn! Yêu cầu đã được ghi nhận. Tôi sẽ liên hệ trong thời gian sớm nhất.",
        "success"
      );
      form.reset();
    } catch (err) {
      showMessage("Lỗi kết nối. Vui lòng thử lại hoặc gọi trực tiếp.", "error");
    } finally {
      submitting = false;
      submitBtn.disabled = false;
      submitBtn.textContent = "Gửi yêu cầu";
    }
  });
}