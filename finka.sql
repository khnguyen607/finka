-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost:3306
-- Thời gian đã tạo: Th2 02, 2025 lúc 05:00 PM
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
  `indexing` int NOT NULL,
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
(1, 1, 2, 'code', 'Mã CK', 'string', 'multiselect', 'Mã chứng khoán', 1, NULL, '2025-01-27 14:31:33', '2025-02-02 14:58:37'),
(2, 1, 1, 'date', 'Ngày', 'date', 'none', NULL, 1, NULL, '2025-01-27 14:31:33', '2025-01-28 08:31:39'),
(5, 2, 2, 'point', 'Điểm', 'number', 'range', NULL, 1, NULL, '2025-01-28 03:28:48', '2025-02-01 11:48:48'),
(6, 2, 1, 'date', 'Ngày', 'date', 'none', NULL, 1, NULL, '2025-01-28 03:29:14', '2025-02-02 11:04:41'),
(7, 1, 3, 'price', 'Thị giá', 'number', 'range', NULL, 1, NULL, '2025-01-28 08:20:57', '2025-02-01 11:30:29'),
(9, 1, 6, 'bsRate', 'Tỷ lệ mua/bán', 'rate', 'range', NULL, 1, NULL, '2025-01-28 08:24:03', '2025-02-02 08:52:03'),
(10, 1, 7, 'bsCycle', 'Chu kỳ mua/bán', 'string', 'multiselect', NULL, 1, NULL, '2025-01-28 08:39:53', '2025-02-01 11:33:47'),
(11, 1, 8, 'pte', 'P/E', 'number', 'range', NULL, 1, NULL, '2025-01-28 08:40:19', '2025-01-30 14:34:34'),
(12, 1, 9, 'ptb', 'P/B', 'number', 'range', NULL, 1, NULL, '2025-01-28 08:40:46', '2025-01-28 08:40:46'),
(15, 1, 4, 'pl', 'P&L hiện tại', 'number', 'range', NULL, 1, NULL, '2025-02-01 11:30:22', '2025-02-01 11:30:22'),
(17, 1, 10, 'roi', 'ROI', 'number', 'range', NULL, 1, NULL, '2025-02-01 11:32:46', '2025-02-01 11:34:07'),
(18, 1, 11, 'valuationLevel', 'Định giá', 'string', 'multiselect', NULL, 1, NULL, '2025-02-01 11:39:23', '2025-02-01 11:39:23'),
(19, 1, 12, 'technicalSignal', 'Tín hiệu kỹ thuật', 'string', 'multiselect', NULL, 0, NULL, '2025-02-01 11:41:13', '2025-02-01 11:41:13'),
(20, 1, 13, 'maxInvestment', 'Giá trị mua tối đa (tỷ)', 'number', 'range', NULL, 0, NULL, '2025-02-01 11:43:23', '2025-02-01 11:43:23'),
(21, 2, 3, 'pl', 'P&L', 'number', 'range', NULL, 0, NULL, '2025-02-01 11:44:36', '2025-02-01 11:44:36'),
(22, 2, 4, 'pe', 'PE', 'number', 'range', NULL, 0, NULL, '2025-02-01 11:45:00', '2025-02-01 11:45:00'),
(23, 2, 5, 'pb', 'PB', 'number', 'range', NULL, 0, NULL, '2025-02-01 11:45:22', '2025-02-01 11:45:22'),
(24, 2, 7, 'rcm', 'Lệnh mua/bán', 'string', 'multiselect', NULL, 0, NULL, '2025-02-01 11:46:24', '2025-02-01 11:50:46'),
(25, 2, 6, 'bsRate', 'Tỷ lệ mua/bán', 'rate', 'range', NULL, 0, NULL, '2025-02-01 11:47:20', '2025-02-02 11:05:06'),
(26, 2, 8, 'vnindexRisk', 'Rủi ro Vn-index', 'string', 'multiselect', NULL, 0, NULL, '2025-02-01 11:47:49', '2025-02-01 11:52:11'),
(27, 2, 9, 'macroeconomicRisk', 'Rủi ro vĩ mô', 'string', 'multiselect', NULL, 0, NULL, '2025-02-01 11:51:55', '2025-02-01 11:51:55'),
(28, 2, 10, 'trend', 'Trend', 'string', 'multiselect', NULL, 0, NULL, '2025-02-01 11:52:37', '2025-02-01 11:52:37'),
(29, 3, 3, 'quarter', 'Quý', 'string', 'multiselect', NULL, 0, NULL, '2025-02-01 11:56:57', '2025-02-02 11:54:05'),
(30, 3, 2, 'code', 'Mã CK', 'string', 'multiselect', NULL, 0, NULL, '2025-02-01 11:58:47', '2025-02-01 11:58:47'),
(31, 3, 5, 'rank', 'Xếp hạng BCTC', 'string', 'multiselect', NULL, 0, NULL, '2025-02-01 11:59:04', '2025-02-02 11:54:13'),
(32, 3, 4, 'category', 'Phân loại cổ phiếu', 'string', 'multiselect', NULL, 0, NULL, '2025-02-01 11:59:32', '2025-02-01 11:59:32'),
(33, 4, 1, 'code', 'Mã CK', 'string', 'multiselect', NULL, 0, NULL, '2025-02-01 12:00:07', '2025-02-01 12:00:07'),
(34, 4, 2, 'field', 'Ngành', 'string', 'multiselect', NULL, 0, NULL, '2025-02-01 12:02:52', '2025-02-01 12:02:52'),
(35, 3, 1, 'date', 'Ngày', 'date', 'none', NULL, 0, NULL, '2025-02-02 11:53:52', '2025-02-02 11:53:59'),
(37, 1, 5, 'rcm', 'Lệnh mua bán', 'string', 'range', NULL, 0, NULL, '2025-02-02 15:08:57', '2025-02-02 15:08:57');

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
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Đang đổ dữ liệu cho bảng `rows`
--

