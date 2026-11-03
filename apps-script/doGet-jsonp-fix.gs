// Replace the existing doGet(e) in Apps Script with this function.
// The existing doPost(e) and respond(obj) functions remain unchanged.
function doGet(e) {
  const params = e && e.parameter ? e.parameter : {};
  const callback = String(params.callback || "");
  const response = params.name
    ? doPost(e)
    : respond({
        ok: true,
        saved: false,
        emailSent: false,
        message: "Kinh Nghiệm In: endpoint đang hoạt động.",
      });

  if (!callback) return response;

  // Only accept a simple JavaScript function name to prevent script injection.
  if (!/^[A-Za-z_$][0-9A-Za-z_$]*$/.test(callback)) {
    return respond({
      ok: false,
      saved: false,
      emailSent: false,
      error: "Tên callback không hợp lệ.",
    });
  }

  return ContentService.createTextOutput(
    callback + "(" + response.getContent() + ");",
  ).setMimeType(ContentService.MimeType.JAVASCRIPT);
}
