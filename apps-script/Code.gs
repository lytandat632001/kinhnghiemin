
const SHEET_ID = "PASTE_YOUR_GOOGLE_SHEET_ID_HERE";
const SHEET_NAME = "Sheet1";
const NOTIFY_EMAIL = "PASTE_YOUR_EMAIL_HERE";

// Chuẩn hóa số điện thoại để đối chiếu khách cũ.
function normalizePhone(phone) {
  let s = String(phone || "").replace(/\D/g, "");
  if (s.startsWith("84")) s = s.slice(2);
  if (s.startsWith("0")) s = s.slice(1);
  return s;
}

// Ngăn dữ liệu khách hàng bị hiểu là công thức trong Google Sheets.
function safeCell(value) {
  const s = String(value == null ? "" : value);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

// GET: nhận yêu cầu từ website và trả JSONP để trình duyệt xác nhận kết quả.
function doGet(e) {
  const params = e && e.parameter ? e.parameter : {};
  const callback = String(params.callback || "");
  const response = params.name
    ? doPost(e)
    : respond({
        ok: true,
        saved: false,
        emailSent: false,
        message: "Kinh Nghiệm In: endpoint đang hoạt động."
      });

  if (!callback) return response;

  // Only accept a simple JavaScript function name to prevent script injection.
  if (!/^[A-Za-z_$][0-9A-Za-z_$]*$/.test(callback)) {
    return respond({
      ok: false,
      saved: false,
      emailSent: false,
      error: "Tên callback không hợp lệ."
    });
  }

  return ContentService
    .createTextOutput(callback + "(" + response.getContent() + ");")
    .setMimeType(ContentService.MimeType.JAVASCRIPT);
}

// POST: nhận dữ liệu từ request.
function doPost(e) {
  let lead;
  let code;
  let status;
  let note;

  try {
    // 1. Đọc dữ liệu gửi đến.
    let data = {};

    if (e && e.parameter && Object.keys(e.parameter).length > 0) {
      data = e.parameter;
    } else if (e && e.postData && e.postData.contents) {
      const raw = e.postData.contents;

      try {
        data = JSON.parse(raw);
      } catch (parseError) {
        data = parseFormEncoded(raw);
      }
    } else {
      throw new Error("Không nhận được dữ liệu từ biểu mẫu.");
    }

    // 2. Chuẩn hóa và giới hạn dữ liệu.
    lead = {
      name: String(data.name || "").trim().slice(0, 100),
      phone: String(data.phone || "").trim().slice(0, 30),
      product: String(data.product || "").trim().slice(0, 100),
      size: String(data.size || "").trim().slice(0, 200),
      quantity: String(data.quantity || "").trim().slice(0, 50),
      message: String(data.message || "").trim().slice(0, 2000)
    };

    if (!lead.name || !lead.phone || !lead.product) {
      return respond({
        ok: false,
        saved: false,
        emailSent: false,
        error: "Vui lòng cung cấp họ tên, số điện thoại và loại sản phẩm."
      });
    }

    if (lead.phone.replace(/\D/g, "").length < 9) {
      return respond({
        ok: false,
        saved: false,
        emailSent: false,
        error: "Số điện thoại không hợp lệ."
      });
    }

    // 3. Ghi dữ liệu vào Sheet và nhận diện khách cũ.
    const lock = LockService.getScriptLock();
    lock.waitLock(15000);

    try {
      const ss = SpreadsheetApp.openById(SHEET_ID);
      const sheet = ss.getSheetByName(SHEET_NAME);

      if (!sheet) {
        throw new Error('Không tìm thấy trang tính "' + SHEET_NAME + '".');
      }

      const lastRow = sheet.getLastRow();
      const phoneNormalized = normalizePhone(lead.phone);

      let previousCount = 0;
      let previousCode = "";

      if (lastRow >= 2 && phoneNormalized) {
        // Cột B:D gồm mã yêu cầu, họ tên, số điện thoại.
        const rows = sheet.getRange(2, 2, lastRow - 1, 3)
          .getDisplayValues();

        rows.forEach(function (row) {
          const oldCode = row[0];
          const oldPhone = normalizePhone(row[2]);

          if (oldPhone && oldPhone === phoneNormalized) {
            previousCount++;

            if (!previousCode) {
              previousCode = oldCode;
            }
          }
        });
      }

      status = previousCount > 0
        ? "Khách quay lại (" + (previousCount + 1) + " lần)"
        : "Khách mới";

      note = previousCount > 0
        ? "Trùng SĐT với lead " + previousCode
        : "";

      code = "REQ-" + Date.now().toString(36).toUpperCase();

      sheet.appendRow([
        new Date(),
        code,
        safeCell(lead.name),
        "'" + lead.phone,
        safeCell(lead.product),
        safeCell(lead.size),
        safeCell(lead.quantity),
        safeCell(lead.message),
        status,
        note
      ]);

      SpreadsheetApp.flush();

    } finally {
      lock.releaseLock();
    }

    // 4. Gửi email riêng sau khi đã ghi Sheet.
    // Email lỗi không làm mất dữ liệu đã lưu.
    try {
      sendNotification({
        code: code,
        name: lead.name,
        phone: lead.phone,
        product: lead.product,
        size: lead.size,
        quantity: lead.quantity,
        message: lead.message,
        status: status,
        note: note
      });

      return respond({
        ok: true,
        saved: true,
        emailSent: true,
        code: code,
        message: "Đã lưu yêu cầu và gửi email thông báo."
      });

    } catch (mailError) {
      console.error("Lỗi gửi email: " + errorMessage(mailError));

      return respond({
        ok: true,
        saved: true,
        emailSent: false,
        code: code,
        warning: "Yêu cầu đã lưu vào Sheet nhưng email chưa gửi được."
      });
    }

  } catch (err) {
    console.error("Lỗi xử lý yêu cầu: " + errorMessage(err));

    return respond({
      ok: false,
      saved: false,
      emailSent: false,
      code: code || "",
      error: errorMessage(err)
    });
  }
}

// Chỉ gửi email khi nhận được đối tượng dữ liệu hợp lệ.
function sendNotification(d) {
  if (!d || typeof d !== "object") {
    throw new Error(
      "Thiếu dữ liệu gửi email. Không chạy trực tiếp sendNotification."
    );
  }

  if (!d.name || !d.phone || !d.product || !d.code) {
    throw new Error("Dữ liệu gửi email thiếu trường bắt buộc.");
  }

  const subject =
    "[Kinh Nghiệm In] Yêu cầu báo giá " + d.code;

  const body = [
    "MÃ YÊU CẦU: " + d.code,
    "",
    "Họ tên: " + d.name,
    "Số điện thoại: " + d.phone,
    "Loại sản phẩm: " + d.product,
    "Kích thước: " + (d.size || "(không ghi)"),
    "Số lượng: " + (d.quantity || "(không ghi)"),
    "",
    "Mô tả:",
    d.message || "(không có)",
    "",
    "Trạng thái: " + (d.status || "Khách mới"),
    d.note || ""
  ].join("\n");

  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: subject,
    body: body,
    name: "Kinh Nghiệm In"
  });
}