INSERT INTO `rows` (`id`, `tableId`, `code`, `date`, `data`, `createdAt`, `updatedAt`) VALUES
(44, 2, NULL, '2024-11-25 00:00:00', '{\"pb\": 1.7, \"pe\": 13.2, \"pl\": 0, \"rcm\": \"Mua\", \"point\": 1240.2, \"trend\": \"Up trend\", \"bsRate\": 30, \"vnindexRisk\": \"Rất cao\", \"macroeconomicRisk\": \"Cao\"}', '2025-02-01 15:22:21', '2025-02-01 15:22:21'),
(45, 2, NULL, '2024-11-26 00:00:00', '{\"pb\": 1.75, \"pe\": 13.1, \"pl\": 0.5, \"rcm\": \"Bán\", \"point\": 1241.3, \"trend\": \"Sideway up\", \"bsRate\": 10, \"vnindexRisk\": \"Cao\", \"macroeconomicRisk\": \"Trung tính\"}', '2025-02-01 15:22:21', '2025-02-01 15:22:21'),
(46, 2, NULL, '2024-11-27 00:00:00', '{\"pb\": 1.69, \"pe\": 13.3, \"pl\": 0.5, \"rcm\": \"Trung lập\", \"point\": 1242.7, \"trend\": \"Sideway up\", \"bsRate\": 10, \"vnindexRisk\": \"Trung tính\", \"macroeconomicRisk\": \"Thấp\"}', '2025-02-01 15:22:21', '2025-02-01 15:22:21'),
(47, 2, NULL, '2024-11-28 00:00:00', '{\"pb\": 1.72, \"pe\": 13.2, \"pl\": 0.5, \"rcm\": \"Chờ mua\", \"point\": 1250.9, \"trend\": \"Sideway down\", \"bsRate\": 10, \"vnindexRisk\": \"Thấp\", \"macroeconomicRisk\": \"Thấp\"}', '2025-02-01 15:22:21', '2025-02-01 15:22:21'),
(48, 2, NULL, '2024-11-29 00:00:00', '{\"pb\": 1.77, \"pe\": 13, \"pl\": 0.5, \"rcm\": \"Bán\", \"point\": 1239.2, \"trend\": \"Down trend\", \"bsRate\": 10, \"vnindexRisk\": \"Rất thấp\", \"macroeconomicRisk\": \"Rất thấp\"}', '2025-02-01 15:22:21', '2025-02-01 15:22:21'),
(49, 3, 'ACB', '2025-02-02 00:00:00', '{\"rank\": \"Tốt\", \"quarter\": \"Q1 2025\", \"category\": \"Đầu cơ\"}', '2025-02-01 15:38:34', '2025-02-02 11:54:33'),
(50, 3, 'MBB', '2025-02-02 00:00:00', '{\"rank\": \"Trung bình\", \"quarter\": \"Q1 2025\", \"category\": \"Tăng trưởng\"}', '2025-02-01 15:38:34', '2025-02-02 11:54:38'),
(51, 3, 'VNM', '2025-02-02 00:00:00', '{\"rank\": \"Tốt\", \"quarter\": \"Q1 2025\", \"category\": \"Cổ tức\"}', '2025-02-01 15:38:34', '2025-02-02 11:54:42'),
(52, 3, 'NKG', '2025-02-02 00:00:00', '{\"rank\": \"Tốt\", \"quarter\": \"Q1 2025\", \"category\": \"Cổ tức\"}', '2025-02-01 15:38:34', '2025-02-02 11:54:46'),
(53, 3, 'HSG', '2025-02-02 00:00:00', '{\"rank\": \"Tốt\", \"quarter\": \"Q1 2025\", \"category\": \"Cổ tức\"}', '2025-02-01 15:38:34', '2025-02-02 11:55:00'),
(54, 3, 'MSN', '2025-02-02 00:00:00', '{\"rank\": \"Tốt\", \"quarter\": \"Q1 2025\", \"category\": \"Cổ tức\"}', '2025-02-01 15:38:34', '2025-02-02 11:55:04'),
(55, 3, 'SHB', '2025-02-02 00:00:00', '{\"rank\": \"Tốt\", \"quarter\": \"Q1 2025\", \"category\": \"Cổ tức\"}', '2025-02-01 15:38:34', '2025-02-02 11:55:09'),
(61, 4, 'ACB', NULL, '{\"field\": \"Ngân hàng\"}', '2025-02-01 15:39:52', '2025-02-01 15:39:52'),
(62, 4, 'SSI', NULL, '{\"field\": \"Chứng khoán\"}', '2025-02-01 15:39:52', '2025-02-01 15:39:52'),
(63, 4, 'PPC', NULL, '{\"field\": \"Điện\"}', '2025-02-01 15:39:52', '2025-02-01 15:39:52'),
(64, 4, 'VNM', NULL, '{\"field\": \"Thực phẩm\"}', '2025-02-01 15:39:52', '2025-02-01 15:39:52'),
(65, 4, 'VGC', NULL, '{\"field\": \"VLXD\"}', '2025-02-01 15:39:52', '2025-02-01 15:39:52'),
(66, 4, 'CII', NULL, '{\"field\": \"Đầu tư công\"}', '2025-02-01 15:39:52', '2025-02-01 15:39:52'),
(67, 4, 'VHM', NULL, '{\"field\": \"Bất động sản\"}', '2025-02-01 15:39:52', '2025-02-01 15:39:52'),
(68, 3, 'ACB', '2024-12-31 00:00:00', '{\"rank\": \"Kém\", \"quarter\": \"Q4 2024\", \"category\": \"Tốt\"}', '2025-02-02 11:55:48', '2025-02-02 11:55:48'),
(69, 1, 'ACB', '2024-11-25 00:00:00', '{\"pl\": 1.2, \"ptb\": 2.2, \"pte\": 11, \"rcm\": \"Mua - ngắn hạn\", \"roi\": 12, \"price\": 54.3, \"bsRate\": 30, \"bsCycle\": \"Vùng mua\", \"maxInvestment\": 2.5, \"valuationLevel\": \"Rất cao\", \"technicalSignal\": \"Rất tốt\"}', '2025-02-02 15:01:14', '2025-02-02 15:01:14');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `stockdetails`
--

