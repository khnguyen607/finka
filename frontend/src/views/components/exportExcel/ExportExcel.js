// import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

/**
 * Hàm xuất dữ liệu ra file Excel
 * @param {String} fileName - Tên file Excel (mặc định là "Report.xlsx")
 * @param {Array} data - Mảng dữ liệu để xuất
 * @param {Array} columns - Cấu hình các cột trong Excel (label, field, width)
 */
export async function exportExcel(
  XLSX,
  fileName = "Report.xlsx",
  data = [],
  columns = []
) {
  try {
    // Tạo worksheet và workbook
    const sheetData = [
      columns.map((col) => col.label), // Dòng đầu tiên: Tiêu đề cột
      ...data.map(
        (row) => columns.map((col) => row[col.field]) // Chuyển dữ liệu sang mảng theo thứ tự cột
      ),
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(sheetData); // Chuyển dữ liệu thành worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

    // Thiết lập độ rộng cột (SheetJS không hỗ trợ native width, cần xử lý riêng)
    worksheet["!cols"] = columns.map((col) => ({ wch: col.width || 20 }));

    // Xuất file Excel
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    // Sử dụng FileSaver để tải file xuống
    saveAs(
      new Blob([excelBuffer], { type: "application/octet-stream" }),
      fileName
    );
  } catch (error) {
    console.error("Lỗi khi xuất Excel:", error);
  }
}
