-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost:3306
-- Thời gian đã tạo: Th1 08, 2025 lúc 05:26 PM
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
-- Cấu trúc bảng cho bảng `stockdetails`
--

CREATE TABLE `stockdetails` (
  `id` int NOT NULL,
  `stockId` int NOT NULL,
  `date` datetime NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `pl` decimal(10,2) NOT NULL,
  `rcm` varchar(64) COLLATE utf8mb4_bin NOT NULL,
  `bsRate` int NOT NULL,
  `bsCycle` varchar(64) COLLATE utf8mb4_bin NOT NULL,
  `pte` decimal(10,2) NOT NULL,
  `ptb` decimal(10,2) NOT NULL,
  `roe` int NOT NULL,
  `valuationLevel` varchar(64) COLLATE utf8mb4_bin NOT NULL,
  `techSignal` varchar(64) COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Đang đổ dữ liệu cho bảng `stockdetails`
--

INSERT INTO `stockdetails` (`id`, `stockId`, `date`, `price`, `pl`, `rcm`, `bsRate`, `bsCycle`, `pte`, `ptb`, `roe`, `valuationLevel`, `techSignal`, `createdAt`, `updatedAt`) VALUES
(1, 1, '2024-10-08 00:00:00', 54.30, 1.20, 'Mua - ngắn hạn', 30, 'Vùng mua', 11.00, 2.20, 13, 'Rất cao', 'Rất tốt', '2025-01-06 14:50:23', '2025-01-06 22:08:27'),
(3, 2, '2025-01-06 00:00:00', 1021.00, 102.00, '20', 12, '12020', 12012.00, 1.00, 212, '12', '001', '2025-01-06 22:56:56', '2025-01-06 22:56:56');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `stockpicks`
--

CREATE TABLE `stockpicks` (
  `id` int NOT NULL,
  `date` datetime NOT NULL,
  `code` varchar(64) COLLATE utf8mb4_bin NOT NULL,
  `field` varchar(128) COLLATE utf8mb4_bin NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `rcm` varchar(256) COLLATE utf8mb4_bin NOT NULL,
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
(2, '2024-11-26 00:00:00', 'NVL', 'Bất động sản', 11.20, 'Bán - một phần', 50, 'Vùng Bán', 125.00, 0.70, -10, '2025-01-05 17:38:26', '2025-01-05 17:38:26'),
(8, '2024-11-26 00:00:00', 'VIB', 'Ngân hàng', 22.50, 'Bán - một phần', 70, 'Vùng bán', 5.70, 1.37, 22, '2025-01-05 17:38:26', '2025-01-05 17:38:26'),
(41, '2024-11-26 00:00:00', 'ACB', 'Ngân hàng', 22.50, 'Mua - trung hạn', 70, 'Vùng mua', 6.00, 1.25, 22, '2025-01-05 17:44:54', '2025-01-05 17:44:54'),
(42, '2024-11-26 00:00:00', 'BID', 'Ngân hàng', 22.50, 'Mua - dài hạn', 70, 'Vùng mua', 7.50, 1.25, 22, '2025-01-05 17:44:54', '2025-01-05 17:44:54'),
(43, '2024-11-26 00:00:00', 'VCB', 'Ngân hàng', 22.50, 'Chờ mua', 70, 'Vùng mua', 8.90, 1.25, 22, '2025-01-05 17:44:54', '2025-01-05 17:44:54'),
(233, '2024-11-26 00:00:00', 'TCB', 'Ngân hàng', 22.50, 'Bán - toàn bộ', 100, 'Vùng Bán', 4.50, 1.29, 22, '2025-01-05 18:09:57', '2025-01-05 18:09:57'),
(234, '2024-11-25 00:00:00', 'MBB', 'Ngân hàng', 10.00, 'Chờ bán', 70, 'Chờ để bán', 5.63, 1.25, 22, '2025-01-05 18:09:57', '2025-01-05 18:14:51'),
(253, '2024-11-25 00:00:00', 'MWG', 'Bán lẻ', 54.30, 'Mua - ngắn hạn', 30, 'Vùng mua', 11.00, 2.20, 12, '2025-01-06 22:43:57', '2025-01-06 22:43:57'),
(254, '2024-11-26 00:00:00', 'MBB', 'Ngân hàng', 22.50, 'Chờ bán', 70, 'Chờ để bán', 5.60, 1.25, 22, '2025-01-06 22:43:57', '2025-01-06 22:43:57');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `stocks`
--

CREATE TABLE `stocks` (
  `id` int NOT NULL,
  `code` varchar(64) COLLATE utf8mb4_bin NOT NULL,
  `field` varchar(128) COLLATE utf8mb4_bin NOT NULL,
  `financialRank` varchar(128) COLLATE utf8mb4_bin NOT NULL,
  `quarter` varchar(128) COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Đang đổ dữ liệu cho bảng `stocks`
--

INSERT INTO `stocks` (`id`, `code`, `field`, `financialRank`, `quarter`, `createdAt`, `updatedAt`) VALUES
(1, 'MWG', 'Ngân hàng', 'Rất tốt', 'Quý 2', '2025-01-06 00:02:58', '2025-01-06 00:03:49'),
(2, 'NVL', 'Bất động sản', 'Rất tốt', '25-01', '2025-01-06 21:53:49', '2025-01-06 21:53:49'),
(3, 'SHK', 'Bất động sản', 'Tốt', '25-01', '2025-01-06 22:48:16', '2025-01-06 22:48:16');

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
  `status` enum('pending','reject','accept') CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `codeLiked` varchar(2048) COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `phone`, `status`, `codeLiked`, `createdAt`, `updatedAt`) VALUES
(1, 'Admin', 'admin@gmail.com', '$2a$10$8oxQ1.R8QGzQdMJJyMC2P.ENb70KgH5.ip/ZxllH5V/5ead6aIc1S', 'ADMIN', NULL, 'accept', '[\"BID\",\"NVL\",\"MBB\"]', '2024-11-26 17:52:38', '2025-01-09 00:23:42'),
(52, 'Nguyên', 'admin1@gmail.com', '$2a$10$trcdnFRWl752Ud/MqjOnueLrWexPQD4EJD5dTQMQj./J1BYdEuhqm', 'USER', '096125281231', 'accept', '', '2025-01-04 22:08:25', '2025-01-04 23:34:34'),
(53, 'Nguyên', 'd@gmail.com', '$2a$10$a9ATKdzkGdaFyW1.wAIjpeGFOytVqK/2SqBbcq9ahtmdsO2jrMAvK', 'USER', '456', 'accept', '', '2025-01-04 22:10:26', '2025-01-05 18:29:04'),
(54, 'Kiên', 'kien@gmail.com', '$2a$10$yR/a3TVLwK7uKNvUs7lOLuH1ALAnG.8l0/..r9ew1rQR8Hwk6XWuy', 'USER', '041655', 'accept', '', '2025-01-05 08:52:07', '2025-01-05 09:00:58'),
(55, 'Kiên', 'kien1@gmail.com', '$2a$10$mUSzVULK0WVd2MtVwQoh0uCc4HblVMulq/pJJdvfzblz4B4fBzTle', 'USER', '013215', 'accept', '', '2025-01-05 08:53:06', '2025-01-05 08:54:57');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `vnindexpicks`
--

CREATE TABLE `vnindexpicks` (
  `id` int NOT NULL,
  `date` datetime NOT NULL,
  `point` decimal(10,2) NOT NULL,
  `pl` decimal(10,2) NOT NULL,
  `rcm` varchar(128) COLLATE utf8mb4_bin NOT NULL,
  `bsRate` int NOT NULL,
  `riskVnindex` varchar(64) COLLATE utf8mb4_bin NOT NULL,
  `riskMacro` varchar(64) COLLATE utf8mb4_bin NOT NULL,
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
(3, '2024-11-27 00:00:00', 1000.00, 0.50, 'Trung lập', 10, 'Trung tính', 'Thấp', 13.30, 1.69, '2025-01-05 19:57:09', '2025-01-05 19:57:09'),
(4, '2024-11-28 00:00:00', 1250.90, 0.50, 'Chờ mua', 10, 'Thấp', 'Thấp', 13.20, 1.72, '2025-01-05 19:57:09', '2025-01-05 19:57:09'),
(5, '2024-11-29 00:00:00', 1239.20, 0.50, 'Bán', 10, 'Rất thấp', 'Rất thấp', 13.00, 1.77, '2025-01-05 19:57:09', '2025-01-05 19:57:09');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `stockdetails`
--
ALTER TABLE `stockdetails`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `stockId_2` (`stockId`,`date`),
  ADD KEY `stockId` (`stockId`);

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
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Chỉ mục cho bảng `vnindexpicks`
--
ALTER TABLE `vnindexpicks`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `date` (`date`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `stockdetails`
--
ALTER TABLE `stockdetails`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `stockpicks`
--
ALTER TABLE `stockpicks`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=256;

--
-- AUTO_INCREMENT cho bảng `stocks`
--
ALTER TABLE `stocks`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