CREATE TABLE `stockdetails` (
  `id` int NOT NULL,
  `stockCode` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `date` datetime NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `pl` decimal(10,2) NOT NULL,
  `rcm` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `bsRate` int NOT NULL,
  `bsCycle` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `pte` decimal(10,2) NOT NULL,
  `ptb` decimal(10,2) NOT NULL,
  `roe` int NOT NULL,
  `valuationLevel` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `techSignal` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Đang đổ dữ liệu cho bảng `stockdetails`
--

INSERT INTO `stockdetails` (`id`, `stockCode`, `date`, `price`, `pl`, `rcm`, `bsRate`, `bsCycle`, `pte`, `ptb`, `roe`, `valuationLevel`, `techSignal`, `createdAt`, `updatedAt`) VALUES
(5, 'MWG', '2024-11-25 00:00:00', 54.30, 1.20, 'Mua - ngắn hạn', 30, 'Vùng mua', 11.00, 2.20, 12, 'Rất cao', 'Rất tốt', '2025-01-13 03:27:46', '2025-01-13 03:27:46'),
(6, 'MWG', '2024-11-26 00:00:00', 54.40, 1.30, 'Bán - một phần', 50, 'Vùng Bán', 11.10, 2.25, 12, 'Rất cao', 'Rất tốt', '2025-01-13 03:27:46', '2025-01-13 03:27:46'),
(7, 'MWG', '2024-11-27 00:00:00', 54.50, 1.40, 'Mua - trung hạn', 70, 'Vùng mua', 11.30, 2.27, 12, 'Rất cao', 'Rất tốt', '2025-01-13 03:27:46', '2025-01-13 03:27:46'),
(8, 'MWG', '2024-11-28 00:00:00', 54.70, 1.50, 'Mua - dài hạn', 70, 'Vùng mua', 11.50, 2.28, 12, 'Trung tính', 'Tốt', '2025-01-13 03:27:46', '2025-01-13 03:27:46'),
(9, 'MWG', '2024-11-29 00:00:00', 58.50, 8.00, 'Chờ mua', 70, 'Vùng mua', 11.50, 2.28, 12, 'Cao', 'Trung tính', '2025-01-13 03:27:46', '2025-01-13 03:27:46'),
(10, 'MWG', '2024-11-30 00:00:00', 63.50, 12.00, 'Bán - toàn bộ', 100, 'Vùng Bán', 11.50, 2.28, 12, 'Cao', 'Trung tính', '2025-01-13 03:27:46', '2025-01-13 03:27:46'),
(11, 'MWG', '2024-12-01 00:00:00', 60.50, 10.00, 'Bán - Một phần', 50, 'Vùng bán', 11.50, 2.28, 12, 'Cao', 'Trung tính', '2025-01-13 03:27:46', '2025-01-13 03:27:46'),
(26, 'SHK', '2024-11-25 00:00:00', 54.30, 1.20, 'Mua - ngắn hạn', 30, 'Vùng mua', 11.00, 2.20, 12, 'Rất cao', 'Rất tốt', '2025-01-13 03:32:47', '2025-01-13 03:32:47'),
(27, 'SHK', '2024-11-26 00:00:00', 54.40, 1.30, 'Bán - một phần', 50, 'Vùng Bán', 11.10, 2.25, 12, 'Rất cao', 'Rất tốt', '2025-01-13 03:32:47', '2025-01-13 03:32:47'),
(28, 'SHK', '2024-11-27 00:00:00', 54.50, 1.40, 'Mua - trung hạn', 70, 'Vùng mua', 11.30, 2.27, 12, 'Rất cao', 'Rất tốt', '2025-01-13 03:32:47', '2025-01-13 03:32:47'),
(29, 'SHK', '2024-11-28 00:00:00', 54.70, 1.50, 'Mua - dài hạn', 70, 'Vùng mua', 11.50, 2.28, 12, 'Trung tính', 'Tốt', '2025-01-13 03:32:47', '2025-01-13 03:32:47'),
(30, 'SHK', '2024-11-29 00:00:00', 58.50, 8.00, 'Chờ mua', 70, 'Vùng mua', 11.50, 2.28, 12, 'Cao', 'Trung tính', '2025-01-13 03:32:47', '2025-01-13 03:32:47'),
(31, 'SHK', '2024-11-30 00:00:00', 63.50, 12.00, 'Bán - toàn bộ', 100, 'Vùng Bán', 11.50, 2.28, 12, 'Cao', 'Trung tính', '2025-01-13 03:32:47', '2025-01-13 03:32:47'),
(32, 'SHK', '2024-12-01 00:00:00', 60.50, 10.00, 'Bán - Một phần', 50, 'Vùng bán', 11.50, 2.28, 12, 'Cao', 'Trung tính', '2025-01-13 03:32:47', '2025-01-13 03:32:47'),
(33, 'NVL', '2024-11-25 00:00:00', 54.30, 1.20, 'Mua - ngắn hạn', 30, 'Vùng mua', 11.00, 2.20, 12, 'Rất cao', 'Rất tốt', '2025-01-13 03:33:12', '2025-01-13 03:33:12'),
(34, 'NVL', '2024-11-26 00:00:00', 54.40, 1.30, 'Bán - một phần', 50, 'Vùng Bán', 11.10, 2.25, 12, 'Rất cao', 'Rất tốt', '2025-01-13 03:33:12', '2025-01-13 03:33:12'),
(35, 'NVL', '2024-11-27 00:00:00', 54.50, 1.40, 'Mua - trung hạn', 70, 'Vùng mua', 11.30, 2.27, 12, 'Rất cao', 'Rất tốt', '2025-01-13 03:33:12', '2025-01-13 03:33:12'),
(36, 'NVL', '2024-11-28 00:00:00', 54.70, 1.50, 'Mua - dài hạn', 70, 'Vùng mua', 11.50, 2.28, 12, 'Trung tính', 'Tốt', '2025-01-13 03:33:12', '2025-01-13 03:33:12'),
(37, 'NVL', '2024-11-29 00:00:00', 58.50, 8.00, 'Chờ mua', 70, 'Vùng mua', 11.50, 2.28, 12, 'Cao', 'Trung tính', '2025-01-13 03:33:12', '2025-01-13 03:33:12'),
(38, 'NVL', '2024-11-30 00:00:00', 63.50, 12.00, 'Bán - toàn bộ', 100, 'Vùng Bán', 11.50, 2.28, 12, 'Cao', 'Trung tính', '2025-01-13 03:33:12', '2025-01-13 03:33:12'),
(39, 'NVL', '2024-12-01 00:00:00', 60.50, 10.00, 'Bán - Một phần', 50, 'Vùng bán', 11.50, 2.28, 12, 'Cao', 'Trung tính', '2025-01-13 03:33:12', '2025-01-13 03:33:12');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `stockpicks`
--

CREATE TABLE `stockpicks` (
  `id` int NOT NULL,
  `date` datetime NOT NULL,
  `code` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `field` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `rcm` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `bsRate` int NOT NULL,
  `bsCycle` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `pte` decimal(10,2) NOT NULL,
  `ptb` decimal(10,2) NOT NULL,
  `roe` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Đang đổ dữ liệu cho bảng `stockpicks`
--

INSERT INTO `stockpicks` (`id`, `date`, `code`, `field`, `price`, `rcm`, `bsRate`, `bsCycle`, `pte`, `ptb`, `roe`, `createdAt`, `updatedAt`) VALUES
(1, '2024-11-24 00:00:00', 'MWG', 'Bán lẻ', 10.00, 'Mua - ngắn hạn', 30, 'Vùng mua', 11.00, 2.20, 13, '2025-01-05 17:38:26', '2025-01-06 22:07:09'),
(234, '2024-11-25 00:00:00', 'MBB', 'Ngân hàng', 10.00, 'Chờ bán', 70, 'Chờ để bán', 5.63, 1.25, 22, '2025-01-05 18:09:57', '2025-01-05 18:14:51'),
(253, '2024-11-25 00:00:00', 'MWG', 'Bán lẻ', 54.30, 'Mua - ngắn hạn', 30, 'Vùng mua', 11.00, 2.20, 12, '2025-01-06 22:43:57', '2025-01-06 22:43:57');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `stocks`
--

CREATE TABLE `stocks` (
  `id` int NOT NULL,
  `date` datetime NOT NULL,
  `code` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `field` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `financialRank` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `quarter` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Đang đổ dữ liệu cho bảng `stocks`
--

INSERT INTO `stocks` (`id`, `date`, `code`, `field`, `financialRank`, `quarter`, `createdAt`, `updatedAt`) VALUES
(1, '2025-01-01 00:00:00', 'MWG', 'Ngân hàng', 'Rất tốt', 'Quý 2', '2025-01-06 00:02:58', '2025-01-13 03:43:17'),
(2, '2025-01-06 00:02:58', 'NVL', 'Bất động sản', 'Rất tốt', '25-01', '2025-01-06 21:53:49', '2025-01-06 21:53:49'),
(3, '2025-01-06 00:02:58', 'SHK', 'Bất động sản', 'Tốt', '25-01', '2025-01-06 22:48:16', '2025-01-06 22:48:16'),
(4, '2025-01-06 00:02:58', 'SHK', 'Chứng khoán', 'Tốt', '25-02', '2025-01-09 17:04:03', '2025-01-09 17:04:03');

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
  `province` varchar(256) COLLATE utf8mb4_bin NOT NULL,
  `status` enum('pending','reject','accept') CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `codeLiked` varchar(2048) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '[]',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `phone`, `province`, `status`, `codeLiked`, `createdAt`, `updatedAt`) VALUES
(1, 'Admin', 'admin@gmail.com', '$2a$10$8oxQ1.R8QGzQdMJJyMC2P.ENb70KgH5.ip/ZxllH5V/5ead6aIc1S', 'ADMIN', NULL, '', 'accept', '[\"ACB\",\"CII\"]', '2024-11-26 17:52:38', '2025-02-02 15:16:40'),
(52, 'Nguyên', 'admin1@gmail.com', '$2a$10$trcdnFRWl752Ud/MqjOnueLrWexPQD4EJD5dTQMQj./J1BYdEuhqm', 'USER', '096125281231', '', 'accept', '[]', '2025-01-04 22:08:25', '2025-01-13 10:30:25'),
(53, 'Nguyên', 'd@gmail.com', '$2a$10$a9ATKdzkGdaFyW1.wAIjpeGFOytVqK/2SqBbcq9ahtmdsO2jrMAvK', 'USER', '456', '', 'accept', '[]', '2025-01-04 22:10:26', '2025-01-13 10:30:26'),
(54, 'Kiên', 'kien@gmail.com', '$2a$10$yR/a3TVLwK7uKNvUs7lOLuH1ALAnG.8l0/..r9ew1rQR8Hwk6XWuy', 'USER', '041655', '', 'accept', '[]', '2025-01-05 08:52:07', '2025-01-13 10:30:27'),
(55, 'Kiên', 'kien1@gmail.com', '$2a$10$mUSzVULK0WVd2MtVwQoh0uCc4HblVMulq/pJJdvfzblz4B4fBzTle', 'USER', '013215', '', 'accept', '[]', '2025-01-05 08:53:06', '2025-01-13 10:30:28');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `vnindexpicks`
--

CREATE TABLE `vnindexpicks` (
  `id` int NOT NULL,
  `date` datetime NOT NULL,
  `point` decimal(10,2) NOT NULL,
  `pl` decimal(10,2) NOT NULL,
  `rcm` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `bsRate` int NOT NULL,
  `riskVnindex` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `riskMacro` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `pe` decimal(10,2) NOT NULL,
  `pb` decimal(10,2) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Đang đổ dữ liệu cho bảng `vnindexpicks`
--

INSERT INTO `vnindexpicks` (`id`, `date`, `point`, `pl`, `rcm`, `bsRate`, `riskVnindex`, `riskMacro`, `pe`, `pb`, `createdAt`, `updatedAt`) VALUES
(1, '2024-11-25 00:00:00', 1240.20, 10.00, 'Mua', 30, 'Rất cao', 'Cao', 13.20, 1.70, '2025-01-05 19:57:09', '2025-01-05 19:57:09'),
(2, '2024-11-26 00:00:00', 1241.30, 0.50, 'Bán', 10, 'Cao', 'Trung tính', 13.10, 1.75, '2025-01-05 19:57:09', '2025-01-05 19:57:09'),
(3, '2024-11-27 00:00:00', 1000.00, 0.50, 'Trung lập', 10, 'Trung tính', 'Thấp', 13.30, 1.69, '2025-01-05 19:57:09', '2025-01-05 19:57:09');

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
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `stockdetails`
--
ALTER TABLE `stockdetails`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `stockCode` (`stockCode`,`date`),
  ADD KEY `stockCode_2` (`stockCode`);

--
-- Chỉ mục cho bảng `stockpicks`
--
ALTER TABLE `stockpicks`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `date` (`date`,`code`),
  ADD KEY `code` (`code`);

--
-- Chỉ mục cho bảng `stocks`
--
ALTER TABLE `stocks`
  ADD PRIMARY KEY (`id`);

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
-- Chỉ mục cho bảng `vnindexpicks`
--
ALTER TABLE `vnindexpicks`
  ADD PRIMARY KEY (`id`);

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

--
-- AUTO_INCREMENT cho bảng `stockdetails`
--
ALTER TABLE `stockdetails`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT cho bảng `stockpicks`
--
ALTER TABLE `stockpicks`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=256;

--
-- AUTO_INCREMENT cho bảng `stocks`
--
ALTER TABLE `stocks`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `tables`
--
ALTER TABLE `tables`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT cho bảng `vnindexpicks`
--
ALTER TABLE `vnindexpicks`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
