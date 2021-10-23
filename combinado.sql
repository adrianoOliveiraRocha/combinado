-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 05, 2021 at 04:42 PM
-- Server version: 8.0.25-0ubuntu0.20.04.1
-- PHP Version: 7.4.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `combinado`
--

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `id` int NOT NULL,
  `email` varchar(100) NOT NULL,
  `pwd` varchar(300) NOT NULL,
  `name` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` varchar(500) DEFAULT NULL,
  `userid` int NOT NULL,
  `aboutMe` text,
  `image` varchar(800) DEFAULT NULL,
  `type` tinyint(1) DEFAULT '2'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`id`, `email`, `pwd`, `name`, `phone`, `address`, `userid`, `aboutMe`, `image`, `type`) VALUES
(1, 'ali@email.com', 'f5df4313797caf372fe62688f90c022c', 'Aline Moreira', '(85)999887766', 'Rua Almeida Prado 34', 4, 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.', '1570192902293.jpeg', 2),
(2, 'hel@email.com', '8489d1b602d26cba00de427e20614c83', 'Helena Sales', '(88)988764532', 'Rua Francisco Borges, 456', 4, 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.', '1570193204869.jpg', 2),
(3, 'fab@email.com', 'fae7d9bf1ee1b1c9fe1f964918dba395', ' Fabrícia Claim ', '', 'Av. Alvarez dos Anjos, 890', 6, 'Hello! I am a pedicure with 12 eyers of experience. I studied this since my 10 old. I hoppe I will be useful to you. Thanks!', '1571314795918.jpeg', 2),
(15, 'jul@email.com', '5ed0bf220c90d8ace24008f01f8038ca', 'Juliana', '(85)999473839', 'Rua Juliano Mattos, 45', 6, 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.', '1571392820973.jpg', 2),
(19, 'test@email.com', 'd44ba2700061cc42becab59842dc0161', 'Test da Silva', '(85)987165523', 'Rua Abelardo Pinto, 990', 4, '', '1571832310695.png', 2);

-- --------------------------------------------------------

--
-- Table structure for table `employee_day`
--

CREATE TABLE `employee_day` (
  `id` int NOT NULL,
  `employeeId` int NOT NULL,
  `dayCode` tinyint(1) NOT NULL,
  `queryTime` int NOT NULL DEFAULT '15',
  `morningInit` time DEFAULT NULL,
  `morningEnd` time DEFAULT NULL,
  `afternoonInit` time DEFAULT NULL,
  `afternoonEnd` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `employee_day`
--

INSERT INTO `employee_day` (`id`, `employeeId`, `dayCode`, `queryTime`, `morningInit`, `morningEnd`, `afternoonInit`, `afternoonEnd`) VALUES
(1, 1, 0, 15, NULL, NULL, NULL, NULL),
(2, 1, 1, 15, '07:30:00', '11:40:00', '13:40:00', '17:45:00'),
(3, 1, 2, 15, '08:00:00', '12:30:00', '14:00:00', '17:30:00'),
(4, 1, 3, 15, '08:30:00', '12:45:00', '13:45:00', '17:50:00'),
(5, 1, 4, 15, '07:30:00', '12:00:00', '13:30:00', '17:00:00'),
(6, 1, 5, 15, '08:00:00', '11:30:00', '13:45:00', '17:45:00'),
(7, 1, 6, 15, '07:30:00', '12:00:00', '13:30:00', '17:45:00'),
(15, 3, 0, 15, NULL, NULL, NULL, NULL),
(16, 3, 1, 15, '08:00:00', '11:50:00', '14:00:00', '18:00:00'),
(17, 3, 2, 15, '07:45:00', '11:00:00', '13:45:00', '17:45:00'),
(18, 3, 3, 15, '08:00:00', '11:00:00', '13:00:00', '17:00:00'),
(19, 3, 4, 15, '07:45:00', '11:45:00', '13:45:00', '17:45:00'),
(20, 3, 5, 15, '08:50:00', '11:45:00', '14:50:00', '18:50:00'),
(21, 3, 6, 15, '09:00:00', '12:00:00', NULL, NULL),
(99, 15, 0, 15, NULL, NULL, NULL, NULL),
(100, 15, 1, 15, '07:45:00', '11:45:00', '13:00:00', '17:00:00'),
(101, 15, 2, 15, '08:00:00', '11:45:00', '13:45:00', '17:45:00'),
(102, 15, 3, 15, '07:50:00', '11:45:00', '14:20:00', '18:00:00'),
(103, 15, 4, 15, '08:50:00', '11:50:00', '13:45:00', '17:50:00'),
(104, 15, 5, 15, '08:00:00', '11:00:00', '13:20:00', '17:50:00'),
(105, 15, 6, 15, '08:50:00', '11:30:00', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `employee_service`
--

CREATE TABLE `employee_service` (
  `id` int NOT NULL,
  `employeeid` int NOT NULL,
  `serviceid` int NOT NULL,
  `userid` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `employee_service`
--

INSERT INTO `employee_service` (`id`, `employeeid`, `serviceid`, `userid`) VALUES
(3, 1, 1, 4),
(4, 1, 3, 4),
(5, 2, 2, 4),
(6, 2, 4, 4),
(11, 19, 3, 4),
(12, 3, 16, 6),
(13, 3, 18, 6),
(14, 15, 16, 6),
(15, 15, 18, 6);

-- --------------------------------------------------------

--
-- Table structure for table `Message`
--

CREATE TABLE `Message` (
  `id` int NOT NULL,
  `email` varchar(100) NOT NULL,
  `_text` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Message`
