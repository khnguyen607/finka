import * as XLSX from "xlsx";

/**
 * Chuyển đổi số ngày Excel thành định dạng yyyy-mm-dd
 * @param {number|string} excelDate - Số ngày Excel hoặc chuỗi ngày
 * @returns {string} - Ngày định dạng yyyy-mm-dd
 */
const convertExcelDate = (excelDate) => {
  if (!excelDate) return null;
  const excelEpoch = new Date(1900, 0, 1); // Ngày bắt đầu: 01/01/1900
  const actualDate = new Date(
    excelEpoch.getTime() + (parseFloat(excelDate) - 1) * 86400000
  );
  const year = actualDate.getFullYear();
  const month = String(actualDate.getMonth() + 1).padStart(2, "0");
  const day = String(actualDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

/**
 * Kiểm tra và chuyển đổi dữ liệu
 * @param {any} value - Giá trị cần kiểm tra
 * @returns {any} - Giá trị đã được chuyển đổi
 */
const processValue = (value) => {
  if (typeof value === "string" && value.includes("%")) {
    // Loại bỏ ký tự '%' và chuyển sang số
    return parseFloat(value.replace("%", "").trim());
  } else if (!isNaN(value) && typeof value === "number" && value > 10000) {
    // Nếu là số ngày Excel, chuyển thành định dạng yyyy-mm-dd
    return convertExcelDate(value);
  } else if (
    typeof value === "string" &&
    new Date(value).toString() !== "Invalid Date"
  ) {
    // Nếu là chuỗi ngày, chuẩn hóa thành yyyy-mm-dd
    const date = new Date(value);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
  }
  // Trả về giá trị gốc nếu không cần xử lý
  return value;
};

/**
 * Hàm chuyển đổi file Excel thành JSON và xử lý dữ liệu
 * @param {File} file - File Excel tải lên
 * @returns {Promise} - Trả về một Promise chứa dữ liệu JSON
 */
export const excelToJson = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const binaryStr = e.target.result;
        const workbook = XLSX.read(binaryStr, { type: "binary" });
        const sheetName = workbook.SheetNames[0]; // Lấy tên sheet đầu tiên
        const sheet = workbook.Sheets[sheetName];
        // Xóa dấu % khỏi dữ liệu trong sheet
        Object.keys(sheet).forEach((cell) => {
          if (sheet[cell]?.w && sheet[cell].w.includes("%")) {
            sheet[cell].v *= 100;
          }
        });
        const jsonData = XLSX.utils.sheet_to_json(sheet); // Chuyển đổi sheet thành JSON
        // Xử lý từng giá trị trong dữ liệu
        const processedData = jsonData.map((row) => {
          const processedRow = {};
          Object.keys(row).forEach((key) => {
            processedRow[key] = processValue(row[key]); // Xử lý từng giá trị
          });
          return processedRow;
        });

        resolve(processedData);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsBinaryString(file); // Đọc file dưới dạng chuỗi nhị phân
  });
};
