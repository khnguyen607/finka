export const getRows = async (apiInstance, params) => {
  try {
    const res = await apiInstance.post("/api/rows/table", {
      tableId: params.tableId,
      dateFrom: params.dateFrom,
      dateTo: params.dateTo,
      codes: params.codes,
      sortBy: params.sortBy,
    }); // Gọi API từ instance
    const data = res.data.data;
    return data; // Trả về dữ liệu
  } catch (error) {
    console.error("Error fetching rows:", error);
    throw error; // Ném lỗi để xử lý bên ngoài
  }
};