--

INSERT INTO `Message` (`id`, `email`, `_text`) VALUES
(1, 'client@email.com', 'undefined'),
(2, 'client@email.com', 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. '),
(3, 'client@email.com', 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. '),
(4, 'client@email.com', 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. '),
(5, 'client@email.com', 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. '),
(6, 'client@email.com', 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. '),
(7, 'client@email.com', 'just a test again');

-- --------------------------------------------------------

--
-- Table structure for table `PaymentRequest`
--

CREATE TABLE `PaymentRequest` (
  `id` int NOT NULL,
  `paymentLink` varchar(100) NOT NULL,
  `userId` int NOT NULL,
  `message` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `scheduling`
--

CREATE TABLE `scheduling` (
  `id` int NOT NULL,
  `_datetime` datetime DEFAULT NULL,
  `comments` text,
  `clientPhone` varchar(30) NOT NULL,
  `clientEmail` varchar(100) NOT NULL,
  `employeeId` int NOT NULL,
  `canceled` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `scheduling`
--

INSERT INTO `scheduling` (`id`, `_datetime`, `comments`, `clientPhone`, `clientEmail`, `employeeId`, `canceled`) VALUES
(1, '2019-10-25 09:45:00', 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. ', '0000000000', 'client1@email.com', 1, 1),
(2, '2019-10-15 16:45:00', 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. ', '85978766655', 'client2@email.com', 2, 0),
(3, '2019-10-15 10:10:00', 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. ', '88987667654', 'client3@email.com', 2, 0),
(4, '2019-10-15 10:50:00', 'I did via smartphone ', '85936521470', 'client4@email.com', 2, 0),
(5, '2019-10-31 15:30:00', 'I am the client 5', '85936521478', 'client5@email.com', 1, 0),
(6, '2019-11-14 18:10:00', 'I am the client 6', '85963214580', 'client6@email.com', 2, 1),
(7, '2019-10-23 15:45:00', 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. ', '85988776253', 'client7@email.com', 1, 0),
(8, '2019-10-23 15:45:00', 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. ', '85988776253', 'client7@email.com', 1, 0),
(9, '2019-10-23 16:15:00', 'Client 8', '85963254780', 'client8@gmail.com', 1, 0),
(10, '2019-10-30 15:30:00', 'Test client 9', '85936521470', 'client9@email.com', 2, 0),
(11, '2019-10-24 17:10:00', 'Client 10', '85963251480', 'client10@email.com', 2, 0),
(12, '2019-10-04 15:45:00', 'Client 11', '85963254177', 'client11@email.com', 1, 0),
(13, '2019-11-13 17:15:00', 'Client 12', '8596523258', 'client12@email.com', 1, 0),
(14, '2019-10-24 18:30:00', 'Client 13', '85980563240', 'client13@email.com', 2, 0),
(15, '2019-10-24 16:00:00', '14', '85988765432', 'client14@email', 1, 0),
(16, '2019-10-26 12:00:00', 'Test', '85963251470', 'test@email.com', 1, 0),
(17, '2019-10-26 12:40:00', 'I just can speak English when the subject is computing', '85723145539', 'test@email.com', 2, 0),
(18, '2019-10-30 15:50:00', 'Eu posso fala em duas lingua ta legal?', '85963214578', 'test@email.com', 2, 1),
(19, '2019-11-19 16:30:00', 'My system is working well now', '85326547800', 'test@email.com', 1, 0),
(20, '2019-10-25 11:30:00', 'Obs', '85963254580', 'test@email.com', 1, 0),
(21, '2019-10-17 17:30:00', 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. ', '8534321210', 'client@gmail.com', 2, 0),
(22, '2019-10-31 16:10:00', 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. ', '85987563322', 'felicia@yahoo.com.br', 2, 0),
(23, '2019-10-16 13:10:00', 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. ', '(85)99887722', 'client1@email.com', 2, 0),
(24, '2019-10-17 15:30:00', 'This is a test', '(85)86844184', 'vanessacarvalho1@gmail.com', 2, 0),
(25, '2019-10-24 13:30:00', 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. ', '(85)978654433', 'client1@email.com', 19, 0),
(26, '2019-11-30 10:35:00', 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. ', '(85)999473839', 'client@email.com', 15, 0),
(27, '2019-11-29 15:20:00', 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. ', '(85)999473839', 'client@email.com', 3, 0);

-- --------------------------------------------------------

--
-- Table structure for table `service`
--

CREATE TABLE `service` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `userid` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `service`
--

INSERT INTO `service` (`id`, `name`, `userid`) VALUES
(1, 'Service 1', 4),
(2, 'Service 2', 4),
(3, 'Service 3', 4),
(4, 'Service 4', 4),
(5, 'Service 5', 4),
(6, 'Hair Stylist', 5),
(7, 'Manicure', 5),
(8, 'Pedicure', 5),
(9, 'Eyebrow Design', 5),
(16, 'Service1', 6),
(17, 'Service2', 6),
(18, 'Service3', 6);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int UNSIGNED NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('eUCME5B23LgRQVv5xLFdHbq2aZqI88Ok', 1625600544, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"message\":\"\",\"error\":\"\",\"user\":{\"id\":5,\"username\":\"Jully Albuquerque\",\"pwd\":\"5ed0bf220c90d8ace24008f01f8038ca\",\"creationDate\":\"2019-10-17T11:04:58.000Z\",\"website\":\"https://google.com\",\"email\":\"jully@email.com\",\"admin\":0,\"image\":\"1571310377179.jpg\",\"blocked\":0,\"joinedToken\":\"no-agreement\",\"pwdDecrypted\":\"jul123\"},\"loged\":true}');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `pwd` varchar(100) NOT NULL,
  `creationDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `website` varchar(200) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `admin` tinyint(1) DEFAULT '0',
  `image` varchar(500) DEFAULT NULL,
  `blocked` tinyint(1) NOT NULL DEFAULT '0',
  `joinedToken` varchar(500) DEFAULT 'no-agreement'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `pwd`, `creationDate`, `website`, `email`, `admin`, `image`, `blocked`, `joinedToken`) VALUES
(1, 'Adriano Oliveira', 'e77cb965bf3d3a67f1aacab36cf1e136', '2019-01-01 00:00:00', '', 'adriano.qwe32@gmail.com', 1, '1567768213162.png', 0, 'admin'),
(4, 'Marcos Silva', '2a17f94cc5c3946e5500689dd2933657', '2019-07-07 09:25:41', 'https://www.google.com', 'mar@email.com', 0, '1569587616897.jpg', 0, 'EC-9HU263647L0407615'),
(5, 'Jully Albuquerque', '5ed0bf220c90d8ace24008f01f8038ca', '2019-10-17 08:04:58', 'https://google.com', 'jully@email.com', 0, '1571310377179.jpg', 0, 'no-agreement'),
(6, 'Emma Thompsom', '354d8f8528b672a914c00d1ebdba8318', '2019-10-17 09:12:15', 'https://yahoo.com', 'emm@email.com', 0, '1571314364800.jpeg', 0, 'no-agreement');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userid` (`userid`),
  ADD KEY `employeeId` (`id`);

--
-- Indexes for table `employee_day`
--
ALTER TABLE `employee_day`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employeeId` (`employeeId`),
  ADD KEY `employeeDayId` (`id`);

--
-- Indexes for table `employee_service`
--
ALTER TABLE `employee_service`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userid` (`userid`),
  ADD KEY `employeeid` (`employeeid`),
  ADD KEY `serviceid` (`serviceid`),
  ADD KEY `employeeServiceId` (`id`);

--
-- Indexes for table `Message`
--
ALTER TABLE `Message`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `PaymentRequest`
--
ALTER TABLE `PaymentRequest`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `scheduling`
--
ALTER TABLE `scheduling`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employeeId` (`employeeId`),
  ADD KEY `schedulingId` (`id`),
  ADD KEY `_datetime` (`_datetime`);

--
-- Indexes for table `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userid` (`userid`),
  ADD KEY `serviceId` (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `userId` (`id`),
  ADD KEY `admin` (`admin`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `employee_day`
--
ALTER TABLE `employee_day`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=113;

--
-- AUTO_INCREMENT for table `employee_service`
--
ALTER TABLE `employee_service`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `Message`
--
ALTER TABLE `Message`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `PaymentRequest`
--
ALTER TABLE `PaymentRequest`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `scheduling`
--
ALTER TABLE `scheduling`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `service`
--
ALTER TABLE `service`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `employee`
--
ALTER TABLE `employee`
  ADD CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `user` (`id`);

--
-- Constraints for table `employee_day`
--
ALTER TABLE `employee_day`
  ADD CONSTRAINT `employee_day_ibfk_1` FOREIGN KEY (`employeeId`) REFERENCES `employee` (`id`);

--
-- Constraints for table `employee_service`
--
ALTER TABLE `employee_service`
  ADD CONSTRAINT `employee_service_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `employee_service_ibfk_2` FOREIGN KEY (`employeeid`) REFERENCES `employee` (`id`),
  ADD CONSTRAINT `employee_service_ibfk_3` FOREIGN KEY (`serviceid`) REFERENCES `service` (`id`);

--
-- Constraints for table `PaymentRequest`
--
ALTER TABLE `PaymentRequest`
  ADD CONSTRAINT `PaymentRequest_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`);

--
-- Constraints for table `scheduling`
--
ALTER TABLE `scheduling`
  ADD CONSTRAINT `scheduling_ibfk_1` FOREIGN KEY (`employeeId`) REFERENCES `employee` (`id`);

--
-- Constraints for table `service`
--
ALTER TABLE `service`
  ADD CONSTRAINT `service_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
