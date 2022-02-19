-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 20, 2022 at 12:20 AM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 8.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `opibus2`
--

-- --------------------------------------------------------

--
-- Table structure for table `booking_service`
--

CREATE TABLE `booking_service` (
  `id` int(11) NOT NULL,
  `bookings` varchar(100) NOT NULL,
  `availability` varchar(10) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `booking_service`
--

INSERT INTO `booking_service` (`id`, `bookings`, `availability`, `updated_at`) VALUES
(7, '[1,4],[2,5],[7,9]', 'False', '2022-02-19 17:33:55'),
(8, '[6,7],[2,4],[8,12]', 'True', '2022-02-19 17:34:28'),
(9, '[4,5],[2,3],[3,6]', 'False', '2022-02-19 17:35:04');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking_service`
--
ALTER TABLE `booking_service`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `booking_service`
--
ALTER TABLE `booking_service`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
