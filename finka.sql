-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost:3306
-- Thời gian đã tạo: Th2 13, 2025 lúc 03:15 PM
-- Phiên bản máy phục vụ: 8.0.30
-- Phiên bản PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `finka`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `columns`
--

CREATE TABLE `columns` (
  `id` int NOT NULL,
  `tableId` int NOT NULL,
  `indexing` decimal(10,0) NOT NULL,
  `key` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `label` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `dataType` enum('string','number','date','rate') CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `filterType` enum('range','multiselect','nomal','none') CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `annotation` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `isRequired` tinyint(1) NOT NULL DEFAULT '0',
  `defaultValue` varchar(2048) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Đang đổ dữ liệu cho bảng `columns`
--

INSERT INTO `columns` (`id`, `tableId`, `indexing`, `key`, `label`, `dataType`, `filterType`, `annotation`, `isRequired`, `defaultValue`, `createdAt`, `updatedAt`) VALUES
(1, 1, 20, 'code', 'Mã CK', 'string', 'multiselect', 'Mã chứng khoán', 1, NULL, '2025-01-27 14:31:33', '2025-02-02 14:58:37'),
(2, 1, 10, 'date', 'Ngày', 'date', 'none', NULL, 1, NULL, '2025-01-27 14:31:33', '2025-01-28 08:31:39'),
(5, 2, 20, 'point', 'Điểm', 'number', 'range', NULL, 1, NULL, '2025-01-28 03:28:48', '2025-02-01 11:48:48'),
(6, 2, 10, 'date', 'Ngày', 'date', 'none', NULL, 1, NULL, '2025-01-28 03:29:14', '2025-02-02 11:04:41'),
(7, 1, 30, 'price', 'Thị giá', 'number', 'range', 'Thị giá', 1, NULL, '2025-01-28 08:20:57', '2025-02-11 16:39:13'),
(9, 1, 60, 'bsRate', 'Tỷ lệ mua/bán', 'rate', 'range', NULL, 1, NULL, '2025-01-28 08:24:03', '2025-02-02 08:52:03'),
(10, 1, 70, 'bsCycle', 'Chu kỳ mua/bán', 'string', 'multiselect', '', 1, NULL, '2025-01-28 08:39:53', '2025-02-11 06:48:45'),
(11, 1, 80, 'pte', 'P/E', 'number', 'range', NULL, 1, NULL, '2025-01-28 08:40:19', '2025-01-30 14:34:34'),
(12, 1, 90, 'ptb', 'P/B', 'number', 'range', NULL, 1, NULL, '2025-01-28 08:40:46', '2025-01-28 08:40:46'),
(15, 1, 40, 'pl', 'P&L hiện tại', 'rate', 'range', NULL, 1, NULL, '2025-02-01 11:30:22', '2025-02-10 02:18:27'),
(17, 1, 100, 'roi', 'ROI', 'rate', 'range', NULL, 1, NULL, '2025-02-01 11:32:46', '2025-02-10 01:57:46'),
(18, 1, 110, 'valuationLevel', 'Định giá', 'string', 'multiselect', NULL, 1, NULL, '2025-02-01 11:39:23', '2025-02-01 11:39:23'),
(19, 1, 120, 'technicalSignal', 'Tín hiệu kỹ thuật', 'string', 'multiselect', NULL, 0, NULL, '2025-02-01 11:41:13', '2025-02-09 17:23:31'),
(20, 1, 130, 'maxInvestment', 'Giá trị mua tối đa (tỷ)', 'number', 'range', NULL, 0, NULL, '2025-02-01 11:43:23', '2025-02-09 17:23:34'),
(21, 2, 30, 'pl', 'P&L', 'rate', 'range', NULL, 0, NULL, '2025-02-01 11:44:36', '2025-02-10 03:32:12'),
(22, 2, 40, 'pe', 'PE', 'number', 'range', NULL, 0, NULL, '2025-02-01 11:45:00', '2025-02-01 11:45:00'),
(23, 2, 50, 'pb', 'PB', 'number', 'range', NULL, 0, NULL, '2025-02-01 11:45:22', '2025-02-01 11:45:22'),
(24, 2, 70, 'rcm', 'Lệnh mua/bán', 'string', 'multiselect', NULL, 0, NULL, '2025-02-01 11:46:24', '2025-02-01 11:50:46'),
(25, 2, 60, 'bsRate', 'Tỷ lệ mua/bán', 'rate', 'range', NULL, 0, NULL, '2025-02-01 11:47:20', '2025-02-02 11:05:06'),
(26, 2, 80, 'vnindexRisk', 'Rủi ro Vn-index', 'string', 'multiselect', NULL, 0, NULL, '2025-02-01 11:47:49', '2025-02-01 11:52:11'),
(27, 2, 90, 'macroeconomicRisk', 'Rủi ro vĩ mô', 'string', 'multiselect', NULL, 0, NULL, '2025-02-01 11:51:55', '2025-02-01 11:51:55'),
(28, 2, 100, 'trend', 'Trend', 'string', 'multiselect', NULL, 0, NULL, '2025-02-01 11:52:37', '2025-02-01 11:52:37'),
(29, 3, 30, 'quarter', 'Quý', 'string', 'multiselect', NULL, 0, NULL, '2025-02-01 11:56:57', '2025-02-02 11:54:05'),
(30, 3, 20, 'code', 'Mã CK', 'string', 'multiselect', NULL, 0, NULL, '2025-02-01 11:58:47', '2025-02-01 11:58:47'),
(31, 3, 50, 'rank', 'Xếp hạng BCTC', 'string', 'multiselect', NULL, 0, NULL, '2025-02-01 11:59:04', '2025-02-02 11:54:13'),
(32, 3, 40, 'category', 'Phân loại cổ phiếu', 'string', 'multiselect', NULL, 0, NULL, '2025-02-01 11:59:32', '2025-02-01 11:59:32'),
(33, 4, 10, 'code', 'Mã CK', 'string', 'multiselect', NULL, 0, NULL, '2025-02-01 12:00:07', '2025-02-01 12:00:07'),
(34, 4, 20, 'field', 'Ngành', 'string', 'multiselect', NULL, 0, NULL, '2025-02-01 12:02:52', '2025-02-01 12:02:52'),
(35, 3, 10, 'date', 'Ngày', 'date', 'none', NULL, 0, NULL, '2025-02-02 11:53:52', '2025-02-02 11:53:59'),
(37, 1, 50, 'rcm', 'Lệnh mua bán', 'string', 'range', NULL, 0, NULL, '2025-02-02 15:08:57', '2025-02-02 15:08:57');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `rows`
--

CREATE TABLE `rows` (
  `id` int NOT NULL,
  `tableId` int NOT NULL,
  `code` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `data` json NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `unique_code_4` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin GENERATED ALWAYS AS ((case when (`tableId` = 4) then `code` else NULL end)) STORED,
  `unique_code_1` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin GENERATED ALWAYS AS ((case when (`tableId` = 1) then `code` else NULL end)) STORED,
  `unique_date_1` date GENERATED ALWAYS AS ((case when (`tableId` = 1) then `date` else NULL end)) STORED,
  `unique_date_2` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin GENERATED ALWAYS AS ((case when (`tableId` = 2) then `date` else NULL end)) STORED,
  `unique_code_3` varchar(255) COLLATE utf8mb4_bin GENERATED ALWAYS AS ((case when (`tableId` = 3) then `code` else NULL end)) STORED,
  `unique_date_3` datetime GENERATED ALWAYS AS ((case when (`tableId` = 3) then `date` else NULL end)) STORED
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Đang đổ dữ liệu cho bảng `rows`
--

INSERT INTO `rows` (`id`, `tableId`, `code`, `date`, `data`, `createdAt`, `updatedAt`) VALUES
(1247, 4, 'ACB', NULL, '{\"field\": \"Ngân hàng\"}', '2025-02-11 02:53:55', '2025-02-11 02:53:55'),
(1248, 4, 'SSI', NULL, '{\"field\": \"Chứng khoán\"}', '2025-02-11 02:53:55', '2025-02-11 02:53:55'),
(1251, 4, 'VGC', NULL, '{\"field\": \"VLXD\"}', '2025-02-11 02:53:55', '2025-02-11 02:53:55'),
(1252, 4, 'CII', NULL, '{\"field\": \"Đầu tư công\"}', '2025-02-11 02:53:55', '2025-02-11 02:53:55'),
(1253, 4, 'VHM', NULL, '{\"field\": \"Bất động sản\"}', '2025-02-11 02:53:55', '2025-02-11 02:53:55'),
(1254, 4, 'BSR', NULL, '{\"field\": \"Lọc hoá dầu\"}', '2025-02-11 02:53:55', '2025-02-11 02:53:55'),
(1255, 4, 'TCB', NULL, '{\"field\": \"Ngân hàng\"}', '2025-02-11 02:53:55', '2025-02-11 02:53:55'),
(1256, 4, 'DGC', NULL, '{\"field\": \"Hoá chất\"}', '2025-02-11 02:53:55', '2025-02-11 02:53:55'),
(1259, 4, 'PPC', NULL, '{\"field\": \"Điện\"}', '2025-02-11 02:54:03', '2025-02-11 02:54:03'),
(1397, 4, 'VNM', NULL, '{\"field\": \"Thực phẩm\"}', '2025-02-12 01:47:32', '2025-02-12 01:47:32'),
(1418, 4, 'MBB', NULL, '{\"field\": \"Ngân hàng\"}', '2025-02-12 01:48:06', '2025-02-12 01:48:06'),
(1429, 4, 'NVL', NULL, '{\"field\": \"Bất động sản\"}', '2025-02-12 01:48:26', '2025-02-12 01:48:26'),
(3261, 3, 'ACB', '2024-04-01 00:00:00', '{\"rank\": \"Tốt\", \"quarter\": \"Q1 2025\", \"category\": \"Đầu cơ\"}', '2025-02-12 04:43:19', '2025-02-12 04:43:19'),
(3262, 3, 'MBB', '2024-04-02 00:00:00', '{\"rank\": \"Trung bình\", \"quarter\": \"Q1 2025\", \"category\": \"Tăng trưởng\"}', '2025-02-12 04:43:19', '2025-02-12 04:43:19'),
(3263, 3, 'VNM', '2024-04-03 00:00:00', '{\"rank\": \"Tốt\", \"quarter\": \"Q1 2025\", \"category\": \"Cổ tức\"}', '2025-02-12 04:43:19', '2025-02-12 04:43:19'),
(3264, 3, 'NKG', '2024-04-04 00:00:00', '{\"rank\": \"Tốt\", \"quarter\": \"Q1 2025\", \"category\": \"Cổ tức\"}', '2025-02-12 04:43:19', '2025-02-12 04:43:19'),
(3265, 3, 'HSG', '2024-04-05 00:00:00', '{\"rank\": \"Tốt\", \"quarter\": \"Q1 2025\", \"category\": \"Cổ tức\"}', '2025-02-12 04:43:19', '2025-02-12 04:43:19'),
(3266, 3, 'MSN', '2024-04-06 00:00:00', '{\"rank\": \"Tốt\", \"quarter\": \"Q1 2025\", \"category\": \"Cổ tức\"}', '2025-02-12 04:43:19', '2025-02-12 04:43:19'),
(3267, 3, 'SHB', '2024-04-07 00:00:00', '{\"rank\": \"Tốt\", \"quarter\": \"Q1 2025\", \"category\": \"Cổ tức\"}', '2025-02-12 04:43:19', '2025-02-12 04:43:19'),
(3268, 3, 'AAA', '2024-04-08 00:00:00', '{\"rank\": \"Trung bình\", \"quarter\": \"Q4 2024\", \"category\": \"Đầu cơ\"}', '2025-02-12 04:43:19', '2025-02-12 04:43:19'),
(3269, 3, 'DGC', '2024-04-09 00:00:00', '{\"rank\": \"Rất tốt\", \"quarter\": \"Q4 2024\", \"category\": \"Tăng trưởng\"}', '2025-02-12 04:43:19', '2025-02-12 04:43:19'),
(3270, 3, 'BSR', '2024-04-10 00:00:00', '{\"rank\": \"Trung bình\", \"quarter\": \"Q4 2024\", \"category\": \"Cổ tức\"}', '2025-02-12 04:43:19', '2025-02-12 04:43:19'),
(4700, 2, NULL, '2024-11-01 00:00:00', '{\"pb\": 1.25489, \"pe\": 6.274450000000001, \"pl\": 1.25, \"rcm\": \"Mua\", \"point\": 1254.89, \"trend\": \"Down\", \"bsRate\": 50, \"vnindexRisk\": \"Thấp\", \"macroeconomicRisk\": \"Thấp\"}', '2025-02-12 08:29:42', '2025-02-12 08:29:42'),
(4701, 2, NULL, '2024-11-04 00:00:00', '{\"pb\": 1.24471, \"pe\": 6.22355, \"pl\": 1.25, \"rcm\": \"Mua\", \"point\": 1244.71, \"trend\": \"Down\", \"bsRate\": 50, \"vnindexRisk\": \"Thấp\", \"macroeconomicRisk\": \"Thấp\"}', '2025-02-12 08:29:42', '2025-02-12 08:29:42'),
(4702, 2, NULL, '2024-11-05 00:00:00', '{\"pb\": 1.24576, \"pe\": 6.2288, \"pl\": 1.25, \"rcm\": \"Mua\", \"point\": 1245.76, \"trend\": \"Down\", \"bsRate\": 50, \"vnindexRisk\": \"Thấp\", \"macroeconomicRisk\": \"Thấp\"}', '2025-02-12 08:29:42', '2025-02-12 08:29:42'),
(4703, 2, NULL, '2024-11-06 00:00:00', '{\"pb\": 1.26128, \"pe\": 6.3064, \"pl\": 1.25, \"rcm\": \"Mua\", \"point\": 1261.28, \"trend\": \"Down\", \"bsRate\": 50, \"vnindexRisk\": \"Thấp\", \"macroeconomicRisk\": \"Thấp\"}', '2025-02-12 08:29:42', '2025-02-12 08:29:42'),
(4704, 2, NULL, '2024-11-07 00:00:00', '{\"pb\": 1.25975, \"pe\": 6.29875, \"pl\": 1.25, \"rcm\": \"Mua\", \"point\": 1259.75, \"trend\": \"Down\", \"bsRate\": 50, \"vnindexRisk\": \"Thấp\", \"macroeconomicRisk\": \"Thấp\"}', '2025-02-12 08:29:42', '2025-02-12 08:29:42'),
(4705, 2, NULL, '2024-11-08 00:00:00', '{\"pb\": 1.25256, \"pe\": 6.2627999999999995, \"pl\": 1.25, \"rcm\": \"Mua\", \"point\": 1252.56, \"trend\": \"Down\", \"bsRate\": 50, \"vnindexRisk\": \"Thấp\", \"macroeconomicRisk\": \"Thấp\"}', '2025-02-12 08:29:42', '2025-02-12 08:29:42'),
(4706, 2, NULL, '2024-11-11 00:00:00', '{\"pb\": 1.25032, \"pe\": 6.2516, \"pl\": 1.25, \"rcm\": \"Mua\", \"point\": 1250.32, \"trend\": \"Down\", \"bsRate\": 50, \"vnindexRisk\": \"Thấp\", \"macroeconomicRisk\": \"Thấp\"}', '2025-02-12 08:29:42', '2025-02-12 08:29:42'),
(4707, 2, NULL, '2024-11-12 00:00:00', '{\"pb\": 1.24482, \"pe\": 6.2241, \"pl\": 1.25, \"rcm\": \"Mua\", \"point\": 1244.82, \"trend\": \"Down\", \"bsRate\": 50, \"vnindexRisk\": \"Thấp\", \"macroeconomicRisk\": \"Thấp\"}', '2025-02-12 08:29:42', '2025-02-12 08:29:42'),
(4708, 2, NULL, '2024-11-13 00:00:00', '{\"pb\": 1.24604, \"pe\": 6.2302, \"pl\": 1.25, \"rcm\": \"Mua\", \"point\": 1246.04, \"trend\": \"Down\", \"bsRate\": 50, \"vnindexRisk\": \"Thấp\", \"macroeconomicRisk\": \"Thấp\"}', '2025-02-12 08:29:42', '2025-02-12 08:29:42'),
(4709, 2, NULL, '2024-11-14 00:00:00', '{\"pb\": 1.2318900000000002, \"pe\": 6.1594500000000005, \"pl\": 1.25, \"rcm\": \"Mua\", \"point\": 1231.89, \"trend\": \"Down\", \"bsRate\": 50, \"vnindexRisk\": \"Thấp\", \"macroeconomicRisk\": \"Thấp\"}', '2025-02-12 08:29:42', '2025-02-12 08:29:42'),
(4710, 2, NULL, '2024-11-15 00:00:00', '{\"pb\": 1.21857, \"pe\": 6.092849999999999, \"pl\": 1.25, \"rcm\": \"Mua\", \"point\": 1218.57, \"trend\": \"Down\", \"bsRate\": 50, \"vnindexRisk\": \"Thấp\", \"macroeconomicRisk\": \"Thấp\"}', '2025-02-12 08:29:42', '2025-02-12 08:29:42'),
(4711, 2, NULL, '2024-11-18 00:00:00', '{\"pb\": 1.21712, \"pe\": 6.0855999999999995, \"pl\": 1.25, \"rcm\": \"Mua\", \"point\": 1217.12, \"trend\": \"Down\", \"bsRate\": 50, \"vnindexRisk\": \"Thấp\", \"macroeconomicRisk\": \"Thấp\"}', '2025-02-12 08:29:42', '2025-02-12 08:29:42'),
(4712, 2, NULL, '2024-11-19 00:00:00', '{\"pb\": 1.2051500000000002, \"pe\": 6.02575, \"pl\": 1.25, \"rcm\": \"Mua\", \"point\": 1205.15, \"trend\": \"Down\", \"bsRate\": 50, \"vnindexRisk\": \"Thấp\", \"macroeconomicRisk\": \"Thấp\"}', '2025-02-12 08:29:42', '2025-02-12 08:29:42'),
(4713, 2, NULL, '2024-11-20 00:00:00', '{\"pb\": 1.21654, \"pe\": 6.0827, \"pl\": 1.25, \"rcm\": \"Mua\", \"point\": 1216.54, \"trend\": \"Down\", \"bsRate\": 50, \"vnindexRisk\": \"Thấp\", \"macroeconomicRisk\": \"Thấp\"}', '2025-02-12 08:29:42', '2025-02-12 08:29:42'),
(4714, 2, NULL, '2024-11-21 00:00:00', '{\"pb\": 1.22833, \"pe\": 6.141649999999999, \"pl\": 1.25, \"rcm\": \"Mua\", \"point\": 1228.33, \"trend\": \"Down\", \"bsRate\": 50, \"vnindexRisk\": \"Thấp\", \"macroeconomicRisk\": \"Thấp\"}', '2025-02-12 08:29:42', '2025-02-12 08:29:42'),
(4715, 2, NULL, '2024-11-22 00:00:00', '{\"pb\": 1.2281, \"pe\": 6.140499999999999, \"pl\": 1.25, \"rcm\": \"Mua\", \"point\": 1228.1, \"trend\": \"Down\", \"bsRate\": 50, \"vnindexRisk\": \"Thấp\", \"macroeconomicRisk\": \"Thấp\"}', '2025-02-12 08:29:42', '2025-02-12 08:29:42'),
(4716, 2, NULL, '2024-11-25 00:00:00', '{\"pb\": 1.2347, \"pe\": 6.173500000000001, \"pl\": 1.25, \"rcm\": \"Mua\", \"point\": 1234.7, \"trend\": \"Down\", \"bsRate\": 50, \"vnindexRisk\": \"Thấp\", \"macroeconomicRisk\": \"Thấp\"}', '2025-02-12 08:29:42', '2025-02-12 08:29:42'),
(4717, 2, NULL, '2024-11-26 00:00:00', '{\"pb\": 1.2421300000000002, \"pe\": 6.21065, \"pl\": 1.25, \"rcm\": \"Mua\", \"point\": 1242.13, \"trend\": \"Down\", \"bsRate\": 50, \"vnindexRisk\": \"Thấp\", \"macroeconomicRisk\": \"Thấp\"}', '2025-02-12 08:29:42', '2025-02-12 08:29:42'),
(4718, 2, NULL, '2024-11-27 00:00:00', '{\"pb\": 1.24197, \"pe\": 6.20985, \"pl\": 1.25, \"rcm\": \"Mua\", \"point\": 1241.97, \"trend\": \"Down\", \"bsRate\": 50, \"vnindexRisk\": \"Thấp\", \"macroeconomicRisk\": \"Thấp\"}', '2025-02-12 08:29:42', '2025-02-12 08:29:42'),
(4719, 2, NULL, '2024-11-28 00:00:00', '{\"pb\": 1.2421099999999998, \"pe\": 6.21055, \"pl\": 1.25, \"rcm\": \"Mua\", \"point\": 1242.11, \"trend\": \"Down\", \"bsRate\": 50, \"vnindexRisk\": \"Thấp\", \"macroeconomicRisk\": \"Thấp\"}', '2025-02-12 08:29:42', '2025-02-12 08:29:42'),
(4720, 2, NULL, '2024-11-29 00:00:00', '{\"pb\": 1.25046, \"pe\": 6.2523, \"pl\": 1.25, \"rcm\": \"Mua\", \"point\": 1250.46, \"trend\": \"Down\", \"bsRate\": 50, \"vnindexRisk\": \"Thấp\", \"macroeconomicRisk\": \"Thấp\"}', '2025-02-12 08:29:42', '2025-02-12 08:29:42'),
(4721, 2, NULL, '2024-12-02 00:00:00', '{\"pb\": 1.25121, \"pe\": 6.25605, \"pl\": 1.25, \"rcm\": \"Mua\", \"point\": 1251.21, \"trend\": \"Down\", \"bsRate\": 50, \"vnindexRisk\": \"Thấp\", \"macroeconomicRisk\": \"Thấp\"}', '2025-02-12 08:29:42', '2025-02-12 08:29:42'),
(4722, 2, NULL, '2024-12-03 00:00:00', '{\"pb\": 1.24983, \"pe\": 6.249149999999999, \"pl\": 1.25, \"rcm\": \"Mua\", \"point\": 1249.83, \"trend\": \"Down\", \"bsRate\": 50, \"vnindexRisk\": \"Thấp\", \"macroeconomicRisk\": \"Thấp\"}', '2025-02-12 08:29:42', '2025-02-12 08:29:42'),
(4723, 2, NULL, '2024-12-04 00:00:00', '{\"pb\": 1.24041, \"pe\": 6.202050000000001, \"pl\": 1.25, \"rcm\": \"Mua\", \"point\": 1240.41, \"trend\": \"Down\", \"bsRate\": 50, \"vnindexRisk\": \"Thấp\", \"macroeconomicRisk\": \"Thấp\"}', '2025-02-12 08:29:42', '2025-02-12 08:29:42'),
(4724, 2, NULL, '2024-12-05 00:00:00', '{\"pb\": 1.26753, \"pe\": 6.33765, \"pl\": 1.25, \"rcm\": \"Mua\", \"point\": 1267.53, \"trend\": \"Down\", \"bsRate\": 50, \"vnindexRisk\": \"Thấp\", \"macroeconomicRisk\": \"Thấp\"}', '2025-02-12 08:29:42', '2025-02-12 08:29:42'),
(4725, 2, NULL, '2024-12-06 00:00:00', '{\"pb\": 1.27014, \"pe\": 6.350700000000001, \"pl\": 1.25, \"rcm\": \"Mua\", \"point\": 1270.14, \"trend\": \"Down\", \"bsRate\": 50, \"vnindexRisk\": \"Thấp\", \"macroeconomicRisk\": \"Thấp\"}', '2025-02-12 08:29:42', '2025-02-12 08:29:42'),
(4726, 2, NULL, '2024-12-09 00:00:00', '{\"pb\": 1.27384, \"pe\": 6.369199999999999, \"pl\": 1.25, \"rcm\": \"Mua\", \"point\": 1273.84, \"trend\": \"Down\", \"bsRate\": 50, \"vnindexRisk\": \"Thấp\", \"macroeconomicRisk\": \"Thấp\"}', '2025-02-12 08:29:42', '2025-02-12 08:29:42'),
(4727, 2, NULL, '2024-12-10 00:00:00', '{\"pb\": 1.27207, \"pe\": 6.3603499999999995, \"pl\": 1.25, \"rcm\": \"Mua\", \"point\": 1272.07, \"trend\": \"Down\", \"bsRate\": 50, \"vnindexRisk\": \"Thấp\", \"macroeconomicRisk\": \"Thấp\"}', '2025-02-12 08:29:42', '2025-02-12 08:29:42'),
(4728, 2, NULL, '2024-12-11 00:00:00', '{\"pb\": 1.26886, \"pe\": 6.3443, \"pl\": 1.25, \"rcm\": \"Mua\", \"point\": 1268.86, \"trend\": \"Down\", \"bsRate\": 50, \"vnindexRisk\": \"Thấp\", \"macroeconomicRisk\": \"Thấp\"}', '2025-02-12 08:29:42', '2025-02-12 08:29:42'),
(4729, 2, NULL, '2024-12-12 00:00:00', '{\"pb\": 1.26735, \"pe\": 6.336749999999999, \"pl\": 1.25, \"rcm\": \"Mua\", \"point\": 1267.35, \"trend\": \"Down\", \"bsRate\": 50, \"vnindexRisk\": \"Thấp\", \"macroeconomicRisk\": \"Thấp\"}', '2025-02-12 08:29:42', '2025-02-12 08:29:42'),
(4730, 2, NULL, '2024-12-13 00:00:00', '{\"pb\": 1.26257, \"pe\": 6.31285, \"pl\": 1.25, \"rcm\": \"Mua\", \"point\": 1262.57, \"trend\": \"Down\", \"bsRate\": 50, \"vnindexRisk\": \"Thấp\", \"macroeconomicRisk\": \"Thấp\"}', '2025-02-12 08:29:42', '2025-02-12 08:29:42'),
(4731, 2, NULL, '2024-12-16 00:00:00', '{\"pb\": 1.26379, \"pe\": 6.31895, \"pl\": 1.25, \"rcm\": \"Mua\", \"point\": 1263.79, \"trend\": \"Down\", \"bsRate\": 50, \"vnindexRisk\": \"Thấp\", \"macroeconomicRisk\": \"Thấp\"}', '2025-02-12 08:29:42', '2025-02-12 08:29:42'),
(4732, 2, NULL, '2024-12-17 00:00:00', '{\"pb\": 1.26172, \"pe\": 6.3086, \"pl\": 1.25, \"rcm\": \"Mua\", \"point\": 1261.72, \"trend\": \"Down\", \"bsRate\": 50, \"vnindexRisk\": \"Thấp\", \"macroeconomicRisk\": \"Thấp\"}', '2025-02-12 08:29:42', '2025-02-12 08:29:42'),
(4733, 2, NULL, '2024-12-18 00:00:00', '{\"pb\": 1.266, \"pe\": 6.33, \"pl\": 1.25, \"rcm\": \"Mua\", \"point\": 1266, \"trend\": \"Down\", \"bsRate\": 50, \"vnindexRisk\": \"Thấp\", \"macroeconomicRisk\": \"Thấp\"}', '2025-02-12 08:29:42', '2025-02-12 08:29:42'),
(4734, 2, NULL, '2024-12-19 00:00:00', '{\"pb\": 1.2546700000000002, \"pe\": 6.273350000000001, \"pl\": 1.25, \"rcm\": \"Mua\", \"point\": 1254.67, \"trend\": \"Down\", \"bsRate\": 50, \"vnindexRisk\": \"Thấp\", \"macroeconomicRisk\": \"Thấp\"}', '2025-02-12 08:29:42', '2025-02-12 08:29:42'),
(4735, 2, NULL, '2024-12-20 00:00:00', '{\"pb\": 1.2575, \"pe\": 6.2875, \"pl\": 1.25, \"rcm\": \"Mua\", \"point\": 1257.5, \"trend\": \"Down\", \"bsRate\": 50, \"vnindexRisk\": \"Thấp\", \"macroeconomicRisk\": \"Thấp\"}', '2025-02-12 08:29:42', '2025-02-12 08:29:42'),
(4736, 2, NULL, '2024-12-23 00:00:00', '{\"pb\": 1.26276, \"pe\": 6.3138, \"pl\": 1.25, \"rcm\": \"Mua\", \"point\": 1262.76, \"trend\": \"Down\", \"bsRate\": 50, \"vnindexRisk\": \"Thấp\", \"macroeconomicRisk\": \"Thấp\"}', '2025-02-12 08:29:42', '2025-02-12 08:29:42'),
(4737, 2, NULL, '2024-12-24 00:00:00', '{\"pb\": 1.26036, \"pe\": 6.301799999999999, \"pl\": 1.25, \"rcm\": \"Mua\", \"point\": 1260.36, \"trend\": \"Down\", \"bsRate\": 50, \"vnindexRisk\": \"Thấp\", \"macroeconomicRisk\": \"Thấp\"}', '2025-02-12 08:29:42', '2025-02-12 08:29:42'),
(4738, 2, NULL, '2024-12-25 00:00:00', '{\"pb\": 1.27404, \"pe\": 6.3702, \"pl\": 1.25, \"rcm\": \"Mua\", \"point\": 1274.04, \"trend\": \"Down\", \"bsRate\": 50, \"vnindexRisk\": \"Thấp\", \"macroeconomicRisk\": \"Thấp\"}', '2025-02-12 08:29:42', '2025-02-12 08:29:42'),
(4739, 2, NULL, '2024-12-26 00:00:00', '{\"pb\": 1.27287, \"pe\": 6.364349999999999, \"pl\": 1.25, \"rcm\": \"Mua\", \"point\": 1272.87, \"trend\": \"Down\", \"bsRate\": 50, \"vnindexRisk\": \"Thấp\", \"macroeconomicRisk\": \"Thấp\"}', '2025-02-12 08:29:42', '2025-02-12 08:29:42'),
(4740, 2, NULL, '2024-12-27 00:00:00', '{\"pb\": 1.2751400000000002, \"pe\": 6.3757, \"pl\": 1.25, \"rcm\": \"Mua\", \"point\": 1275.14, \"trend\": \"Down\", \"bsRate\": 50, \"vnindexRisk\": \"Thấp\", \"macroeconomicRisk\": \"Thấp\"}', '2025-02-12 08:29:42', '2025-02-12 08:29:42'),
(4741, 2, NULL, '2024-12-30 00:00:00', '{\"pb\": 1.27202, \"pe\": 6.3601, \"pl\": 1.25, \"rcm\": \"Mua\", \"point\": 1272.02, \"trend\": \"Down\", \"bsRate\": 50, \"vnindexRisk\": \"Thấp\", \"macroeconomicRisk\": \"Thấp\"}', '2025-02-12 08:29:42', '2025-02-12 08:29:42'),
(4924, 1, 'TCB', '2023-11-01 00:00:00', '{\"ptb\": 1.61, \"pte\": 6.44, \"price\": 33.440000000000005}', '2025-02-12 08:48:39', '2025-02-12 08:48:39'),
(4925, 1, 'TCB', '2023-12-01 00:00:00', '{\"ptb\": 1.6825, \"pte\": 6.73, \"price\": 34.89}', '2025-02-12 08:48:39', '2025-02-12 08:48:39'),
(4926, 1, 'TCB', '2024-01-01 00:00:00', '{\"ptb\": 1.75, \"pte\": 7, \"price\": 36.24}', '2025-02-12 08:48:39', '2025-02-12 08:48:39'),
(4927, 1, 'TCB', '2024-02-01 00:00:00', '{\"ptb\": 1.825, \"pte\": 7.3, \"price\": 37.74}', '2025-02-12 08:48:39', '2025-02-12 08:48:39'),
(4928, 1, 'TCB', '2024-03-01 00:00:00', '{\"ptb\": 1.9, \"pte\": 7.6, \"price\": 39.24}', '2025-02-12 08:48:39', '2025-02-12 08:48:39'),
(4929, 1, 'TCB', '2024-04-01 00:00:00', '{\"ptb\": 1.975, \"pte\": 7.9, \"price\": 40.74}', '2025-02-12 08:48:39', '2025-02-12 08:48:39'),
(4930, 1, 'TCB', '2024-05-01 00:00:00', '{\"ptb\": 2.05, \"pte\": 8.2, \"price\": 42.24}', '2025-02-12 08:48:39', '2025-02-12 08:48:39'),
(4931, 1, 'TCB', '2024-06-01 00:00:00', '{\"ptb\": 2.125, \"pte\": 8.5, \"price\": 43.74}', '2025-02-12 08:48:39', '2025-02-12 08:48:39'),
(4932, 1, 'TCB', '2024-07-01 00:00:00', '{\"ptb\": 2.2, \"pte\": 8.8, \"price\": 45.24}', '2025-02-12 08:48:39', '2025-02-12 08:48:39'),
(4933, 1, 'TCB', '2024-08-01 00:00:00', '{\"ptb\": 2.275, \"pte\": 9.1, \"price\": 46.74}', '2025-02-12 08:48:39', '2025-02-12 08:48:39'),
(4934, 1, 'TCB', '2024-09-01 00:00:00', '{\"ptb\": 2.35, \"pte\": 9.4, \"price\": 48.24}', '2025-02-12 08:48:39', '2025-02-12 08:48:39'),
(4935, 1, 'TCB', '2024-10-01 00:00:00', '{\"ptb\": 2.425, \"pte\": 9.7, \"price\": 49.74}', '2025-02-12 08:48:39', '2025-02-12 08:48:39'),
(4936, 1, 'TCB', '2024-11-01 00:00:00', '{\"ptb\": 2.5, \"pte\": 10, \"price\": 51.24}', '2025-02-12 08:48:39', '2025-02-12 08:48:39'),
(4937, 1, 'TCB', '2024-12-01 00:00:00', '{\"ptb\": 2.575, \"pte\": 10.3, \"price\": 52.74}', '2025-02-12 08:48:39', '2025-02-12 08:48:39');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tables`
--

CREATE TABLE `tables` (
  `id` int NOT NULL,
  `name` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `description` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Đang đổ dữ liệu cho bảng `tables`
--

INSERT INTO `tables` (`id`, `name`, `description`, `createdAt`, `updatedAt`) VALUES
(1, 'Dữ liệu chung', NULL, '2025-01-27 10:20:18', '2025-01-27 10:20:18'),
(2, 'VNindex', NULL, '2025-01-27 10:20:18', '2025-01-27 10:20:18'),
(3, 'Xếp hạng cổ phiếu', NULL, '2025-01-27 10:20:18', '2025-01-27 10:20:18'),
(4, 'Danh mục cổ phiếu', NULL, '2025-01-27 10:20:18', '2025-01-27 10:20:18');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `email` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `password` varchar(8192) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `role` enum('ADMIN','LEADER','USER','LEADERBRANCH') CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT 'USER',
  `phone` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `province` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `status` enum('pending','reject','accept') CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `codeLiked` varchar(2048) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '[]',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `phone`, `province`, `status`, `codeLiked`, `createdAt`, `updatedAt`) VALUES
(1, 'Admin', 'admin@gmail.com', '$2a$10$8oxQ1.R8QGzQdMJJyMC2P.ENb70KgH5.ip/ZxllH5V/5ead6aIc1S', 'ADMIN', NULL, '', 'accept', '[]', '2024-11-26 17:52:38', '2025-02-10 08:46:25'),
(52, 'Nguyên', 'admin1@gmail.com', '$2a$10$trcdnFRWl752Ud/MqjOnueLrWexPQD4EJD5dTQMQj./J1BYdEuhqm', 'USER', '096125281231', '', 'accept', '[]', '2025-01-04 22:08:25', '2025-01-13 10:30:25'),
(53, 'Nguyên', 'd@gmail.com', '$2a$10$a9ATKdzkGdaFyW1.wAIjpeGFOytVqK/2SqBbcq9ahtmdsO2jrMAvK', 'USER', '456', '', 'accept', '[]', '2025-01-04 22:10:26', '2025-01-13 10:30:26'),
(54, 'Kiên', 'kien@gmail.com', '$2a$10$yR/a3TVLwK7uKNvUs7lOLuH1ALAnG.8l0/..r9ew1rQR8Hwk6XWuy', 'USER', '041655', '', 'accept', '[]', '2025-01-05 08:52:07', '2025-01-13 10:30:27'),
(55, 'Kiên', 'kien1@gmail.com', '$2a$10$mUSzVULK0WVd2MtVwQoh0uCc4HblVMulq/pJJdvfzblz4B4fBzTle', 'USER', '013215', '', 'accept', '[]', '2025-01-05 08:53:06', '2025-01-13 10:30:28'),
(56, 'Khôi Nguyên', 'a@gmail.com', '$2a$10$1UrKng9oyif44sRlJDBEoepfi7eHj.ma9tVZ0O3jhPlwxIbyTdaee', 'USER', '0231231', 'Bắc Giang', 'pending', '[]', '2025-02-08 10:29:39', '2025-02-08 10:29:39'),
(57, 'Hoang ANh', 'da@gmail.com', '$2a$10$daDgvuAg40lbVb62rtAdZOJeme60n.GFCSH9XaK4fMGCHywGtPNHK', 'USER', '01245646', 'Bà Rịa - Vũng Tàu', 'pending', '[]', '2025-02-10 16:22:15', '2025-02-10 16:22:15'),
(58, 'Nguyễn 29', 'b@gmail.com', '$2a$10$d3U6WLRqLVZI.f0nZXOPv.t6veyO25WqaPl0GVHhbYRfLbNZlsWii', 'USER', '0936073098', 'Nam Định', 'accept', '[]', '2025-02-11 03:34:57', '2025-02-11 06:45:16'),
(59, 'Phạm Nhật Vượng', 'Phamnhatvuong@gmail.com', '$2a$10$qt838SAHqCAItWDiO73zq.GUSWEyjeTSB2sWqcVW/0QNPErCC4pXS', 'USER', '0936073098', 'Hà Tĩnh', 'pending', '[]', '2025-02-11 03:47:04', '2025-02-11 03:47:04');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `columns`
--
ALTER TABLE `columns`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `tableId` (`tableId`,`key`);

--
-- Chỉ mục cho bảng `rows`
--
ALTER TABLE `rows`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `idx_unique_code_4` (`unique_code_4`),
  ADD UNIQUE KEY `idx_unique_code_date_1` (`unique_code_1`,`unique_date_1`),
  ADD UNIQUE KEY `idx_unique_date_2` (`unique_date_2`),
  ADD UNIQUE KEY `unique_code_3` (`unique_code_3`,`unique_date_3`);

--
-- Chỉ mục cho bảng `tables`
--
ALTER TABLE `tables`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `columns`
--
ALTER TABLE `columns`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT cho bảng `rows`
--
ALTER TABLE `rows`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4938;

--
-- AUTO_INCREMENT cho bảng `tables`
--
ALTER TABLE `tables`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
