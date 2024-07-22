-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 22, 2024 at 08:15 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test`
--

-- --------------------------------------------------------

--
-- Table structure for table `idd_person`
--

CREATE TABLE `idd_person` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `age` int(3) NOT NULL,
  `fpath` varchar(40) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `idd_person`
--

INSERT INTO `idd_person` (`id`, `name`, `age`, `fpath`) VALUES
(2, 'Chris', 19, 'img/smiley1.png'),
(3, 'Diana', 25, 'img/smiley2.png'),
(4, 'Eric', 23, 'img/smiley2.png'),
(5, 'Gary', 12, 'img/smiley1.png'),
(6, 'Freda', 23, 'img/smiley2.png'),
(8, 'Chris', 19, 'img/smiley1.png'),
(9, 'Diana', 25, 'img/smiley2.png'),
(10, 'Eric', 23, 'img/smiley2.png'),
(11, 'Gary', 12, 'img/smiley1.png'),
(12, 'Freda', 23, 'img/smiley2.png'),
(72, 'Savi', 30, 'img/smiley1.png'),
(0, '', 0, 'img/smiley.png'),
(0, '', 0, 'img/smiley.png'),
(0, 'adw', 123, 'img/smiley2.png');

-- --------------------------------------------------------

--
-- Table structure for table `units`
--

CREATE TABLE `units` (
  `code` varchar(10) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `cp` decimal(4,1) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `units`
--

INSERT INTO `units` (`code`, `description`, `cp`, `type`) VALUES
('ACC10007', 'Financial Information for Decision Making', 12.5, 'Systems Analysis'),
('ACC20014', 'Management Decision Making', 12.5, 'Systems Analysis'),
('COS10005', 'Web Development', 12.5, 'Core'),
('COS10009', 'Introduction to Programming', 12.5, 'Core'),
('COS20001', 'User-Centred Design', 12.5, 'Software Development'),
('COS20007', 'Object Oriented Programming', 12.5, 'Software Development'),
('COS20016', 'Operating System Configuration', 12.5, 'Software Development'),
('COS30015', 'IT Security', 12.5, 'Software Development'),
('COS30017', 'Software Development for Mobile Devices', 12.5, 'Software Development'),
('COS30043', 'Interface Design and Development', 12.5, 'Software Development'),
('ICT10001', 'Problem Solving with ICT', 12.5, 'Core'),
('ICT30001', 'Information Technology Project', 12.5, 'Core'),
('ICT30005', 'Professional Issues in Information Technology', 12.5, 'Core'),
('INF10002', 'Database Analysis and Design', 12.5, 'Core'),
('INF10003', 'Introduction to Business Information Systems', 12.5, 'Core'),
('INF20003', 'Requirements Analysis and Modelling', 12.5, 'Systems Analysis'),
('INF20012', 'Enterprise Systems', 12.5, 'Systems Analysis'),
('INF30001', 'Systems Acquisition & Implementation Management', 12.5, 'Systems Analysis'),
('INF30003', 'Business Information Systems Analysis', 12.5, 'Systems Analysis'),
('INF30005', 'Business Process Management', 12.5, 'Systems Analysis'),
('INF30020', 'Information Systems Risk and Security', 12.5, 'Systems Analysis'),
('INF30029', 'Information Technology Project Management', 12.5, 'Core'),
('SWE20001', 'Development Project 1 - Tools and Practices', 12.5, 'Software Development'),
('TNE10005', 'Network Administration', 12.5, 'Software Development');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`) VALUES
(1, 'admin', 'hellovue'),
(0, 'admin', 'admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `units`
--
ALTER TABLE `units`
  ADD PRIMARY KEY (`code`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