// Phân tích dữ liệu dạng application/x-www-form-urlencoded.
function parseFormEncoded(str) {
  const out = {};

  String(str).split("&").forEach(function (pair) {
    const idx = pair.indexOf("=");

    if (idx < 0) return;

    const key = decodeURIComponent(
      pair.slice(0, idx).replace(/\+/g, " ")
    );

    const value = decodeURIComponent(
      pair.slice(idx + 1).replace(/\+/g, " ")
    );

    out[key] = value;
  });

  return out;
}

// Trả kết quả JSON.
function respond(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function errorMessage(err) {
  return String(
    err && err.message ? err.message : err
  );
}

// Chỉ dùng khi muốn kiểm tra toàn bộ quy trình.
// Lưu ý: hàm này sẽ thêm một dòng test vào Sheet.
function testManual() {
  const fakeEvent = {
    parameter: {
      name: "Khách Test",
      phone: "0900000000",
      product: "tem-dan-ly",
      size: "5x5cm",
      quantity: "1000",
      message: "Test từ Google Apps Script"
    }
  };

  const result = doPost(fakeEvent);
  console.log(result.getContent());
}

// Kiểm tra riêng quyền gửi email, không thêm dòng vào Sheet.
function testEmailOnly() {
  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: "Kiểm tra email - Kinh Nghiệm In",
    body: "Nếu nhận được email này, quyền gửi email đang hoạt động.",
    name: "Kinh Nghiệm In"
  });

  console.log("Đã gọi dịch vụ gửi email. Hãy kiểm tra hộp thư.");
}

// Liệt kê các tab trong file Google Sheets.
function listSheetTabs() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  console.log(
    ss.getSheets().map(function (sheet) {
      return sheet.getName();
    }).join(" | ")
  );
}
